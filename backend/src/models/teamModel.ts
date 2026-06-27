import mongoose from "mongoose";

export interface ITeam extends Document {
  name: string;
  code: string;
  teamLeader: mongoose.Types.ObjectId;
  totalGames: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: [20, "Team name can't be more than 20 characters"],
    },

    code: {
      type: String,
      unique: true,
      required: true,
      maxlength: 6,
      minlength: 6,
    },

    teamLeader: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },

    totalGames: {
      type: Number,
      default: 0,
    },

    points: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

teamSchema.index({ points: -1 });

const Team = mongoose.model<ITeam>("Team", teamSchema);

export default Team;
