import Lobby from "@/features/match/components/Lobby";
import { apiServer } from "@/lib/apiServer";
import { Event, Team, Member } from "@/features/match/types";

import TeamStatsPreview from "./TeamStatsPreview";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AxiosError } from "axios";
import NoTeam from "@/components/shared/NoTeam";

// ─── Types for API responses ───────────────────────────────────────
interface TeamApiResponse {
  status: boolean;
  team: {
    team: Team;
    members: Member[];
  };
}

interface EventApiResponse {
  status: boolean;
  event: Event;
}
interface AttemptsApiResponse {
  status: boolean;
  attempts: {
    attempts: number;
    teamId: string;
  };
}

const LobbyWrapper = async () => {
  let teamData: TeamApiResponse["team"] | null = null;
  let event: Event | null = null;

  try {
    const [teamRes, eventRes] = await Promise.all([
      apiServer<TeamApiResponse>("get", "/teams/my-team"),
      apiServer<EventApiResponse>("get", "/events/current"),
    ]);

    teamData = teamRes.data.team;
    event = eventRes.data.event;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message;

      if (
        error.response?.status === 400 &&
        message === "You are not in a team."
      ) {
        return <NoTeam />;
      }
    }

    throw error;
  }

  const teamAttempts = await apiServer<AttemptsApiResponse>(
    "get",
    `/teams/${teamData.team._id}/attempts?eventId=${event._id}`,
  );

  const { attempts } = teamAttempts?.data?.attempts;
  const attemptsLeft = event.maxAttempts - attempts;
  return (
    <>
      {/* Event Info */}
      <div className="w-full flex items-center justify-end gap-3">
        <div className="bg-accent/30 border border-accent rounded-full px-3 py-1 text-xs text-amber-500 dark:text-amber-300">
          {attemptsLeft} محاولات متبقية
        </div>
        <div className="text-foreground text-sm">{event.title}</div>
      </div>

      <Lobby team={{ team: teamData.team }} />

      {/* Team Stats */}
      <Suspense
        fallback={
          <Skeleton className="h-32 rounded-lg bg-transparent w-full grid md:grid-cols-2 gap-3">
            <Skeleton className="w-full h-32 bg-primary/10 rounded-lg animate-pulse" />
            <Skeleton className="w-full h-32 bg-primary/10 rounded-lg animate-pulse" />
          </Skeleton>
        }
      >
        <TeamStatsPreview eventId={event._id} />
      </Suspense>
    </>
  );
};

export default LobbyWrapper;
