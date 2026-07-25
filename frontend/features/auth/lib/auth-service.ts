import { cookies } from "next/headers";

import { serverFetch } from "@/shared/api/server";

import { AuthResponse } from "../types";

interface AuthPayload {
  auth?: {
    token: string;
    user?: {
      role: string;
    };
  };
}

export async function authenticate(
  url: string,
  body: object,
): Promise<AuthResponse> {
  const result = await serverFetch(url, "POST", body);

  if (!result.success) {
    return { error: result.error, userData: result.userData };
  }

  const payload = result.data as AuthPayload | undefined;
  const token = payload?.auth?.token;
  const role = payload?.auth?.user?.role;

  if (!token) {
    return { error: "لم يتم استلام رمز التحقق" };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return {
    success: true,
    message: result.message,
    redirectPath: role === "admin" ? "/admin/" : "/dashboard",
  };
}
