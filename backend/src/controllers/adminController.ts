import mongoose from "mongoose";
import AuditLog from "../models/AuditLogModel";
import Event from "../models/eventModel";
import NotificationCampaign from "../models/NotificationCampaignModel";
import Notification from "../models/notificationModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team, { ITeam } from "../models/teamModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";
import { generateCode, getGrowthStats } from "../utils/utils";

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
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return next(
      new AppError("Invalid operation, please provide needed fields", 400),
    );

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new AppError("Email already exists.", 400));
  }

  const newUser = await User.create({
    name,
    email,
    role: "student",
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

  const allowedFields = ["name", "email", "avatar", "isActive"];

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

  if (!Array.isArray(userIds) || !userIds.length) {
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

// ==================================================
// ============= Notification Dashboard =============
// ==================================================

export const getAllNotificationCampaigns = catchAsync(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const {
    search,
    type,
    sort = "default",
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};

  // Handle Type Filter (matches notificationTypes: 'broadcast' | 'selected')
  if (type && type !== "all") {
    filter.targetType = type; // or `filter.type = type` depending on your schema field name
  }

  // Handle Search Filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { message: { $regex: search, $options: "i" } },
    ];
  }

  // Handle Sort Mapping (matches notificationsSortBy)
  let sortOption: Record<string, 1 | -1> = { createdAt: -1 }; // Default: 'default' & 'recent'

  if (sort === "recipients") {
    sortOption = { recipientsCount: -1 };
  } else if (sort === "recent" || sort === "default") {
    sortOption = { createdAt: -1 };
  } else {
    // Fallback for custom sort strings passed directly (e.g. "-createdAt")
    const isDesc = sort.startsWith("-");
    const field = isDesc ? sort.slice(1) : sort;
    sortOption = { [field]: isDesc ? -1 : 1 };
  }

  const [campaigns, totalResults] = await Promise.all([
    NotificationCampaign.find(filter)
      .populate("createdBy", "name")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),

    NotificationCampaign.countDocuments(filter),
  ]);

  resHandler(res, 200, "campaigns", {
    campaigns,
    page,
    limit,
    totalPages: Math.ceil(totalResults / limit),
    totalResults,
  });
});

// TODO Toggle this if needed
// export const getNotificationCampaign = catchAsync(async (req, res, next) => {
//   const campaign = await NotificationCampaign.findById(req.params.id)
//     .populate("createdBy", "name email")
//     .lean();

//   if (!campaign) {
//     return next(new AppError("Campaign not found.", 404));
//   }

//   const recipients = await Notification.find({
//     campaignId: campaign._id,
//   })
//     .populate("userId", "name email")
//     .lean();

//   resHandler(res, 200, "campaign", {
//     campaign,
//     recipients,
//   });
// });

export const getNotificationStats = catchAsync(async (req, res) => {
  // Run independent DB queries in parallel for better performance
  const [
    totalCampaigns,
    totalNotifications,
    readNotifications,
    recipientsAggregate,
  ] = await Promise.all([
    NotificationCampaign.countDocuments(),
    Notification.countDocuments(),
    Notification.countDocuments({ isRead: true }),
    NotificationCampaign.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$recipientsCount" },
        },
      },
    ]),
  ]);

  // Calculate read rate percentage
  const readRate =
    totalNotifications === 0
      ? 0
      : Math.round((readNotifications / totalNotifications) * 100).toFixed(1);

  // Safely extract aggregated recipient sum
  const totalRecipients = recipientsAggregate[0]?.total || 0;

  resHandler(res, 200, "stats", {
    totalCampaigns: {
      value: totalCampaigns,
    },
    readNotifications: {
      value: readNotifications,
    },
    readRate: {
      value: readRate,
    },
    totalRecipients: {
      value: totalRecipients,
    },
  });
});

export const deleteNotificationCampaign = catchAsync(async (req, res, next) => {
  const campaign = await NotificationCampaign.findById(req.params.id);

  if (!campaign) {
    return next(new AppError("Campaign not found.", 404));
  }

  await Notification.deleteMany({
    campaignId: campaign._id,
  });

  await campaign.deleteOne();

  await logAudit({
    actor: req.user._id,
    action: "notification.deleted",
    target: campaign._id,
    targetModel: "NotificationCampaign",
  });

  res.status(204).send();
});

