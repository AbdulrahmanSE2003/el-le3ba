import CurrentEvent from "@/features/dashboard/components/CurrentEvent";
import Notification from "@/features/dashboard/components/Notification";
import WelcomeMessage from "@/features/dashboard/components/WelcomeMessage";
import { serverFetch } from "@/shared/api/server";
import type { Event } from "@/shared/types/event";
import type { Team, Member } from "@/shared/types/team";

interface TeamApiResponse {
  team: {
    team: Team;
    members: Member[];
  };
}

interface EventApiResponse {
  event: Event;
}

interface AttemptsApiResponse {
  attempts: {
    attempts: number;
    teamId: string;
  };
}
import TeamSnapshot from "./TeamSnapshot";
import StatsCards from "./StatsCards";
import LeaderboardSnapshot from "./LeaderboardSnapshot";

interface UserRes {
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

export interface LeaderboardTopThreeRes {
  topThree: {
    _id: string;
    teamId: {
      _id: string;
      teamName: string;
      teamCode: string;
    };
    eventId: string;
    totalPoints: number;
    sessionsPlayed: number;
  }[];
}

export interface EventStatsRes {
  stats: { totalTeams: number };
}

const Homepage = async () => {
  const [userRes, eventRes, teamRes, eventStatsRes] = await Promise.all([
    serverFetch<UserRes>("users/me"),
    serverFetch<EventApiResponse>("events/current"),
    serverFetch<TeamApiResponse>("teams/my-team"),
    serverFetch<EventStatsRes>("events/stats"),
  ]);

  const user = userRes.success ? userRes.data.userData : null;
  const event = eventRes.success ? eventRes.data.event : null;
  const team = teamRes.success ? teamRes.data.team : null;
  const totalTeams = eventStatsRes.success
    ? eventStatsRes.data.stats.totalTeams
    : 0;

  if (!team || !event) {
    console.log("error");
    return null;
  }

  const [attemptsRes, topThreeRes] = await Promise.all([
    serverFetch<AttemptsApiResponse>(
      `teams/${team.team._id}/attempts?eventId=${event._id}`,
    ),
    serverFetch<LeaderboardTopThreeRes>(
      `leaderboard/top-three?eventId=${event._id}`,
    ),
  ]);

  const attempts = attemptsRes.success ? attemptsRes.data.attempts.attempts : 0;
  const topThree = topThreeRes.success ? topThreeRes.data.topThree : [];

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
      <StatsCards team={team.team} bestStreak={user?.bestStreak ?? 0} />

      {/* Leaderboard Snapshot */}
      <LeaderboardSnapshot rows={topThree} />
    </div>
  );
};

export default Homepage;
