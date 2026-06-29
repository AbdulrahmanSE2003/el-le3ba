import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function SuccessCard({ title, message, children }: SuccessCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50 rounded-2xl text-center gap-4">
      <div className="bg-emerald-100 dark:bg-emerald-900/40 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
        <CheckCircle className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-bold text-xl text-emerald-800 dark:text-emerald-300">
          {title}
        </h3>
        <p className="font-body text-emerald-600 dark:text-emerald-400 text-sm leading-relaxed">
          {message}
        </p>
      </div>
      {children && <div className="w-full mt-2">{children}</div>}
    </div>
  );
}
