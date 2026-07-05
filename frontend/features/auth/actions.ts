"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ActionState } from "./types";

import { tryCatch } from "@/components/shared/try-catch";
import { authenticate } from "./auth-service";

export async function signIn(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const result = await authenticate("users/login", { email, password });

  if (!result.success) {
    return { error: result.error, userData: result.userData };
  }

  redirect(result.redirectPath as string);
}

export async function signup(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const result = await authenticate("users/signup", {
    name,
    email,
    password,
    passwordConfirm,
  });

  if (!result.success) {
    return { error: result.error, userData: result.userData };
  }

  redirect(result.redirectPath as string);
}

export async function forgotPassword(
  prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const email = formData.get("email") as string;

  const result = await tryCatch("users/forgot-password", "POST", { email });

  if (!result.success) {
    return { error: result.error, userData: result.userData };
  }

  return { success: result.success, message: result.message };
}

export async function resetPassword(
  token: string,
  prev: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const result = await tryCatch(`users/reset-password/${token}`, "PATCH", {
    password,
    passwordConfirm,
  });

  if (!result.success) {
    return { error: result.error };
  }

  redirect("/login");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect("/login");
}
