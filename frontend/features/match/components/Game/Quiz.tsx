"use client";

import { AnimatePresence } from "framer-motion";
import Countdown from "./CountDown";
import IntroModal from "./IntroModal";
import useGameFlow from "../../hooks/useGameFlow";
import QuestionScreen from "./QuestionScreen";

export default function Quiz() {
  const { phase, setPhase } = useGameFlow();

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

      {phase === "question" && (
        <div>
          <QuestionScreen />
        </div>
      )}
    </>
  );
}
