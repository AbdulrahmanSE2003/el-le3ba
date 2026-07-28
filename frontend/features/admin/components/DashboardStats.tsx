import Error from "@/app/error";
import { getDashboardStats } from "../api/shared";
import StatCard from "./shared/StatCard";
import { Play, Trophy, User, Users } from "lucide-react";

const DashboardStats = async () => {
  const statsRes = await getDashboardStats();
  if (!statsRes.success) return <Error />;

  const stats = statsRes.data.stats;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="إجمالي المستخدمين"
        value={stats.totalUsers.total}
        description="مقارنة بالشهر الماضي"
        change={stats.totalUsers.change}
        Icon={User}
      />
      <StatCard
        title="إجمالي الفرق"
        value={stats.totalTeams.total}
        description="مقارنة بالشهر الماضي"
        change={stats.totalTeams.change}
        Icon={Users}
      />
      <StatCard
        title="إجمالي الجلسات "
        value={stats.totalSessions.total}
        description="تم إكمالها"
        change={stats.totalSessions.change}
        Icon={Play}
      />
      <StatCard
        title="إجمالي الأحداث "
        value={stats.totalEvents}
        description="تم إنشاءها"
        Icon={Trophy}
      />
    </div>
  );
};

export default DashboardStats;
