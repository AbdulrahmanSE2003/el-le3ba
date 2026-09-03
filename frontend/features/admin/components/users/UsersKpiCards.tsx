import { Users, UserCheck, UsersRound, UserPlus } from "lucide-react";
import { GenericKpiGrid } from "@/features/admin/components/shared/GenericKpiGrid";
import { StatCardItem } from "@/features/admin/types/shared";
import { getUsersStats } from "../../api/shared";
import Error from "@/app/error";

export async function UsersKpiCards() {
  const usersStatsRes = await getUsersStats();
  if (!usersStatsRes.success) return <Error />;
  const stats = usersStatsRes.data?.stats;

  const userStats: StatCardItem[] = [
    {
      title: "إجمالي المستخدمين",
      value: stats?.totalUsers?.value ?? 0,
      change: stats?.totalUsers?.change ?? 0,
      icon: Users,
      iconClassName: "text-primary",
      bgClassName: "bg-primary/10",
    },
    {
      title: "عدد اللاعبين في فرق",
      value: stats?.usersInTeams?.value ?? 0,
      icon: UsersRound,
      iconClassName: "text-accent",
      bgClassName: "bg-accent/20",
    },
    {
      title: "عدد اللاعبين",
      value: stats?.students?.value ?? 0,
      icon: UserCheck,
      iconClassName: "text-chart-2",
      bgClassName: "bg-chart-2/10",
    },
    {
      title: "المستخدمين الجدد هذا الشهر",
      value: stats?.newUsersThisMonth?.value ?? 0,
      change: stats?.newUsersThisMonth?.change ?? 0,
      icon: UserPlus,
      iconClassName: "text-chart-5",
      bgClassName: "bg-chart-5/10",
    },
  ];

  return <GenericKpiGrid items={userStats} />;
}
