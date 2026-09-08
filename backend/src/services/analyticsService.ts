import mongoose from "mongoose";
import Session from "../models/sessionModel";
import Team from "../models/teamModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";

export type AnalyticsGranularity = "day" | "week" | "month";
export type TeamsSortBy = "points" | "games" | "averageScore";
export type PlayersSortBy = "score" | "games" | "averageScore";

export interface ParsedFilters {
  filter: Record<string, unknown>;
  from?: Date;
  to?: Date;
}

const DAY_MS = 24 * 60 * 60 * 1000;

const isNonNullish = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== "";

export const parseCommonFilters = (query: Record<string, unknown>): ParsedFilters => {
  const filter: Record<string, unknown> = {};

  if (isNonNullish(query.seasonId)) {
    if (!mongoose.isValidObjectId(query.seasonId))
      throw new AppError("Invalid seasonId parameter.", 400);
    filter.seasonId = new mongoose.Types.ObjectId(String(query.seasonId));
  }

  if (isNonNullish(query.eventId)) {
    if (!mongoose.isValidObjectId(query.eventId))
      throw new AppError("Invalid eventId parameter.", 400);
    filter.eventId = new mongoose.Types.ObjectId(String(query.eventId));
  }

  let from: Date | undefined;
  let to: Date | undefined;

  if (isNonNullish(query.from)) {
    const candidate = new Date(String(query.from));
    if (isNaN(candidate.getTime()))
      throw new AppError("Invalid `from` date.", 400);
    from = candidate;
  }

  if (isNonNullish(query.to)) {
    const candidate = new Date(String(query.to));
    if (isNaN(candidate.getTime()))
      throw new AppError("Invalid `to` date.", 400);
    to = candidate;
  }

  if (from && to && from.getTime() > to.getTime())
    throw new AppError("`from` date must be before `to` date.", 400);

  return { filter, from, to };
};

export const parseGranularity = (value: unknown): AnalyticsGranularity => {
  return value === "day" || value === "week" || value === "month"
    ? value
    : "day";
};

export const parseTeamsSortBy = (value: unknown): TeamsSortBy => {
  return value === "games" || value === "averageScore" ? value : "points";
};

export const parsePlayersSortBy = (value: unknown): PlayersSortBy => {
  return value === "games" || value === "averageScore" ? value : "score";
};

export const parseLimit = (value: unknown, fallback = 10, max = 100): number => {
  const numeric = Number(value);
  const safe = Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
  return Math.min(safe, max);
};

// ── Games Over Time ───────────────────────────────────────────────

const toUTCMidnight = (date: Date): Date =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));

const isoMondayOf = (date: Date): Date => {
  const utc = toUTCMidnight(date);
  const dow = utc.getUTCDay();
  const offset = dow === 0 ? -6 : 1 - dow;
  return new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate() + offset));
};

const bucketLabel = (date: Date, granularity: AnalyticsGranularity): string => {
  if (granularity === "day") return toUTCMidnight(date).toISOString().slice(0, 10);
  if (granularity === "week") return isoMondayOf(date).toISOString().slice(0, 10);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1))
    .toISOString()
    .slice(0, 10);
};

const bucketStart = (date: Date, granularity: AnalyticsGranularity): Date => {
  if (granularity === "day") return toUTCMidnight(date);
  if (granularity === "week") return isoMondayOf(date);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
};

const addBucket = (
  date: Date,
  granularity: AnalyticsGranularity,
): Date => {
  if (granularity === "day") return new Date(date.getTime() + DAY_MS);
  if (granularity === "week") return new Date(date.getTime() + 7 * DAY_MS);
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 1));
};

const bucketGroupId = (granularity: AnalyticsGranularity): Record<string, unknown> => {
  if (granularity === "day")
    return { $dateToString: { date: "$startedAt", format: "%Y-%m-%d" } };

  if (granularity === "week")
    return {
      $dateToString: {
        date: {
          $dateFromParts: {
            isoWeekYear: { $isoWeekYear: "$startedAt" },
            isoWeek: { $isoWeek: "$startedAt" },
            isoDayOfWeek: 1,
          },
        },
        format: "%Y-%m-%d",
      },
    };

  return {
    $dateToString: {
      date: {
        $dateFromParts: {
          year: { $year: "$startedAt" },
          month: { $month: "$startedAt" },
          day: 1,
        },
      },
      format: "%Y-%m-%d",
    },
  };
};

const applyDateRange = (
  filter: Record<string, unknown>,
  from?: Date,
  to?: Date,
  field = "startedAt",
): void => {
  if (!from && !to) return;
  const range: Record<string, unknown> = {};
  if (from) range.$gte = from;
  if (to) range.$lte = to;
  filter[field] = range;
};

