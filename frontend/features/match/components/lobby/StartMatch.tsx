"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Gamepad2, Loader2 } from "lucide-react";

interface StartMatchProps {
  onClick: () => Promise<void> | void;
  loading: boolean;
}

const StartMatch = ({ onClick, loading }: StartMatchProps) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      className="px-6 py-8 cursor-pointer w-full hover:scale-101 active:scale-97 transition-all duration-300 font-display font-semibold text-2xl disabled:opacity-60"
    >
      {loading ? (
        <>
          جار بدأ اللعبة...
          <Loader2 className="size-6 animate-spin" />
        </>
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
