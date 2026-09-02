import { serverFetch } from "@/shared/api/server";

export interface Session {
  _id: string;
  teamId: {
    _id: string;
    teamName: string;
  };
  eventId: {
    _id: string;
    title: string;
  };
  seasonId: {
    _id: string;
    title: string;
  };
  status: "running" | "completed" | "scored";
  endReason: "completed" | "expired" | "flagged" | "abandoned" | null;
  finalScore: number;
  correctAnswers: number;
  startedAt: string;
  completedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionsRes {
  sessions: {
    sessions: Session[];
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface SessionsStats {
  stats: {
    total: number;
    completed: number;
    running: number;
    averageScore: number;
  };
}

export interface SessionsSearchParams {
  search?: string;
  status?: string;
  sort?: string;
  page?: string;
  limit?: string;
  [key: string]: string | undefined;
}

export const getAllSessions = async (params: SessionsSearchParams) =>
  serverFetch<SessionsRes>({ url: "sessions", query: params });

export const getSessionsStats = async () =>
  serverFetch<SessionsStats>({ url: "sessions/stats" });
