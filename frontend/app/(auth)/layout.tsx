import { ReactNode } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-primary">
      {/* Theme toggle switch in top corner */}
      <ThemeToggle />

      <div className="shadow-2xl border border-border/20 dark:border-white/5 rounded-lg p-6 sm:p-10 bg-white/95 dark:bg-[#1A1A2E]/95">
        {children}
      </div>
    </div>
  );
}
