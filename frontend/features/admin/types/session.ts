import type { RecentSession } from "@/shared/api/helpers";

/**
 * A finished session always carries the reason it ended.
 * A session that is still being played has no `endReason` yet.
 */
export type SessionEndReason = "completed" | "abandoned" | "expired";
export type SessionStatus = "in_progress" | SessionEndReason;

/**
 * Full session record as needed by the admin "المباريات" screen.
 * Extends the shared `RecentSession` shape (already used on the dashboard)
 * instead of redefining team/event fields from scratch.
 */
export interface AdminSession
  extends Omit<RecentSession, "endReason" | "completedAt"> {
  status: SessionStatus;
  endReason: SessionEndReason | null;
  startedAt: string;
  completedAt: string | null;
  totalQuestions: number;
  durationSeconds: number | null;
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
