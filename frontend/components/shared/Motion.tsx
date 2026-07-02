"use client";

import { motion, Variants, Transition } from "framer-motion";

type MotionTag = keyof typeof motion;

type MotionProps = {
  as?: MotionTag;
  duration?: number;
  delay?: number;
  type?: Transition["type"];
  variants?: Variants;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  [key: string]: unknown;
};

export default function Motion({
  as = "div",
  duration = 0.3,
  delay = 0,
  type = "tween",
  variants,
  children,
  ...props
}: MotionProps) {
  const Component = (motion[as] ?? motion.div) as React.ElementType;

  return (
    <Component
      {...props}
      variants={variants}
      transition={{ type, duration, delay }}
    >
      {children}
    </Component>
  );
}
