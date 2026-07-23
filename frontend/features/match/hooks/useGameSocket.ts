"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { connectSocket } from "@/features/match/lib/socket";
import { useGameStore } from "@/features/match/store/gameStore";
import type { QuestionResultPayload } from "@/features/match/lib/socket";

interface Props {
  teamId: string;
  sessionId: string;
}

export const useGameSocket = ({ teamId, sessionId }: Props) => {
  const router = useRouter();
  const { nextQuestion, setLastAnswer, setLockedQuestionId, resetGame } =
    useGameStore();
  const processedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!teamId || !sessionId) return;

    const socket = connectSocket();

    const handleAnswerLocked = (payload: { questionId: string }) => {
      setLockedQuestionId(payload.questionId);
    };

    const handleQuestionResult = (payload: QuestionResultPayload) => {
      if (processedRef.current.has(payload.questionId)) return;
      processedRef.current.add(payload.questionId);

      setLastAnswer({
        isCorrect: payload.isCorrect,
        score: payload.score,
        totalScore: payload.totalScore,
        currentStreak: payload.currentStreak,
        correctAnswer: payload.correctAnswer,
        sessionComplete: payload.sessionComplete,
        answeredByName: payload.answeredByName,
      });
    };

    const handleNextQuestion = () => {
      nextQuestion();
    };

    const handleGameEnded = () => {
      resetGame();
      router.replace(`/team`);
    };

    socket.on("answer-locked", handleAnswerLocked);
    socket.on("question-result", handleQuestionResult);
    socket.on("next-question", handleNextQuestion);
    socket.on("game-ended", handleGameEnded);

    return () => {
      socket.off("answer-locked", handleAnswerLocked);
      socket.off("question-result", handleQuestionResult);
      socket.off("next-question", handleNextQuestion);
      socket.off("game-ended", handleGameEnded);
    };
  }, [teamId, sessionId, nextQuestion, setLastAnswer, setLockedQuestionId, resetGame, router]);

  return {};
};
