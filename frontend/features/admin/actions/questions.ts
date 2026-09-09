"use server";

import { serverFetch } from "@/shared/api/server";
import { revalidatePath } from "next/cache";
import { CreateQuestionInput, UpdateQuestionInput } from "../types/question";
import { ActionResponse } from "@/shared/types/response";
import type { ActionState } from "@/hooks/useFormFeedback";

// Strip options for non-mcq types so we never send a stale options array
function normalizePayload(data: CreateQuestionInput) {
  if (data.type === "mcq") return data;
  const { options, ...rest } = data;
  return rest;
}

// Create question action
export async function createQuestionAction(
  prevState: ActionState | null,
  data: CreateQuestionInput,
): Promise<ActionResponse> {
  const res = await serverFetch("questions", "POST", normalizePayload(data));

  if (!res.success) {
    return { success: false, error: res.error || "فشل إنشاء السؤال" };
  }

  revalidatePath("/admin/questions");

  return { success: true, message: "تم إنشاء السؤال بنجاح" };
}

// Update question action
export async function updateQuestionAction(
  questionId: string,
  prevState: ActionState | null,
  data: UpdateQuestionInput,
): Promise<ActionResponse> {
  const res = await serverFetch(
    `questions/${questionId}`,
    "PATCH",
    normalizePayload(data),
  );

  if (!res.success) {
    return { success: false, error: res.error || "فشل تعديل السؤال" };
  }

  revalidatePath("/admin/questions");

  return { success: true, message: "تم تعديل السؤال بنجاح" };
}

// Delete question action
export async function deleteQuestionAction(questionId: string, prevState: ActionState | null) {
  const response = await serverFetch(`questions/${questionId}`, "DELETE");

  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }

  revalidatePath("/admin/questions");

  return {
    success: true,
    message: "تم حذف السؤال بنجاح",
  };
}

// Bulk delete questions action
export async function bulkDeleteQuestionsAction(
  questionIds: string[],
): Promise<ActionResponse> {
  const res = await serverFetch("questions/bulk", "DELETE", { questionIds });

  if (!res.success) {
    return { success: false, error: res.error || "فشل حذف الأسئلة المحددة" };
  }

  revalidatePath("/admin/questions");

  return {
    success: true,
    message: `تم حذف ${questionIds.length} سؤال بنجاح`,
  };
}

// Bulk insert questions action
export async function bulkInsertQuestionsAction(
  questions: CreateQuestionInput[],
): Promise<ActionResponse> {
  const res = await serverFetch("questions/bulk", "POST", {
    questions: questions.map(normalizePayload),
  });

  if (!res.success) {
    return { success: false, error: res.error || "فشل استيراد الأسئلة" };
  }

  revalidatePath("/admin/questions");

  return {
    success: true,
    message: `تم استيراد ${questions.length} سؤال بنجاح`,
  };
}
