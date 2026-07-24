import { ReactNode } from "react";

export default function GameLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-background">
      {children}
    </main>
  );
}
