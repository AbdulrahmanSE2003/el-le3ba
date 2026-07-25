import mongoose from "mongoose";

export interface ILeaderboard extends Document {
  eventId: mongoose.Types.ObjectId;
  teamId: mongoose.Types.ObjectId;
  totalPoints: number;
  sessionsPlayed: number;
  lastPlayedSession: Date;
}

const leaderboardSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.ObjectId, ref: "Event", required: true },

    teamId: { type: mongoose.Schema.ObjectId, ref: "Team", required: true },

    totalPoints: { type: Number, default: 0 },

    sessionsPlayed: { type: Number, default: 0 },

    lastPlayedSession: Date,
  },
  { timestamps: true },
);

leaderboardSchema.index({ totalPoints: -1 });
leaderboardSchema.index({ teamId: 1, eventId: 1 }, { unique: true });

const Leaderboard = mongoose.model<ILeaderboard>(
  "Leaderboard",
  leaderboardSchema,
);

export default Leaderboard;
