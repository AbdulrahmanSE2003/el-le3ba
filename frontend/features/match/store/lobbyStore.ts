import { create } from "zustand";
import type { PresenceMember } from "@/features/match/lib/socket";

interface LobbyStore {
  members: PresenceMember[];
  isConnected: boolean;
  error: string | null;

  setMembers: (members: PresenceMember[]) => void;
  setConnected: (val: boolean) => void;
  setError: (err: string | null) => void;
  reset: () => void;
}

export const useLobbyStore = create<LobbyStore>((set) => ({
  members: [],
  isConnected: false,
  error: null,

  setMembers: (members) => set({ members }),
  setConnected: (val) => set({ isConnected: val }),
  setError: (err) => set({ error: err }),
  reset: () =>
    set({ members: [], isConnected: false, error: null }),
}));
