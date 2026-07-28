import { Shield, ShieldCheck, UserCheck, Clock } from "lucide-react";
import { GenericKpiGrid } from "@/features/admin/components/shared/GenericKpiGrid";
import { StatCardItem } from "@/features/admin/types/shared";

export function TeamsKpiCards({ data }: { data?: Record<string, number> }) {
  const teamStats: StatCardItem[] = [
    {
      title: "إجمالي الفرق",
      value: data?.totalTeams ?? 20,
      icon: Shield,
      iconClassName: "text-primary",
      bgClassName: "bg-primary/10",
    },
    {
      title: "الفرق النشطة",
      value: data?.activeTeams ?? 16,
      icon: ShieldCheck,
      iconClassName: "text-brand-success",
      bgClassName: "bg-brand-success/10",
    },
    {
      title: "الفرق المكتملة",
      value: data?.fullTeams ?? 11,
      icon: UserCheck,
      iconClassName: "text-accent",
      bgClassName: "bg-accent/20",
    },
    {
      title: "فرق تطلب أعضاء",
      value: data?.openTeams ?? 7,
      icon: Clock,
      iconClassName: "text-chart-5",
      bgClassName: "bg-chart-5/10",
    },
  ];

  return <GenericKpiGrid items={teamStats} />;
}
