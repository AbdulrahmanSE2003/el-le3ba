import { create } from "zustand";
import type { PresenceMember, GameStartedPayload } from "@/features/match/lib/socket";

interface LobbyStore {
  members: PresenceMember[];
  isConnected: boolean;
  error: string | null;
  gameStarted: GameStartedPayload | null;

  setMembers: (members: PresenceMember[]) => void;
  setConnected: (val: boolean) => void;
  setError: (err: string | null) => void;
  setGameStarted: (payload: GameStartedPayload) => void;
  reset: () => void;
}

export const useLobbyStore = create<LobbyStore>((set) => ({
  members: [],
  isConnected: false,
  error: null,
  gameStarted: null,

  setMembers: (members) => set({ members }),
  setConnected: (val) => set({ isConnected: val }),
  setError: (err) => set({ error: err }),
  setGameStarted: (payload) => set({ gameStarted: payload }),
  reset: () =>
    set({ members: [], isConnected: false, error: null, gameStarted: null }),
}));
