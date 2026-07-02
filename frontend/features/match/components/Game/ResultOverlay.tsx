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
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="relative w-full max-w-sm mx-4 rounded-3xl border border-border bg-card p-8 text-center shadow-2xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.12, type: "spring", stiffness: 350 }}
              className={`mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full ${
                success
                  ? "bg-green-500/15"
                  : timeout
                    ? "bg-yellow-500/15"
                    : "bg-red-500/15"
              }`}
            >
              {success ? (
                <Check size={52} className="text-green-500" />
              ) : timeout ? (
                <Clock3 size={50} className="text-yellow-500" />
              ) : (
                <X size={52} className="text-red-500" />
              )}
            </motion.div>

            <h2 className="text-2xl font-black" dir="rtl">
              {success
                ? "إجابة صحيحة!"
                : timeout
                  ? "انتهى الوقت"
                  : "إجابة خاطئة"}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground" dir="rtl">
              {success
                ? "ممتاز! كمل بنفس المستوى."
                : timeout
                  ? "حاول تجاوب أسرع في السؤال الجاي."
                  : "مش مشكلة ، هنعوض في الفاينال 😶"}
            </p>

            {success ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mt-6 space-y-3"
              >
                <div className="rounded-xl bg-primary/10 p-4">
                  <p className="text-xs text-muted-foreground">نقاط السؤال</p>
                  <p className="mt-0.5 text-4xl font-black text-primary">
                    +{score}
                  </p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs text-muted-foreground">مجموع النقاط</p>
                  <p className="mt-0.5 text-2xl font-bold">{totalScore}</p>
                </div>
              </motion.div>
            ) : (
              <div className="mt-6 rounded-xl border border-border p-5">
                <p className="text-xs text-muted-foreground">الإجابة الصحيحة</p>
                <p className="mt-2 text-xl font-bold text-primary" dir="auto">
                  {correctAnswer}
                </p>
              </div>
            )}

            {success && streak >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-orange-500/10 py-2.5 text-sm text-orange-500"
              >
                <Flame size={18} />
                <span className="font-bold">{streak} إجابات متتالية</span>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
