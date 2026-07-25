"use server";

import { serverFetch } from "@/shared/api/server";
import { ActionResponse } from "@/shared/types/response";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create a new team
export async function createTeam(teamName: string): Promise<ActionResponse> {
  if (teamName.trim().length < 2) {
    return { success: false, error: "اسم الفريق لازم يكون على الأقل حرفين" };
  }

  if (teamName.trim().length > 20) {
    return { success: false, error: "اسم الفريق لا يمكن أن يتجاوز 20 حرف" };
  }

  const result = await serverFetch("teams", "POST", {
    teamName: teamName.trim(),
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل إنشاء الفريق" };
  }

  revalidatePath("/team");
  return { success: true, message: "تم إنشاء الفريق بنجاح" };
}

// Change the team name
export async function changeTeamName(
  teamId: string,
  newTeamName: string,
): Promise<ActionResponse> {
  if (newTeamName.trim().length < 2) {
    return { success: false, error: "اسم الفريق لازم يكون على الأقل حرفين" };
  }

  if (newTeamName.trim().length > 20) {
    return {
      success: false,
      error: "اسم الفريق لا يمكن أن يتجاوز 20 حرف",
    };
  }

  const result = await serverFetch(`teams/${teamId}/name`, "PATCH", {
    newTeamName: newTeamName.trim(),
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل تحديث اسم الفريق" };
  }

  revalidatePath("/team");
  return { success: true, message: "تم تحديث اسم الفريق بنجاح" };
}

// Delete the entire team (captain only)
export async function deleteTeam(): Promise<ActionResponse | undefined> {
  const result = await serverFetch("teams/my-team", "DELETE");

  if (!result.success) {
    return { success: false, error: result.error || "فشل حذف الفريق" };
  }

  revalidatePath("/team");
  redirect("/team");
}

// Transfer captaincy to another member
export async function changeCaptain(
  teamId: string,
  newCaptainId: string,
): Promise<ActionResponse> {
  if (!newCaptainId) {
    return { success: false, error: "من فضلك اختار العضو الجديد" };
  }

  const result = await serverFetch(`teams/${teamId}/captain`, "PATCH", {
    newCaptainId,
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل نقل القيادة" };
  }

  revalidatePath("/team");
  return { success: true, message: "تم نقل القيادة بنجاح" };
}

// Kick a member from the team
export async function kickMember(
  teamId: string,
  userId: string,
): Promise<ActionResponse> {
  if (!userId) {
    return { success: false, error: "من فضلك اختار العضو" };
  }

  const result = await serverFetch(
    `teams/${teamId}/members/${userId}`,
    "DELETE",
  );

  if (!result.success) {
    return { success: false, error: result.error || "فشل طرد العضو" };
  }

  revalidatePath("/team");
  return { success: true, message: "تم طرد العضو بنجاح" };
}

// Join a team using an invite code
export async function joinTeam(teamCode: string): Promise<ActionResponse> {
  if (!teamCode.trim()) {
    return { success: false, error: "من فضلك ادخل كود الفريق" };
  }

  const result = await serverFetch("teams/join", "POST", {
    teamCode: teamCode.trim(),
  });

  if (!result.success) {
    return { success: false, error: result.error || "فشل الانضمام للفريق" };
  }

  revalidatePath("/team");
  return { success: true, message: "تم الانضمام للفريق بنجاح" };
}

// Leave the current team (member or captain)
export async function leaveTeam(): Promise<ActionResponse> {
  const result = await serverFetch("teams/leave", "DELETE");

  if (!result.success) {
    return { success: false, error: result.error || "فشل مغادرة الفريق" };
  }

  revalidatePath("/team");
  redirect("/team");
}
