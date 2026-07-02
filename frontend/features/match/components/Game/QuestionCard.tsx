"use client";

import { motion } from "framer-motion";

interface Props {
  category: string;
  question: string;
}

export default function QuestionCard({ category, question }: Props) {
  return (
    <motion.div
      key={question}
      initial={{
        opacity: 0,
        x: 80,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: -80,
        scale: 0.95,
      }}
      transition={{
        duration: 0.45,
        ease: "easeInOut",
      }}
      className="w-full rounded-2xl border border-border bg-card p-6"
    >
      <span className="mb-3 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
        {category}
      </span>

      <h2 className="text-2xl font-bold leading-relaxed">{question}</h2>
    </motion.div>
  );
}
