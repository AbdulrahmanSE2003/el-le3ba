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

import NotificationItem from "./NotificationItem";
import EmptyNotifications from "./EmptyNotifications";
import { INotificationItem } from "@/shared/api/helpers";
import { markAllNotificationsAsRead } from "../api/notifications";

interface Props {
  notifications: INotificationItem[];
  unreadCount: number;
}

const NotificationsList = ({ notifications, unreadCount }: Props) => {
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
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem
              key={notification._id}
              notification={notification}
            />
          ))
        ) : (
          <EmptyNotifications />
        )}
      </div>

      <DrawerFooter>
        <Button
          className={`disabled:cursor-not-allowed `}
          onClick={markAllNotificationsAsRead}
          disabled={unreadCount === 0}
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
