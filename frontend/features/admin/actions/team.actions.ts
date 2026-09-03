"use server";

import { serverFetch } from "@/shared/api/server";

export async function bulkDeactivateTeamsAction(teamIds: string[]) {
  try {
    if (!Array.isArray(teamIds) || teamIds.length === 0) {
      return {
        success: false as const,
        error: "يرجى تحديد فريق واحد على الأقل",
      };
    }

    const results = await Promise.all(
      teamIds.map((teamId) =>
        serverFetch({
          url: `admin/teams/${teamId}`,
          method: "DELETE",
        }),
      ),
    );

    const failed = results.find((result) => !result.success);

    if (failed) {
      return {
        success: false as const,
        error: failed.error || "فشل في إلغاء تفعيل بعض الفرق",
      };
    }

    return {
      success: true as const,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false as const,
      error: "حدث خطأ غير متوقع أثناء إلغاء تفعيل الفرق",
    };
  }
}
