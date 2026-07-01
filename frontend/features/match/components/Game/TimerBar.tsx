"use client";

interface Props {
  time: number;
  duration: number;
}

export default function TimerBar({ time, duration }: Props) {
  const percentage = (time / duration) * 100;

  const danger = time <= 5;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>الوقت</span>

        <span
          className={
            danger ? "font-bold text-red-500 animate-pulse" : "font-bold"
          }
        >
          {time}s
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-muted">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className={`h-full transition-all duration-1000 ${
            danger ? "bg-red-500" : "bg-primary"
          }`}
        />
      </div>
    </div>
  );
}
