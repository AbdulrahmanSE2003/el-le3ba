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
import Link from "next/link";
import { Trophy } from "lucide-react";
import LeaderboardSnapshot from "./LeaderboardSnapshot";

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

export interface LeaderboardTopThreeRes {
  status: boolean;
  results: number;
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
  status: boolean;
  stats: { totalTeams: number };
}

const API = process.env.NEXT_PUBLIC_API_URL!;

const Homepage = async () => {
  const [userRes, eventRes, teamRes, eventStatsRes] = await Promise.all([
    apiServer<UserRes>("get", `${API}/users/me`),
    apiServer<EventApiResponse>("get", `${API}/events/current`),
    apiServer<TeamApiResponse>("get", `${API}/teams/my-team`),
    apiServer<EventStatsRes>("get", `${API}/events/stats`),
  ]);

  const user = userRes?.data.userData;
  const event = eventRes?.data.event;
  const team = teamRes?.data.team;
  const totalTeams = eventStatsRes?.data.stats.totalTeams;

  const [attemptsRes, topThreeRes] = await Promise.all([
    apiServer<AttemptsApiResponse>(
      "get",
      `${API}/teams/${team.team._id}/attempts?eventId=${event._id}`,
    ),
    apiServer<LeaderboardTopThreeRes>(
      "get",
      `${API}/leaderboard/top-three?eventId=${event._id}`,
    ),
  ]);

  const attempts = attemptsRes?.data.attempts.attempts;
  const topThree = topThreeRes?.data.topThree;
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

      {/* Leaderboard Snapshot */}
      <LeaderboardSnapshot rows={topThree} />
    </div>
  );
};

export default Homepage;
