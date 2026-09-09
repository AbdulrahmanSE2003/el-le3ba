import AuditLog from "../models/AuditLogModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

const calcChange = (current: number, previous: number): number | null => {
  if (previous === 0) return null;
  return Math.round(((current - previous) / previous) * 100 * 10) / 10;
};

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getLogsStats = catchAsync(async (_req, res) => {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const startOfSameDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  const endOfSameDayLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate() + 1);

  const [result] = await AuditLog.aggregate([
    {
      $facet: {
        totalLogs: [
          { $match: { createdAt: { $gte: startOfLastMonth } } },
          {
            $group: {
              _id: null,
              current: {
                $sum: { $cond: [{ $gte: ["$createdAt", startOfThisMonth] }, 1, 0] },
              },
              previous: {
                $sum: { $cond: [{ $lt: ["$createdAt", startOfThisMonth] }, 1, 0] },
              },
            },
          },
        ],
        todayLogs: [
          { $match: { createdAt: { $gte: startOfSameDayLastMonth } } },
          {
            $group: {
              _id: null,
              current: {
                $sum: { $cond: [{ $gte: ["$createdAt", startOfToday] }, 1, 0] },
              },
              previous: {
                $sum: { $cond: [{ $lt: ["$createdAt", startOfToday] }, 1, 0] },
              },
            },
          },
        ],
        mostActiveAdmin: [
          { $match: { createdAt: { $gte: startOfThisMonth } } },
          { $group: { _id: "$actor", actionCount: { $sum: 1 } } },
          { $sort: { actionCount: -1 } },
          { $limit: 1 },
          {
            $lookup: {
              from: "users",
              localField: "_id",
              foreignField: "_id",
              as: "actor",
            },
          },
          { $unwind: "$actor" },
          { $project: { _id: 0, name: "$actor.name", actionCount: 1 } },
        ],
        mostCommonAction: [
          { $match: { createdAt: { $gte: startOfThisMonth } } },
          { $group: { _id: "$action", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 1 },
          { $project: { _id: 0, action: "$_id", count: 1 } },
        ],
      },
    },
  ]);

  const totalLogsBucket = result.totalLogs[0] ?? { current: 0, previous: 0 };
  const todayLogsBucket = result.todayLogs[0] ?? { current: 0, previous: 0 };
  const mostActiveAdmin = result.mostActiveAdmin[0] ?? null;
  const mostCommonAction = result.mostCommonAction[0] ?? null;

  resHandler(res, 200, "stats", {
    totalLogs: {
      value: totalLogsBucket.current,
      change: calcChange(totalLogsBucket.current, totalLogsBucket.previous),
    },
    todayLogs: {
      value: todayLogsBucket.current,
      change: calcChange(todayLogsBucket.current, todayLogsBucket.previous),
    },
    mostActiveAdmin: {
      value: mostActiveAdmin,
      change: null,
    },
    mostCommonAction: {
      value: mostCommonAction,
      change: null,
    },
  });
});

export const getAllLogs = catchAsync(async (req, res, next) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 20, 1);
  const skip = (page - 1) * limit;

  const {
    action,
    from,
    to,
    search,
    sortBy = "createdAt",
    sortOrder = "desc",
    domain,
    kind,
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};

  const actionConditions: Record<string, any>[] = [];
  if (action) actionConditions.push({ action });
  if (domain)
    actionConditions.push({ action: { $regex: `^${escapeRegex(domain)}\\.` } });
  if (kind)
    actionConditions.push({ action: { $regex: escapeRegex(kind) } });

  if (actionConditions.length > 0) {
    filter.$and = actionConditions;
  }

  if (from || to) {
    const fromDate = from ? new Date(from) : null;
    const toDate = to ? new Date(to) : null;

    if (fromDate && isNaN(fromDate.getTime()))
      return next(new AppError("Invalid `from` date.", 400));
    if (toDate && isNaN(toDate.getTime()))
      return next(new AppError("Invalid `to` date.", 400));

    filter.createdAt = {};
    if (fromDate) filter.createdAt.$gte = fromDate;
    if (toDate) filter.createdAt.$lte = toDate;
  }

  if (search) {
    const matchingUsers = await User.find({
      name: { $regex: search, $options: "i" },
    })
      .select("_id")
      .lean();

    filter.actor = { $in: matchingUsers.map((u) => u._id) };
  }

  const sortOption: Record<string, 1 | -1> = {
    [sortBy]: sortOrder === "asc" ? 1 : -1,
  };

  const [logs, total] = await Promise.all([
    AuditLog.find(filter)
      .populate("actor", "name role")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean(),

    AuditLog.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: true,
    total,
    page,
    limit,
    totalPages,
    logs,
  });
});