import api from "@/lib/axios";

export const startSession = async () => {
  const res = await api.post("/sessions/start");
  return res.data;
};

export const submitAnswer = async (
  sessionId: string,
  questionId: string,
  submittedAnswer: string,
  timeTaken: number,
) => {
  const res = await api.post(`/sessions/${sessionId}/answer`, {
    questionId,
    submittedAnswer,
    timeTaken,
  });

  return res.data.answerDetails;
};

export const abandonSession = async (sessionId: string): Promise<void> => {
  await api.post(`/sessions/${sessionId}/abandon`);
};
