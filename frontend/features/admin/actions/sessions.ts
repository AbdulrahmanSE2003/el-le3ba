"use server";

import { revalidatePath } from "next/cache";

import { serverFetch } from "@/shared/api/server";
import { ActionResponse } from "@/shared/types/response";

/**
 * Force-ends a session that is still `in_progress`.
 * Backend contract: PATCH /admin/sessions/:sessionId/end
 * Expected to mark the session as `abandoned` and stop accepting answers.
 */
export async function endSession(sessionId: string): Promise<ActionResponse> {
  if (!sessionId) {
    return { success: false, error: "المباراة غير موجودة" };
  }

  const result = await serverFetch(
    `admin/sessions/${sessionId}/end`,
    "PATCH",
  );

  if (!result.success) {
    return { success: false, error: result.error || "فشل إيقاف المباراة" };
  }

  revalidatePath("/admin/sessions");
  return { success: true, message: "تم إيقاف المباراة بنجاح" };
}

/**
 * Permanently deletes a session record.
 * Backend contract: DELETE /admin/sessions/:sessionId
 * Should be rejected server-side for sessions that are still `in_progress`.
 */
export async function deleteSession(
  sessionId: string,
): Promise<ActionResponse> {
  if (!sessionId) {
    return { success: false, error: "المباراة غير موجودة" };
  }

  const result = await serverFetch(`admin/sessions/${sessionId}`, "DELETE");

  if (!result.success) {
    return { success: false, error: result.error || "فشل حذف المباراة" };
  }

  revalidatePath("/admin/sessions");
  return { success: true, message: "تم حذف المباراة بنجاح" };
}
