export type TeamStatus = "Full" | "Open" | "Inactive";

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

export interface Team {
  _id: string;
  name: string;
  code: string;
  leaderName: string;
  leaderEmail: string;
  membersCount: number;
  maxMembers: number;
  status: TeamStatus;
  points: number;
  createdAt: string;
}

export interface TeamActionsMenuProps {
  teamId: string;
  onViewMembers?: (teamId: string) => void;
}
