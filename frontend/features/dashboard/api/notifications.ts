import api from "@/lib/axios";
import type { INotificationItem } from "../components/NotificationItem";

interface NotificationRes {
  status: boolean;
  notifications: {
    notifications: INotificationItem[];
    unreadCount: number;
  };
}

export async function fetchNotifications(): Promise<INotificationItem[]> {
  const { data } = await api.get<NotificationRes>("/notifications");
  return data.notifications.notifications;
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await api.patch(`/notifications/${id}`);
}

export async function markAllNotificationsAsRead(): Promise<void> {
  await api.patch("/notifications/all");
}
