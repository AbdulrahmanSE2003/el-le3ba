// models/seasonModel.ts
import mongoose from "mongoose";

export interface ISeason extends Document {
  title: string;
  createdBy: mongoose.Types.ObjectId;
  startDate: Date;
  knockoutStartDate: Date;
  endDate: Date;
  status: "upcoming" | "active" | "knockout" | "ended";
}

const seasonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    startDate: { type: Date, required: true },

    knockoutStartDate: { type: Date, required: true },

    endDate: { type: Date, required: true },

    status: {
      type: String,
      enum: ["upcoming", "active", "knockout", "ended"],
      default: "upcoming",
    },
  },
  { timestamps: true },
);

seasonSchema.index({ status: 1 });

seasonSchema.index(
  { status: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["active", "knockout"] } },
    name: "status_1_active_knockout_unique",
  },
);

const Season = mongoose.model<ISeason>("Season", seasonSchema);

export default Season;
