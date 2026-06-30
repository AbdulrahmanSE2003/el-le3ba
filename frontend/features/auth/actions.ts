"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ActionState } from "./types";

const API_URL = "http://127.0.0.1:5000/api/v1";

export async function signIn(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let redirectPath: string;

  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.message || "بيانات غير صحيحة",
        userData: { email, password },
      };
    }

    const resData = await res.json();
    const token = resData.auth?.token;
    const role = resData.auth.user.role;

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });

    redirectPath = role === "admin" ? "/admin/dashboard" : "/dashboard";
  } catch {
    return { error: "تعذر الاتصال بالخادم" };
  }

  redirect(redirectPath);
}

export async function signup(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  try {
    const res = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, passwordConfirm }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.message || "فشل إنشاء الحساب",
        userData: { name, email, password, passwordConfirm },
      };
    }

    const resData = await res.json();
    const token = resData.auth?.token;

    const cookieStore = await cookies();
    cookieStore.set("jwt", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
    });
  } catch {
    return { error: "تعذر الاتصال بالخادم" };
  }

  redirect("/dashboard");
}

export async function forgotPassword(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;

  try {
    const res = await fetch(`${API_URL}/users/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const data = await res.json();
      return {
        error: data.message || "فشل إرسال البريد الإلكتروني",
        userData: { email },
      };
    }

    const data = await res.json();
    return {
      success: true,
      message: data.message || "تم إرسال رابط إعادة التعيين بنجاح",
    };
  } catch {
    return { error: "تعذر الاتصال بالخادم" };
  }
}

export async function resetPassword(
  token: string,
  prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const res = await fetch(`${API_URL}/users/reset-password/${token}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password, passwordConfirm }),
  });

  try {
    const data = await res.json();

    if (!res.ok) {
      return {
        error: data.message || "فشل إعادة تعيين كلمة المرور",
      };
    }
  } catch (error) {
    return { error: "تعذر الاتصال بالخادم" };
  }

  redirect("/login");
}
