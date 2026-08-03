export type TeamStatus = "All" | "Full" | "Open" | "Inactive" | string;

export interface TeamsStatsData {
  totalTeams: number;
  totalGames: number;
  totalPoints: number;
  totalMembers: number;
}

export interface GetTeamsStatsRes {
  status: boolean;
  teamStats: TeamsStatsData;
}

export interface TeamLeader {
  _id: string;
  name: string;
  email: string;
}
export interface TeamMember {
  _id: string;
  teamId: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  role: "captain" | "member";
}

export interface Team {
  _id: string;
  teamName: string;
  teamCode: string;
  teamLeader: TeamLeader;
  points: number;
  totalGames: number;
  membersCount: number;
  maxMembers?: 5 | number;
  teamStatus: TeamStatus;
  createdAt: string;
  members: TeamMember[];
}

export interface PaginatedTeamsData {
  teams: Team[];
  page: number;
  limit: number;
  totalPages: number;
  totalResults: number;
}

export interface GetTeamsResponse {
  status: string;
  teams: PaginatedTeamsData;
}

export interface GetTeamsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TeamStatus | "all";
  sort?: string;
}
export interface TeamActionsMenuProps {
  teamId: string;
  onViewMembers?: (teamId: string) => void;
}
