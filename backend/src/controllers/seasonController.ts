import Season from "../models/seasonModel";
import Leaderboard from "../models/leaderboardModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import { getAll, getOne, updateOne, deleteOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getActiveSeason = catchAsync(async (req, res, next) => {
  const season = await Season.findOne({ status: "active" });
  if (!season) return next(new AppError("No active season right now.", 404));
  resHandler(res, 200, "season", season);
});

export const getSeasonLeaderboard = catchAsync(async (req, res, next) => {
  const { seasonId } = req.params;

  const leaderboard = await Leaderboard.find({ seasonId })
    .sort({ seasonPoints: -1 })
    .populate("teamId", "name")
    .lean();

  resHandler(res, 200, "leaderboard", leaderboard);
});

export const createSeason = catchAsync(async (req, res, next) => {
  const newSeason = await Season.create({
    title: req.body.title,
    createdBy: req.user._id,
    startDate: req.body.startDate,
    knockoutStartDate: req.body.knockoutStartDate,
    endDate: req.body.endDate,
  });

  await logAudit({
    actor: req.user._id,
    action: "season.created",
    target: newSeason._id,
    targetModel: "Season",
  });

  resHandler(res, 201, "newSeason", newSeason);
});

export const getAllSeasons = getAll(Season);
export const getSeason = getOne(Season);
export const updateSeason = updateOne(Season);
export const deleteSeason = deleteOne(Season);
