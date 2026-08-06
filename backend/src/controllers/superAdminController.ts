import AuditLog from "../models/AuditLogModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const createNewAdminOrSuperAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const { name, email, password, passwordConfirm, role } = req.body;

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
    role: role || "admin",
  });

  const action =
    role && role === "admin" ? "admin.created" : "super_admin.created";

  await logAudit({
    actor: req.user._id,
    action: action,
    target: superAdmin._id,
    targetModel: "User",
  });

  resHandler(res, 201, "superAdmin", superAdmin);
});

export const getAppStats = catchAsync(async (req, res, next) => {
  const [totalAdmins, totalLogs, totalLogins, totalUsers] = await Promise.all([
    User.countDocuments({ role: "admin" }),

    AuditLog.countDocuments(),

    AuditLog.countDocuments({
      action: "user.login",
    }),

    User.countDocuments(),
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

export const getRecentAdmins = catchAsync(async (req, res, next) => {
  const recentAdmins = await User.find({
    role: "admin",
  })
    .sort("-createdAt")
    .limit(5);

  resHandler(res, 200, "recentAdmins", recentAdmins);
});

// ===================================================
// =================== Admins Page ===================
// ===================================================

export const getAdminsStats = catchAsync(async (req, res, next) => {
  const [totalAdmins, inactiveAdmins, superAdmins, recentLogins] =
    await Promise.all([
      User.countDocuments({ role: { $in: ["admin", "superAdmin"] } }),

      User.countDocuments({
        role: { $in: ["admin", "superAdmin"] },
        isActive: false,
      }),

      User.countDocuments({ role: "superAdmin" }),

      AuditLog.countDocuments({
        action: "user.login",
        createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
      }),
    ]);

  resHandler(res, 200, "adminStats", {
    totalAdmins,
    inactiveAdmins,
    superAdmins,
    recentLogins: recentLogins,
  });
});

export const getAllAdmins = catchAsync(async (req, res, next) => {
  // ── 1. Parse query params ───────────────────────────────
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const { search, role, sort = "newest" } = req.query as Record<string, string>;

  // ── 2. Build filter ─────────────────────────────────────
  const filter: Record<string, any> = {
    role: { $in: ["admin", "superAdmin"] },
  };

  // Filter by specific role
  if (role && (role === "admin" || role === "superAdmin")) {
    filter.role = role;
  }

  // Search by name or email (case-insensitive)
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  // ── 3. Build sort ───────────────────────────────────────
  const sortMap: Record<string, string> = {
    newest: "-createdAt",
    oldest: "createdAt",
    nameAsc: "name",
    nameDesc: "-name",
  };

  const sortOption = sortMap[sort] || "-createdAt";

  // ── 4. Execute queries (parallel) ───────────────────────
  const [admins, totalResults] = await Promise.all([
    User.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .select(
        "-password -passwordChangedAt -passwordResetToken -passwordResetExpires",
      )
      .lean(),

    User.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(totalResults / limit);

  // ── 5. Response ─────────────────────────────────────────
  resHandler(res, 200, "admins", {
    admins,
    page,
    limit,
    totalPages,
    totalResults,
  });
});
