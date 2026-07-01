"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, X, Clock3, Flame } from "lucide-react";

interface ResultOverlayProps {
  open: boolean;

  isCorrect: boolean;

  timeout?: boolean;

  score: number;

  totalScore: number;

  streak: number;

  correctAnswer?: string;
}

export default function ResultOverlay({
  open,
  isCorrect,
  timeout = false,
  score,
  totalScore,
  streak,
  correctAnswer,
}: ResultOverlayProps) {
  const success = isCorrect && !timeout;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/75 backdrop-blur-md"
        >
          <motion.div
            initial={{
              scale: 0.75,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.9,
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl"
          >
            {/* Glow */}

            <div
              className={`absolute inset-x-0 top-0 h-2 ${
                success
                  ? "bg-green-500"
                  : timeout
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />

            {/* Icon */}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.15,
                type: "spring",
                stiffness: 350,
              }}
              className={`mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full ${
                success
                  ? "bg-green-500/15"
                  : timeout
                    ? "bg-yellow-500/15"
                    : "bg-red-500/15"
              }`}
            >
              {success ? (
                <Check size={60} className="text-green-500" />
              ) : timeout ? (
                <Clock3 size={58} className="text-yellow-500" />
              ) : (
                <X size={60} className="text-red-500" />
              )}
            </motion.div>

            {/* Title */}

            <h2 className="text-center text-3xl font-black">
              {success
                ? "إجابة صحيحة!"
                : timeout
                  ? "انتهى الوقت"
                  : "إجابة خاطئة"}
            </h2>

            {/* Message */}

            <p className="mt-3 text-center text-muted-foreground">
              {success
                ? "ممتاز! كمل بنفس المستوى."
                : timeout
                  ? "حاول تجاوب أسرع في السؤال القادم."
                  : "لا بأس، السؤال القادم فرصتك."}
            </p>

            {/* Score */}

            {success ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-8 space-y-5"
              >
                <div className="rounded-2xl bg-primary/10 p-5 text-center">
                  <p className="text-sm text-muted-foreground">نقاط السؤال</p>

                  <p className="mt-1 text-5xl font-black text-primary">
                    +{score}
                  </p>
                </div>

                <div className="rounded-2xl border border-border p-5 text-center">
                  <p className="text-sm text-muted-foreground">مجموع النقاط</p>

                  <p className="mt-1 text-3xl font-bold">{totalScore}</p>
                </div>
              </motion.div>
            ) : (
              <div className="mt-8 rounded-2xl border border-border p-6 text-center">
                <p className="text-sm text-muted-foreground">الإجابة الصحيحة</p>

                <p className="mt-3 text-2xl font-bold text-primary">
                  {correctAnswer}
                </p>
              </div>
            )}

            {/* Streak */}

            {success && streak >= 2 && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.35,
                }}
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-orange-500/10 py-3 text-orange-500"
              >
                <Flame size={20} />

                <span className="font-bold">{streak} إجابات متتالية 🔥</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
