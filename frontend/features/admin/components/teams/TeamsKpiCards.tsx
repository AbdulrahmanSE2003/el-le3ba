import { Shield, Swords, Trophy, UsersRound } from "lucide-react";
import { GenericKpiGrid } from "@/features/admin/components/shared/GenericKpiGrid";
import { StatCardItem } from "@/features/admin/types/shared";
import { getTeamsStats } from "../../api/shared";
import Error from "@/app/error";
import { formatCompactNumber } from "@/lib/utils";

export async function TeamsKpiCards() {
  const teamsStatsRes = await getTeamsStats();
  if (!teamsStatsRes.success) return <Error />;
  const stats = teamsStatsRes.data?.teamStats;

  const teamStats: StatCardItem[] = [
    {
      title: "إجمالي الفرق",
      value: stats?.totalTeams ?? 0o0,
      icon: Shield,
      iconClassName: "text-cyan-650",
      bgClassName: "bg-cyan-500/10",
    },
    {
      title: "إجمالي المباريات",
      value: formatCompactNumber(stats?.totalGames ?? 0, { threshold: 1000 }),
      icon: Swords,
      iconClassName: "text-brand-success",
      bgClassName: "bg-brand-success/10",
    },
    {
      title: "إجمالي النقاط",
      value: formatCompactNumber(stats?.totalPoints ?? 0),
      icon: Trophy,
      iconClassName: "text-accent",
      bgClassName: "bg-accent/20",
    },
    {
      title: "إجمالي الأعضاء",
      value: formatCompactNumber(stats?.totalMembers ?? 0, { threshold: 1000 }),
      icon: UsersRound,
      iconClassName: "text-chart-5",
      bgClassName: "bg-chart-5/10",
    },
  ];

  return <GenericKpiGrid items={teamStats} />;
}
