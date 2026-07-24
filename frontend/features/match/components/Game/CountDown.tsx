"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { audio } from "@/features/audio/audioManager";

interface Props {
  onFinish: () => void;
}

const TOTAL = 3;

export default function Countdown({ onFinish }: Props) {
  const [count, setCount] = useState(TOTAL);
  useEffect(() => {
    audio.play("countdown");

    const sound = audio.get("countdown");
    if (!sound) return;

    const handleEnded = () => {
      onFinish();
    };

    sound.addEventListener("ended", handleEnded);

    return () => {
      sound.removeEventListener("ended", handleEnded);
    };
  }, [onFinish]);

  useEffect(() => {
    if (count === 0) return;

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 780);

    return () => clearTimeout(timer);
  }, [count]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{ scale: 0.25, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="text-9xl font-black text-primary"
        >
          {count === 0 ? "GO!" : count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
