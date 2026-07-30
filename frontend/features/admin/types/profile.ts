import { RecentLog } from "./shared";

export interface ProfileStatsRes {
  profileStats: {
    lastLogin: Date;
    totalActions: number;
    totalNotifications: number;
    totalQuestions: number;
  };
}
export interface ProfileRecentLogs {
  recentLogs: RecentLog[];
}
