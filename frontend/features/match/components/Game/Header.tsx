"use client";

interface Props {
  current: number;
  total: number;
  score: number;
  streak: number;
  sessionTimeLeft?: number;
}

export default function Header({
  current,
  total,
  score,
  streak,
  sessionTimeLeft,
}: Props) {
  const isUrgent = sessionTimeLeft !== undefined && sessionTimeLeft <= 60;

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {sessionTimeLeft !== undefined && (
          <div
            className={`rounded-full px-3.5 py-1.5 text-sm font-bold tabular-nums ${
              isUrgent
                ? "bg-red-500/10 text-red-500 border border-red-500/30"
                : "bg-primary/10 text-primary border border-primary/20"
            }`}
          >
            {Math.floor(sessionTimeLeft / 60)}:
            {String(sessionTimeLeft % 60).padStart(2, "0")}
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">السؤال</p>
          <h2 className="text-2xl font-bold">
            {current + 1}
            <span className="mx-1 text-muted-foreground">/</span>
            {total}
          </h2>
        </div>
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
