"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useGameStore } from "@/features/match/store/gameStore";
import { submitAnswer } from "../../api";
import useQuestionTimer from "../../hooks/useQuestionTimer";
import useSessionTimer from "../../hooks/useSessionTimer";

import Header from "./Header";
import Timer from "./Timer";
import QuestionCard from "./QuestionCard";
import OptionButton from "./OptionButton";
import ProgressBar from "./ProgressBar";
import ResultOverlay from "./ResultOverlay";
import SessionExpiredOverlay from "./SessionExpiredOverlay";
import { useGameSocket } from "@/features/match/hooks/useGameSocket";
import { useUserStore } from "@/store/userStore";
import type { LastAnswer } from "@/features/match/types";
import type { QuestionResultPayload } from "@/features/match/lib/socket";
import AbandonButton from "../game/AbandonButton";

export default function QuestionScreen() {
  const {
    sessionId,
    sessionExpiresAt,
    questions,
    currentIndex,
    totalScore,
    currentStreak,
    restoreGame,
    resetGame,
    teamId,
  } = useGameStore();

  const user = useUserStore((s) => s.user);
  const router = useRouter();
  const restoredRef = useRef(false);

  // ── Restore game on refresh ─────────────────────────
  useEffect(() => {
    if (!sessionId && !restoredRef.current) {
      restoredRef.current = true;
      const ok = restoreGame();
      if (!ok) {
        router.replace("/dashboard");
      }
    }
  }, [sessionId, restoreGame, router]);

  // ── Per-question local state ─────────────────────────
  const question = questions[currentIndex];
  const [answered, setAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [lastAnswer, setLastAnswer] = useState<LastAnswer | null>(null);
  const [lockedQuestionId, setLockedQuestionId] = useState<string | null>(null);
  const startTimeRef = useRef(0);
  const lockRef = useRef(false);
  const processedRef = useRef<Set<string>>(new Set());

  // Reset per-question state when question changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLockedQuestionId(null);
    setLastAnswer(null);
    lockRef.current = false;
    setAnswered(false);
    setError(null);
    setInputValue("");
    startTimeRef.current = Date.now();
  }, [question?._id]);

  // Lock question when a teammate answers (answer-locked socket event)
  useEffect(() => {
    if (lockedQuestionId && lockedQuestionId === question?._id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnswered(true);
      lockRef.current = true;
    }
  }, [lockedQuestionId, question?._id]);

  // ── Socket events ────────────────────────────────────
  const handleAnswerLocked = useCallback((qId: string) => {
    setLockedQuestionId(qId);
  }, []);

  const handleQuestionResult = useCallback((payload: QuestionResultPayload) => {
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
  }, []);

  useGameSocket({
    teamId: teamId ?? "",
    sessionId: sessionId ?? "",
    userId: user?._id ?? "",
    onAnswerLocked: handleAnswerLocked,
    onQuestionResult: handleQuestionResult,
  });

  // ── Session timer ────────────────────────────────────
  const { sessionTimeLeft, sessionExpired } = useSessionTimer({
    sessionExpiresAt,
    onExpire: () => {
      const sid = useGameStore.getState().sessionId;
      resetGame();
      router.replace(`/match/result/${sid}`);
    },
  });

  // ── Answer submission ───────────────────────────────
  const handleSubmit = async (answer: string) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setAnswered(true);
    setError(null);

    // eslint-disable-next-line react-hooks/purity
    const now = Date.now();
    const timeTaken = Math.max(
      0,
      Math.min(
        Math.floor((now - startTimeRef.current) / 1000),
        question.duration,
      ),
    );

    try {
      await submitAnswer(sessionId!, question._id, answer || " ", timeTaken);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "حدث خطأ في الإرسال";

      const isTerminal =
        msg.includes("expired") ||
        msg.includes("no longer active");

      if (isTerminal) {
        resetGame();
        router.replace(`/match/result/${sessionId}`);
        return;
      }

      if (msg.includes("already answered")) {
        lockRef.current = false;
        return;
      }

      setError(msg);
      lockRef.current = false;
      setAnswered(false);
    }
  };

  // ── Per-question timer ──────────────────────────────
  const { time } = useQuestionTimer({
    duration: question?.duration ?? 20,
    enabled: !answered && !error && !sessionExpired,
    resetKey: question?._id ?? "",
    onExpire: () => handleSubmit(""),
  });

  // ── Guards ──────────────────────────────────────────
  if (!sessionId) return null;
  if (!question) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">جاري تحميل اللعبة...</p>
      </div>
    );
  }

  const hasOptions = !!question.options?.length;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={question._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-8 p-6">
            <Header
              current={currentIndex}
              total={questions.length}
              score={totalScore}
              streak={currentStreak}
              sessionTimeLeft={sessionTimeLeft}
            />
            <Timer time={time} duration={question.duration} />
            <QuestionCard
              category={question.category}
              question={question.question}
            />
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center text-red-500">
                {error}
              </div>
            )}
            {hasOptions ? (
              <div className="grid md:grid-cols-2 gap-4">
                {question.options!.map((option, index) => (
                  <OptionButton
                    key={option}
                    text={option}
                    index={index}
                    disabled={answered}
                    onClick={() => handleSubmit(option)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    inputValue.trim() &&
                    handleSubmit(inputValue.trim())
                  }
                  disabled={answered}
                  placeholder={
                    question.type === "numberExact"
                      ? "أدخل الرقم..."
                      : "اكتب إجابتك..."
                  }
                  inputMode={
                    question.type === "numberExact" ? "numeric" : "text"
                  }
                  autoFocus
                  className="flex-1 h-14 rounded-xl border border-border bg-card px-4 text-lg text-center outline-none transition-all focus:border-primary disabled:opacity-60"
                />
                <button
                  onClick={() => handleSubmit(inputValue.trim())}
                  disabled={answered || !inputValue.trim()}
                  className="h-14 cursor-pointer rounded-xl bg-primary px-6 text-lg font-semibold text-white transition-all hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  تأكيد
                </button>
              </div>
            )}
            <ProgressBar current={currentIndex} total={questions.length} />
            {user && user._id && (
              <AbandonButton
                teamId={teamId}
                sessionId={sessionId}
                userId={user._id}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <ResultOverlay
        open={!!lastAnswer}
        isCorrect={lastAnswer?.isCorrect ?? false}
        timeout={!lastAnswer?.isCorrect && time <= 0}
        score={lastAnswer?.score ?? 0}
        totalScore={totalScore}
        streak={currentStreak}
        correctAnswer={lastAnswer?.correctAnswer}
        answeredByName={lastAnswer?.answeredByName ?? ""}
      />

      <SessionExpiredOverlay open={sessionExpired} />
    </>
  );
}
