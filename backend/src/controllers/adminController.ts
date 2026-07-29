import Event from "../models/eventModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import { getAll, updateOne } from "../utils/factory";
import resHandler from "../utils/resHandler";
import { getGrowthStats } from "../utils/utils";

export const createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return next(new AppError("Please provide all required fields.", 400));

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError("Email already in use.", 400));

  const newAdmin = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role: "admin",
  });

  newAdmin.password = undefined as any;

  await logAudit({
    actor: req.user._id,
    action: "admin.created",
    target: newAdmin._id,
    targetModel: "User",
  });

  resHandler(res, 201, "admin", newAdmin);
});

export const getDashboardStats = catchAsync(async (_req, res) => {
  const [totalUsers, totalTeams, totalSessions, totalEvents] =
    await Promise.all([
      getGrowthStats(User),
      getGrowthStats(Team),
      getGrowthStats(Session),
      Event.countDocuments(),
    ]);

  resHandler(res, 200, "stats", {
    totalUsers,
    totalTeams,
    totalSessions,
    totalEvents,
  });
});

export const getRecentSessions = catchAsync(async (req, res, next) => {
  const recentSessions = await Session.find()
    .sort({ createdAt: -1 })
    .select("_id teamId eventId endReason startedAt finalScore completedAt")
    .limit(10)
    .populate("teamId", "teamName teamCode")
    .populate("eventId", "title");

  resHandler(res, 200, "recentSessions", recentSessions);
});

// ==================================================
// ================= User Dashboard =================
// ==================================================

export const getAllUsers = catchAsync(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const {
    search,
    role,
    sort = "-createdAt",
    hasTeam,
  } = req.query as Record<string, string>;

  const filter: any = {};

  if (role) {
    filter.role = role;
  }

  if (search) {
    filter.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        email: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  if (hasTeam === "true" || hasTeam === "false") {
    const memberUserIds = await TeamMembership.distinct("userId");
    filter._id =
      hasTeam === "true" ? { $in: memberUserIds } : { $nin: memberUserIds };
  }

  const [users, totalResults] = await Promise.all([
    User.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean()
      .select("-currentStreak -bestStreak -gamesPlayed "),

    User.countDocuments(filter),
  ]);

  const memberships = await TeamMembership.find({
    userId: { $in: users.map((user) => user._id) },
  })
    .populate("teamId", "teamName teamCode")
    .lean();

  const membershipsMap = new Map(
    memberships.map((membership) => [
      membership.userId.toString(),
      membership.teamId,
    ]),
  );

  const usersWithTeams = users.map((user) => ({
    ...user,
    team: membershipsMap.get(user._id.toString()) ?? null,
  }));

  const totalPages = Math.ceil(totalResults / limit);

  resHandler(res, 200, "users", {
    users: usersWithTeams,
    page,
    limit,
    totalPages,
    totalResults,
  });
});
export const getUserStats = catchAsync(async (req, res) => {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  const [
    totalUsers,
    currentMonthUsers,
    lastMonthUsers,
    usersInTeams,
    students,
  ] = await Promise.all([
    User.countDocuments(),

    User.countDocuments({
      createdAt: { $gte: startOfThisMonth },
    }),

    User.countDocuments({
      createdAt: {
        $gte: startOfLastMonth,
        $lt: startOfThisMonth,
      },
    }),

    TeamMembership.countDocuments(),

    User.countDocuments({
      role: "student",
    }),
  ]);

  const usersGrowth =
    lastMonthUsers === 0
      ? 100
      : Math.round(
          ((currentMonthUsers - lastMonthUsers) / lastMonthUsers) * 100,
        );

  resHandler(res, 200, "stats", {
    totalUsers: {
      value: totalUsers,
      change: usersGrowth,
    },

    newUsersThisMonth: {
      value: currentMonthUsers,
      change: usersGrowth,
    },

    usersInTeams: {
      value: usersInTeams,
    },

    students: {
      value: students,
    },
  });
});

export const createUser = catchAsync(async (req, res, next) => {
  const { name, email, role, password, passwordConfirm } = req.body;

  if (!name || !email || !role || !password || !passwordConfirm)
    return next(
      new AppError("Invalid operation, please provide needed fields", 400),
    );

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already exists.", 400));
  }

  if (role === "superAdmin") {
    return next(new AppError("Invalid operation, this is not allowed.", 400));
  }

  const newUser = await User.create({
    name,
    email,
    role,
    password,
    passwordConfirm,
  });

  await logAudit({
    actor: req.user._id,
    action: "user.created",
    target: newUser._id,
    targetModel: "User",
  });
  resHandler(res, 201, "user", newUser);
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const allowedFields = ["name", "email", "role", "avatar", "isActive"];

  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) => allowedFields.includes(key)),
  );

  if (updates.role === "superAdmin") {
    return next(new AppError("Invalid operation, this is not allowed.", 400));
  }

  if (Object.keys(updates).length === 0) {
    return next(new AppError("No valid fields provided.", 400));
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  await logAudit({
    actor: req.user._id,
    action: "user.updated",
    target: user._id,
    targetModel: "User",
  });
  resHandler(res, 200, "updatedUser", user);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError("User id is required.", 400));
  }

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("User not found.", 404));
  }

  const membership = await TeamMembership.findOne({ userId: id });

  if (membership?.role === "captain") {
    return next(
      new AppError(
        "Cannot deactivate a team captain. Transfer ownership or delete the team first.",
        400,
      ),
    );
  }

  if (membership) {
    await membership.deleteOne();
  }

  user.isActive = false;
  await user.save({ validateBeforeSave: false });

  await logAudit({
    actor: req.user._id,
    action: "user.deactivated",
    target: user._id,
    targetModel: "User",
  });
  res.status(204).send();
});

export const adminResetPassword = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  if (!userId)
    return next(new AppError("Invalid operation, user id is required.", 400));

  const user = await User.findOne({ _id: userId });
  if (!user)
    return next(
      new AppError("Invalid operation, there is no such a user.", 404),
    );

  user.password = "newPass1234";
  user.passwordConfirm = "newPass1234";
  await user.save();

  await logAudit({
    actor: req.user._id,
    action: "user.password_reset",
    target: user._id,
    targetModel: "User",
  });
  res.status(200).json({
    status: true,
    message: "Password reset done successfully.",
  });
});

export const bulkDeactivateUsers = catchAsync(async (req, res, next) => {
  const userIds: string[] = req.body.userIds;

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return next(
      new AppError("Invalid operation, please provide at least one user.", 400),
    );
  }

  const captainMemberships = await TeamMembership.find({
    userId: { $in: userIds },
    role: "captain",
  }).select("userId");

  if (captainMemberships.length) {
    return next(
      new AppError(
        "Invalid operation, One or more selected users are team captains. Transfer ownership first.",
        400,
      ),
    );
  }

  await TeamMembership.deleteMany({
    userId: { $in: userIds },
  });

  const result = await User.updateMany(
    { _id: { $in: userIds } },
    { $set: { isActive: false } },
  );

  await logAudit({
    actor: req.user._id,
    action: "user.bulk_deactivated",
    metadata: {
      usersCount: result.modifiedCount,
    },
  });

  resHandler(res, 200, "bulkDeactivate", {
    modifiedCount: result.modifiedCount,
  });
});
