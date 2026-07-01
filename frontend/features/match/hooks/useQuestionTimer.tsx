"use client";

import { useEffect, useState } from "react";

interface Props {
  duration: number;
  enabled: boolean;
  onExpire: () => void;
}

export default function useQuestionTimer({
  duration,
  enabled,
  onExpire,
}: Props) {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTime(duration);
  }, [duration]);

  useEffect(() => {
    if (!enabled) return;

    if (time <= 0) {
      onExpire();
      return;
    }

    const id = setTimeout(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearTimeout(id);
  }, [time, enabled, onExpire]);

  return {
    time,
    setTime,
  };
}
