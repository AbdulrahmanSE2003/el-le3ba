export interface Team {
  _id: string;
  teamName: string;
  teamCode: string;
  teamLeader: string;
  totalGames: number;
  bestStreak: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export interface Member {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  teamId: string;
  role: "captain" | "member";
}
