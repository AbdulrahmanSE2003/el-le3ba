import mongoose from "mongoose";
import Session from "../models/sessionModel";
import Leaderboard from "../models/leaderboardModel";
import Team from "../models/teamModel";
import TeamMembership from "../models/teamMembershipModel";
import User from "../models/userModel";

export const startSessionExpirationJob = () => {
  setInterval(async () => {
    try {
      const expiredSessions = await Session.find({
        status: "running",
        expiresAt: { $lte: new Date() },
      });

      for (const session of expiredSessions) {
        const dbSession = await mongoose.startSession();
        dbSession.startTransaction();

        try {
          session.status = "completed";
          session.endReason = "expired";
          session.completedAt = new Date();

          session.finalScore = session.answerLogs.reduce(
            (sum, log) => sum + log.score,
            0,
          );

          await session.save({ session: dbSession });

          await Leaderboard.findOneAndUpdate(
            {
              teamId: session.teamId,
              eventId: session.eventId,
            },
            {
              $inc: {
                totalPoints: session.finalScore,
                sessionsPlayed: 1,
              },
              $set: {
                lastPlayedSession: new Date(),
              },
            },
            {
              upsert: true,
              new: true,
              session: dbSession,
            },
          );

          await Team.findByIdAndUpdate(
            session.teamId,
            {
              $inc: {
                points: session.finalScore,
                totalGames: 1,
              },
            },
            { session: dbSession },
          );

          const members = await TeamMembership.find({
            teamId: session.teamId,
          });

          const memberIds = members.map((m) => m.userId);

          await User.updateMany(
            {
              _id: { $in: memberIds },
            },
            {
              $inc: {
                gamesPlayed: 1,
                totalScore: session.finalScore,
              },
            },
            { session: dbSession },
          );

          await dbSession.commitTransaction();

          console.log(`✅ Session ${session._id} expired.`);
        } catch (err) {
          await dbSession.abortTransaction();
          console.error(err);
        } finally {
          dbSession.endSession();
        }
      }
    } catch (err) {
      console.error("Session expiration job failed:", err);
    }
  }, 60 * 1000); //every 1 minute
};
