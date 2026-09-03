import type { RecentSession } from "@/shared/api/helpers";

/**
 * A finished session always carries the reason it ended.
 * A session that is still being played has no `endReason` yet.
 */
export type SessionEndReason = "completed" | "abandoned" | "expired";
export type SessionStatus = "in_progress" | SessionEndReason;

export interface AdminSession {
  teamName: string;
  teamCode: string;
  status: {
    label: string;
    className: string;
    dotClassName: string;
  };
  season: string;
  points: number;
  startedAt: string;
}

export interface SessionsKpis {
  totalSessions: number;
  liveNow: number;
  completedToday: number;
  avgDurationSeconds: number;
}

export interface SessionsListResponse {
  results: number;
  sessions: AdminSession[];
}
