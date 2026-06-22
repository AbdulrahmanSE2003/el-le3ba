"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="fixed top-4 left-4 w-24 h-9 rounded-xl bg-muted animate-pulse" />
    );

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed top-4 left-4 bg-card border border-border rounded-xl px-4 py-2 font-body text-sm text-foreground hover:bg-muted transition-colors"
    >
      {theme === "dark" ? "☀️ فاتح" : "🌙 داكن"}
    </button>
  );
}
