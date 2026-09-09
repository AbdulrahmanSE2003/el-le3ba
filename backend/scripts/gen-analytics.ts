/**
 * gen-analytics.ts — Development-only generator of historical runtime data
 * for the El-Le3ba analytics/integration suite.
 *
 * Generates realistic past game Sessions (varied outcome mix, realistic
 * timestamps inside the season's event windows, exact in-game scoring)
 * and mirrors the runtime side effects of finalizeSession so the DB stays
 * internally consistent:
 *   - Leaderboard upsert → totalPoints / seasonPoints / sessionsPlayed
 *   - Team  → points / totalGames / bestStreak
 *   - Member users → totalScore / gamesPlayed
 *
 * Abandoned sessions intentionally produce NO side effects and score 0,
 * exactly like abandonSession() does at runtime.
 *
 * Safety:
 *   - Refuses to run when NODE_ENV === "production".
 *   - Refuses to run while a real "running" session exists (live game).
 *   - Never creates status "running" / "scored" or endReason "flagged".
 *   - Snapshot + --reset removes every generated session and restores the
 *     pre-generation Leaderboard / Team / User values, leaving any manual
 *     runtime data untouched.
 *
 * Run from the backend directory:
 *   npx tsx scripts/gen-analytics.ts
 *   # undo the generation (keeps manual data):
 *   npx tsx scripts/gen-analytics.ts --reset
 */

import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "node:path";
import { existsSync, readFileSync, writeFileSync, unlinkSync } from "node:fs";
import {
  BASE_SCORE,
  QUESTIONS_PER_SESSION,
  SESSION_DURATION_MS,
  STREAK_BONUS,
  STREAK_MILESTONE,
} from "../src/constants";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const SNAPSHOT_PATH = path.resolve(
  process.cwd(),
  "scripts/gen-analytics.snapshot.json",
);

const DAY_MS = 24 * 60 * 60 * 1000;

// Questionably-skillful teams — Alpha is intentionally dominant so it tops
// both the current-event leaderboard and the season leaderboard.
const SKILLS: Record<string, number> = {
  Alpha: 0.94,
  Bravo: 0.62,
  Charlie: 0.55,
  Delta: 0.7,
  Echo: 0.5,
  Foxtrot: 0.66,
  Golf: 0.58,
  Hotel: 0.68,
  India: 0.6,
  Juliet: 0.71,
  Kilo: 0.54,
  Lima: 0.6,
  Mike: 0.57,
  November: 0.65,
  Oscar: 0.69,
};

type Outcome = "completed" | "expired" | "abandoned";

type Plan = { team: any; event: any; outcome: Outcome };

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function saveSnapshot(data: Record<string, unknown>) {
  writeFileSync(SNAPSHOT_PATH, JSON.stringify(data, null, 2));
}

