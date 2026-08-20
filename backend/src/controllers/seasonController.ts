import mongoose from "mongoose";
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
  const { seasonId } = req.params as { seasonId: string };

  if (!mongoose.Types.ObjectId.isValid(seasonId))
    return next(new AppError("Invalid season id.", 400));

  const leaderboard = await Leaderboard.aggregate([
    { $match: { seasonId: new mongoose.Types.ObjectId(seasonId) } },
    { $group: { _id: "$teamId", seasonPoints: { $sum: "$seasonPoints" } } },
    { $sort: { seasonPoints: -1 } },
    {
      $lookup: {
        from: "teams",
        localField: "_id",
        foreignField: "_id",
        as: "team",
      },
    },
    { $unwind: "$team" },
    {
      $project: {
        _id: 0,
        teamId: "$_id",
        teamName: "$team.teamName",
        seasonPoints: 1,
      },
    },
  ]);

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

export const getAllSeasons = catchAsync(async (req, res, next) => {
  const {
    search,
    status,
    sort = "-createdAt",
    page = "1",
    limit = "10",
  } = req.query;

  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.max(Number(limit) || 10, 1);
  const skip = (currentPage - 1) * currentLimit;

  const filter: Record<string, unknown> = {};

  if (search && typeof search === "string") {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (
    status &&
    ["upcoming", "active", "knockout", "ended"].includes(String(status))
  ) {
    filter.status = status;
  }

  const [seasons, total] = await Promise.all([
    Season.find(filter)
      .select("-__v")
      .populate("createdBy", "name email")
      .sort(String(sort))
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    Season.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / currentLimit);

  resHandler(res, 200, "seasons", {
    seasons,
    pagination: {
      currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  });
});

export const getSeasonsStats = catchAsync(async (req, res, next) => {
  const [totalSeasons, active, upcoming, knockout, ended] = await Promise.all([
    Season.countDocuments(),
    Season.countDocuments({ status: "active" }),
    Season.countDocuments({ status: "upcoming" }),
    Season.countDocuments({ status: "knockout" }),
    Season.countDocuments({ status: "ended" }),
  ]);

  resHandler(res, 200, "stats", {
    total: totalSeasons,
    active,
    upcoming,
    knockout,
    ended,
  });
});

export const getSeason = getOne(Season);
export const updateSeason = updateOne(Season);
export const deleteSeason = deleteOne(Season);
