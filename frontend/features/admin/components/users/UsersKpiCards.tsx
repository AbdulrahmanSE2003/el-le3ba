import { Users, UserCheck, UsersRound, UserPlus } from "lucide-react";
import { GenericKpiGrid } from "@/features/admin/components/shared/GenericKpiGrid";
import { StatCardItem } from "@/features/admin/types/users";

export function UsersKpiCards({ data }: { data?: Record<string, number> }) {
  const userStats: StatCardItem[] = [
    {
      title: "إجمالي المستخدمين",
      value: data?.totalUsers ?? "1,248",
      icon: Users,
      iconClassName: "text-primary",
      bgClassName: "bg-primary/10",
    },
    {
      title: "عدد اللاعبين في فرق",
      value: data?.playersInTeams ?? 856,
      icon: UsersRound,
      iconClassName: "text-accent",
      bgClassName: "bg-accent/20",
    },
    {
      title: "عدد اللاعبين",
      value: data?.totalPlayers ?? "1,120",
      icon: UserCheck,
      iconClassName: "text-chart-2",
      bgClassName: "bg-chart-2/10",
    },
    {
      title: "المستخدمين الجدد هذا الشهر",
      value: data?.newUsersThisMonth ?? 142,
      icon: UserPlus,
      iconClassName: "text-chart-5",
      bgClassName: "bg-chart-5/10",
    },
  ];

  return <GenericKpiGrid items={userStats} />;
}
