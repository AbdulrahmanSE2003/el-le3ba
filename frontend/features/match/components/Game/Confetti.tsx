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
  rotate: number;
  isCircle: boolean;
}

function Confetti({ index }: ConfettiProps) {
  const color = COLORS[index % COLORS.length];
  const [config, setConfig] = useState<ConfettiStyles | null>(null);

  // Generate random properties ONLY on the client after mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConfig({
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 8,
      rotate: Math.random() * 360,
      isCircle: Math.random() > 0.5,
    });
  }, []);

  // Return null on the server side so nothing is mismatched during hydration
  if (!config) return null;

  const { left, duration, delay, size, rotate, isCircle } = config;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: -20,
        left,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: isCircle ? "50%" : "2px",
        zIndex: 9999,
        pointerEvents: "none",
      }}
      initial={{ y: -20, rotate, opacity: 1 }}
      animate={{
        y: "110vh",
        rotate: rotate + 360 * 3,
        opacity: [1, 1, 0],
      }}
      transition={{ duration, delay, ease: "easeIn" }}
    />
  );
}

export default Confetti;
