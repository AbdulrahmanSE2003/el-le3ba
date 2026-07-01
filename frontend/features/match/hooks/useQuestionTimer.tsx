"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  duration: number;
  enabled: boolean;
  onExpire: () => void;
  resetKey: string;
}

export default function useQuestionTimer({
  duration,
  enabled,
  onExpire,
  resetKey,
}: Props) {
  const [time, setTime] = useState(duration);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(duration);
    firedRef.current = false;
  }, [duration, resetKey]);

  useEffect(() => {
    if (!enabled) return;

    if (time <= 0) {
      if (!firedRef.current) {
        firedRef.current = true; // ← اتكال مرة واحدة بس
        onExpireRef.current();
      }
      return;
    }

    const id = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [time, enabled]);

  return { time };
}
