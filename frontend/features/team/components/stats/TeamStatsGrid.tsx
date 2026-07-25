import Motion from "@/components/shared/Motion";
import { containerVariants } from "@/components/shared/animations";
import { MyTeamStats } from "@/shared/api/helpers";
import StatCard from "./StatCard";
import { Flame, Gamepad2, Star, Trophy } from "lucide-react";

export default function TeamStatsGrid({ stats }: { stats: MyTeamStats }) {
  const teamStats = stats.teamStats;

  return (
    <Motion
      as="div"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-4"
    >
      <StatCard
        icon={Trophy}
        iconBg="bg-yellow-500/10"
        iconColor="text-yellow-500"
        title="إجمالي النقاط"
        value={teamStats.totalPoints}
      />
      <StatCard
        icon={Gamepad2}
        iconBg="bg-blue-500/10"
        iconColor="text-blue-500"
        title="المباريات المكتملة"
        value={teamStats.totalGames}
      />
      <StatCard
        icon={Flame}
        iconBg="bg-orange-500/10"
        iconColor="text-orange-500"
        title="أعلى ستريك"
        value={teamStats.bestStreak}
      />
      <StatCard
        icon={Star}
        iconBg="bg-purple-500/10"
        iconColor="text-purple-500"
        title="متوسط السكور"
        value={teamStats.avgScore}
      />
    </Motion>
  );
}