// ==================================================
// ================ Profile Account =================
// ==================================================

export const getProfileStats = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const [user, totalActions, totalNotifications, totalQuestions] =
    await Promise.all([
      User.findById(userId),

      AuditLog.countDocuments({
        actor: userId,
      }),

      AuditLog.countDocuments({
        actor: userId,
        targetModel: "NotificationCampaign",
      }),

      AuditLog.countDocuments({
        actor: userId,
        targetModel: "Question",
      }),
    ]);

  resHandler(res, 200, "profileStats", {
    lastLogin: user?.lastLoginAt ?? null,
    totalActions,
    totalNotifications,
    totalQuestions,
  });
});

export const getProfileRecentLogs = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const recentLogs = await AuditLog.find({
    actor: userId,
  })
    .limit(5)
    .sort("-createdAt");

  resHandler(res, 200, "recentLogs", recentLogs);
});

// ==================================================
// ================= Team Dashboard =================
// ==================================================

export const getAllTeams = catchAsync(async (req, res) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 10, 1);
  const skip = (page - 1) * limit;

  const { search, sort = "newest" } = req.query as Record<string, string>;

  const filter: any = {};

  if (search) {
    const leaders = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
    }).select("_id");

    filter.$or = [
      {
        teamName: {
          $regex: search,
          $options: "i",
        },
      },
      {
        teamCode: {
          $regex: search,
          $options: "i",
        },
      },
      {
        teamLeader: {
          $in: leaders.map((leader) => leader._id),
        },
      },
    ];
  }

  const sortMap: Record<string, string> = {
    newest: "-createdAt",
    oldest: "createdAt",
    pointsDesc: "-points",
    pointsAsc: "points",
    gamesDesc: "-totalGames",
    gamesAsc: "totalGames",
    nameAsc: "teamName",
    nameDesc: "-teamName",
  };

  const sortOption = sortMap[sort] || "-createdAt";

  const [teams, totalResults] = await Promise.all([
    Team.find(filter)
      .populate("teamLeader", "name email")
      .sort(sortOption)
      .skip(skip)
      .limit(limit),

    Team.countDocuments(filter),
  ]);

  const teamIds = teams.map((team) => team._id);

  const memberships = await TeamMembership.find({
    teamId: { $in: teamIds },
  })
    .populate("userId", "name email avatar")
    .lean();

  const membersMap = new Map<string, typeof memberships>();

  for (const membership of memberships) {
    const teamId = membership.teamId.toString();

    if (!membersMap.has(teamId)) {
      membersMap.set(teamId, []);
    }

    membersMap.get(teamId)!.push(membership);
  }

  const finalTeams = teams.map((team) => ({
    ...team.toObject(),
    members: membersMap.get(team._id.toString()) ?? [],
    membersCount: membersMap.get(team._id.toString())?.length ?? 0,
  }));

  const totalPages = Math.ceil(totalResults / limit);

  resHandler(res, 200, "teams", {
    teams: finalTeams,
    page,
    totalPages,
    limit,
    totalResults,
  });
});

export const getTeamsStats = catchAsync(async (req, res) => {
  const teamStats = await Team.aggregate([
    {
      $group: {
        _id: null,
        totalTeams: { $sum: 1 },
        totalGames: { $sum: "$totalGames" },
        totalPoints: { $sum: "$points" },
      },
    },
    {
      $project: {
        _id: 0,
        totalTeams: 1,
        totalGames: 1,
        totalPoints: 1,
      },
    },
  ]);

  const totalMembers = await TeamMembership.countDocuments();

  const stats = teamStats[0] ?? {
    totalTeams: 0,
    totalGames: 0,
    totalPoints: 0,
  };

  resHandler(res, 200, "teamStats", {
    ...stats,
    totalMembers,
  });
});

// export const createTeam = catchAsync(async (req, res, next) => {
//   const user = req.user;
//   let codeIsUnique = false;
//   let GCode: string = "";
//   while (!codeIsUnique) {
//     GCode = generateCode();
//     const exists = await Team.exists({ teamCode: GCode });
//     if (!exists) codeIsUnique = true;
//   }

