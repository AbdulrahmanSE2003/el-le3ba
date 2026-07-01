"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface Props {
  onFinish: () => void;
}

export default function Countdown({ onFinish }: Props) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      const t = setTimeout(onFinish, 1000);
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <AnimatePresence mode="wait">
        <motion.div
          key={count}
          initial={{
            scale: 0.2,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 2,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-9xl font-black text-primary"
        >
          {count === 0 ? "يلااااا!" : count}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
