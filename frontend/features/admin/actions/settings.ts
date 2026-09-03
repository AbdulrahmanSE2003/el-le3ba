"use server";

import { revalidatePath } from "next/cache";

import { serverFetch } from "@/shared/api/server";
import { ActionResponse } from "@/shared/types/response";
import {
  GeneralSettings,
  QuizDefaultsSettings,
  SecuritySettings,
} from "../types/settings";

/**
 * Backend contract: PATCH /admin/settings/general
 * Body: GeneralSettings
 */
export async function updateGeneralSettings(
  values: GeneralSettings,
): Promise<ActionResponse> {
  if (!values.platformName.trim()) {
    return { success: false, error: "اسم المنصة مطلوب" };
  }

  const result = await serverFetch("admin/settings/general", "PATCH", {
    ...values,
    platformName: values.platformName.trim(),
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل حفظ الإعدادات" };
  }

  revalidatePath("/admin/settings");
  return { success: true, message: "تم حفظ الإعدادات العامة" };
}

/**
 * Backend contract: PATCH /admin/settings/quiz-defaults
 * Body: QuizDefaultsSettings
 */
export async function updateQuizDefaults(
  values: QuizDefaultsSettings,
): Promise<ActionResponse> {
  if (values.defaultMaxAttempts < 1) {
    return { success: false, error: "عدد المحاولات لازم يكون 1 على الأقل" };
  }

  if (values.questionsPerSession < 1) {
    return { success: false, error: "عدد الأسئلة لازم يكون 1 على الأقل" };
  }

  if (values.secondsPerQuestion < 5) {
    return { success: false, error: "وقت السؤال لازم يكون 5 ثواني على الأقل" };
  }

  const result = await serverFetch(
    "admin/settings/quiz-defaults",
    "PATCH",
    values,
  );

  if (!result.success) {
    return { success: false, error: result.error || "فشل حفظ إعدادات المسابقة" };
  }

  revalidatePath("/admin/settings");
  return { success: true, message: "تم حفظ إعدادات المسابقة الافتراضية" };
}

/**
 * Backend contract: PATCH /admin/settings/security
 * Body: SecuritySettings
 */
export async function updateSecuritySettings(
  values: SecuritySettings,
): Promise<ActionResponse> {
  if (values.sessionExpiryDays < 1) {
    return { success: false, error: "مدة الجلسة لازم تكون يوم واحد على الأقل" };
  }

  if (values.maxLoginAttempts < 1) {
    return {
      success: false,
      error: "عدد محاولات الدخول لازم يكون 1 على الأقل",
    };
  }

  const result = await serverFetch(
    "admin/settings/security",
    "PATCH",
    values,
  );

  if (!result.success) {
    return { success: false, error: result.error || "فشل حفظ إعدادات الأمان" };
  }

  revalidatePath("/admin/settings");
  return { success: true, message: "تم حفظ إعدادات الأمان" };
}

/**
 * Invites a new admin by email.
 * Backend contract: POST /admin/settings/admins
 * Body: { email: string, role: "admin" | "superAdmin" }
 * Expected behaviour: if the email belongs to an existing user, promote them;
 * otherwise send an invite email so they can set up their account.
 */
export async function inviteAdmin(
  email: string,
  role: "admin" | "superAdmin",
): Promise<ActionResponse> {
  const trimmedEmail = email.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return { success: false, error: "البريد الإلكتروني غير صحيح" };
  }

  const result = await serverFetch("admin/settings/admins", "POST", {
    email: trimmedEmail,
    role,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل إضافة الأدمن" };
  }

  revalidatePath("/admin/settings");
  return { success: true, message: "تم إرسال الدعوة بنجاح" };
}

/**
 * Backend contract: DELETE /admin/settings/admins/:adminId
 * Should reject removing the last remaining superAdmin, and reject
 * removing yourself while you are the only superAdmin.
 */
export async function removeAdmin(adminId: string): Promise<ActionResponse> {
  if (!adminId) {
    return { success: false, error: "الحساب غير موجود" };
  }

  const result = await serverFetch(
    `admin/settings/admins/${adminId}`,
    "DELETE",
  );

  if (!result.success) {
    return { success: false, error: result.error || "فشل إزالة صلاحيات الأدمن" };
  }

  revalidatePath("/admin/settings");
  return { success: true, message: "تم إزالة صلاحيات الأدمن" };
}
