"use server";

import { serverFetch } from "@/shared/api/server";
import { revalidatePath } from "next/cache";
import { NotificationsRes } from "../types/notification";

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
