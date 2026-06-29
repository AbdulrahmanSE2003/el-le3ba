"use server";

import { ActionState } from "./types";

const API_URL = "";

export async function signIn(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  

  
}

/**
 * Mock Sign Up Server Action
 */
export async function signUp(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  const errors: ActionState["errors"] = {};

  if (!name || name.trim().length < 2) {
    errors.name = ["الاسم يجب أن يكون ثنائياً على الأقل"];
  }
  if (!email || !email.includes("@")) {
    errors.email = ["الرجاء إدخال بريد إلكتروني صالح"];
  }
  if (!password || password.length < 6) {
    errors.password = ["يجب أن تكون كلمة المرور 6 أحرف على الأقل"];
  }
  if (password !== confirmPassword) {
    errors.confirmPassword = ["كلمتا المرور غير متطابقتين"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      userData: { name, email },
      message: "الرجاء التحقق من البيانات المدخلة",
    };
  }

  // Mock behavior for existing email
  if (email === "exists@elle3ba.com") {
    return {
      success: false,
      errors: { email: ["هذا البريد الإلكتروني مسجل بالفعل"] },
      userData: { name, email },
      message: "البريد الإلكتروني مستخدم بالفعل",
    };
  }

  return {
    success: true,
    message: "تم إنشاء الحساب بنجاح!",
    userData: { name, email },
  };
}

/**
 * Mock Forgot Password Server Action
 */
export async function forgotPassword(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  const email = formData.get("email") as string;

  const errors: ActionState["errors"] = {};

  if (!email || !email.includes("@")) {
    errors.email = ["الرجاء إدخال بريد إلكتروني صالح"];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      userData: { email },
      message: "الرجاء التحقق من البريد الإلكتروني",
    };
  }

  if (email === "notfound@elle3ba.com") {
    return {
      success: false,
      errors: { email: ["لم نجد حساباً مسجلاً بهذا البريد الإلكتروني"] },
      userData: { email },
    };
  }

  return {
    success: true,
    message:
      "تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني بنجاح.",
    userData: { email },
  };
}
