import { ReactNode } from "react";
import { fadeInUp } from "../animations";
import Motion from "@/components/shared/Motion";

interface FooterWrapperProps {
  children: ReactNode;
}

export default function FooterWrapper({ children }: FooterWrapperProps) {
  return (
    <Motion as="div" variants={fadeInUp} delay={0.3} className="w-full">
      {children}
    </Motion>
  );
}
