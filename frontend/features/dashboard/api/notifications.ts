"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/api/server";

export async function markNotificationAsRead(id: string): Promise<void> {
  await serverFetch(`notifications/${id}`, "PATCH");
  revalidatePath("/dashboard");
}
