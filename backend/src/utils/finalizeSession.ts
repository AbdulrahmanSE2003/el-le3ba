import mongoose from "mongoose";
import Leaderboard from "../models/leaderboardModel";
import Team from "../models/teamModel";
import TeamMembership from "../models/teamMembershipModel";
import User from "../models/userModel";

export async function finalizeSession(session: any, endReason: string) {
  const dbSession = await mongoose.startSession();
  dbSession.startTransaction();

  try {
    session.status = "completed";
    session.endReason = endReason;
    session.completedAt = new Date();
    session.finalScore = session.answerLogs.reduce(
      (total: number, log: any) => total + log.score,
      0,
    );

    await session.save({ session: dbSession });

    await Leaderboard.findOneAndUpdate(
      { teamId: session.teamId, eventId: session.eventId },
      {
        $inc: { totalPoints: session.finalScore, sessionsPlayed: 1 },
        $set: { lastPlayedSession: new Date() },
      },
      { upsert: true, new: true, session: dbSession },
    );

    await Team.findByIdAndUpdate(
      session.teamId,
      { $inc: { points: session.finalScore, totalGames: 1 } },
      { session: dbSession },
    );

    const members = await TeamMembership.find({ teamId: session.teamId });
    const memberIds = members.map((m) => m.userId);

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $inc: { gamesPlayed: 1, totalScore: session.finalScore } },
      { session: dbSession },
    );

    await dbSession.commitTransaction();
  } catch (error) {
    await dbSession.abortTransaction();
    throw error;
  } finally {
    dbSession.endSession();
  }
}