//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const [newTeam] = await Team.create(
//       [{ teamName: req.body.teamName, teamLeader: user!._id, teamCode: GCode }],
//       { session },
//     );

//     await TeamMembership.create(
//       [{ userId: user!._id, teamId: newTeam._id, role: "captain" }],
//       { session },
//     );

//     await session.commitTransaction();

//     await logAudit({
//       actor: req.user._id,
//       action: "team.created",
//       target: newTeam._id,
//       targetModel: "Team",
//     });

//     resHandler(res, 201, "team", newTeam);
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     session.endSession();
//   }
// });

export const editTeam = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { teamName, teamLeader } = req.body;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const team = await Team.findById({ _id: id }).session(session);

    if (!team) {
      throw new AppError("Invalid operation, team not found.", 404);
    }

    if (teamName) {
      team.teamName = teamName;
    }

    if (teamLeader && team.teamLeader.toString() !== teamLeader) {
      const oldCaptain = await TeamMembership.findOne({
        teamId: id,
        role: "captain",
      }).session(session);

      if (!oldCaptain) {
        throw new AppError(
          "Invalid operation, no captain found for this team.",
          400,
        );
      }

      const newCaptainMembership = await TeamMembership.findOne({
        teamId: id,
        userId: teamLeader,
      }).session(session);

      if (!newCaptainMembership) {
        throw new AppError(
          "Invalid operation, the selected user is not a member of this team.",
          400,
        );
      }

      oldCaptain.role = "member";
      await oldCaptain.save({ session });

      newCaptainMembership.role = "captain";
      await newCaptainMembership.save({ session });

      team.teamLeader = new mongoose.Types.ObjectId(teamLeader);
    }

    await team.save({ session });

    await session.commitTransaction();

    resHandler(res, 200, "team", team);
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

export const deleteTeam = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const isTeamPlaying = await Session.findOne({
    teamId: id,
    status: "running",
  });
  if (!isTeamPlaying)
    return next(
      new AppError(
        "Invalid operation, can't delete a team while there is a running session.",
        400,
      ),
    );
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();

    const members = await TeamMembership.find({ teamId: id }).session(session);

    const team = await Team.findByIdAndDelete(id).session(session);

    if (!team) {
      throw new AppError("Invalid operation, team not found.", 404);
    }

    await TeamMembership.deleteMany({ teamId: id }).session(session);

    const [campaign] = await NotificationCampaign.create(
      [
        {
          title: "تم حذف الفريق الخاص بك",
          message:
            "تم حذف الفريق الخاص بك، يرجى التواصل مع الدعم إذا كان لديك أي استفسار.",
          type: "selected",
          recipientsCount: members.length,
          createdBy: req.user._id,
        },
      ],
      { session },
    );

    await Notification.insertMany(
      members.map((m) => ({
        campaignId: campaign._id,
        userId: m.userId._id,
      })),
    );

    await logAudit({
      actor: req.user._id,
      action: "team.deleted",
      target: team._id,
      targetModel: "Team",
    });

    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }

  res.status(204).send();
});

export const sendNotificationToTeamMembers = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const { title, message } = req.body;

    if (!title || !message) {
      return next(
        new AppError(
          "Invalid operation, please provide title and message.",
          400,
        ),
      );
    }

    const session = await mongoose.startSession();

    try {
      await session.startTransaction();

      const members = await TeamMembership.find({ teamId: id }).session(
        session,
      );

      console.log(members);

      if (!members.length) {
        throw new AppError(
          "Invalid operation, no members found for this team.",
          404,
        );
      }

      const [campaign] = await NotificationCampaign.create(
        [
          {
            title,
            message,
            type: "selected",
            recipientsCount: members.length,
            createdBy: req.user._id,
          },
        ],
        { session },
      );

      await Notification.insertMany(
        members.map((member) => ({
          campaignId: campaign._id,
          userId: member.userId,
        })),
        { session },
      );

      await logAudit({
        actor: req.user._id,
        action: "notification.sent_to_team",
        target: campaign._id,
        targetModel: "NotificationCampaign",
      });
      await session.commitTransaction();

      resHandler(res, 201, "campaign", campaign);
    } catch (error) {
      await session.abortTransaction();
      next(error);
    } finally {
      session.endSession();
    }
  },
);
