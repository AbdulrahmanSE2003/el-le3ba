/**
 * seasonMigration.ts
 *
 * One-time migration to reconcile pre-Season data with the new Season model:
 *   1. Create a Season document (reuses an existing one if any exists)
 *   2. Backfill `seasonId` on every Event / Session / Leaderboard missing it
 *   3. Drop the old unique index `teamId_1_eventId_1` from the Leaderboard
 *      collection and ensure the new unique index
 *      `teamId_1_eventId_1_seasonId_1` exists.
 *
 * Run from the backend directory:
 *   npx tsx scripts/seasonMigration.ts            # real run
 *   npx tsx scripts/seasonMigration.ts --dry-run  # read-only preview
 *
 * Optional env overrides (only used when creating a NEW Season):
 *   SEASON_TITLE         (default "Season-1")
 *   SEASON_STATUS        upcoming | active | knockout | ended
 *                        (default: "active" if a running event exists, else "upcoming")
 *   SEASON_START_DATE    ISO string
 *   SEASON_KNOCKOUT_DATE ISO string
 *   SEASON_END_DATE      ISO string
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import Season from "../src/models/seasonModel";
import Event from "../src/models/eventModel";
import Session from "../src/models/sessionModel";
import Leaderboard from "../src/models/leaderboardModel";
import User from "../src/models/userModel";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const DRY_RUN = process.argv.includes("--dry-run");

const color = (code: string, s: string) =>
  process.env.NO_COLOR === "true" || !process.stdout.isTTY
    ? s
    : `\u001b[${code}m${s}\u001b[0m`;
const info = (s: string) => console.log(color("0", s));
const ok = (s: string) => console.log(color("32", s));
const warn = (s: string) => console.log(color("33;1", s));
const title = (s: string) => console.log(color("1;36", s));

const MISSING_FILTER = {
  $or: [{ seasonId: null }, { seasonId: { $exists: false } }],
};

const missingCount = async (collectionName: string) =>
  mongoose.connection.db!.collection(collectionName).countDocuments(MISSING_FILTER);

async function main() {
  title(`${DRY_RUN ? "DRY-RUN" : "LIVE"}  Season migration`);
  if (DRY_RUN) warn("DRY RUN — no documents will be written.");

  await mongoose.connect(process.env.MONGODB_URI as string);
  info(`connected: ${mongoose.connection.name}`);

  // ── Baseline ─────────────────────────────────────────────
  const seasonsTotal = await Season.countDocuments();
  const eventsMissing = await missingCount("events");
  const sessionsMissing = await missingCount("sessions");
  const leaderboardsMissing = await missingCount("leaderboards");

  title("\n── Baseline ──");
  info(`seasons: ${seasonsTotal}`);
  info(`events missing seasonId: ${eventsMissing}`);
  info(`sessions missing seasonId: ${sessionsMissing}`);
  info(`leaderboards missing seasonId: ${leaderboardsMissing}`);

  // ── 1. Resolve or create the Season ──────────────────────
  let seasonId!: mongoose.Types.ObjectId;

  if (seasonsTotal > 0) {
    const existing =
      (await Season.findOne({ status: "active" }).sort({ createdAt: -1 })) ??
      (await Season.findOne().sort({ createdAt: -1 }));
    if (existing) {
      seasonId = existing._id;
      info(
        `Reusing existing season "${existing.title}" (${existing._id}) status=${existing.status}`,
      );
    }
  }

  if (!seasonId) {
    const [minEv, maxEv, runningCount] = await Promise.all([
      Event.findOne().sort({ startTime: 1 }).select("startTime"),
      Event.findOne().sort({ endTime: -1 }).select("endTime"),
      Event.countDocuments({ status: "running" }),
    ]);

    const startDate = new Date(
      process.env.SEASON_START_DATE ?? (minEv?.startTime ?? Date.now()),
    );
    const endDate = new Date(
      process.env.SEASON_END_DATE ??
        (maxEv?.endTime ?? startDate.getTime() + 30 * 24 * 60 * 60 * 1000),
    );
    const knockoutStartDate = new Date(
      process.env.SEASON_KNOCKOUT_DATE ??
        startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2,
    );

    const defaultStatus = runningCount > 0 ? "active" : "upcoming";
    const status = process.env.SEASON_STATUS ?? defaultStatus;
    if (!["upcoming", "active", "knockout", "ended"].includes(status)) {
      throw new Error(`Invalid SEASON_STATUS "${status}".`);
    }

    const creator =
      (await User.findOne({ role: { $in: ["superAdmin", "admin"] } }).select(
        "_id",
      )) ?? (await User.findOne().select("_id"));
    if (!creator) {
      throw new Error(
        "No user exists to set as Season.createdBy — cannot create a Season.",
      );
    }

    if (DRY_RUN) {
      seasonId = new mongoose.Types.ObjectId();
      warn(
        `[dry-run] would create "${process.env.SEASON_TITLE ?? "Season-1"}" status=${status} (startDate=${startDate.toISOString()}, knockoutStartDate=${knockoutStartDate.toISOString()}, endDate=${endDate.toISOString()})`,
      );
    } else {
      const season = await Season.create({
        title: process.env.SEASON_TITLE ?? "Season-1",
        createdBy: creator._id,
        startDate,
        knockoutStartDate,
        endDate,
        status,
      });
      seasonId = season._id;
      ok(`Created season "${season.title}" (${seasonId}) status=${status}`);
      info(
        `  startDate=${startDate.toISOString()}  knockoutStartDate=${knockoutStartDate.toISOString()}  endDate=${endDate.toISOString()}`,
      );
    }
  }

  // ── 2. Backfill Events ───────────────────────────────────
  info("\n── 2. Backfilling Events ──");
  const evRes = DRY_RUN
    ? { matchedCount: eventsMissing, modifiedCount: eventsMissing }
    : await Event.updateMany(MISSING_FILTER, { $set: { seasonId } });
  ok(`events: matched=${evRes.matchedCount} modified=${evRes.modifiedCount}`);
  const evOrphans = eventsMissing - evRes.matchedCount;
  if (evOrphans > 0) warn(`  ⚠ ${evOrphans} events could not be matched.`);

  // ── 3. eventId → seasonId map (source of truth for Sessions/Leaderboards) ──
  const eventDocs = await Event.find().select("_id seasonId").lean();
  const eventSeasonMap = new Map<string, string>(
    eventDocs
      .filter((e) => e.seasonId != null)
      .map((e) => [String(e._id), String(e.seasonId)]),
  );

  // ── 3. Backfill Sessions (seasonId derived from their event) ──
  info("\n── 3. Backfilling Sessions ──");
  const sessions = await Session.find(MISSING_FILTER).select("_id eventId").lean();
  info(`sessions missing seasonId: ${sessions.length}`);
  if (sessions.length > 0) {
    if (DRY_RUN) {
      warn(`[dry-run] would backfill ${sessions.length} sessions`);
    } else {
      const res = await Session.bulkWrite(
        sessions.map((s) => ({
          updateOne: {
            filter: { _id: s._id },
            update: {
              $set: {
                seasonId:
                  eventSeasonMap.get(String(s.eventId)) ?? String(seasonId),
              },
            },
          },
        })),
        { ordered: true },
      );
      ok(`sessions: modified=${res.modifiedCount}`);
    }
  }

  // ── 4. Backfill Leaderboards (seasonId derived from their event) ──
  info("\n── 4. Backfilling Leaderboards ──");
  const leaderboardDocs = await Leaderboard.find(MISSING_FILTER)
    .select("_id eventId")
    .lean();
  info(`leaderboards missing seasonId: ${leaderboardDocs.length}`);
  if (leaderboardDocs.length > 0) {
    if (DRY_RUN) {
      warn(`[dry-run] would backfill ${leaderboardDocs.length} leaderboards`);
    } else {
      const res = await Leaderboard.bulkWrite(
        leaderboardDocs.map((d) => ({
          updateOne: {
            filter: { _id: d._id },
            update: {
              $set: {
                seasonId:
                  eventSeasonMap.get(String(d.eventId)) ?? String(seasonId),
              },
            },
          },
        })),
        { ordered: true },
      );
      ok(`leaderboards: modified=${res.modifiedCount}`);
    }
  }

  // ── 5. Indexes: drop old, ensure new ─────────────────────
  info("\n── 5. Leaderboard indexes ──");
  const lb = mongoose.connection.db!.collection("leaderboards");
  const indexInfo = await lb.indexes();
  const names = indexInfo.map((ix: any) => ix.name);
  const hasOld = names.includes("teamId_1_eventId_1");
  const hasNew = names.includes("teamId_1_eventId_1_seasonId_1");

  if (DRY_RUN) {
    if (hasNew) info("index teamId_1_eventId_1_seasonId_1 already present.");
    else warn("would create index teamId_1_eventId_1_seasonId_1");
    if (hasOld) warn("would drop old index teamId_1_eventId_1");
    else info("old index teamId_1_eventId_1 already absent.");
  } else {
    if (!hasNew) {
      await lb.createIndex(
        { teamId: 1, eventId: 1, seasonId: 1 },
        { unique: true, name: "teamId_1_eventId_1_seasonId_1" },
      );
      ok("created index teamId_1_eventId_1_seasonId_1");
    } else {
      info("index teamId_1_eventId_1_seasonId_1 already present.");
    }

    if (hasOld) {
      try {
        await lb.dropIndex("teamId_1_eventId_1");
        ok("dropped old index teamId_1_eventId_1");
      } catch (e: any) {
        warn(`could not drop old index: ${e.message}`);
      }
    } else {
      info("old index teamId_1_eventId_1 already absent.");
    }
  }

  // ── 7. Post-check ────────────────────────────────────────
  title("\n── After ──");
  info(`events missing seasonId: ${await missingCount("events")}`);
  info(`sessions missing seasonId: ${await missingCount("sessions")}`);
  info(`leaderboards missing seasonId: ${await missingCount("leaderboards")}`);
  const finalIdx = (await lb.indexes())
    .map((ix: any) => ix.name)
    .join(", ");
  info(`leaderboard indexes: ${finalIdx}`);

  await mongoose.disconnect();
  ok(DRY_RUN ? "\nDry run complete — no writes performed." : "\nMigration complete.");
}

main().catch((e) => {
  console.error("Migration failed:", e);
  process.exit(1);
});
