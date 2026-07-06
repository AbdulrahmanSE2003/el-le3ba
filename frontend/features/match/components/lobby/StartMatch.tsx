"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Loader2 } from "lucide-react";

interface StartMatchProps {
  onClick: () => Promise<void> | void;
}

const StartMatch = ({ onClick }: StartMatchProps) => {
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onClick();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleStart}
      disabled={loading}
      className="px-6 py-8 cursor-pointer w-full hover:scale-101 active:scale-97 transition-all duration-300 font-display font-semibold text-2xl disabled:opacity-60"
    >
      {loading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <>
          ابدأ اللعبة
          <Gamepad2 className="size-6 mr-2" />
        </>
      )}
    </Button>
  );
};

export default StartMatch;
