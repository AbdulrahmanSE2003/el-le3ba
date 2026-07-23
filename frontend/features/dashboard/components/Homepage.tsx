import CurrentEvent from "@/features/dashboard/components/CurrentEvent";
import Notification from "@/features/dashboard/components/Notification";
import WelcomeMessage from "@/features/dashboard/components/WelcomeMessage";
import {
  getCurrentUser,
  getCurrentEvent,
  getCurrentTeam,
  getEventStats,
  getTeamAttempts,
  getLeaderboardTopThree,
} from "@/shared/api/helpers";
import TeamSnapshot from "./TeamSnapshot";
import StatsCards from "./StatsCards";
import LeaderboardSnapshot from "./LeaderboardSnapshot";

const Homepage = async () => {
  const [userRes, eventRes, teamRes, eventStatsRes] = await Promise.all([
    getCurrentUser(),
    getCurrentEvent(),
    getCurrentTeam(),
    getEventStats(),
  ]);

  const user = userRes.success ? userRes.data.userData : null;
  const event = eventRes.success ? eventRes.data.event : null;
  const team = teamRes.success ? teamRes.data.team : null;
  const totalTeams = eventStatsRes.success
    ? eventStatsRes.data.stats.totalTeams
    : 0;

  if (!team || !event) {
    return null;
  }

  const [attemptsRes, topThreeRes] = await Promise.all([
    getTeamAttempts(team.team._id, event._id),
    getLeaderboardTopThree(event._id),
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
