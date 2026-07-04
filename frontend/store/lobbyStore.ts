import { create } from "zustand";

interface Member {
  userId: string;
  name: string;
  avatar: string | null;
  role: "captain" | "member";
  isOnline: boolean;
}

interface GameStartedPayload {
  sessionId: string;
  questions: unknown[];
  expiresAt: string;
}

interface LobbyStore {
  members: Member[];
  isConnected: boolean;
  error: string | null;
  gameStarted: GameStartedPayload | null;

  setMembers: (members: Member[]) => void;
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
