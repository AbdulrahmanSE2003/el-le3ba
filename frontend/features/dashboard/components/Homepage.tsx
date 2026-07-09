import CurrentEvent from "@/features/dashboard/components/CurrentEvent";
import Notification from "@/features/dashboard/components/Notification";
import WelcomeMessage from "@/features/dashboard/components/WelcomeMessage";
import {
  AttemptsApiResponse,
  EventApiResponse,
  TeamApiResponse,
} from "@/features/match/components/LobbyWrapper";
import { apiServer } from "@/lib/apiServer";
import TeamSnapshot from "./TeamSnapshot";
import StatsCards from "./StatsCards";

interface UserRes {
  status: true;
  userData: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    currentStreak: number;
    bestStreak: number;
    gamesPlayed: number;
    totalScore: number;
    passwordResetExpires: string;
    avatar: string;
    passwordChangedAt: string;
    highestScore: number;
  };
}

export interface EventStatsRes {
  status: boolean;
  stats: { totalTeams: number };
}

const Homepage = async () => {
  const userRes = await apiServer<UserRes>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
  );

  const user = userRes?.data?.userData;

  const eventRes = await apiServer<EventApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/events/current`,
  );

  const event = eventRes?.data?.event;

  const teamRes = await apiServer<TeamApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/teams/my-team`,
  );

  const eventStatsRes = await apiServer<EventStatsRes>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/events/stats`,
  );

  const totalTeams = eventStatsRes?.data?.stats?.totalTeams;

  const team = teamRes?.data.team;
  const attemptsRes = await apiServer<AttemptsApiResponse>(
    "get",
    `${process.env.NEXT_PUBLIC_API_URL}/teams/${team.team._id}/attempts?eventId=${event._id}`,
  );
  const attempts = attemptsRes?.data?.attempts.attempts;

  return (
    <div className={`container mx-auto w-full space-y-6 max-md:px-6 py-3`}>
      {/* Notification & Welcome message */}
      <div className={`flex justify-between items-center`}>
        <Notification />
        <WelcomeMessage />
      </div>

      {/* Current Event */}
      <CurrentEvent event={event} attempts={attempts} totalTeams={totalTeams} />

      {/* Team Snapshot */}
      <TeamSnapshot team={team.team} members={team.members} />

      {/* Stats cards */}
      <StatsCards team={team.team} bestStreak={user.bestStreak} />
    </div>
  );
};

export default Homepage;
