"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  onStart: () => void;
}

export default function IntroModal({ onStart }: Props) {
  useEffect(() => {
    const timer = setTimeout(onStart, 3000);
    return () => clearTimeout(timer);
  }, [onStart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-99 flex items-center justify-center bg-black/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
        className="w-full max-w-lg rounded-3xl border border-primary/20 bg-card p-10 text-center"
      >
        <motion.div
          animate={{
            rotate: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2.5,
          }}
          className="text-7xl mb-6"
        >
          🏆
        </motion.div>

        <h1 className="text-4xl font-bold mb-4">مستعدين؟</h1>

        <p className="text-muted-foreground mb-10 leading-8">
          أمامكم 20 سؤال.
          <br />
          السرعة بتفرق في النتيجة النهائية.
        </p>
      </motion.div>
    </motion.div>
  );
}
