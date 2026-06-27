import mongoose from "mongoose";

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

const Team = mongoose.model("Team", teamSchema);

export default Team;
