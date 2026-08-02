import NotificationsContainer from "@/features/admin/components/notifications/NotificationsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإشعارات | الإدارة",
  description: "إدارة الإشعارات المرسلة للمستخدمين",
};

interface PageProps {
  searchParams: Promise<URLSearchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  return <NotificationsContainer searchParams={searchParams} />;
}
