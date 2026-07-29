import NotificationsContainer from "@/features/admin/components/notifications/NotificationsContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الإشعارات | الإدارة",
  description: "إدارة الإشعارات المرسلة للمستخدمين",
};

const page = () => {
  return (
    <section>
      <NotificationsContainer />
    </section>
  );
};

export default page;
