import { create } from "zustand";

export interface GameQuestion {
  _id: string;
  question: string;
  category: string;
  duration: number;
  options?: string[];
}

export interface LastAnswer {
  isCorrect: boolean;
  score: number;
  totalScore: number;
  currentStreak: number;
  correctAnswer?: string;
  sessionComplete: boolean;
}

interface GameState {
  sessionId: string | null;

  questions: GameQuestion[];

  currentIndex: number;

  totalScore: number;

  currentStreak: number;

  lastAnswer: LastAnswer | null;

  setGame: (payload: { sessionId: string; questions: GameQuestion[] }) => void;

  nextQuestion: () => void;

  resetGame: () => void;

  setLastAnswer: (answer: LastAnswer) => void;
}

export const useGameStore = create<GameState>((set) => ({
  sessionId: null,

  questions: [],

  currentIndex: 0,

  totalScore: 0,

  currentStreak: 0,

  lastAnswer: null,

  setGame: ({ sessionId, questions }) =>
    set({
      sessionId,
      questions,
      currentIndex: 0,
      totalScore: 0,
      currentStreak: 0,
      lastAnswer: null,
    }),

  nextQuestion: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

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
