import { Play, Radio, CalendarCheck2, Timer } from "lucide-react";

import { StatCard } from "@/features/admin/components/users/UsersKpiCards";
import { SessionsKpis } from "@/features/admin/types/session";

function formatDuration(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remaining = Math.round(seconds % 60);
  return `${minutes}:${remaining.toString().padStart(2, "0")}`;
}

export function SessionsKpiCards({ kpis }: { kpis: SessionsKpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="إجمالي المباريات"
        value={kpis.totalSessions.toLocaleString("ar-EG")}
        icon={Play}
        iconClassName="text-primary"
        bgClassName="bg-primary/10"
      />

      <StatCard
        title="مباريات شغالة الآن"
        value={kpis.liveNow}
        icon={Radio}
        iconClassName="text-sky-500"
        bgClassName="bg-sky-500/10"
      />

      <StatCard
        title="مكتملة النهاردة"
        value={kpis.completedToday}
        icon={CalendarCheck2}
        iconClassName="text-emerald-500"
        bgClassName="bg-emerald-500/10"
      />

      <StatCard
        title="متوسط مدة المباراة"
        value={formatDuration(kpis.avgDurationSeconds)}
        icon={Timer}
        iconClassName="text-chart-5"
        bgClassName="bg-chart-5/10"
      />
    </div>
  );
}
