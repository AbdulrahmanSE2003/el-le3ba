"use client";

import React, { ElementType, ComponentPropsWithoutRef } from "react";
import {
  motion,
  Variants,
  Transition,
  MotionProps as FramerMotionProps,
} from "framer-motion";

type CustomMotionProps<T extends ElementType> = {
  as?: T;
  duration?: number;
  delay?: number;
  type?: Transition["type"];
  variants?: Variants;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "transition">;

export default function Motion<T extends ElementType = "div">({
  as,
  duration = 0.3,
  delay = 0,
  type = "spring",
  variants,
  children,
  ...props
}: CustomMotionProps<T>) {
  const Component = (motion[as as keyof typeof motion] ||
    motion.div) as React.ComponentType<
    FramerMotionProps & { children?: React.ReactNode }
  >;

  return (
    <Component
      {...props}
      variants={variants}
      transition={{
        type,
        duration,
        delay,
      }}
    >
      {children}
    </Component>
  );
}
