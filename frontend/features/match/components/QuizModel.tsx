"use client";

import { useGameStore } from "@/store/gameStore";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import { submitAnswer } from "../api";

const QuizModel = () => {
  const {
    sessionId,
    questions,
    currentIndex,
    totalScore,
    currentStreak,
    nextQuestion,
    setLastAnswer,
  } = useGameStore();

  const currentQuestion = questions[currentIndex];
  const [time, setTime] = useState(currentQuestion?.duration);
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(currentQuestion.duration);
    setAnswered(false);
    setSelectedOption(null);
  }, [currentIndex, currentQuestion.duration]);

  if (!currentQuestion || !sessionId) return null;

  const handleSubmit = async (answer: string) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(answer);

    try {
      const res = await submitAnswer(
        sessionId,
        currentQuestion._id,
        answer,
        time,
      );
      setLastAnswer(res);

      // انتظر ثانية عشان اليوزر يشوف النتيجة، بعدين انتقل
      setTimeout(() => {
        if (res.sessionComplete) {
          // TODO: redirect to results page
          console.log("اللعبة خلصت", res);
        } else {
          nextQuestion();
        }
      }, 1000);
    } catch (err: any) {
      console.error(err.response?.data);
      setAnswered(false);
      setSelectedOption(null);
    }
  };

  const handleExpire = () => {
    if (!answered) handleSubmit("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-6">
      {/* Header */}
      <div className="w-full max-w-2xl flex justify-between items-center mb-6">
        <span className="text-sm text-muted-foreground">
          سؤال{" "}
          <span className="text-foreground font-semibold">
            {currentIndex + 1}
          </span>{" "}
          من{" "}
          <span className="text-foreground font-semibold">
            {questions.length}
          </span>
        </span>
        <div className="bg-muted border border-border rounded-full px-4 py-1 text-sm">
          النقاط:{" "}
          <span className="text-yellow-400 font-bold">{totalScore}</span>
        </div>
      </div>

      {/* Timer + Streak */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <Timer
          time={time}
          setTime={setTime}
          duration={currentQuestion.duration}
          onExpire={handleExpire}
        />
        {currentStreak >= 2 && (
          <span className="text-xs bg-primary/20 text-primary border border-primary/40 px-3 py-1 rounded-full">
            🔥 ستريك {currentStreak}×
          </span>
        )}
      </div>

      {/* Question Card */}
      <div className="w-full max-w-2xl bg-card border border-border rounded-xl p-5 mb-5">
        <span className="text-xs text-primary uppercase tracking-widest mb-2 block">
          {currentQuestion.category}
        </span>
        <p className="text-foreground text-lg font-semibold leading-relaxed">
          {currentQuestion.question}
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-2xl">
        {currentQuestion.options ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((op) => (
              <button
                key={op}
                onClick={() => handleSubmit(op)}
                disabled={answered}
                className={`
                  border bg-card rounded-xl p-4 text-center text-sm
                  transition-all duration-300 cursor-pointer
                  disabled:cursor-not-allowed
                  ${
                    selectedOption === op
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border/60 hover:border-primary hover:bg-primary/5 text-foreground"
                  }
                `}
              >
                {op}
              </button>
            ))}
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const val = (
                e.currentTarget.elements.namedItem("answer") as HTMLInputElement
              ).value;
              handleSubmit(val);
            }}
          >
            <input
              name="answer"
              type="text"
              disabled={answered}
              className="
                w-full border border-border/50 bg-card text-foreground
                focus:border-primary focus:outline-none
                transition-colors duration-200 rounded-xl p-4
                text-center text-sm placeholder:text-muted-foreground
                disabled:opacity-50
              "
              placeholder="اكتب إجابتك هنا"
            />
          </form>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-2xl mt-8 h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default QuizModel;
