import Error from "@/app/error";
import { getSeasonLeaderboardStats } from "../../api/seasons";
import {
  Users,
  Gamepad2,
  Trophy,
  Crown,
} from "lucide-react";
import StatCard from "@/features/admin/components/shared/StatCard";

const LeaderboardStats = async ({ seasonId }: { seasonId: string }) => {
  const statsRes = await getSeasonLeaderboardStats(seasonId);

  if (!statsRes.success) return <Error />;

  const { totalTeams, totalSessions, totalPoints, topScore } = statsRes.data.stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        Icon={Users}
        value={totalTeams}
        title="إجمالي الفرق"
        description=""
      />

      <StatCard
        Icon={Gamepad2}
        value={totalSessions}
        title="إجمالي المباريات"
        description=""
      />

      <StatCard
        Icon={Trophy}
        value={totalPoints}
        title="إجمالي النقاط"
        description=""
      />

      <StatCard
        Icon={Crown}
        value={topScore ? topScore.score : 0}
        title={topScore ? `أعلى سكور — ${topScore.teamName}` : "أعلى سكور"}
        description=""
      />
    </div>
  );
};

export default LeaderboardStats;
