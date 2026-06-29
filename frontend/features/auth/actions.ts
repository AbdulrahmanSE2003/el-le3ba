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

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json();

    return {
      error: data.message || "Invalid Credentials",
      userData: { email, password },
    };
  }

  const resData = await res.json();
  const token = resData.auth.token;
  const role = resData.auth.user.role;

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true, // JS can't access it — prevents XSS attacks
    sameSite: "lax", // prevents CSRF attacks
    maxAge: 60 * 60 * 24,
  });

  redirect(role === "admin" ? "/admin/dashboard" : "/");
}
