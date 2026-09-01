"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/api/server";
import { ActionResponse } from "@/shared/types/response";
import { EventFormValues } from "../schema/EventSchema";

export async function createEventAction(
  values: EventFormValues,
): Promise<ActionResponse> {
  if (!values.title.trim()) {
    return { success: false, error: "اسم الحدث مطلوب" };
  }

  if (!values.seasonId) {
    return { success: false, error: "الموسم مطلوب" };
  }

  const result = await serverFetch({
    url: "events",
    method: "POST",
    body: values,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل إنشاء الحدث" };
  }

  revalidatePath("/admin/events");
  return { success: true, message: "تم إنشاء الحدث بنجاح" };
}

export async function updateEventAction(
  id: string,
  values: EventFormValues,
): Promise<ActionResponse> {
  if (!values.title.trim()) {
    return { success: false, error: "اسم الحدث مطلوب" };
  }

  if (!values.seasonId) {
    return { success: false, error: "الموسم مطلوب" };
  }

  const result = await serverFetch({
    url: `events/${id}`,
    method: "PATCH",
    body: values,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل تحديث الحدث" };
  }

  revalidatePath("/admin/events");
  return { success: true, message: "تم تحديث الحدث بنجاح" };
}

export async function deleteEventAction(id: string): Promise<ActionResponse> {
  const result = await serverFetch({
    url: `events/${id}`,
    method: "DELETE",
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل حذف الحدث" };
  }

  revalidatePath("/admin/events");
  return { success: true, message: "تم حذف الحدث بنجاح" };
}
