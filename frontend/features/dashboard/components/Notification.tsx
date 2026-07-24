import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

import NotificationsList from "./NotificationsList";
import { getNotifications } from "@/shared/api/helpers";
import Error from "@/app/error";
import { Suspense } from "react";
import NotificationItemSkeleton from "./NotificationItemSkeleton";

const Notification = async () => {
  const notificationRes = await getNotifications();
  if (!notificationRes.success || !notificationRes.data) return <Error />;

  const notifications = notificationRes.data.notifications;

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full p-2 transition-colors hover:bg-muted group"
        >
          <Bell className="size-5 text-muted-foreground/90 group-hover:text-muted-foreground" />

          {notifications.unreadCount > 0 && (
            <span
              className={`absolute w-2.5 h-2.5 bg-primary right-1.5 top-0.5 rounded-full`}
            />
          )}
        </Button>
      </DrawerTrigger>

      <Suspense
        fallback={
          <div className="min-h-75 space-y-2.5 overflow-y-auto p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <NotificationItemSkeleton key={i} />
            ))}
          </div>
        }
      >
        <NotificationsList
          unreadCount={notifications.unreadCount}
          notifications={notifications.notifications}
        />
      </Suspense>
    </Drawer>
  );
};

export default Notification;
