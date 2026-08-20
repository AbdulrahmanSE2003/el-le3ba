import Error from "@/app/error";
import { getSeasonsStats } from "../../api/seasons";
import {
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CalendarDays,
} from "lucide-react";
import StatCard from "@/features/admin/components/shared/StatCard";

const SeasonsStats = async () => {
  const statsRes = await getSeasonsStats();

  if (!statsRes.success) return <Error />;

  const { total, active, upcoming, knockout, ended } = statsRes.data.stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        Icon={Calendar}
        value={total}
        title="إجمالي المواسم"
        description=""
      />

      <StatCard
        Icon={CalendarCheck2}
        value={active}
        title="المواسم النشطة"
        description=""
      />

      <StatCard
        Icon={CalendarClock}
        value={upcoming}
        title="المواسم القادمة"
        description=""
      />

      <StatCard
        Icon={CalendarDays}
        value={knockout}
        title="مواسم الإقصائيات"
        description=""
      />
    </div>
  );
};

export default SeasonsStats;
