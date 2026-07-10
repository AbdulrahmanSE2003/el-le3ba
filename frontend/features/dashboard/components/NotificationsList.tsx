"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import NotificationItem, { INotificationItem } from "./NotificationItem";
import EmptyNotifications from "./EmptyNotifications";
import NotificationItemSkeleton from "./NotificationItemSkeleton";

interface Props {
  loading: boolean;
  notifications: INotificationItem[];
  isMarkingAll: boolean;
  onRead: (id: string) => void;
  onReadAll: () => void;
}

const NotificationsList = ({
  loading,
  notifications,
  isMarkingAll,
  onRead,
  onReadAll,
}: Props) => {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle className="text-right text-xl font-semibold text-primary">
          قائمة الإشعارات
        </DrawerTitle>

        <DrawerDescription className="text-right">
          تابع آخر التحديثات، والإشعارات المهمة والجوائز.
        </DrawerDescription>
      </DrawerHeader>

      <div className="min-h-75 space-y-2.5 overflow-y-auto p-4">
        {loading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <NotificationItemSkeleton key={index} />
          ))
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
              onRead={onRead}
            />
          ))
        ) : (
          <EmptyNotifications />
        )}
      </div>

      <DrawerFooter>
        <Button
          className={`disabled:cursor-not-allowed `}
          onClick={onReadAll}
          disabled={unreadCount === 0 || isMarkingAll}
        >
          {unreadCount > 0
            ? `تعليم الكل كمقروء (${unreadCount})`
            : "كل الإشعارات مقروءة"}
        </Button>

        <DrawerClose asChild>
          <Button variant="outline">إغلاق النافذة</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default NotificationsList;
