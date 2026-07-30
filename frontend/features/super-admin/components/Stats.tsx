import StatCard from "@/features/admin/components/shared/StatCard";
import { Users, FileText, LogIn, UserCog } from "lucide-react";
import { getAppStats } from "../api/shared";
import Error from "@/app/error";

const Stats = async () => {
  const statsRes = await getAppStats();
  if (!statsRes.success) return <Error />;

  const stats = statsRes.data.appStats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title={"إجمالي المشرفين"}
        value={stats.totalAdmins}
        Icon={UserCog}
        description="المسجلين داخل اللعبة"
      />
      <StatCard
        title={"إجمالي الإجراءات"}
        value={stats.totalLogs}
        Icon={FileText}
        description="تابع نشاط اللعبة"
      />
      <StatCard
        title={"تسجيل الدخول"}
        value={stats.totalLogins}
        Icon={LogIn}
        description="إجمالي عمليات تسجيل الدخول"
      />
      <StatCard
        title={"إجمالي المستخدمين"}
        value={stats.totalUsers}
        Icon={Users}
        description="عدد اللاعبين"
      />
    </div>
  );
};

export default Stats;
