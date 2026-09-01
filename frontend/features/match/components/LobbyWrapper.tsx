import Lobby from "@/features/match/components/lobby/Lobby";
import EventInfo from "@/features/match/components/lobby/EventInfo";
import TeamStatsPreview from "@/features/match/components/lobby/TeamStatsPreview";
import {
  getCurrentTeam,
  getCurrentEvent,
  getTeamAttempts,
} from "@/shared/api/helpers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import NoTeam from "@/components/shared/no-team/NoTeam";
import NoActiveEvent from "@/components/shared/NoActiveEvent";
import { log } from "console";

const LobbyWrapper = async () => {
  const [teamRes, eventRes] = await Promise.all([
    getCurrentTeam(),
    getCurrentEvent(),
  ]);

  if (!teamRes.success) {
    return <NoTeam />;
  }

  const teamData = teamRes.data.team;

  if (!teamData?.team) {
    return <NoTeam />;
  }

  if (!eventRes.success ) {
    return <NoActiveEvent type="event" />;
  }

  
  const event = eventRes.data.event;
  console.log(event);

  const teamAttempts = await getTeamAttempts(teamData.team._id, event._id);

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
