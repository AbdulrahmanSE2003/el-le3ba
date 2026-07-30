export interface AppStats {
  appStats: {
    totalAdmins: number;
    totalLogs: number;
    totalLogins: number;
    totalUsers: number;
  };
}

export interface RecentLog {
  _id: string;
  actor: {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  targetModel: string;
  createdAt: string;
  __v: number;
}

export interface RecentAdminLogsRes {
  recentLogs: RecentLog[];
}