export const getGamesOverTime = async (
  filters: ParsedFilters,
  granularity: AnalyticsGranularity,
): Promise<{ date: string; sessions: number }[]> => {
  const match: Record<string, unknown> = { ...filters.filter };
  applyDateRange(match, filters.from, filters.to);

  const results = (await Session.aggregate([
    { $match: match },
    { $group: { _id: bucketGroupId(granularity), sessions: { $sum: 1 } } },
    { $project: { _id: 0, date: "$_id", sessions: 1 } },
  ])) as { date: string; sessions: number }[];

  results.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  if (!filters.from && !filters.to) return results;

  const counts = new Map(results.map((r) => [r.date, r.sessions]));
  const labeled = (date: Date): string => bucketLabel(date, granularity);

  const earliest = results.length > 0 ? results[0].date : null;
  const latest = results.length > 0 ? results[results.length - 1].date : null;

  const startSource = filters.from ?? (earliest ? new Date(`${earliest}T00:00:00Z`) : filters.to);
  const endSource = filters.to ?? (latest ? new Date(`${latest}T00:00:00Z`) : filters.from);

  if (!startSource || !endSource) return [];

  const points: { date: string; sessions: number }[] = [];
  for (
    let cursor = bucketStart(startSource, granularity);
    cursor.getTime() <= bucketStart(endSource, granularity).getTime();
    cursor = addBucket(cursor, granularity)
  ) {
    const label = labeled(cursor);
    points.push({ date: label, sessions: counts.get(label) ?? 0 });
  }

  return points;
};

// ── Teams Performance ────────────────────────────────────────────

const TEAM_SORT_FIELDS: Record<TeamsSortBy, string> = {
  points: "totalPoints",
  games: "gamesPlayed",
  averageScore: "averageScore",
};

export const getTeamsPerformance = async (
  filters: ParsedFilters,
  limit: number,
  sortBy: TeamsSortBy,
): Promise<Record<string, unknown>[]> => {
  const leaderboardMatch: Record<string, unknown> = {
    $expr: { $eq: ["$teamId", "$$teamId"] },
  };
  if (filters.filter.seasonId) leaderboardMatch.seasonId = filters.filter.seasonId;
  if (filters.filter.eventId) leaderboardMatch.eventId = filters.filter.eventId;

  const sortField = TEAM_SORT_FIELDS[sortBy];

  return Team.aggregate([
    {
      $lookup: {
        from: "leaderboards",
        let: { teamId: "$_id" },
        pipeline: [{ $match: leaderboardMatch }],
        as: "entries",
      },
    },
    { $unwind: { path: "$entries", preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: "$_id",
        teamName: { $first: "$teamName" },
        teamCode: { $first: "$teamCode" },
        totalPoints: { $sum: { $ifNull: ["$entries.totalPoints", 0] } },
        gamesPlayed: { $sum: { $ifNull: ["$entries.sessionsPlayed", 0] } },
      },
    },
    {
      $project: {
        _id: 0,
        teamId: "$_id",
        teamName: 1,
        teamCode: 1,
        totalPoints: 1,
        gamesPlayed: 1,
        averageScore: {
          $let: {
            vars: {
              points: "$totalPoints",
              games: "$gamesPlayed",
            },
            in: {
              $cond: [
                { $eq: ["$$games", 0] },
                0,
                { $round: [{ $divide: ["$$points", "$$games"] }, 2] },
              ],
            },
          },
        },
      },
    },
    { $sort: { [sortField]: -1, teamName: 1 } },
    { $limit: limit },
  ]);
};

// ── Session Outcomes ─────────────────────────────────────────────

const OUTCOME_TYPES = ["completed", "expired", "abandoned"] as const;
type OutcomeType = (typeof OUTCOME_TYPES)[number];

export const getSessionOutcomes = async (
  filters: ParsedFilters,
): Promise<{ total: number; outcomes: { type: OutcomeType; count: number; percentage: number }[] }> => {
  const match: Record<string, unknown> = { ...filters.filter };
  applyDateRange(match, filters.from, filters.to);

  match.endReason = { $in: [...OUTCOME_TYPES] };

  const rows = (await Session.aggregate([
    { $match: match },
    { $group: { _id: "$endReason", count: { $sum: 1 } } },
  ])) as { _id: OutcomeType; count: number }[];

  const counts: Record<OutcomeType, number> = {
    completed: 0,
    expired: 0,
    abandoned: 0,
  };

  for (const row of rows) {
    if (counts[row._id] !== undefined) counts[row._id] = row.count;
  }

  const total = OUTCOME_TYPES.reduce((sum, type) => sum + counts[type], 0);

  const outcomes = OUTCOME_TYPES.map((type) => ({
    type,
    count: counts[type],
    percentage: total === 0 ? 0 : Math.round((counts[type] / total) * 100),
  }));

  if (total > 0) {
    const summed = outcomes.reduce((sum, o) => sum + o.percentage, 0);
    const diff = 100 - summed;
    const largest = outcomes.reduce((best, o, i) =>
      o.count > outcomes[best].count ? i : best, 0);
    outcomes[largest].percentage = Math.max(
      0,
      Math.min(100, outcomes[largest].percentage + diff),
    );
  }

  return { total, outcomes };
};

