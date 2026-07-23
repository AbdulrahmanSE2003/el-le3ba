import { create } from "zustand";

import type { QuestionType } from "@/features/match/types";

export interface GameQuestion {
  _id: string;
  question: string;
  type: QuestionType;
  category: string;
  duration: number;
  options?: string[];
}

const STORAGE_KEY = "el-le3ba-game";

interface PersistedData {
  sessionId: string;
  teamId: string;
  eventId: string;
  sessionExpiresAt: string;
  questions: GameQuestion[];
  currentIndex: number;
  totalScore: number;
  currentStreak: number;
}

interface GameState {
  sessionId: string | null;
  teamId: string | null;
  eventId: string | null;
  sessionExpiresAt: string | null;
  questions: GameQuestion[];
  currentIndex: number;
  totalScore: number;
  currentStreak: number;

  setGame: (payload: {
    sessionId: string;
    teamId: string;
    eventId: string;
    sessionExpiresAt: string;
    questions: GameQuestion[];
  }) => void;
  nextQuestion: () => void;
  restoreGame: () => boolean;
  resetGame: () => void;
}

function persist(state: GameState) {
  if (typeof window === "undefined") return;
  if (!state.sessionId) return;
  try {
    const data: PersistedData = {
      sessionId: state.sessionId,
      teamId: state.teamId ?? "",
      eventId: state.eventId ?? "",
      sessionExpiresAt: state.sessionExpiresAt ?? "",
      questions: state.questions,
      currentIndex: state.currentIndex,
      totalScore: state.totalScore,
      currentStreak: state.currentStreak,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {

  }
}

function loadPersisted(): Partial<GameState> | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: PersistedData = JSON.parse(raw);
    if (!data.sessionId || !data.questions?.length) return null;
    return {
      sessionId: data.sessionId,
      teamId: data.teamId,
      eventId: data.eventId,
      sessionExpiresAt: data.sessionExpiresAt,
      questions: data.questions,
      currentIndex: data.currentIndex,
      totalScore: data.totalScore,
      currentStreak: data.currentStreak,
    };
  } catch {
    return null;
  }
}

function clearPersisted() {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {

  }
}

export const useGameStore = create<GameState>((set, get) => ({
  sessionId: null,
  teamId: null,
  eventId: null,
  sessionExpiresAt: null,
  questions: [],
  currentIndex: 0,
  totalScore: 0,
  currentStreak: 0,

  setGame: ({
    sessionId,
    teamId,
    eventId,
    sessionExpiresAt,
    questions,
  }) => {
    const state = {
      sessionId,
      teamId,
      eventId,
      sessionExpiresAt,
      questions,
      currentIndex: 0,
      totalScore: 0,
      currentStreak: 0,
    };
    set(state);
    persist({ ...get(), ...state });
  },

  nextQuestion: () => {
    set((state) => {
      const next = { currentIndex: state.currentIndex + 1 };
      persist({ ...state, ...next });
      return next;
    });
  },

  restoreGame: () => {
    const saved = loadPersisted();
    if (!saved) return false;
    set(saved);
    return true;
  },

  resetGame: () => {
    clearPersisted();
    set({
      sessionId: null,
      teamId: null,
      eventId: null,
      sessionExpiresAt: null,
      questions: [],
      currentIndex: 0,
      totalScore: 0,
      currentStreak: 0,
    });
  },
}));
