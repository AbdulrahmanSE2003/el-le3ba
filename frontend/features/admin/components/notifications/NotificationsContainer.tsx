import PageHeader from "@/features/admin/components/shared/PageHeader";
import { NotificationsKpiCards } from "@/features/admin/components/notifications/NotificationsKpiCards";
import NotificationFilter from "./notification-filter/NotificationFilter";
import NotificationsTable from "./notification-table/NotificationsTable";
import SendNotification from "./send-notification/SendNotification";

import { Suspense } from "react";

import StatsCardsSkeleton from "../StatsCardsSkeleton";

import { fetchNotifications } from "../../actions/notifications";

import { tableHeaders } from "./constants/constants";

import Error from "@/app/error";

interface Props {
  searchParams: Promise<URLSearchParams>;
}

export default async function NotificationsContainer({ searchParams }: Props) {
  const params = await searchParams;

  const { campaigns } = await fetchNotifications(params);

  if (!campaigns) {
    return <Error />;
  }

  return (
    <div dir="rtl" className="p-3 space-y-6 text-right font-body">
      <div className="flex items-center justify-between">
        <PageHeader
          title="الإشعارات"
          description="سجل كل الإشعارات اللي اتبعتت للمستخدمين، الفرق، والمواسم."
        />
        <SendNotification />
      </div>

      <Suspense fallback={<StatsCardsSkeleton />}>
        <NotificationsKpiCards />
      </Suspense>

      <Suspense fallback={<div>جاري التحميل...</div>}>
        <div className="space-y-4">
          <NotificationFilter />

          <NotificationsTable
            tableHeaders={tableHeaders}
            campaigns={campaigns}
          />
        </div>
      </Suspense>
    </div>
  );
}
