"use client";

import { useEffect, useState, memo } from "react";
import { useRouter } from "next/navigation";
import { getSessionStatus, type SessionResult } from "../../api";
import { Trophy, Target, Zap, Loader2, Home } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/features/match/store/gameStore";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Confetti from "./Confetti";

interface Props {
  details?: SessionResult;
  sessionId?: string;
  poll?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const ConfettiRain = memo(({ count }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <Confetti key={i} index={i} />
      ))}
    </>
  );
});
ConfettiRain.displayName = "ConfettiRain";

export default function ResultClient({
  details: initial,
  sessionId,
  poll,
}: Props) {
  const router = useRouter();
  const { resetGame } = useGameStore();
  const [details, setDetails] = useState<SessionResult | null>(initial ?? null);
  const [loading, setLoading] = useState(!!poll);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiCount = 180;

  useEffect(() => {
    if (!details) return;

    resetGame();

    const startTimer = setTimeout(() => setShowConfetti(true), 400);
    const stopTimer = setTimeout(() => setShowConfetti(false), 14000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, [details, resetGame]);

  useEffect(() => {
    if (!poll || !sessionId || details) return;
    let cancelled = false;
    let timeoutId: NodeJS.Timeout;

    const fetchResult = async () => {
      try {
        const status = await getSessionStatus(sessionId);
        if (cancelled) return;

        if (status.status === "completed") {
          setDetails(status);
          setLoading(false);
          return;
        }
        if (status.status === "not_found") {
          router.replace("/match");
          return;
        }
        timeoutId = setTimeout(fetchResult, 3000);
      } catch {
        timeoutId = setTimeout(fetchResult, 3000);
      }
    };

    fetchResult();

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [sessionId, poll, details, router]);

  if (loading) {
    return (
      <section
        className="flex h-screen items-center justify-center bg-background text-foreground"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري تحميل النتائج...</p>
        </motion.div>
      </section>
    );
  }

  if (!details) return null;

  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-background p-6 text-foreground overflow-hidden"
      dir="rtl"
    >
      <AnimatePresence>
        {showConfetti && <ConfettiRain count={confettiCount} />}
      </AnimatePresence>

      {/* Glow background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative w-full max-w-md space-y-8 text-center"
      >
        {/* Trophy */}
        <motion.div variants={itemVariants}>
          <motion.div
            animate={{ rotate: [-8, 8, -8, 8, 0], scale: [1, 1.15, 1] }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="inline-block"
          >
            <Trophy className="mx-auto h-20 w-20 text-yellow-400 drop-shadow-[0_0_24px_#FFD23F88]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-black">النتيجة النهائية 🎉</h1>
          <p className="mt-2 text-muted-foreground text-sm">
            عاش يا شباب ، استمرووا 💪🏻
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <p className="text-3xl font-black">{details.correctAnswers}</p>
            <p className="text-xs text-muted-foreground">إجابات صحيحة</p>
          </div>

          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-5 flex flex-col items-center gap-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-accent/10 to-transparent" />
            <Trophy className="relative h-6 w-6 text-yellow-400" />
            <p className="relative text-3xl font-black text-yellow-400">
              {details.score}
            </p>
            <p className="relative text-xs text-muted-foreground">النقاط</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 flex flex-col items-center gap-2">
            <Zap className="h-6 w-6 text-orange-500" />
            <p className="text-3xl font-black">{details.bestStreak}</p>
            <p className="text-xs text-muted-foreground">أعلى ستريك</p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3">
          <Link
            href="/match"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-4 text-lg font-bold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
          >
            يلا عـاللوبي
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center justify-center gap-2 w-full rounded-xl border border-border bg-card py-4 text-sm font-semibold text-foreground transition-all hover:bg-muted active:scale-[0.98]"
          >
            <Home className="h-4 w-4" />
            شوف الترتيب
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
