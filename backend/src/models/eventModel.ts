import mongoose from "mongoose";

interface IEvent extends Document {
  title: string;
  createdBy: mongoose.Types.ObjectId;
  startTime: Date;
  endTime: Date;
  status: "scheduled" | "running" | "finished";
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    createdBy: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    startTime: { type: Date, required: true },

    endTime: { type: Date, required: true },

    status: {
      type: String,
      enum: ["scheduled", "running", "finished"],
      default: "scheduled",
    },

    maxAttempts: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

eventSchema.index({ status: 1 });
eventSchema.index({ startTime: 1, endTime: 1 });

const Event = mongoose.model<IEvent>("Event", eventSchema);

export default Event;
