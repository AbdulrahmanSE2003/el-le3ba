import { serverFetch } from "@/shared/api/server";
import { cache } from "react";

// Interfaces
interface DashboardStatsRes {
  stats: {
    totalUsers: {
      total: number;
      change: number;
    };
    totalTeams: {
      total: number;
      change: number;
    };
    totalEvents: number;
    totalSessions: {
      total: number;
      change: number;
    };
  };
}

// Action Functions
export const getDashboardStats = cache(async () =>
  serverFetch<DashboardStatsRes>({ url: "admin/dashboard/stats" }),
);
