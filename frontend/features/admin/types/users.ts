export interface MetricWithChange {
  value: number;
  change: number;
}

export interface MetricValueOnly {
  value: number;
}

export interface UserStatsData {
  totalUsers: MetricWithChange;
  newUsersThisMonth: MetricWithChange;
  usersInTeams: MetricValueOnly;
  students: MetricValueOnly;
}

export interface GetUserStatsRes {
  status: string;

  stats: UserStatsData;
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
  role: "student" | "admin" | string;
  isActive: boolean;
  team?: UserTeam | null;
  createdAt: string;
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
