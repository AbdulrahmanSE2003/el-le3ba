"use server";

import { fetchTeamSessions } from "./api";
import type { SessionHistory } from "./types";

export async function loadMoreSessions(
  teamId: string,
  page: number,
  limit: number
): Promise<{ sessions: SessionHistory[]; hasMore: boolean }> {
  return fetchTeamSessions(teamId, page, limit);
}
