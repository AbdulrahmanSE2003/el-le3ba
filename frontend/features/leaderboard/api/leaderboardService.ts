// features/leaderboard/api/leaderboardService.ts
//
// Data-fetching layer for the Leaderboard feature.
// Confirmed backend contract:
//   GET /events/current           -> { status, event: {...} }
//   GET /leaderboard?eventId=...  -> { status, Leaderboard: { results, ranking, rank } }
//   GET /teams/my-team            -> { status, team: { team: {...} } }
//
// This file is the ONLY place that knows about these raw shapes.
// Everything else in the feature only deals with LeaderboardUser.

import api from "@/lib/axios";
import {
  LeaderboardUser,
  RawLeaderboardEntry,
  RawLeaderboardPayload,
} from "../types";

// Full response wrapper for GET /leaderboard
interface LeaderboardApiResponse {
  status: boolean;
  Leaderboard: RawLeaderboardPayload;
}

// Full response wrapper for GET /events/current
interface EventApiResponse {
  status: boolean;
  event: { _id: string; status: "scheduled" | "running" | "finished" };
}

// Full response wrapper for GET /teams/my-team
// (note the double nesting: outer "team" wraps an inner "team" object)
interface MyTeamApiResponse {
  status: boolean;
  team: { team: { _id: string } };
}

/**
 * Fetches the currently active event and returns its ID.
 * The leaderboard endpoint requires an eventId to work.
 */
export async function fetchCurrentEventId(): Promise<string> {
  const { data } = await api.get<EventApiResponse>("/events/current");

  if (!data.event?._id) {
    throw new Error("No active event found — cannot load leaderboard.");
  }
  return data.event._id;
}

/**
 * Fetches the current user's own team _id.
 * Used only to mark their row as "my team" (isUserTeam) in the list.
 * Returns null if the user has no team (a valid, non-error state).
 */
async function fetchMyTeamId(): Promise<string | null> {
  try {
    const { data } = await api.get<MyTeamApiResponse>("/teams/my-team");
    return data.team.team._id;
  } catch (error) {
    console.error("Failed to fetch current team id:", error);
    return null;
  }
}

/**
 * Converts a single raw leaderboard entry into the LeaderboardUser shape
 * that LeaderboardList / PodiumSection actually consume.
 */
function mapEntryToUser(
  entry: RawLeaderboardEntry,
  index: number,
  myTeamId: string | null,
): LeaderboardUser {
  return {
    // Backend returns entries already sorted by totalPoints (desc),
    // so the visual rank is simply the entry's position in the array.
    rank: index + 1,
    name: entry.teamId.teamName,
    points: entry.totalPoints,

    isUserTeam: myTeamId !== null && entry.teamId._id === myTeamId,
  };
}

/**
 * Fetches the full leaderboard ranking for a given event,
 * with the current user's team already flagged (isUserTeam).
 */
export async function fetchLeaderboard(
  eventId: string,
): Promise<LeaderboardUser[]> {
  const [leaderboardRes, myTeamId] = await Promise.all([
    api.get<LeaderboardApiResponse>("/leaderboard", { params: { eventId } }),
    fetchMyTeamId(),
  ]);

  const { ranking } = leaderboardRes.data.Leaderboard;

  return ranking.map((entry, index) => mapEntryToUser(entry, index, myTeamId));
}
