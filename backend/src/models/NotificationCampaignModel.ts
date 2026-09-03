import mongoose, { Schema, Types } from "mongoose";

export interface INotificationCampaign extends Document {
  title: string;
  message: string;

  type: "broadcast" | "selected";

  recipientsCount: number;

  createdBy: Types.ObjectId;
}

const campaignSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["broadcast", "selected"],
      required: true,
    },

    recipientsCount: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const NotificationCampaign = mongoose.model<INotificationCampaign>(
  "NotificationCampaign",
  campaignSchema,
);

export default NotificationCampaign;
