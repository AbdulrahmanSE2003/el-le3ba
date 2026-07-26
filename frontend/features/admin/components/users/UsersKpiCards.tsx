import { StatCardProps } from "@/features/admin/types/StatCardProps";
import { Users, UserCheck, UsersRound, UserPlus } from "lucide-react";

export function UsersKpiCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="إجمالي المستخدمين"
        value="1,248"
        icon={Users}
        iconClassName="text-primary"
        bgClassName="bg-primary/10"
      />

      <StatCard
        title="عدد اللاعبين في فرق"
        value={856}
        icon={UsersRound}
        iconClassName="text-accent"
        bgClassName="bg-accent/20"
      />

      <StatCard
        title="عدد اللاعبين"
        value="1,120"
        icon={UserCheck}
        iconClassName="text-chart-2"
        bgClassName="bg-chart-2/10"
      />

      <StatCard
        title="المستخدمين الجدد هذا الشهر"
        value={142}
        icon={UserPlus}
        iconClassName="text-chart-5"
        bgClassName="bg-chart-5/10"
      />
    </div>
  );
}

export function StatCard({
  title,
  value,
  icon: Icon,
  iconClassName = "text-primary",
  bgClassName = "bg-primary/10",
}: StatCardProps) {
  return (
    <div className="bg-card border border-border p-4 py-6 rounded-xl shadow-sm flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground font-medium mb-2">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${bgClassName}`}>
        <Icon className={`w-6 h-6 ${iconClassName}`} />
      </div>
    </div>
  );
}
