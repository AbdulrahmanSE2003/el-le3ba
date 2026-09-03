"use server";

import { serverFetch } from "@/shared/api/server";

// import { ActionResponse } from "../profile/types";

export interface ActionResponse {
  success: boolean;
  message?: string;
  error?: string;
}

import { redirect } from "next/navigation";

export async function selectAvatar(
  prevState: ActionResponse | null,
  avatar: string,
): Promise<ActionResponse> {
  const result = await serverFetch("users/me", "PATCH", { avatar });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "فشل اختيار الصورة",
    };
  }

  redirect("/dashboard");
}
