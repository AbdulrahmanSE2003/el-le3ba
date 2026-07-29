import NotificationCampaign from "../models/NotificationCampaignModel";
import Notification from "../models/notificationModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const getNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.user._id,
  })
    .populate("campaignId", "title message type createdAt")
    .sort({ createdAt: -1 });

  const unreadCount = await Notification.countDocuments({
    userId: req.user._id,
    isRead: false,
  });

  resHandler(res, 200, "notifications", {
    notifications,
    unreadCount,
  });
});

export const sendNotifications = catchAsync(async (req, res, next) => {
  const { title, message, broadcast, userIds = [] } = req.body;

  if (!title || !message) {
    return next(
      new AppError("Invalid operation, please provide title and message.", 400),
    );
  }

  let recipients: string[];

  if (broadcast) {
    const users = await User.find({ isActive: true }, "_id").lean();
    recipients = users.map((u) => u._id.toString());
  } else {
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return next(
        new AppError("Invalid operation, please provide userIds.", 400),
      );
    }

    recipients = userIds;
  }

  const campaign = await NotificationCampaign.create({
    title,
    message,
    type: broadcast ? "broadcast" : "selected",
    recipientsCount: recipients.length,
    createdBy: req.user._id,
  });

  await Notification.insertMany(
    recipients.map((userId) => ({
      campaignId: campaign._id,
      userId,
    })),
  );

  await logAudit({
    actor: req.user._id,
    action: broadcast ? "notification.broadcast" : "notification.bulk_sent",
    target: campaign._id,
    targetModel: "NotificationCampaign",
    metadata: {
      usersCount: recipients.length,
      title,
    },
  });

  resHandler(res, 201, "campaign", campaign);
});

export const markAsRead = catchAsync(async (req, res, next) => {
  if (!req.params.id)
    return next(
      new AppError(
        "Invalid operation, please provide the notification id.",
        400,
      ),
    );
  await Notification.findByIdAndUpdate(
    { _id: req.params.id },
    { isRead: true },
  );

  res.status(200).json({
    status: true,
    message: "Notification marked as read successfully.",
  });
});
export const markAllAsRead = catchAsync(async (req, res, next) => {
  await Notification.updateMany(
    {
      userId: req.user._id,
      isRead: false,
    },
    {
      $set: { isRead: true },
    },
  );

  res.status(200).json({
    status: true,
    message: "All notifications marked as read successfully.",
  });
});
