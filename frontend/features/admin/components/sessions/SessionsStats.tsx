import Error from "@/app/error";
import { getSessionsStats } from "../../api/sessions";
import { CalendarCheck2, Gauge, Play, Radio } from "lucide-react";
import StatCard from "@/features/admin/components/shared/StatCard";

const SessionsStats = async () => {
  const statsRes = await getSessionsStats();

  if (!statsRes.success) return <Error />;

  const { total, completed, running, averageScore } = statsRes.data.stats;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard Icon={Play} value={total} title="إجمالي المباريات" description="إجمالي المباريات التي تم لعبها." />

      <StatCard
        Icon={CalendarCheck2}
        value={completed}
        title="المباريات المكتملة"
        description="إجمالي المباريات المنتهية بشكل طبيعي."
      />

      <StatCard
        Icon={Radio}
        value={running}
        title="المباريات الجارية"
        description="عدد المباريات التي تلعب حالياً."
      />

      <StatCard
        Icon={Gauge}
        value={averageScore}
        title="متوسط السكور"
        description="متوسط السكور في المباريات."
      />
    </div>
  );
};

export default SessionsStats;
