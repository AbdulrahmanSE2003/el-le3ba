"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Bell } from "lucide-react";
import api from "@/lib/axios";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";

import NotificationsList from "./NotificationsList";
import { INotificationItem } from "./NotificationItem";
import { toast } from "sonner";

interface NotificationRes {
  status: boolean;
  notifications: {
    notifications: INotificationItem[];
    unreadCount: number;
  };
}

const Notification = () => {
  const [isMarkingAll, setIsMarkingAll] = useState(false);
  const [notifications, setNotifications] = useState<INotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get<NotificationRes>("/notifications");

      setNotifications(data.notifications.notifications);
    } catch {
      toast.error("تعذر تحميل الإشعارات.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchNotifications();
  }, [fetchNotifications]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.isRead).length,
    [notifications],
  );

  const markAsRead = async (id: string) => {
    const previous = [...notifications];

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );

    try {
      await api.patch(`/notifications/${id}`);
    } catch {
      setNotifications(previous);
      toast.error("حدث خطأ برجاء المحاولة لاحقًا.");
    }
  };

  const markAllAsRead = async () => {
    if (isMarkingAll || unreadCount === 0) return;
    setIsMarkingAll(true);

    const previous = [...notifications];

    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        isRead: true,
      })),
    );

    try {
      await api.patch("/notifications/all");
      toast.success("تم تعليم جميع الإشعارات كمقروءة.");
    } catch {
      setNotifications(previous);
      toast.error("حدث خطأ برجاء المحاولة لاحقًا.");
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="relative rounded-full p-2 transition-colors hover:bg-muted group"
        >
          <Bell className="size-5 text-muted-foreground/90 group-hover:text-muted-foreground" />

          {unreadCount > 0 && (
            <span
              className={`absolute w-2.5 h-2.5 bg-primary right-1.5 top-0.5 rounded-full`}
            />
          )}
        </Button>
      </DrawerTrigger>

      <NotificationsList
        loading={loading}
        notifications={notifications}
        isMarkingAll={isMarkingAll}
        onRead={markAsRead}
        onReadAll={markAllAsRead}
      />
    </Drawer>
  );
};

export default Notification;
