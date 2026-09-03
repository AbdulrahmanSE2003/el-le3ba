import StatCard from "../shared/StatCard";

import { getNotificationsStats } from "../../api/shared";

import { BellDot, BellRing, Send, Users } from "lucide-react";

export async function NotificationsKpiCards() {
  const notificationsStatsRes = await getNotificationsStats();
  if (!notificationsStatsRes.success) return null;

  const stats = notificationsStatsRes.data.stats;

  const notificationsKpis = [
    {
      title: "إجمالي الحملات",
      value: stats.totalCampaigns.value,
      Icon: BellRing,
      description: "جميع حملات الإشعارات التي تم إنشاؤها",
    },
    {
      title: "عدد الإشعارات المقروءة",
      value: stats.readNotifications.value,
      Icon: Send,
      description: "إجمالي عدد الإشعارات التي تم قراءتها",
    },
    {
      title: "معدل القراءة",
      value: `${stats.readRate.value} %`,
      Icon: BellDot,
      description: "عدد الإشعارات التي تمت قراءتها",
    },
    {
      title: "إجمالي المستلمين",
      value: stats.totalRecipients.value,
      Icon: Users,
      description: "عدد الإشعارات التي وصلت للمستخدمين",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {notificationsKpis.map((kpi) => (
        <StatCard key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
