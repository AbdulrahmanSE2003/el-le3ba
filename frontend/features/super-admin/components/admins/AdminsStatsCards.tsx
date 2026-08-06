import { Users, UserX, Crown, LogIn } from "lucide-react";

import StatCard from "@/features/admin/components/shared/StatCard";
import { getAdminsStats } from "../../api/shared";
import Error from "@/app/error";

const AdminsStatsCards = async () => {
  const statsRes = await getAdminsStats();
  if (!statsRes.success) return <Error />;

  const stats = statsRes.data.adminStats;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="إجمالي المشرفين"
        value={stats.totalAdmins}
        Icon={Users}
        description="إجمالي عدد المشرفين"
      />
      <StatCard
        title="الغير نشطين"
        value={stats.inactiveAdmins}
        Icon={UserX}
        description="إجمالي حسابات المشرفين غير المفعلة"
      />
      <StatCard
        title="سوبر أدمن"
        value={stats.superAdmins}
        Icon={Crown}
        description="إجمالي عدد السوبر أدمن"
      />
      <StatCard
        title="تسجيل الدخول"
        value={stats.recentLogins}
        Icon={LogIn}
        description="عمليات تسجيل الدخول هذا الشهر"
      />
    </div>
  );
};

export default AdminsStatsCards;
