import { serverFetch } from "@/shared/api/server";
import { GamesOverTimeRes } from "../types/analytics";


export const getGamesOverTime = async()=>
    serverFetch<GamesOverTimeRes>({url:"admin/analytics/games-over-time"})