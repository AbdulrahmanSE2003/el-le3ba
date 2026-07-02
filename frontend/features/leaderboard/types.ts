export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  change: "up" | "down" | "none";
  changeValue?: number;
  isUserTeam?: boolean;
};
