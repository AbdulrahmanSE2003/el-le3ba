import Lobby from "@/features/match/components/lobby/Lobby";
import EventInfo from "@/features/match/components/lobby/EventInfo";
import TeamStatsPreview from "@/features/match/components/lobby/TeamStatsPreview";
import { serverFetch } from "@/shared/api/server";
import type { Event } from "@/shared/types/event";
import type { Team, Member } from "@/shared/types/team";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NoTeam from "@/components/shared/NoTeam";

export interface TeamApiResponse {
  team: {
    team: Team;
    members: Member[];
  };
}

export interface EventApiResponse {
  event: Event;
}

export interface AttemptsApiResponse {
  attempts: {
    attempts: number;
    teamId: string;
  };
}

const LobbyWrapper = async () => {
  const [teamRes, eventRes] = await Promise.all([
    serverFetch<TeamApiResponse>("teams/my-team"),
    serverFetch<EventApiResponse>("events/current"),
  ]);

  if (!teamRes.success) {
    if (teamRes.error?.includes("You are not in a team.")) {
      return <NoTeam />;
    }
    console.log(teamRes);

    throw new Error(teamRes.error || "Failed...");
  }
  if (!eventRes.success) {
    throw new Error(eventRes.error || "Failed to load event data");
  }

  const teamData = teamRes.data.team;
  const event = eventRes.data.event;

  const teamAttempts = await serverFetch<AttemptsApiResponse>(
    `teams/${teamData.team._id}/attempts?eventId=${event._id}`,
  );

  const attempts = teamAttempts.success
    ? teamAttempts.data.attempts.attempts
    : 0;
  const attemptsLeft = event.maxAttempts - attempts;

  return (
    <>
      <EventInfo attemptsLeft={attemptsLeft} eventTitle={event.title} />
      <Lobby team={teamData.team} />
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
