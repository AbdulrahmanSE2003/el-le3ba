import Error from "@/app/error";
import { getEventsStats } from "../../api/events";
import {
  Calendar,
  CalendarClock,
  CalendarCheck2,
  CalendarDays,
} from "lucide-react";
import StatCard from "@/features/admin/components/shared/StatCard";

const EventsStats = async () => {
  const statsRes = await getEventsStats();

  if (!statsRes.success) return <Error />;

  const { total, scheduled, running, finished } = statsRes.data.stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        Icon={Calendar}
        value={total}
        title="إجمالي الأحداث"
        description=""
      />

      <StatCard
        Icon={CalendarCheck2}
        value={running}
        title="الأحداث النشطة"
        description=""
      />

      <StatCard
        Icon={CalendarClock}
        value={scheduled}
        title="الأحداث القادمة"
        description=""
      />

      <StatCard
        Icon={CalendarDays}
        value={finished}
        title="الأحداث المنتهية"
        description=""
      />
    </div>
  );
};

export default EventsStats;
