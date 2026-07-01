// store/StoreInitializer.tsx
"use client";

import { useEffect, useRef } from "react";
import { useUserStore, User } from "./userStore";

export default function StoreInitializer({ user }: { user: User | null }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && user) {
      useUserStore.getState().setUser(user);
      initialized.current = true;
    }
  }, [user]);

  return null;
}
