export type TeamStatus = "Full" | "Open" | "Inactive";

export interface Team {
  id: string;
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
