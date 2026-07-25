import { RecentSession } from "@/shared/api/helpers";
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

interface DashboardRecentSessions {
  results: number;
  recentSessions: RecentSession[];
}

// Action Functions
export const getDashboardStats = cache(async () =>
  serverFetch<DashboardStatsRes>({ url: "admin/dashboard/stats" }),
);

export const getDashboardRecentSessions = cache(async () =>
  serverFetch<DashboardRecentSessions>({
    url: "admin/dashboard/recent-sessions",
  }),
);
