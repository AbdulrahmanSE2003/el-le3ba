import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface INotification extends Document {
  title: string;
  message: string;
  userId: Types.ObjectId;
  isRead: boolean;
  isBroadcast: boolean;
}

const notificationSchema = new Schema<INotification>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    isRead: { type: Boolean, default: false },
    isBroadcast: { type: Boolean, default: false },
  },
  { timestamps: true },
);

notificationSchema.index({ userId: 1, createdAt: -1 });

const Notification = mongoose.model<INotification>(
  "Notification",
  notificationSchema,
);

export default Notification;
