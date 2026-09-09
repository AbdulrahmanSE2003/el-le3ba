import { serverFetch } from "@/shared/api/server";
import { GameOutcomesResponse, GamesOverTimeRes, TeamsPerformanceRes } from "../types/analytics";


export const getGamesOverTime = async()=>
    serverFetch<GamesOverTimeRes>({url:"admin/analytics/games-over-time"})

export const getTeamsPerformance = async()=>
    serverFetch<TeamsPerformanceRes>({url:"admin/analytics/teams-performance"})

export const getGamesOutcome = async()=>
    serverFetch<GameOutcomesResponse>({url:"admin/analytics/session-outcomes"})