function pickQuestions(
  pool: mongoose.Types.ObjectId[],
  rng: () => number,
): mongoose.Types.ObjectId[] {
  const out: mongoose.Types.ObjectId[] = [];
  for (let i = 0; i < QUESTIONS_PER_SESSION; i++) {
    const idx = Math.floor(rng() * pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
}

function wrongAnswer(q: any, rng: () => number): string {
  const opts = Array.isArray(q.options)
    ? q.options.filter((o: string) => o !== q.correctAnswer)
    : [];
  if (opts.length > 0) return opts[Math.floor(rng() * opts.length)];
  const num = Number.parseFloat(q.correctAnswer);
  if (Number.isFinite(num)) return String(Math.max(0, num + (rng() < 0.5 ? -1 : 1)));
  return q.correctAnswer === "a" ? "b" : "a";
}

function randomStartTs(
  event: any,
  rng: () => number,
  nowTs: number,
): number {
  const winStart = new Date(event.startTime).getTime();
  const winEnd = Math.min(
    new Date(event.endTime).getTime(),
    nowTs - SESSION_DURATION_MS,
  );
  const room = winEnd - winStart - SESSION_DURATION_MS;
  if (room <= 0) {
    throw new Error(
      `Event ${event.title} window is too small to host a session.`,
    );
  }
  return winStart + Math.floor(rng() * room);
}

function buildSessionDoc(
  plan: Plan,
  rng: () => number,
  nowTs: number,
  questionPool: mongoose.Types.ObjectId[],
  qById: Map<string, any>,
  memberIds: mongoose.Types.ObjectId[],
): any {
  const startedAt = randomStartTs(plan.event, rng, nowTs);
  const expiresAt = new Date(startedAt + SESSION_DURATION_MS);

  const sessionQuestions = pickQuestions([...questionPool], rng);
  const nAnswers =
    plan.outcome === "completed"
      ? QUESTIONS_PER_SESSION
      : plan.outcome === "expired"
        ? 1 + Math.floor(rng() * 4)
        : 0;

  let currentStreak = 0;
  let bestStreak = 0;
  let correctAnswers = 0;
  const logs: any[] = [];

  for (let i = 0; i < nAnswers; i++) {
    const qid = sessionQuestions[i];
    const q = qById.get(String(qid));
    const submittedBy =
      memberIds[Math.floor(rng() * memberIds.length)];
    const isCorrect = rng() < (SKILLS[plan.team.teamName] ?? 0.6);
    const timeTaken = Math.floor(rng() * (q.duration + 1));

    let newStreak = 0;
    let score = 0;
    if (isCorrect) {
      newStreak = currentStreak + 1;
      const safeTaken = Math.max(0, Math.min(timeTaken, q.duration));
      const remainingTime = q.duration - safeTaken;
      const streakBonus =
        newStreak % STREAK_MILESTONE === 0 ? STREAK_BONUS : 0;
      score = BASE_SCORE + remainingTime + streakBonus;
    }

    const answeredAt = new Date(
      startedAt + Math.floor(((i + 1) / (nAnswers + 1)) * SESSION_DURATION_MS),
    );

    logs.push({
      questionId: qid,
      submittedBy,
      answer: isCorrect ? q.correctAnswer : wrongAnswer(q, rng),
      isCorrect,
      score,
      answeredAt,
      timeTaken,
    });

    currentStreak = newStreak;
    bestStreak = Math.max(bestStreak, newStreak);
    if (isCorrect) correctAnswers += 1;
  }

  const finalScore =
    plan.outcome === "abandoned"
      ? 0
      : logs.reduce((total: number, log: any) => total + log.score, 0);

  const completedAt =
    plan.outcome === "completed"
      ? logs[logs.length - 1].answeredAt
      : plan.outcome === "expired"
        ? expiresAt
        : new Date(
            startedAt +
              Math.floor(rng() * Math.min(60000, SESSION_DURATION_MS)),
          );

  return {
    teamId: new mongoose.Types.ObjectId(plan.team._id),
    eventId: new mongoose.Types.ObjectId(plan.event._id),
    seasonId: new mongoose.Types.ObjectId(plan.event.seasonId),
    questions: sessionQuestions,
    status: "completed",
    startedAt: new Date(startedAt),
    expiresAt,
    completedAt,
    endReason: plan.outcome as "completed" | "expired" | "abandoned",
    finalScore,
    correctAnswers,
    currentStreak,
    bestStreak,
    answerLogs: logs,
  };
}

async function reset() {
  if (!existsSync(SNAPSHOT_PATH)) {
    console.error(
      "\n⛔  No snapshot found. Nothing to reset (run the generator first).\n",
    );
    process.exit(1);
  }

  const snap = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8"));

  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log(
    `   Connected to database: ${mongoose.connection.db!.databaseName}`,
  );

  const { default: Session } = await import("../src/models/sessionModel");
  const { default: Team } = await import("../src/models/teamModel");
  const { default: User } = await import("../src/models/userModel");
  const { default: Leaderboard } = await import(
    "../src/models/leaderboardModel",
  );

  const sessionIds = (snap.sessionIds as string[]).map(
    (id) => new mongoose.Types.ObjectId(id),
  );

  if (sessionIds.length > 0) {
    const res = await Session.deleteMany({ _id: { $in: sessionIds } });
    console.log(`   Deleted ${res.deletedCount} generated session(s).`);
  }

  for (const [id, v] of Object.entries<{
    points: number;
    totalGames: number;
    bestStreak: number;
  }>(snap.teams ?? {})) {
    await Team.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: v },
    );
  }
  console.log(
    `   Restored ${Object.keys(snap.teams ?? {}).length} team aggregate(s).`,
  );

  for (const [id, v] of Object.entries<{
    totalScore: number;
    gamesPlayed: number;
  }>(snap.users ?? {})) {
    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { $set: v },
    );
  }
  console.log(
    `   Restored ${Object.keys(snap.users ?? {}).length} user aggregate(s).`,
  );

  const keys = (snap.leaderboardKeys as string[]) ?? [];
  for (const key of keys) {
    const [teamId, eventId, seasonId] = key.split(":");
    const filter = {
      teamId: new mongoose.Types.ObjectId(teamId),
      eventId: new mongoose.Types.ObjectId(eventId),
      seasonId: new mongoose.Types.ObjectId(seasonId),
    };
    const row = (snap.leaderboards ?? {})[key];
    if (row) {
      await Leaderboard.findOneAndUpdate(filter, { $set: row });
    } else {
      await Leaderboard.deleteOne(filter);
    }
  }
  console.log(`   Processed ${keys.length} leaderboard row(s).`);

  unlinkSync(SNAPSHOT_PATH);
  console.log(`   Removed snapshot file.`);

  await mongoose.disconnect();
  console.log("   Done. Disconnected from MongoDB.\n");
  process.exit(0);
}

