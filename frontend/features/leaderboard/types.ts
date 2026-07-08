// features/leaderboard/types.ts

// ── Raw shapes coming directly from the backend ──

// The team info nested inside each leaderboard entry (after backend populate)
export interface RawTeamRef {
  _id: string;
  teamName: string;
  teamCode: string;
}

// A single row as returned by GET /leaderboard
export interface RawLeaderboardEntry {
  _id: string;
  teamId: RawTeamRef;
  eventId: string;
  totalPoints: number;
  sessionsPlayed: number;
}

// The "Leaderboard" object inside the full response body
export interface RawLeaderboardPayload {
  results: number;
  ranking: RawLeaderboardEntry[];
  rank: number | null;
}

// ── UI-facing shape (what the components actually consume) ──
// Unchanged from the mock version, so LeaderboardList/PodiumSection
// don't need any modification.
export type LeaderboardUser = {
  rank: number;
  name: string;
  points: number;
  changeValue?: number;
  isUserTeam?: boolean;
};
