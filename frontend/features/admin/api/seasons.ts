import { serverFetch } from "@/shared/api/server";

export interface Season {
  _id: string;
  title: string;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  startDate: string;
  knockoutStartDate: string;
  endDate: string;
  status: "upcoming" | "active" | "knockout" | "ended";
  createdAt: string;
  updatedAt: string;
}

export interface SeasonsRes {
  seasons: {
    seasons: Season[];
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SeasonsStats {
  stats: {
    total: number;
    active: number;
    upcoming: number;
    knockout: number;
    ended: number;
  };
}

export interface SeasonsSearchParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
}
export interface SeasonLeaderboardStats {
  stats: {
    totalTeams: number;
    totalSessions: number;
    totalPoints: number;
    topScore: {
      score: number;
      teamName: string;
    } | null;
  };
}

export const getAllSeasons = async (params: SeasonsSearchParams) =>
  serverFetch<SeasonsRes>({ url: "seasons", query: params });

export const getAllSeasonsSimple = async () =>
  serverFetch<SeasonsRes>({ url: "seasons", query: { limit: "100" } });

export const getSeasonsStats = async () =>
  serverFetch<SeasonsStats>({ url: "seasons/stats" });

export const getSeasonLeaderboardStats = async (seasonId: string) =>
  serverFetch<SeasonLeaderboardStats>({
    url: `seasons/${seasonId}/leaderboard/stats`,
  });

export interface SeasonLeaderboardEntry {
  teamId: string;
  teamName: string;
  seasonPoints: number;
  sessionsPlayed: number;
  lastPlayedSession: string | null;
}

export const getSeasonLeaderboard = async (seasonId: string) =>
  serverFetch<{ leaderboard: SeasonLeaderboardEntry[] }>({
    url: `seasons/${seasonId}/leaderboard`,
  });
