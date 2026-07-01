"use client";

interface Props {
  current: number;
  total: number;
  score: number;
  streak: number;
}

export default function Header({ current, total, score, streak }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">السؤال</p>

        <h2 className="text-2xl font-bold">
          {current + 1}
          <span className="mx-1 text-muted-foreground">/</span>
          {total}
        </h2>
      </div>

      <div className="flex gap-3">
        {streak >= 2 && (
          <div className="rounded-full bg-orange-500/10 border border-orange-500/30 px-4 py-2">
            🔥 {streak}
          </div>
        )}

        <div className="rounded-full bg-primary/10 border border-primary/20 px-5 py-2">
          ⭐ {score}
        </div>
      </div>
    </header>
  );
}
