import Lobby from "@/features/match/components/lobby/Lobby";
import EventInfo from "@/features/match/components/lobby/EventInfo";
import TeamStatsPreview from "@/features/match/components/lobby/TeamStatsPreview";
import { apiServer } from "@/lib/apiServer";
import type { Event, Team, Member } from "@/features/match/types";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AxiosError } from "axios";
import NoTeam from "@/components/shared/NoTeam";

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
