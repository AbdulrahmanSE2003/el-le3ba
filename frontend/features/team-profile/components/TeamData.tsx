import { getMyTeamStats } from "@/shared/api/helpers";
import MatchHistoryWrapper from "./MatchHistoryWrapper";
import TeamStatsGrid from "./stats/TeamStatsGrid";

const TeamData = async () => {
  const statsRes = await getMyTeamStats();

  if (!statsRes.success) return null;

  const stats = statsRes.data;

  return (
    <div className={`flex flex-col gap-y-6`}>
      {/* Stats Grid */}
      <TeamStatsGrid stats={stats} />

      {/* Match History */}
      <MatchHistoryWrapper recentSessions={stats.teamStats.recentSessions} />
    </div>
  );
};

export default TeamData;
