import { serverFetch } from "@/shared/api/server";
import { GameOutcomesResponse, GamesAnalyticsResponse, GamesOverTimeRes, TeamsPerformanceRes, TopPlayersLeaderboardResponse } from "../types/analytics";


export const getGamesOverTime = async()=>
    serverFetch<GamesOverTimeRes>({url:"admin/analytics/games-over-time"})

export const getTeamsPerformance = async()=>
    serverFetch<TeamsPerformanceRes>({url:"admin/analytics/teams-performance"})

export const getTopPlayers= async()=>
    serverFetch<TopPlayersLeaderboardResponse>({url:"admin/analytics/players"})

export const getGamesOutcome = async()=>
    serverFetch<GameOutcomesResponse>({url:"admin/analytics/session-outcomes"})

export const getLiveSessionsCount = async()=>
    serverFetch<GamesAnalyticsResponse>({url:"admin/analytics/live-games"})