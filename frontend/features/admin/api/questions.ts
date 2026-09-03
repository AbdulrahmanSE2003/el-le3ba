import { serverFetch } from "@/shared/api/server";
import { QuestionMetadata, QuestionsRes, QuestionStats } from "../types/question";

export async function getQuestionsStats(): Promise<QuestionStats> {
  const res = await serverFetch("questions/stats");

  return res as QuestionStats;
}

// Fetch all questions action
export async function fetchQuestions(
  searchParams?: URLSearchParams,
): Promise<QuestionsRes> {
  const params = new URLSearchParams(searchParams);
  const res = await serverFetch(`questions?${params.toString()}`);

  return res as QuestionsRes;
}