import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";
import {
  getGamesOverTime,
  getLiveGames,
  getPlayers,
  getSessionOutcomes,
  getTeamsPerformance,
  parseCommonFilters,
  parseGranularity,
  parseLimit,
  parsePlayersSortBy,
  parseTeamsSortBy,
} from "../services/analyticsService";

export const getGamesOverTimeEndpoint = catchAsync(async (req, res) => {
  const filters = parseCommonFilters(req.query as Record<string, unknown>);
  const granularity = parseGranularity(req.query.granularity);
  const points = await getGamesOverTime(filters, granularity);

  resHandler(res, 200, "analytics", {
    granularity,
    from: filters.from ?? null,
    to: filters.to ?? null,
    points,
  });
});

export const getTeamsPerformanceEndpoint = catchAsync(async (req, res) => {
  const filters = parseCommonFilters(req.query as Record<string, unknown>);
  const limit = parseLimit(req.query.limit, 10, 100);
  const sortBy = parseTeamsSortBy(req.query.sortBy);
  const teams = await getTeamsPerformance(filters, limit, sortBy);

  resHandler(res, 200, "analytics", {
    limit,
    sortBy,
    teams,
  });
});

export const getSessionOutcomesEndpoint = catchAsync(async (req, res) => {
  const filters = parseCommonFilters(req.query as Record<string, unknown>);
  const data = await getSessionOutcomes(filters);

  resHandler(res, 200, "analytics", data);
});

export const getLiveGamesEndpoint = catchAsync(async (req, res) => {
  const filters = parseCommonFilters(req.query as Record<string, unknown>);
  const games = await getLiveGames(filters);

  resHandler(res, 200, "analytics", {
    count: games.length,
    games,
  });
});

export const getPlayersEndpoint = catchAsync(async (req, res) => {
  const filters = parseCommonFilters(req.query as Record<string, unknown>);
  const limit = parseLimit(req.query.limit, 10, 100);
  const sortBy = parsePlayersSortBy(req.query.sortBy);
  const players = await getPlayers(filters, limit, sortBy);

  resHandler(res, 200, "analytics", {
    limit,
    sortBy,
    players,
  });
});

