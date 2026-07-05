"use client";

import { motion, Variants } from "framer-motion";

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

  return (
    <Component {...props} variants={variants}>
      {children}
    </Component>
  );
}
