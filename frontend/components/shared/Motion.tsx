"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";

type MotionTag = keyof typeof motion;

export type MotionProps = {
  as?: MotionTag;
  variants?: Variants;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

export default function Motion({
  as = "div",
  variants,
  children,
  ...props
}: MotionProps) {
  const Component = (motion[as] ?? motion.div) as React.ElementType;
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, we disable variants animations
  const animationProps = shouldReduceMotion
    ? { initial: false, animate: false, exit: false }
    : {};

  return (
    <Component {...props} {...animationProps} variants={variants}>
      {children}
    </Component>
  );
}
