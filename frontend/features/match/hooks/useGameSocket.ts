"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectSocket, onGlobalConnectError } from "@/features/match/lib/socket";
import { useGameStore } from "@/features/match/store/gameStore";
import type { QuestionResultPayload } from "@/features/match/lib/socket";
import { toast } from "sonner";

interface Props {
  teamId: string;
  sessionId: string;
  userId: string;
  onAnswerLocked: (questionId: string) => void;
  onQuestionResult: (payload: QuestionResultPayload) => void;
}

export const useGameSocket = ({
  teamId,
  sessionId,
  userId,
  onAnswerLocked,
  onQuestionResult,
}: Props) => {
  const router = useRouter();
  const { nextQuestion } = useGameStore();

  useEffect(() => {
    if (!teamId || !sessionId || !userId) return;

    const socket = connectSocket();

    const handleConnect = () => {
      socket.emit("join-lobby", { teamId, userId });
    };

    const handleConnectError = () => {
      toast.error("مش قادر أتصل بالسيرفر، جرب تاني.");
    };

    const handleAnswerLocked = (payload: { questionId: string }) => {
      onAnswerLocked(payload.questionId);
    };

    const handleQuestionResult = (payload: QuestionResultPayload) => {
      onQuestionResult(payload);
    };

    const handleNextQuestion = () => {
      nextQuestion();
    };

    const handleGameEnded = (payload: { abandoned?: boolean }) => {
      const sid = useGameStore.getState().sessionId;

      if (payload.abandoned) {
        useGameStore.getState().resetGame();
        router.replace("/match");
        return;
      }
      if (sid) {
        router.replace(`/result/${sid}`);
      } else {
        router.replace(`/match`);
      }
    };

    if (socket.connected) {
      handleConnect();
    }

    onGlobalConnectError(handleConnectError);

    socket.on("connect", handleConnect);
    socket.on("answer-locked", handleAnswerLocked);
    socket.on("question-result", handleQuestionResult);
    socket.on("next-question", handleNextQuestion);
    socket.on("game-ended", handleGameEnded);

    return () => {
      onGlobalConnectError(null);
      socket.off("connect", handleConnect);
      socket.off("answer-locked", handleAnswerLocked);
      socket.off("question-result", handleQuestionResult);
      socket.off("next-question", handleNextQuestion);
      socket.off("game-ended", handleGameEnded);
    };
  }, [
    teamId,
    sessionId,
    userId,
    onAnswerLocked,
    onQuestionResult,
    nextQuestion,
    router,
  ]);
};
