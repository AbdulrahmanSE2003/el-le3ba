"use server";

import { serverFetch } from "@/shared/api/server";
import { revalidatePath } from "next/cache";
import { NotificationsRes } from "../types/notification";

// Fetch all notifications action
export async function fetchNotifications(
  searchParams?: URLSearchParams,
): Promise<NotificationsRes> {
  const params = new URLSearchParams(searchParams);

  const response = await serverFetch(
    `admin/notifications?${params.toString()}`,
  );

  if (!response.success) {
    throw new Error(response.error as string);
  }

  return {
    status: response.success,
    campaigns: (response.data as NotificationsRes).campaigns,
  };
}

// Delete notification action
export async function deleteNotificationAction(
  notificationId: string,
  prevState: any,
) {
  const response = await serverFetch(
    `admin/notifications/${notificationId}`,
    "DELETE",
  );

  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }

  revalidatePath("/admin/notifications");

  return {
    success: true,
    message: "تم حذف الإشعار بنجاح",
  };
}
