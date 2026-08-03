import StatCard from "../shared/StatCard";

import { getNotificationsStats } from "../../api/shared";

import { BellDot, BellRing, Send, Users } from "lucide-react";

export async function NotificationsKpiCards() {
  const notificationsStatsRes = await getNotificationsStats();
  if (!notificationsStatsRes.success) return null;

  const stats = notificationsStatsRes.data.stats;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        Icon={BellRing}
        title="إجمالي الحملات"
        value={stats.totalCampaigns.value}
        description="جميع حملات الإشعارات التي تم إنشاءها"
      />

      <StatCard
        Icon={Send}
        title="عدد الإشعارات المقروءة"
        value={stats.readNotifications.value}
        description="إجمالي عدد الإشعارات التي تم قراءتها"
      />
      <StatCard
        Icon={BellDot}
        title="معدل القراءة"
        value={`${stats.readRate.value} %`}
        description="عدد الإشعارات التي تمت قراءتها"
      />

      <StatCard
        Icon={Users}
        title="إجمالي المستلمين"
        value={stats.totalRecipients.value}
        description="عدد الإشعارات التي وصلت للمستخدمين"
      />
    </div>
  );
}
