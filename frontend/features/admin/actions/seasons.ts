"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/shared/api/server";
import { ActionResponse } from "@/shared/types/response";
import { SeasonFormValues } from "../schema/SeasonSchema";

export async function createSeasonAction(
  values: SeasonFormValues,
): Promise<ActionResponse> {
  if (!values.title.trim()) {
    return { success: false, error: "اسم الموسم مطلوب" };
  }

  const result = await serverFetch({
    url: "seasons",
    method: "POST",
    body: values,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل إنشاء الموسم" };
  }

  revalidatePath("/admin/seasons");
  return { success: true, message: "تم إنشاء الموسم بنجاح" };
}

export async function updateSeasonAction(
  id: string,
  values: SeasonFormValues,
): Promise<ActionResponse> {
  if (!values.title.trim()) {
    return { success: false, error: "اسم الموسم مطلوب" };
  }

  const result = await serverFetch({
    url: `seasons/${id}`,
    method: "PATCH",
    body: values,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل تحديث الموسم" };
  }

  revalidatePath("/admin/seasons");
  return { success: true, message: "تم تحديث الموسم بنجاح" };
}

export async function deleteSeasonAction(id: string): Promise<ActionResponse> {
  const result = await serverFetch({
    url: `seasons/${id}`,
    method: "DELETE",
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل حذف الموسم" };
  }

  revalidatePath("/admin/seasons");
  return { success: true, message: "تم حذف الموسم بنجاح" };
}