// ── Live Games ───────────────────────────────────────────────────

export const getLiveGames = async (
  filters: ParsedFilters,
): Promise<Record<string, unknown>[]> => {
  const match: Record<string, unknown> = { status: "running", ...filters.filter };

  return Session.aggregate([
    { $match: match },
    {
      $lookup: {
        from: "teams",
        localField: "teamId",
        foreignField: "_id",
        as: "team",
      },
    },
    { $unwind: { path: "$team", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "events",
        localField: "eventId",
        foreignField: "_id",
        as: "event",
      },
    },
    { $unwind: { path: "$event", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "teammemberships",
        localField: "teamId",
        foreignField: "teamId",
        as: "members",
      },
    },
    {
      $project: {
        _id: 0,
        sessionId: "$_id",
        teamId: "$teamId",
        teamName: { $ifNull: ["$team.teamName", null] },
        eventId: "$eventId",
        eventName: { $ifNull: ["$event.title", null] },
        seasonId: "$seasonId",
        currentQuestion: {
          $min: [
            { $add: [{ $size: "$answerLogs" }, 1] },
            { $size: "$questions" },
          ],
        },
        totalQuestions: { $size: "$questions" },
        answersSubmitted: { $size: "$answerLogs" },
        currentScore: { $sum: "$answerLogs.score" },
        startedAt: "$startedAt",
        expiresAt: "$expiresAt",
        remainingSeconds: {
          $max: [
            0,
            {
              $floor: {
                $divide: [{ $subtract: ["$expiresAt", "$$NOW"] }, 1000],
              },
            },
          ],
        },
        status: "$status",
        memberCount: { $size: "$members" },
      },
    },
    { $sort: { startedAt: 1 } },
  ]);
};

// ── Players ──────────────────────────────────────────────────────

const PLAYER_SORT_FIELDS: Record<PlayersSortBy, string> = {
  score: "totalScore",
  games: "gamesPlayed",
  averageScore: "averageScore",
};

export const getPlayers = async (
  filters: ParsedFilters,
  limit: number,
  sortBy: PlayersSortBy,
): Promise<Record<string, unknown>[]> => {
  const sortField = PLAYER_SORT_FIELDS[sortBy];
  const hasScope = Boolean(filters.filter.seasonId || filters.filter.eventId);

  const stages: any[] = [
    { $match: { role: "student" } },
    {
      $lookup: {
        from: "teammemberships",
        localField: "_id",
        foreignField: "userId",
        as: "membership",
      },
    },
    { $unwind: { path: "$membership", preserveNullAndEmptyArrays: true } },
    {
      $lookup: {
        from: "teams",
        localField: "membership.teamId",
        foreignField: "_id",
        as: "team",
      },
    },
    { $unwind: { path: "$team", preserveNullAndEmptyArrays: true } },
  ];

  const scoreExpr: Record<string, unknown> =
    hasScope
      ? { $sum: "$playedSessions.finalScore" }
      : { $ifNull: ["$totalScore", 0] };

  const gamesExpr: Record<string, unknown> =
    hasScope ? { $size: "$playedSessions" } : { $ifNull: ["$gamesPlayed", 0] };

  if (hasScope) {
    const sessionMatch: Record<string, any> = {
      $and: [
        { $expr: { $eq: ["$teamId", "$$teamId"] } },
        { endReason: { $in: ["completed", "expired"] } },
      ],
    };
    if (filters.filter.seasonId) sessionMatch.$and.push({ seasonId: filters.filter.seasonId });
    if (filters.filter.eventId) sessionMatch.$and.push({ eventId: filters.filter.eventId });

    stages.push({
      $lookup: {
        from: "sessions",
        let: { teamId: "$membership.teamId" },
        pipeline: [
          { $match: sessionMatch },
          { $project: { finalScore: 1 } },
        ],
        as: "playedSessions",
      },
    });
  }

  stages.push(
    {
      $project: {
        _id: 0,
        userId: "$_id",
        name: "$name",
        avatar: "$avatar",
        totalScore: scoreExpr,
        gamesPlayed: gamesExpr,
        averageScore: {
          $let: {
            vars: { score: scoreExpr, games: gamesExpr },
            in: {
              $cond: [
                { $eq: ["$$games", 0] },
                0,
                { $round: [{ $divide: ["$$score", "$$games"] }, 2] },
              ],
            },
          },
        },
        team: {
          $cond: [
            { $eq: ["$membership", null] },
            null,
            {
              teamId: "$membership.teamId",
              teamName: { $ifNull: ["$team.teamName", null] },
              teamCode: { $ifNull: ["$team.teamCode", null] },
            },
          ],
        },
      },
    },
    { $sort: { [sortField]: -1, name: 1 } },
    { $limit: limit },
  );

  return User.aggregate(stages);
};


