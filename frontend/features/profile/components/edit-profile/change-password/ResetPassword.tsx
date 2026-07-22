"use client";

import { useState } from "react";
import { Lock } from "lucide-react";
import { AnimatePresence } from "framer-motion";

import Motion from "@/components/shared/Motion";
import PasswordForm from "./PasswordForm";

export default function ResetPassword() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pt-1">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 w-full py-3 cursor-pointer group"
      >
        {/* Right Icon */}
        <div className="w-9 h-9 rounded-xl bg-accent/10 dark:bg-accent/20 border border-accent/15 flex items-center justify-center shrink-0">
          <Lock size={16} className="text-accent" />
        </div>

        {/* Button text */}
        <div className="flex-1 text-right">
          <span className="text-xs text-muted-foreground font-medium block mb-0.5">
            كلمة السر
          </span>
          <p className="text-sm font-semibold text-foreground">••••••••</p>
        </div>

        {/* Left Icon */}
        <Motion
          as="div"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-8 h-8 rounded-lg bg-secondary dark:bg-secondary/40 border border-border/50 text-muted-foreground group-hover:text-accent flex items-center justify-center duration-200"
        >
          <Lock size={14} />
        </Motion>
      </button>

      {/* Password Form */}
      <AnimatePresence>
        {isOpen && <PasswordForm setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </div>
  );
}
