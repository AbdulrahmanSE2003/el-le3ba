// features/match/hooks/useSessionTimer.ts
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  sessionExpiresAt: string | null;
  onExpire: () => void;
}

export default function useSessionTimer({ sessionExpiresAt, onExpire }: Props) {
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [sessionExpired, setSessionExpired] = useState(false);
  const onExpireRef = useRef(onExpire);
  const firedRef = useRef(false);

  useEffect(() => {
    onExpireRef.current = onExpire;
  });

  useEffect(() => {
    if (!sessionExpiresAt) return;

    const id = setInterval(() => {
      const remaining = Math.max(
        0,
        Math.floor((new Date(sessionExpiresAt).getTime() - Date.now()) / 1000),
      );
      setSessionTimeLeft(remaining);

      if (remaining <= 0 && !firedRef.current) {
        firedRef.current = true;
        setSessionExpired(true);
        setTimeout(() => onExpireRef.current(), 1500);
      }
    }, 1000);

    return () => clearInterval(id);
  }, [sessionExpiresAt]);

  return { sessionTimeLeft, sessionExpired };
}
