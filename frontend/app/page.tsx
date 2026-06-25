// NOTE: Temporary page will be landing page later

import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 p-8">
      {/* Theme toggle */}
      <ThemeToggle />

      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-display text-6xl font-black text-primary">
          اللعبة<span className="text-brand-yellow">.</span>
        </h1>
        <p className="font-body text-muted-foreground text-lg">
          منصة المسابقات التنافسية
        </p>
      </div>

      {/* Colors */}
      <div className="flex flex-wrap gap-3 justify-center">
        <div className="w-14 h-14 rounded-xl bg-primary" title="Primary" />
        <div className="w-14 h-14 rounded-xl bg-accent" title="Accent" />
        <div
          className="w-14 h-14 rounded-xl bg-brand-success"
          title="Success"
        />
        <div className="w-14 h-14 rounded-xl bg-destructive" title="Danger" />
        <div
          className="w-14 h-14 rounded-xl bg-brand-dark-bg border border-border"
          title="Dark BG"
        />
      </div>

      {/* Typography */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="font-display text-3xl font-bold text-foreground">
          Playpen Sans Arabic — عنوان
        </p>
        <p className="font-body text-xl text-muted-foreground">
          Zain — نص عادي وبيانات وأوصاف
        </p>
        <p className="font-display text-5xl font-black text-primary tabular-nums">
          4,820
        </p>
      </div>

      {/* Shadcn tokens check */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
        <div className="bg-card border border-border rounded-xl p-4 text-card-foreground text-sm font-body">
          Card Light ✓
        </div>
        <div className="bg-secondary border border-border rounded-xl p-4 text-secondary-foreground text-sm font-body">
          Secondary ✓
        </div>
        <div className="bg-primary rounded-xl p-4 text-primary-foreground text-sm font-body">
          Primary ✓
        </div>
        <div className="bg-accent rounded-xl p-4 text-accent-foreground text-sm font-body">
          Accent ✓
        </div>
      </div>
    </main>
  );
}
