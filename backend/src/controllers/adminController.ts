import Event from "../models/eventModel";
import Session from "../models/sessionModel";
import Team from "../models/teamModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
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
