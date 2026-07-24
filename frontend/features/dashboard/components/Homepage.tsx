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
  LeaderboardEntry,
} from "@/shared/api/helpers";
import TeamSnapshot from "./TeamSnapshot";
import StatsCards from "./StatsCards";
import LeaderboardSnapshot from "./LeaderboardSnapshot";
import EmptyState from "./EmptyState";

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

  let attempts = 0;
  let topThree: LeaderboardEntry[] = [];

  if (team?.team && event) {
    const [attemptsRes, topThreeRes] = await Promise.all([
      getTeamAttempts(team.team._id, event._id),
      getLeaderboardTopThree(event._id),
    ]);

    attempts = attemptsRes.success ? attemptsRes.data.attempts.attempts : 0;

    topThree = topThreeRes.success ? topThreeRes.data.topThree : [];
  }

  return (
    <div className="container mx-auto w-full space-y-6 max-md:px-6 py-3">
      <div className="flex items-center justify-between">
        <Notification />
        <WelcomeMessage />
      </div>

      {event && (
        <CurrentEvent
          event={event}
          attempts={attempts}
          totalTeams={totalTeams}
        />
      )}

      {team?.team ? (
        <>
          <TeamSnapshot team={team.team} members={team.members} />

          <StatsCards team={team.team} bestStreak={user?.bestStreak ?? 0} />

          <LeaderboardSnapshot rows={topThree} />
        </>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default Homepage;