async function main() {
  // ── Production safety ───────────────────────────────────────
  if (process.env.NODE_ENV === "production") {
    console.error(
      "\n⛔  Refusing to run the generator in production. " +
        "Set NODE_ENV=development to override.\n",
    );
    process.exit(1);
  }

  if (!process.env.MONGODB_URI) {
    console.error(
      "\n⛔  MONGODB_URI is not set. Cannot connect to the database.\n",
    );
    process.exit(1);
  }

  const args = process.argv.slice(2);
  if (args.includes("--reset")) {
    await reset();
    return;
  }

  if (existsSync(SNAPSHOT_PATH) && !args.includes("--force")) {
    console.error(
      "\n⛔  Snapshot already exists — the generator has already run here.\n" +
        "   • Remove the generated data:        npx tsx scripts/gen-analytics.ts --reset\n" +
        "   • Re-run (append only, safe limits): npx tsx scripts/gen-analytics.ts --force\n",
    );
    process.exit(1);
  }

  console.log("\n🎮  El-Le3ba — Analytics Data Generator\n");

  // ── Connect ─────────────────────────────────────────────────
  await mongoose.connect(process.env.MONGODB_URI);
  const dbName = mongoose.connection.db!.databaseName;
  console.log(`   Connected to database: ${dbName}\n`);

  // ── Import models after connection ──────────────────────────
  const { default: Team } = await import("../src/models/teamModel");
  const { default: TeamMembership } = await import(
    "../src/models/teamMembershipModel",
  );
  const { default: Event } = await import("../src/models/eventModel");
  const { default: Question } = await import("../src/models/questionModel");
  const { default: Session } = await import("../src/models/sessionModel");
  const { default: User } = await import("../src/models/userModel");
  const { default: Leaderboard } = await import(
    "../src/models/leaderboardModel",
  );

  // Refuse while a real game is being played.
  const liveSession = await Session.exists({ status: "running" });
  if (liveSession) {
    console.error(
      "\n⛔  A session is currently marked as running — a live game may be in " +
        "progress. Wait for it to finish before generating data.\n",
    );
    await mongoose.disconnect();
    process.exit(1);
  }

  const nowTs = Date.now();

  const events = await Event.find({
    status: { $in: ["finished", "running"] },
  }).sort({ startTime: 1 });
  const finishedEvent = events.find((e) => e.status === "finished");
  const runningEvent = events.find((e) => e.status === "running");
  if (!finishedEvent || !runningEvent) {
    console.error(
      "\n⛔  Expected one finished event and one running event. Aborting.\n",
    );
    await mongoose.disconnect();
    process.exit(1);
  }

  const seasonId = runningEvent.seasonId;

  const teams = await Team.find({}).sort({ teamName: 1 });
  const memberships = await TeamMembership.find({}).lean();
  const questions = await Question.find({}).lean();

  const qById = new Map<string, any>();
  const questionPool: mongoose.Types.ObjectId[] = [];
  for (const q of questions) {
    qById.set(String(q._id), q);
    questionPool.push(new mongoose.Types.ObjectId(String(q._id)));
  }

  const membersByTeam = new Map<string, mongoose.Types.ObjectId[]>();
  for (const m of memberships) {
    const key = String(m.teamId);
    const list = membersByTeam.get(key) ?? [];
    list.push(new mongoose.Types.ObjectId(String(m.userId)));
    membersByTeam.set(key, list);
  }

  // Existing session counts per (team, event) — enforced maxAttempts.
  const pastCounts = await Session.aggregate([
    {
      $group: {
        _id: { teamId: "$teamId", eventId: "$eventId" },
        count: { $sum: 1 },
      },
    },
  ]);
  const countKey = (teamId: string, eventId: unknown) =>
    `${String(teamId)}:${String(eventId)}`;
  const existing = new Map<string, number>();
  for (const row of pastCounts) {
    existing.set(countKey(row._id.teamId, row._id.eventId), row.count);
  }

  // ── Build the generation plan ───────────────────────────────
  const rng = mulberry32(20260908);

  const plans: Plan[] = [];
  for (const team of teams) {
    for (let i = 0; i < finishedEvent.maxAttempts; i++) {
      plans.push({ team, event: finishedEvent, outcome: "completed" });
    }
    const used = existing.get(countKey(String(team._id), runningEvent._id)) ?? 0;
    const budget = Math.max(0, runningEvent.maxAttempts - used);
    const nRunning = Math.min(2, budget);
    for (let i = 0; i < nRunning; i++) {
      const roll = rng();
      const outcome: Outcome =
        roll < 0.72 ? "completed" : roll < 0.86 ? "expired" : "abandoned";
      plans.push({
        team,
        event: runningEvent,
        // Alpha is kept fully completion-driven to dominate both rankings.
        outcome: team.teamName === "Alpha" ? "completed" : outcome,
      });
    }
  }

  // ── Snapshot pre-generation state (for --reset) ─────────────
  const beforeSessions = await Session.countDocuments();
  const beforeLeaderboards = await Leaderboard.countDocuments();

  const teamsLean = await Team.find({}).lean();
  const usersLean = await User.find({}, "totalScore gamesPlayed").lean();
  const leaderboardsLean = await Leaderboard.find({}).lean();

  const teamsBefore: Record<string, unknown> = {};
  for (const t of teamsLean) {
    teamsBefore[String(t._id)] = {
      points: t.points,
      totalGames: t.totalGames,
      bestStreak: t.bestStreak,
    };
  }
  const usersBefore: Record<string, unknown> = {};
  for (const u of usersLean) {
    usersBefore[String(u._id)] = {
      totalScore: u.totalScore,
      gamesPlayed: u.gamesPlayed,
    };
  }
  const leaderboardsBefore: Record<string, unknown> = {};
  for (const lb of leaderboardsLean) {
    leaderboardsBefore[
      countKey(lb.teamId, lb.eventId) + ":" + String(lb.seasonId)
    ] = {
      totalPoints: lb.totalPoints,
      seasonPoints: lb.seasonPoints,
      sessionsPlayed: lb.sessionsPlayed,
      lastPlayedSession: lb.lastPlayedSession
        ? new Date(lb.lastPlayedSession).toISOString()
        : null,
    };
  }

  const leaderboardKeys: string[] = [];
  for (const team of teams) {
    for (const event of [finishedEvent, runningEvent]) {
      const key = countKey(String(team._id), event._id) + ":" + String(seasonId);
      if (!leaderboardKeys.includes(key)) leaderboardKeys.push(key);
    }
  }

  saveSnapshot({
    createdAt: new Date().toISOString(),
    generated: false,
    eventIdFinished: String(finishedEvent._id),
    eventIdRunning: String(runningEvent._id),
    seasonId: String(seasonId),
    sessionIds: [],
    leaderboardKeys,
    teams: teamsBefore,
    users: usersBefore,
    leaderboards: leaderboardsBefore,
  });

  // ── Generate and insert ─────────────────────────────────────
  const docs = plans.map((plan) =>
    buildSessionDoc(
      plan,
      rng,
      nowTs,
      questionPool,
      qById,
      membersByTeam.get(String(plan.team._id)) ?? [],
    ),
  );

  const inserted = await Session.insertMany(docs);
  const sessionIds = inserted.map((s) => String(s._id));
  console.log(`   Inserted ${sessionIds.length} historical session(s).`);

  const finalized = inserted.filter(
    (s) => s.endReason === "completed" || s.endReason === "expired",
  );
  finalized.sort((a, b) => a.completedAt.getTime() - b.completedAt.getTime());

  const gamePointsApplied: Record<string, number> = {};
  const gamesApplied: Record<string, number> = {};
  const bestStreakApplied: Record<string, number> = {};

  // ── Mirror finalizeSession side effects ─────────────────────
  for (const s of finalized) {
    const memberIds = membersByTeam.get(String(s.teamId)) ?? [];
    const finalScore = s.finalScore ?? 0;

    await Leaderboard.findOneAndUpdate(
      {
        teamId: s.teamId,
        eventId: s.eventId,
        seasonId: s.seasonId,
      },
      {
        $inc: {
          totalPoints: finalScore,
          sessionsPlayed: 1,
          seasonPoints: finalScore,
        },
        // $max (not $set) — backfilled sessions may predate later live sessions,
        // so the leaderboard must keep the most recent completion time.
        $max: { lastPlayedSession: s.completedAt },
      },
      { upsert: true, returnDocument: "after" },
    );

    await Team.findByIdAndUpdate(s.teamId, {
      $inc: { points: finalScore, totalGames: 1 },
      $max: { bestStreak: s.bestStreak ?? 0 },
    });

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $inc: { gamesPlayed: 1, totalScore: finalScore } },
    );

    gamePointsApplied[String(s.teamId)] =
      (gamePointsApplied[String(s.teamId)] ?? 0) + finalScore;
    gamesApplied[String(s.teamId)] =
      (gamesApplied[String(s.teamId)] ?? 0) + 1;
    bestStreakApplied[String(s.teamId)] = Math.max(
      bestStreakApplied[String(s.teamId)] ?? 0,
      s.bestStreak ?? 0,
    );
  }

  console.log(
    `   Applied leaderboard/team/user side effects to ${finalized.length} finalized session(s).`,
  );

  // ── Record generated ids in the snapshot ────────────────────
  saveSnapshot({
    ...JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8")),
    generated: true,
    sessionIds,
  });

  // ── Verification ────────────────────────────────────────────
  const errors: string[] = [];

  const fresh = await Session.find({
    _id: { $in: sessionIds.map((id) => new mongoose.Types.ObjectId(id)) },
  }).lean();

  const attempts = new Map<string, number>();

  for (const s of fresh) {
    if (s.status !== "completed") errors.push(`[${s._id}] status must be "completed"`);
    if (s.endReason === "flagged" || s.endReason === undefined)
      errors.push(`[${s._id}] unexpected endReason ${String(s.endReason)}`);

    const span = new Date(s.expiresAt).getTime() - new Date(s.startedAt).getTime();
    if (span !== SESSION_DURATION_MS)
      errors.push(`[${s._id}] expiresAt−startedAt ≠ SESSION_DURATION_MS`);

    if (new Set(s.questions.map(String)).size !== s.questions.length)
      errors.push(`[${s._id}] duplicate question in session`);

    const attemptKey = countKey(s.teamId, s.eventId);
    attempts.set(attemptKey, (attempts.get(attemptKey) ?? 0) + 1);

    if (s.endReason === "abandoned") {
      if (s.finalScore !== 0)
        errors.push(`[${s._id}] abandoned session must have finalScore 0`);
      if (s.answerLogs.length !== 0)
        errors.push(`[${s._id}] abandoned session must have no answerLogs`);
      continue;
    }

    // Replay the exact scoring rules question by question.
    let replayCorrect = 0;
    let replayStreak = 0;
    let replayBest = 0;
    let replayTotal = 0;
    let prevAnswerTs = 0;
    let questionSeen = new Set<string>();

    for (const log of s.answerLogs) {
      const q = qById.get(String(log.questionId));
      if (!q) {
        errors.push(`[${s._id}] answer references unknown question`);
        continue;
      }
      if (questionSeen.has(String(log.questionId)))
        errors.push(`[${s._id}] duplicate answered question ${String(log.questionId)}`);
      questionSeen.add(String(log.questionId));

      const ansTs = new Date(log.answeredAt).getTime();
      if (ansTs < new Date(s.startedAt).getTime() || ansTs > new Date(s.expiresAt).getTime())
        errors.push(`[${s._id}] answeredAt outside session window`);
      if (ansTs < prevAnswerTs)
        errors.push(`[${s._id}] answeredAt not monotonic`);
      prevAnswerTs = ansTs;

      const memberIds = membersByTeam.get(String(s.teamId)) ?? [];
      if (!memberIds.some((id) => String(id) === String(log.submittedBy)))
        errors.push(`[${s._id}] answer submitted by non-member`);

      let expectedScore = 0;
      let newStreak = 0;
      if (log.isCorrect) {
        const safeTaken = Math.max(0, Math.min(log.timeTaken, q.duration));
        const remainingTime = q.duration - safeTaken;
        const bonus =
          (replayStreak + 1) % STREAK_MILESTONE === 0 ? STREAK_BONUS : 0;
        expectedScore = BASE_SCORE + remainingTime + bonus;
        newStreak = replayStreak + 1;
        replayCorrect += 1;
      }
      if (log.score !== expectedScore)
        errors.push(`[${s._id}] score mismatch for question ${String(log.questionId)}`);
      if ((log.answer === q.correctAnswer) !== log.isCorrect)
        errors.push(`[${s._id}] isCorrect inconsistent with answer string`);
      if (log.timeTaken < 0 || log.timeTaken > q.duration)
        errors.push(`[${s._id}] timeTaken outside question duration`);
      replayStreak = newStreak;
      replayBest = Math.max(replayBest, newStreak);
      replayTotal += expectedScore;
    }

    if (s.finalScore !== replayTotal)
      errors.push(`[${s._id}] finalScore ≠ Σ answer scores`);
    if (s.correctAnswers !== replayCorrect)
      errors.push(`[${s._id}] correctAnswers mismatch`);
    if (s.currentStreak !== replayStreak)
      errors.push(`[${s._id}] currentStreak mismatch`);
    if (s.bestStreak !== replayBest)
      errors.push(`[${s._id}] bestStreak mismatch`);
  }

  // Attempt budget: no (team,event) may exceed maxAttempts.
  for (const [k, count] of attempts) {
    const [teamId, eventId] = k.split(":");
    const isRunning =
      String(runningEvent._id) === eventId ? runningEvent : undefined;
    const isFinished =
      String(finishedEvent._id) === eventId ? finishedEvent : undefined;
    const ev = isRunning ?? isFinished;
    const maxA = ev ? ev.maxAttempts : 0;
    if (count > maxA)
      errors.push(`[${k}] ${count} sessions exceeds maxAttempts ${maxA}`);
  }

  // Leaderboard consistency for every touched key.
  // Aggregated across ALL sessions (manual + generated) for that key.
  const finalizedAll = await Session.aggregate([
    {
      $match: {
        status: "completed",
        endReason: { $in: ["completed", "expired"] },
      },
    },
    {
      $group: {
        _id: {
          teamId: "$teamId",
          eventId: "$eventId",
          seasonId: "$seasonId",
        },
        total: { $sum: "$finalScore" },
        count: { $sum: 1 },
        last: { $max: "$completedAt" },
      },
    },
  ]);
  const finalizedByKey = new Map<string, { total: number; count: number; last: number }>();
  for (const row of finalizedAll) {
    const key =
      countKey(row._id.teamId, row._id.eventId) + ":" + String(row._id.seasonId);
    finalizedByKey.set(key, {
      total: row.total,
      count: row.count,
      last: new Date(row.last).getTime(),
    });
  }

  for (const key of leaderboardKeys) {
    const [teamId, eventId, scId] = key.split(":");
    const acc = finalizedByKey.get(key);
    const row = await Leaderboard.findOne({
      teamId: new mongoose.Types.ObjectId(teamId),
      eventId: new mongoose.Types.ObjectId(eventId),
      seasonId: new mongoose.Types.ObjectId(scId),
    }).lean();

    if (acc && acc.count > 0) {
      if (!row) {
        errors.push(`[${key}] missing leaderboard row`);
        continue;
      }
      if (row.totalPoints !== acc.total)
        errors.push(`[${key}] leaderboard totalPoints ${row.totalPoints} ≠ ${acc.total}`);
      if (row.seasonPoints !== acc.total)
        errors.push(`[${key}] leaderboard seasonPoints ${row.seasonPoints} ≠ ${acc.total}`);
      if (row.sessionsPlayed !== acc.count)
        errors.push(`[${key}] leaderboard sessionsPlayed ${row.sessionsPlayed} ≠ ${acc.count}`);
      // lastPlayedSession is stamped after session.completedAt at finalize time,
      // so it must be at least as late as the newest session completion.
      if (acc.last > new Date(row.lastPlayedSession).getTime())
        errors.push(`[${key}] leaderboard lastPlayedSession before latest session completion`);
    }
  }

  // Team / user aggregate consistency (baseline + generated increments).
  for (const t of teamsLean) {
    const tid = String(t._id);
    const base = (teamsBefore[tid] as any) ?? { points: 0, totalGames: 0, bestStreak: 0 };
    const expectedPoints = base.points + (gamePointsApplied[tid] ?? 0);
    const expectedGames = base.totalGames + (gamesApplied[tid] ?? 0);
    const expectedBest = Math.max(base.bestStreak, bestStreakApplied[tid] ?? 0);

    const cur = await Team.findById(t._id).lean();
    if (cur) {
      if (cur.points !== expectedPoints)
        errors.push(`[team ${t.teamName}] points ${cur.points} ≠ ${expectedPoints}`);
      if (cur.totalGames !== expectedGames)
        errors.push(`[team ${t.teamName}] totalGames ${cur.totalGames} ≠ ${expectedGames}`);
      if (cur.bestStreak !== expectedBest)
        errors.push(`[team ${t.teamName}] bestStreak ${cur.bestStreak} ≠ ${expectedBest}`);
    }
  }

  for (const u of usersLean) {
    const uid = String(u._id);
    const base = (usersBefore[uid] as any) ?? { totalScore: 0, gamesPlayed: 0 };
    let earned = 0;
    let played = 0;
    for (const s of finalized) {
      const memberIds = membersByTeam.get(String(s.teamId)) ?? [];
      if (memberIds.some((id) => String(id) === uid)) {
        earned += s.finalScore ?? 0;
        played += 1;
      }
    }
    const cur = await User.findById(u._id).lean();
    if (cur) {
      if (cur.totalScore !== base.totalScore + earned)
        errors.push(`[user ${uid}] totalScore ${cur.totalScore} ≠ ${base.totalScore + earned}`);
      if (cur.gamesPlayed !== base.gamesPlayed + played)
        errors.push(`[user ${uid}] gamesPlayed ${cur.gamesPlayed} ≠ ${base.gamesPlayed + played}`);
    }
  }

  if (errors.length > 0) {
    console.error("\n   ❌ Verification failed:\n");
    for (const e of errors.slice(0, 20)) console.error(`      • ${e}`);
    console.error(`   (${errors.length} error(s) total)\n`);
  } else {
    console.log("   ✅ All verification checks passed.\n");
  }

  // ── Summary ─────────────────────────────────────────────────
  const sessionTotal = await Session.countDocuments();
  const lbTotal = await Leaderboard.countDocuments();

  const byOutcome: Record<string, number> = {};
  const byEvent: Record<string, number> = {};
  const byDay: Record<string, number> = {};
  let scoreSum = 0;
  let scoreCount = 0;
  let scoreMin = Infinity;
  let scoreMax = -Infinity;

  for (const s of fresh) {
    byOutcome[s.endReason] = (byOutcome[s.endReason] ?? 0) + 1;
    byEvent[String(s.eventId)] = (byEvent[String(s.eventId)] ?? 0) + 1;
    const day = new Date(s.startedAt).toISOString().slice(0, 10);
    byDay[day] = (byDay[day] ?? 0) + 1;
    if (s.endReason === "completed" || s.endReason === "expired") {
      scoreSum += s.finalScore;
      scoreCount += 1;
      scoreMin = Math.min(scoreMin, s.finalScore);
      scoreMax = Math.max(scoreMax, s.finalScore);
    }
  }

  console.log("─".repeat(50));
  console.log("  Analytics Data Generation Complete");
  console.log("─".repeat(50));
  console.log("");
  console.log("  Sessions:");
  console.log(`    Before:      ${beforeSessions}`);
  console.log(`    Generated:   ${sessionIds.length}`);
  console.log(`    After:       ${sessionTotal}`);
  console.log(`    Finished ev: ${byEvent[String(finishedEvent._id)] ?? 0}`);
  console.log(`    Running ev:  ${byEvent[String(runningEvent._id)] ?? 0}`);
  console.log("");
  console.log("  Outcomes:");
  for (const o of ["completed", "expired", "abandoned"] as const) {
    console.log(`    ${o.padEnd(9)} ${byOutcome[o] ?? 0}`);
  }
  console.log("");
  console.log("  Finalized score (completed + expired):");
  console.log(
    `    avg: ${scoreCount ? Math.round(scoreSum / scoreCount) : 0}`,
  );
  console.log(
    `    min: ${scoreMin === Infinity ? 0 : scoreMin}   max: ${scoreMax === -Infinity ? 0 : scoreMax}`,
  );
  console.log("");
  console.log("  Per day (UTC):");
  for (const [day, count] of Object.entries(byDay).sort()) {
    console.log(`    ${day}  ${count}`);
  }
  console.log("");
  console.log("  Leaderboards:");
  console.log(`    Before: ${beforeLeaderboards}`);
  console.log(`    After:  ${lbTotal}`);
  console.log("");
  console.log(`  Snapshot: ${SNAPSHOT_PATH}`);
  console.log("");

  await mongoose.disconnect();
  console.log("   Done. Disconnected from MongoDB.\n");
  process.exit(0);
}

main().catch((err) => {
  console.error("\n❌  Generator failed:\n", err);
  process.exit(1);
});