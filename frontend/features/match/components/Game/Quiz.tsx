"use client";

import { AnimatePresence } from "framer-motion";
import Countdown from "./CountDown";
import IntroModal from "./IntroModal";
import useGameFlow from "../../hooks/useGameFlow";
import QuestionScreen from "./QuestionScreen";
import { useEffect } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";

export default function Quiz() {
  const { phase, setPhase } = useGameFlow();
  const { resetGame, sessionExpiresAt, sessionId } = useGameStore();
  const router = useRouter();

  useEffect(() => {
    if (phase !== "question") return;
    if (sessionExpiresAt && Date.now() > new Date(sessionExpiresAt).getTime()) {
      resetGame();
      router.replace(`/match/result/${sessionId}`);
    }
  }, [phase, sessionExpiresAt, sessionId, resetGame, router]);

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <IntroModal key="intro" onStart={() => setPhase("countdown")} />
        )}

        {phase === "countdown" && (
          <Countdown key="countdown" onFinish={() => setPhase("question")} />
        )}
      </AnimatePresence>

      {phase === "question" && <QuestionScreen />}
    </>
  );
}
