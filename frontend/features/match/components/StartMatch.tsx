"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Gamepad2 } from "lucide-react";

const StartMatch = ({ onClick }: { onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } catch {
      // Error handling is done by the caller
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={isLoading}
      className="px-6 py-8 cursor-pointer w-full font-display font-semibold text-2xl"
    >
      {isLoading ? "جار بدأ اللعبة..." : "ابدأ اللعبة"}
      <Gamepad2 className={`size-6`} />
    </Button>
  );
};

export default StartMatch;
