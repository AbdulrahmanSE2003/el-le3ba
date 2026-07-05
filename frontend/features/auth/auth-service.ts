import { tryCatch } from "@/components/shared/try-catch";

import { cookies } from "next/headers";

import { AuthResponse } from "./types";

export async function authenticate(
  url: string,
  body: object,
): Promise<AuthResponse> {
  const result = await tryCatch(url, "POST", body);

  if (!result.success) {
    return { error: result.error, userData: result.userData };
  }

  const token = result.data.auth?.token;
  const role = result.data.auth?.user?.role;

  const cookieStore = await cookies();
  cookieStore.set("jwt", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 90,
    path: "/",
  });

  return {
    success: true,
    message: result.message,
    redirectPath: role === "admin" ? "/admin/dashboard" : "/dashboard",
  };
}
