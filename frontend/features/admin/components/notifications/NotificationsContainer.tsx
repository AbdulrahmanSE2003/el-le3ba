import PageHeader from "@/features/admin/components/shared/PageHeader";
import { NotificationsKpiCards } from "@/features/admin/components/notifications/NotificationsKpiCards";
import { NotificationsPagination } from "@/features/admin/components/notifications/pagination/NotificationsPagination";
import NotificationFilter from "./notification-filter/NotificationFilter";
import NotificationsTable from "./notification-table/NotificationsTable";

import { Suspense } from "react";
import StatsCardsSkeleton from "../StatsCardsSkeleton";
import NotificationsContentContainer from "./NotificationsContentContainer";
import SendNotification from "./SendNotification";

export default async function NotificationsContainer() {
  return (
    <div className="p-3 space-y-6 dir-rtl text-right font-body">
      <div className={`flex items-center justify-between`}>
        <PageHeader
          title="الإشعارات"
          description="سجل كل الإشعارات اللي اتبعتت للمستخدمين، الفرق، والمواسم."
        />
        <SendNotification />
      </div>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <NotificationsKpiCards />
      </Suspense>

      {/* TODO handle skeleton loading */}
      <Suspense fallback={<div className={``}>ss</div>}>
        <NotificationsContentContainer />
      </Suspense>
    </div>
  );
}
