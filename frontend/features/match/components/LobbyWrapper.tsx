import Lobby from "@/features/match/components/Lobby";
import { apiServer } from "@/lib/apiServer";
import { Event, Team, Member } from "@/features/match/types";

import TeamStatsPreview from "./TeamStatsPreview";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [teamRes, eventRes] = await Promise.all([
    apiServer<TeamApiResponse>("get", "/teams/my-team"),
    apiServer<EventApiResponse>("get", "/events/current"),
  ]);

  const teamData = teamRes.data?.team;
  const event = eventRes.data?.event;

  // Handle missing data gracefully
  if (!teamData || !event) {
    return (
      <section className="h-full flex items-center justify-center">
        <p className="text-foreground">لا يوجد فريق أو حدث حالي</p>
      </section>
    );
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

      <Lobby event={event} team={teamData} />

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
