import { getMyTeamStats } from "@/shared/api/helpers";
import TeamStatsGrid from "./stats/TeamStatsGrid";
import MatchHistoryList from "./MatchHistoryList";

const TeamData = async () => {
  const statsRes = await getMyTeamStats();

  if (!statsRes.success) return null;

  const stats = statsRes.data;

  return (
    <div className={`flex flex-col gap-y-6`}>
      {/* Stats Grid */}
      <TeamStatsGrid stats={stats} />

      {/* Match History */}
      <MatchHistoryList sessions={stats.teamStats.recentSessions} />
    </div>
  );
};

export default TeamData;
