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

export interface RecentAdmin {
  lastLoginAt: string | null;
  _id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  isActive: true;
  currentStreak: 0;
  bestStreak: 0;
  totalScore: 0;
  gamesPlayed: 0;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface RecentAdminsRes {
  recentAdmins: RecentAdmin[];
}
