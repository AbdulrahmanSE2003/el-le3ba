import Notification from "../models/notificationModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const getNotifications = catchAsync(async (req, res, next) => {
  const notifications = await Notification.find({ userId: req.user._id }).sort({
    createdAt: -1,
  });
  const unreadCount = await Notification.countDocuments({
    userId: req.user._id,
    isRead: false,
  });

  resHandler(res, 200, "notifications", { notifications, unreadCount });
});

export const sendNotifications = catchAsync(async (req, res, next) => {
  if (req.body.broadcast) {
    // get all user IDs → insertMany one doc per user
    const users = await User.find({}, "_id");
    const notificationDocs = users.map((u) => ({
      userId: u._id,
      title: req.body.title,
      message: req.body.message,
      isBroadcast: true,
    }));

    const insertedNotifications =
      await Notification.insertMany(notificationDocs);

    await logAudit({
      actor: req.user._id,
      action: "notification.broadcast",
      metadata: {
        usersCount: notificationDocs.length,
        title: req.body.title,
      },
    });
  } else {
    const { userIds, title, message } = req.body;
    if (!req.body.userIds)
      return next(
        new AppError("Invalid operation, please provide userIds.", 400),
      );

    if (!title || !message)
      return next(
        new AppError(
          "Invalid operation, please provide message and its title.",
          400,
        ),
      );
    // targeted — req.body.userIds is an array
    const notificationDocs = req.body.userIds.map((id: string) => ({
      userId: id,
      title,
      message,
    }));
    const insertedNotifications =
      await Notification.insertMany(notificationDocs);
    await logAudit({
      actor: req.user._id,
      action: "notification.bulk_sent",
      metadata: {
        usersCount: userIds.length,
        title,
      },
    });
  }

  res
    .status(200)
    .json({ status: true, message: "All notifications sent successfully." });
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
