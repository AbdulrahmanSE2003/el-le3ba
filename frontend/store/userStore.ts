// store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "admin";
  avatar: string | null;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  setHydrated: (hydrated: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isHydrated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      setHydrated: (hydrated) => set({ isHydrated: hydrated }),
    }),
    {
      name: "user-store",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
