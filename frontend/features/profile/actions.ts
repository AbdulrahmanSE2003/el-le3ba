"use server";

import { tryCatch } from "@/components/shared/try-catch";
import { revalidatePath } from "next/cache";

import { ActionResponse } from "./types";

export async function updateName(name: string): Promise<ActionResponse> {
  if (name.trim().length <= 2) {
    return { success: false, error: "الاسم لازم يكون على الأقل 3 حروف" };
  }

  const result = await tryCatch("users/me", "PATCH", { name: name.trim() });

  if (!result.success) {
    return { success: false, error: result.error || "فشل تحديث الاسم" };
  }

  revalidatePath("/profile");
  return { success: true, message: "تم تحديث الاسم بنجاح" };
}

export async function changePassword(
  oldPassword: string,
  newPassword: string,
  newPasswordConfirm: string,
): Promise<ActionResponse> {
  if (!oldPassword || !newPassword || !newPasswordConfirm) {
    return { success: false, error: "من فضلك املأ كل الحقول" };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      error: "كلمة السر الجديدة لازم تكون على الأقل 8 حروف",
    };
  }

  if (newPassword !== newPasswordConfirm) {
    return { success: false, error: "كلمات السر مش متطابقة" };
  }

  const result = await tryCatch("users/me/change-password", "PATCH", {
    oldPassword,
    newPassword,
    newPasswordConfirm,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "فشل تغيير كلمة السر",
    };
  }

  revalidatePath("/profile");
  return { success: true, message: "تم تغيير كلمة السر بنجاح" };
}
