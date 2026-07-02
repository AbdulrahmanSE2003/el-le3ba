"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  duration: number;
  time: number;
}

const RADIUS = 32;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const Timer = ({ duration, time }: TimerProps) => {
  const [shake, setShake] = useState(false);

  // Control shake animation purely based on the current time state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (time === duration) setShake(false);
    if (time <= 0) setShake(true);
  }, [time, duration]);

  const offset = CIRCUMFERENCE - (time / duration) * CIRCUMFERENCE;
  const isUrgent = time <= 5 && time > 0;
  const isWarning = time <= Math.floor(duration / 2) && time > 5;

  const colorMap = {
    urgent: { stroke: "#ef4444", text: "text-red-500" },
    warning: { stroke: "#eab308", text: "text-yellow-500" },
    normal: { stroke: "#6366f1", text: "text-indigo-500" },
  };

  const status = isUrgent
    ? "urgent"
    : isWarning
      ? "warning"
      : time > 0
        ? "normal"
        : "urgent";
  const activeColor = colorMap[status];

  return (
    <div className="flex flex-col items-center justify-center">
      <style>{`
        @keyframes custom-shake {
          0%   { transform: translateX(0) scale(1); }
          10%  { transform: translateX(-8px) scale(1.05) rotate(-4deg); }
          20%  { transform: translateX(8px) scale(1.08) rotate(4deg); }
          30%  { transform: translateX(-7px) scale(1.06) rotate(-3deg); }
          40%  { transform: translateX(7px) scale(1.06) rotate(3deg); }
          50%  { transform: translateX(-5px) scale(1.04) rotate(-2deg); }
          60%  { transform: translateX(5px) scale(1.04) rotate(2deg); }
          70%  { transform: translateX(-3px) scale(1.02) rotate(-1deg); }
          80%  { transform: translateX(3px) scale(1.02) rotate(1deg); }
          90%  { transform: translateX(-1px) scale(1.01); }
          100% { transform: translateX(0) scale(1); }
        }
        .animate-custom-shake {
          animation: custom-shake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
      `}</style>

      <div
        className={`
          relative flex h-32 w-32 items-center justify-center rounded-full transition-all duration-300
          ${isUrgent ? "animate-pulse" : ""}
          ${shake ? "animate-custom-shake" : ""}
        `}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 80 80"
          className="-rotate-90 drop-shadow-md"
        >
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke="#1e1e2f"
            strokeWidth="4.8"
            className="dark:stroke-muted-foreground"
          />
          <circle
            cx="40"
            cy="40"
            r={RADIUS}
            fill="none"
            stroke={activeColor.stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-linear"
          />
        </svg>

        <div
          className={`absolute inset-0 flex select-none items-center justify-center font-mono text-2xl font-black tracking-tighter transition-colors duration-300 ${activeColor.text}`}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

export default Timer;
