import { serverFetch } from "@/shared/api/server";
import { cache } from "react";
import { LogsRes, LogsSearchParams, StatsRes } from "../types/logs";

export const getAllLogs = cache(async (params: LogsSearchParams) =>
  serverFetch<LogsRes>({ url: "logs", query: params }),
);

export const getLogsStats = cache(async()=>
serverFetch<StatsRes>({url: "logs/stats"}))