import { tryCatch } from "@/components/shared/try-catch";

import { ActionResponse } from "../profile/types";

import { redirect } from "next/navigation";

export async function selectAvatar(
  prevState: ActionResponse | null,
  avatar: string,
): Promise<ActionResponse> {
  const result = await tryCatch("users/me", "PATCH", { avatar });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "فشل اختيار الصورة",
    };
  }

  redirect("/dashboard");
}
