import api from "@/lib/axios";

export const submitAnswer = async (
  sessionId: string,
  questionId: string,
  submittedAnswer: string,
  timeTaken: number,
) => {
  const res = await api.post(`/sessions/${sessionId}/answer`, {
    questionId,
    submittedAnswer: submittedAnswer || " ",
    timeTaken,
  });

  return res.data.answerDetails as import("@/features/match/types").LastAnswer;
};

export const abandonSession = async (sessionId: string): Promise<void> => {
  await api.post(`/sessions/${sessionId}/abandon`);
};

export interface SessionResult {
  score: number;
  correctAnswers: number;
  bestStreak: number;
}

export const getSessionResult = async (
  sessionId: string,
): Promise<SessionResult | null> => {
  try {
    const res = await api.get(`/sessions/${sessionId}`);
    return res.data.sessionDetails;
  } catch {
    return null;
  }
};

export type SessionStatus =
  | { status: "running" }
  | {
      status: "completed";
      score: number;
      correctAnswers: number;
      bestStreak: number;
    }
  | { status: "flagged" }
  | { status: "not_found" };

export const getSessionStatus = async (
  sessionId: string,
): Promise<SessionStatus> => {
  try {
    const res = await api.get(`/sessions/${sessionId}`);

    const d = res.data.sessionDetails;
    return {
      status: "completed",
      score: d.score,
      correctAnswers: d.correctAnswers,
      bestStreak: d.bestStreak,
    };
  } catch (err: unknown) {
    const axiosErr = err as {
      response?: { status?: number; data?: { message?: string } };
    };

    const status = axiosErr?.response?.status;
    const message = axiosErr?.response?.data?.message ?? "";
    if (status === 404) return { status: "not_found" };
    if (message?.includes("under processing")) return { status: "flagged" };
    if (message?.includes("not completed")) return { status: "running" };
    return { status: "running" };
  }
};
