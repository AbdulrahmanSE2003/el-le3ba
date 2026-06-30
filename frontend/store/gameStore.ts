// src/store/game-store.ts
import { create } from "zustand";
import { Question, AnswerResponse } from "@/features/match/types";

interface GameStore {
  sessionId: string | null;
  questions: Question[];
  currentIndex: number;
  totalScore: number;
  currentStreak: number;
  lastAnswer: AnswerResponse | null;

  // actions
  startGame: (sessionId: string, questions: Question[]) => void;
  nextQuestion: () => void;
  setLastAnswer: (answer: AnswerResponse) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,
  totalScore: 0,
  currentStreak: 0,
  lastAnswer: null,

  startGame: (sessionId, questions) =>
    set({
      sessionId,
      questions,
      currentIndex: 0,
      totalScore: 0,
      currentStreak: 0,
      lastAnswer: null,
    }),

  nextQuestion: () =>
    set((state) => ({ currentIndex: state.currentIndex + 1 })),

  setLastAnswer: (answer) =>
    set({
      lastAnswer: answer,
      totalScore: answer.totalScore,
      currentStreak: answer.currentStreak,
    }),

  resetGame: () =>
    set({
      sessionId: null,
      questions: [],
      currentIndex: 0,
      totalScore: 0,
      currentStreak: 0,
      lastAnswer: null,
    }),
}));
