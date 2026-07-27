import Leaderboard from "../models/leaderboardModel";
import Team from "../models/teamModel";
import TeamMembership from "../models/teamMembershipModel";
import User from "../models/userModel";
import { timed } from "./timing";
import type { TimingAccumulator } from "./timing";

/**
 * Finalize a completed/expired session.
 *
 * Critical path: session.save() — must complete before responding.
 *
 * Non-critical side effects (leaderboard, team points, user stats) are
 * fire-and-forget and run concurrently. A transaction is intentionally
 * omitted: the individual operations are simple $inc/$set upserts that
 * are safe to retry, and the 1.5s latency a transaction adds (measured)
 * is unacceptable for a real-time quiz game.
 */
export async function finalizeSession(
  session: any,
  endReason: string,
  timing?: TimingAccumulator,
) {
  const t = <T>(label: string, fn: () => Promise<T>) =>
    timing ? timed(label, fn, timing) : fn();

  session.status = "completed";
  session.endReason = endReason;
  session.completedAt = new Date();
  session.finalScore = session.answerLogs.reduce(
    (total: number, log: any) => total + log.score,
    0,
  );

  // ── Critical: persist final session state before responding ──
  await t("sessionSave", () => session.save());

  // ── Non-critical side effects (fire-and-forget, run concurrently) ──
  (async () => {
    try {
      const members = await t("findMembers", () =>
        TeamMembership.find({ teamId: session.teamId }),
      );
      const memberIds = members.map((m) => m.userId);

      await Promise.all([
        t("leaderboardUpdate", () =>
          Leaderboard.findOneAndUpdate(
            { teamId: session.teamId, eventId: session.eventId },
            {
              $inc: { totalPoints: session.finalScore, sessionsPlayed: 1 },
              $set: { lastPlayedSession: new Date() },
            },
            { upsert: true, returnDocument: "after" },
          ),
        ),
        t("teamPointsUpdate", () =>
          Team.findByIdAndUpdate(session.teamId, {
            $inc: { points: session.finalScore, totalGames: 1 },
          }),
        ),
        t("userStatsUpdate", () =>
          User.updateMany(
            { _id: { $in: memberIds } },
            { $inc: { gamesPlayed: 1, totalScore: session.finalScore } },
          ),
        ),
      ]);
    } catch (err) {
      console.error("finalizeSession side-effect error:", err);
    }
  })();
}
