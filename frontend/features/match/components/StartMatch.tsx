"use client";

import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";

const StartMatch = ({ onClick }: { onClick: () => void }) => {
  const handleStart = async () => {
    try {
      await onClick();
    } catch (error) {
      throw error;
    }
  };

  return (
    <Button
      onClick={handleStart}
      className="px-6 py-8 cursor-pointer w-full hover:scale-101 active:scale-97 transition-all duration-300 font-display font-semibold text-2xl"
    >
      ابدأ اللعبة
      <Gamepad2 className={`size-6`} />
    </Button>
  );
};

export default StartMatch;
