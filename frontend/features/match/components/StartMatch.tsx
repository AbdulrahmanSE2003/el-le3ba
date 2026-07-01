"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { startSession } from "../api/index";
import { useGameStore } from "@/store/gameStore";
import { Gamepad2 } from "lucide-react";

const StartMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startGame } = useGameStore();

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const { session } = await startSession();

      startGame(session.sessionId, session.questions);
      router.push(`/match/${session.sessionId}`);
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      className="px-6 py-8 cursor-pointer w-full font-display font-semibold text-2xl"
    >
      {isLoading ? "جار بدأ اللعبة..." : "ابدأ اللعبة"}
      <Gamepad2 className={`size-6`} />
    </Button>
  );
};

export default StartMatch;
