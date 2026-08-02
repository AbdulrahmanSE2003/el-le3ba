import { cache } from "react";
import { serverFetch } from "./server";
import { CACHE } from "./cache";
import type { Event } from "@/shared/types/event";
import type { Team, Member } from "@/shared/types/team";

/* ── Shared domain shapes returned by the API ── */

export interface LastSession {
  _id: string;
  eventId: { _id: string; title: string };
  endReason: string;
  finalScore: number;
  correctAnswers: number;
  bestStreak: number;
}

export interface UserData {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin" | "superAdmin";
  avatar: string | null;
  totalScore: number;
  gamesPlayed: number;
  gamesWon?: number;
  currentStreak: number;
  bestStreak: number;
  highestScore?: number;
  myTeamRole: "member" | "captain";
  createdAt: string;
  updatedAt: string;
  __v?: number;
  passwordResetExpires?: string;
  passwordChangedAt?: string;
  lastSessions?: LastSession[];
}

export interface CurrentUserResponse {
  userData: UserData;
}

export interface RecentSession {
  _id: string;
  teamId: {
    _id: string;
    teamName: string;
    teamCode: string;
  };
  eventId: {
    _id: string;
    title: string;
  };
  endReason: string;
  finalScore: number;
  correctAnswers: number;
  bestStreak: number;
  completedAt: string;
}
export interface MyTeamStats {
  teamStats: {
    totalGames: number;
    totalPoints: number;
    bestStreak: number;
    avgScore: number;
    recentSessions: RecentSession[];
  };
}

export interface CurrentTeamResponse {
  team: {
    team: Team;
    members: Member[];
    rank: number;
    myRole: "captain" | "member";
  };
}

export interface CurrentEventResponse {
  event: Event;
}

export interface EventStatsResponse {
  stats: { totalTeams: number };
}

export interface LeaderboardEntry {
  _id: string;
  teamId: {
    _id: string;
    teamName: string;
    teamCode: string;
  };
  eventId: string;
  totalPoints: number;
  sessionsPlayed: number;
}

export interface LeaderboardTopThreeResponse {
  topThree: LeaderboardEntry[];
}

export interface MyRankResponse {
  MyRank: {
    rank: number;
    totalPoints: number;
  };
}

export interface MyTeamRanking {
  team: LeaderboardEntry;
  rank: number;
}

export interface LeaderboardPayload {
  results: number;
  ranking: LeaderboardEntry[];
  myTeamRanking: MyTeamRanking | null;
}

export interface LeaderboardApiResponse {
  status: boolean;
  leaderboard: LeaderboardPayload;
}

export interface TeamAttemptsResponse {
  attempts: {
    attempts: number;
    teamId: string;
  };
}

export interface SessionDetailsResponse {
  sessionDetails: {
    score: number;
    correctAnswers: number;
    bestStreak: number;
  };
}

export interface INotificationItem {
  _id: string;
  campaignId: {
    _id: string;
    title: string;
    message: string;
    type: "broadcast" | "selected";
    createdAt: string;
  };
  userId: string;
  isRead: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationRes {
  status: boolean;
  notifications: {
    notifications: INotificationItem[];
    unreadCount: number;
  };
}

/* ── Server data helpers (deduplicated per render via React.cache) ── */

export const getCurrentUser = cache(async () =>
  serverFetch<CurrentUserResponse>({ url: "users/me", ...CACHE.user }),
);

export const getCurrentTeam = cache(async () =>
  serverFetch<CurrentTeamResponse>({ url: "teams/my-team", ...CACHE.team }),
);

export const getMyTeamStats = cache(async () =>
  serverFetch<MyTeamStats>({ url: "teams/my-team/stats", ...CACHE.team }),
);

export const getCurrentEvent = cache(async () =>
  serverFetch<CurrentEventResponse>({ url: "events/current", ...CACHE.event }),
);

export const getEventStats = cache(async () =>
  serverFetch<EventStatsResponse>({ url: "events/stats", ...CACHE.eventStats }),
);

export const getLeaderboardTopThree = cache(async (eventId: string) =>
  serverFetch<LeaderboardTopThreeResponse>({
    url: `leaderboard/top-three?eventId=${eventId}`,
    ...CACHE.leaderboard,
  }),
);

export const getMyRank = cache(async (eventId: string) =>
  serverFetch<MyRankResponse>({
    url: `leaderboard/my-rank?eventId=${eventId}`,
    ...CACHE.myRank,
  }),
);

export const getTeamAttempts = cache(async (teamId: string, eventId: string) =>
  serverFetch<TeamAttemptsResponse>({
    url: `teams/${teamId}/attempts?eventId=${eventId}`,
    ...CACHE.attempts,
  }),
);

export const getSessionDetails = cache(async (sessionId: string) =>
  serverFetch<SessionDetailsResponse>({
    url: `sessions/${sessionId}`,
    ...CACHE.session,
  }),
);

export const getNotifications = cache(async () =>
  serverFetch<NotificationRes>({ url: "notifications" }),
);

export const getLeaderboard = cache(async (eventId?: string) =>
  serverFetch<LeaderboardApiResponse>({
    url: `leaderboard?eventId=${eventId}`,
    ...CACHE.leaderboard,
  }),
);
