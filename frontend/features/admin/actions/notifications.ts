"use server";

import { serverFetch } from "@/shared/api/server";
import { revalidatePath } from "next/cache";

export async function fetchNotifications(searchParams: string) {
  const response = await serverFetch("admin/notifications/campaigns");

  if (!response.success) {
    throw new Error("Failed to fetch notifications");
  }

  //   revalidatePath("/admin/notifications");
  return response.data;
}
