export interface ProfileStatsRes {
  profileStats: {
    lastLogin: Date;
    totalActions: number;
    totalNotifications: number;
    totalQuestions: number;
  };
}
