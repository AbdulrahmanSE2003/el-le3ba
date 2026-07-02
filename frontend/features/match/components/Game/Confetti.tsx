"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = ["#5B5FEF", "#FFD23F", "#2dc653", "#ff4757", "#fff"];

interface ConfettiProps {
  index: number;
}

interface ConfettiStyles {
  left: string;
  duration: number;
  delay: number;
  size: number;
}

function Confetti({ index }: ConfettiProps) {
  const color = COLORS[index % COLORS.length];
  const [config, setConfig] = useState<ConfettiStyles | null>(null);

  // Generate random properties ONLY on the client after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig({
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 2,
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 8,
    });
  }, []);

  // Return null on the server side so nothing is mismatched during hydration
  if (!config) return null;

  const { left, duration, delay, size } = config;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: -20,
        left,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: "50%",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ y: -20, opacity: 1 }}
      animate={{
        y: "110vh",
        opacity: [1, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeIn" }}
    />
  );
}

export default Confetti;
