"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSessionStatus, type SessionResult } from "../../api";
import { Trophy, Target, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import { useGameStore } from "@/store/gameStore";

interface Props {
  details?: SessionResult;
  sessionId?: string;
  poll?: boolean;
}

export default function ResultClient({
  details: initial,
  sessionId,
  poll,
}: Props) {
  const router = useRouter();
  const [details, setDetails] = useState<SessionResult | null>(initial ?? null);
  const [loading, setLoading] = useState(!!poll);
  console.log("poll status:", status);

  const { resetGame } = useGameStore();

  useEffect(() => {
    if (details) {
      resetGame();
    }
  }, [details, resetGame]);

  useEffect(() => {
    if (!poll || !sessionId || details) return;
    let cancelled = false;

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
        setTimeout(fetchResult, 3000);
      } catch {
        setTimeout(fetchResult, 3000);
      }
    };

    fetchResult();
    return () => {
      cancelled = true;
    };
  }, [sessionId, poll, details, router]);

  if (loading) {
    return (
      <section
        className="flex h-screen items-center justify-center bg-background text-foreground"
        dir="rtl"
      >
        <div className="text-center space-y-4">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">جاري تحميل النتائج...</p>
        </div>
      </section>
    );
  }

  if (!details) return null;

  return (
    <section
      className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground"
      dir="rtl"
    >
      <div className="w-full max-w-md space-y-8 text-center">
        <Trophy className="mx-auto h-16 w-16 text-yellow-500" />

        <h1 className="text-4xl font-black">النتيجة النهائية</h1>

        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-card p-5">
            <Target className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="text-3xl font-black">{details.correctAnswers}</p>
            <p className="text-sm text-muted-foreground">إجابات صحيحة</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Trophy className="mx-auto mb-2 h-6 w-6 text-yellow-500" />
            <p className="text-3xl font-black">{details.score}</p>
            <p className="text-sm text-muted-foreground">النقاط</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <Zap className="mx-auto mb-2 h-6 w-6 text-orange-500" />
            <p className="text-3xl font-black">{details.bestStreak}</p>
            <p className="text-sm text-muted-foreground">أفضل سلسلة</p>
          </div>
        </div>

        <Link
          href="/match"
          className="w-full cursor-pointer rounded-lg bg-primary py-2 px-4 text-lg font-semibold text-white transition-all hover:bg-primary/90"
        >
          يلا عـاللوبي
        </Link>
      </div>
    </section>
  );
}
