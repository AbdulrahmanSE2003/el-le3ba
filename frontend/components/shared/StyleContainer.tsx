import Motion, { MotionProps } from "@/components/shared/Motion";
import { Variants } from "framer-motion";

import { ReactNode } from "react";

interface Props extends MotionProps {
  children: ReactNode;
  header?: string;
  className?: string;
  icon?: any;
  iconColor?: string;
  variants?: Variants;
  initial?: string;
  whileInView?: string;
  viewport?: {
    once: boolean;
    amount: number;
  };
  transition?: {
    duration?: number;
    type?: string;
  };
}

export default function StyleContainer({
  children,
  header,
  className,
  icon: Icon,
  iconColor,
  ...props
}: Props) {
  return (
    <Motion
      as="div"
      className={`bg-white hover:bg-white/80 dark:bg-card border border-border rounded-2xl p-6 shadow ${className}`}
      {...props}
    >
      {header && (
        <div className="flex gap-2">
          <h3 className="font-bold text-xl dark:text-white mb-3">{header}</h3>

          <span className={iconColor}>
            <Icon />
          </span>
        </div>
      )}
      {children}
    </Motion>
  );
}
