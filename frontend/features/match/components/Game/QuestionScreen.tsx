"use client";

import { useGameStore } from "@/store/gameStore";
import Header from "./Header";
import TimerBar from "./TimerBar";
import ResultOverlay from "./ResultOverlay";

import { submitAnswer } from "../../api/index";
import useQuestionTimer from "../../hooks/useQuestionTimer";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import QuestionCard from "./QuestionCard";
import OptionButton from "./OptionButton";
import ProgressBar from "./ProgressBar";
import { AnimatePresence, motion } from "framer-motion";

export default function QuestionScreen() {
  const {
    sessionId,
    questions,
    currentIndex,
    totalScore,
    currentStreak,
    lastAnswer,
    nextQuestion,
    setLastAnswer,
  } = useGameStore();

  const question = questions[currentIndex];
  const router = useRouter();

  const [answered, setAnswered] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const { time } = useQuestionTimer({
    duration: question.duration,
    enabled: !answered,
    onExpire: () => handleSubmit(""),
  });

  // منع double submit من timer + click
  const lockRef = useRef(false);

  if (!question || !sessionId) return null;

  const handleSubmit = async (answer: string) => {
    if (lockRef.current) return;

    lockRef.current = true;
    setAnswered(true);

    try {
      const res = await submitAnswer(
        sessionId,
        question._id,
        answer,
        question.duration, // مهم: ثابت مش time
      );

      setLastAnswer(res);
      setOverlay(true);

      setTimeout(() => {
        setOverlay(false);

        if (res.sessionComplete) {
          router.replace(`/match/result/${sessionId}`);
          return;
        }

        nextQuestion();

        lockRef.current = false;
        setAnswered(false);
      }, 1600);
    } catch (error) {
      console.error(error);

      lockRef.current = false;
      setAnswered(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question._id}
        initial={{ opacity: 0 }}
        animate={{
          opacity: answered ? 0.3 : 1,
          scale: answered ? 0.97 : 1,
        }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col justify-center gap-8 p-6">
          {/* HEADER */}
          <Header
            current={currentIndex}
            total={questions.length}
            score={totalScore}
            streak={currentStreak}
          />

          {/* TIMER */}
          <TimerBar time={time} duration={question.duration} />

          {/* QUESTION */}
          <QuestionCard
            category={question.category}
            question={question.question}
          />

          {/* OPTIONS */}
          <div className="grid gap-4">
            {question.options?.map((option, index) => (
              <OptionButton
                key={option}
                text={option}
                index={index}
                disabled={answered}
                onClick={() => handleSubmit(option)}
              />
            ))}
          </div>

          {/* PROGRESS */}
          <ProgressBar current={currentIndex} total={questions.length} />
        </div>

        {/* RESULT OVERLAY */}
        <ResultOverlay
          open={overlay}
          isCorrect={lastAnswer?.isCorrect ?? false}
          timeout={!lastAnswer?.isCorrect && time <= 0}
          score={lastAnswer?.score ?? 0}
          totalScore={totalScore}
          streak={currentStreak}
          correctAnswer={lastAnswer?.correctAnswer}
        />
      </motion.div>
    </AnimatePresence>
  );
}
