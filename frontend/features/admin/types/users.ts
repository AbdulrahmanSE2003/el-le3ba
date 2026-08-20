import { AVATARS } from "@/lib/utils";

export interface MetricWithChange {
  value: number;
  change: number;
}

export interface MetricValueOnly {
  value: number;
}

export interface UsersStatsData {
  totalUsers: MetricWithChange;
  newUsersThisMonth: MetricWithChange;
  usersInTeams: MetricValueOnly;
  students: MetricValueOnly;
}

export interface GetUsersStatsRes {
  status: string;

  stats: UsersStatsData;
}
// ===============================================================

export interface UserTeam {
  _id: string;
  teamName: string;
  teamCode: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: typeof AVATARS;
  role: "student" | "admin" | "superAdmin";
  isActive: boolean;
  team?: UserTeam | null;
  createdAt: string;
  currentStreak: number;
  bestStreak: number;
  totalScore: number;
  gamesPlayed: number;
  lastLoginAt: string;
}

export interface PaginatedUsersData {
  users: User[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface GetUsersResponse {
  status: string;

  users: PaginatedUsersData;
}

export interface GetUsersQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  hasTeam?: string | boolean;
  sort?: string;
}
