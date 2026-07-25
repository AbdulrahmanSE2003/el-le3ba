import React from "react";
import { CheckCircle } from "lucide-react";

interface SuccessCardProps {
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function SuccessCard({ title, message, children }: SuccessCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-brand-success/10 dark:bg-brand-success/10 border border-brand-success/20 dark:border-brand-success/30 rounded-2xl text-center gap-4">
      <div className="bg-brand-success/20 dark:bg-brand-success/20 p-3 rounded-full text-brand-success">
        <CheckCircle className="w-8 h-8" />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-xl text-brand-success">
          {title}
        </h3>
        <p className="text-brand-success dark:text-brand-success text-sm">
          {message}
        </p>
      </div>
      {children && <div className="w-full mt-2">{children}</div>}
    </div>
  );
}
