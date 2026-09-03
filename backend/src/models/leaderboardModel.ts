import mongoose from "mongoose";

export interface ILeaderboard extends Document {
  eventId: mongoose.Types.ObjectId;
  seasonId: mongoose.Types.ObjectId;
  seasonPoints: number;
  teamId: mongoose.Types.ObjectId;
  totalPoints: number;
  sessionsPlayed: number;
  lastPlayedSession: Date;
}

const leaderboardSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.ObjectId, ref: "Event", required: true },

    seasonId: { type: mongoose.Schema.ObjectId, ref: "Season", required: true },
    seasonPoints: { type: Number, default: 0 },

    teamId: { type: mongoose.Schema.ObjectId, ref: "Team", required: true },

    totalPoints: { type: Number, default: 0 },

    sessionsPlayed: { type: Number, default: 0 },

    lastPlayedSession: Date,
  },
  { timestamps: true },
);

leaderboardSchema.index({ totalPoints: -1 });
leaderboardSchema.index(
  { teamId: 1, eventId: 1, seasonId: 1 },
  { unique: true },
);
leaderboardSchema.index({ seasonId: 1, seasonPoints: -1 });
leaderboardSchema.index({ teamId: 1, seasonId: 1 });

const Leaderboard = mongoose.model<ILeaderboard>(
  "Leaderboard",
  leaderboardSchema,
);

export default Leaderboard;
