"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { startSession } from "../api/index";
import { useGameStore } from "@/store/gameStore";

const StartMatch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startGame } = useGameStore();

  const handleStart = async () => {
    setIsLoading(true);
    try {
      const session = await startSession();
      startGame(session.sessionId, session.questions);
      router.push(`/match/${session.sessionId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleStart} className="px-6 py-6 cursor-pointer text-lg">
      {isLoading ? "جار بدأ اللعبة..." : "ابدأ اللعبة"}
    </Button>
  );
};

export default StartMatch;
