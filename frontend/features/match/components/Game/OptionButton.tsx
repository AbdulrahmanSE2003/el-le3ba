"use client";

import { motion } from "framer-motion";

interface Props {
  text: string;
  disabled: boolean;
  onClick: () => void;
  index: number;
}

export default function OptionButton({
  text,
  disabled,
  onClick,
  index,
}: Props) {
  return (
    <motion.button
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.08,
      }}
      whileTap={{
        border: "#5b5fef",
      }}
      disabled={disabled}
      onClick={onClick}
      className="h-16 hover:scale-103 -translate-y-2 hover:border-primary focus:border-primary rounded-xl border border-border active:border-primary bg-card transition-all duration-300 over:border-primary hover:bg-primary/5 disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow"
    >
      {text}
    </motion.button>
  );
}
