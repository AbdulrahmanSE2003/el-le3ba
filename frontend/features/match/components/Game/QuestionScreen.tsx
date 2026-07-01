"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

import { useGameStore } from "@/store/gameStore";
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

export default function QuestionScreen() {
  const {
    sessionId,
    sessionExpiresAt,
    questions,
    currentIndex,
    totalScore,
    currentStreak,
    lastAnswer,
    nextQuestion,
    setLastAnswer,
    restoreGame,
    resetGame,
  } = useGameStore();

  const router = useRouter();
  const restoredRef = useRef(false);
  const lockRef = useRef(false);

  // ── Restore game on refresh ─────────────────────────
  useEffect(() => {
    if (!sessionId && !restoredRef.current) {
      restoredRef.current = true;
      const ok = restoreGame();
      if (!ok) router.replace("/match");
    }
  }, [sessionId, restoreGame, router]);

  // ── Per-question state ──────────────────────────────
  const question = questions[currentIndex];
  const [answered, setAnswered] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState("");
  // eslint-disable-next-line react-hooks/purity
  const nowTime = Date.now();
  const startTimeRef = useRef(nowTime);

  // Reset per-question state when question changes
  useEffect(() => {
    lockRef.current = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnswered(false);
    setError(null);
    setInputValue("");
    startTimeRef.current = Date.now();
  }, [question?._id]);

  // ── Session timer (5 min total) ─────────────────────
  const { sessionTimeLeft, sessionExpired } = useSessionTimer({
    sessionExpiresAt,
    onExpire: () => {
      const id = sessionId;
      resetGame();
      router.replace(`/match/result/${id}`);
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
      const res = await submitAnswer(
        sessionId!,
        question._id,
        answer || " ",
        timeTaken,
      );
      setLastAnswer(res);
      setOverlay(true);

      setTimeout(() => {
        setOverlay(false);
        if (res.sessionComplete) {
          const id = sessionId;
          resetGame();
          router.replace(`/match/result/${id}`);
          return;
        }
        nextQuestion();
      }, 2000);
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "حدث خطأ في الإرسال";

      const isTerminal =
        msg.includes("expired") ||
        msg.includes("no longer active") ||
        msg.includes("already answered");

      if (isTerminal) {
        const id = sessionId;
        resetGame();
        router.replace(`/match/result/${id}`);
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
  if (!question)
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">جاري تحميل اللعبة...</p>
      </div>
    );

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
          </div>
        </motion.div>
      </AnimatePresence>

      <ResultOverlay
        open={overlay}
        isCorrect={lastAnswer?.isCorrect ?? false}
        timeout={!lastAnswer?.isCorrect && time <= 0}
        score={lastAnswer?.score ?? 0}
        totalScore={totalScore}
        streak={currentStreak}
        correctAnswer={lastAnswer?.correctAnswer}
      />

      <SessionExpiredOverlay open={sessionExpired} />
    </>
  );
}
