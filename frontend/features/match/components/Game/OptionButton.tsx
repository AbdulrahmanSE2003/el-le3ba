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
      whileHover={{
        scale: 1.03,
        y: -2,
      }}
      whileTap={{
        scale: 0.96,
      }}
      disabled={disabled}
      onClick={onClick}
      className="
      h-16
      rounded-xl
      border
      border-border
      bg-card
      transition-all
      hover:border-primary
      hover:bg-primary/5
      disabled:pointer-events-none
      disabled:opacity-60
      cursor-pointer
      "
    >
      {text}
    </motion.button>
  );
}
