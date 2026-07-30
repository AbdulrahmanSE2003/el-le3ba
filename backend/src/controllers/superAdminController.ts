import AuditLog from "../models/AuditLogModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const createSuperAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return next(
      new AppError(
        "Invalid operation, please provide name, email, password, passwordConfirm.",
        400,
      ),
    );

  const superAdmin = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role: "superAdmin",
  });

  await logAudit({
    actor: req.user._id,
    action: "super_admin.created",
    target: superAdmin._id,
    targetModel: "User",
  });

  resHandler(res, 201, "superAdmin", superAdmin);
});

export const getAppStats = catchAsync(async (req, res, next) => {
  const [totalAdmins, totalLogs, totalLogins, totalUsers] = await Promise.all([
    await User.countDocuments({ role: "admin" }),

    await AuditLog.countDocuments(),

    await AuditLog.countDocuments({
      action: "user.login",
    }),

    await User.countDocuments(),
  ]);

  resHandler(res, 200, "appStats", {
    totalAdmins,
    totalLogs,
    totalLogins,
    totalUsers,
  });
});

export const getRecentAdminLogs = catchAsync(async (req, res, next) => {
  const adminIds = await User.find(
    { role: { $in: ["admin", "superAdmin"] } },
    "_id",
  );

  const recentLogs = await AuditLog.find({
    actor: { $in: adminIds.map((u) => u._id) },
  })
    .sort({ createdAt: -1 })
    .limit(20)
    .populate("actor", "name email avatar role");

  resHandler(res, 200, "recentLogs", recentLogs);
});
