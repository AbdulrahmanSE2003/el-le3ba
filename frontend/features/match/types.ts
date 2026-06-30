// src/features/match/types/index.ts
export type QuestionType = "mcq" | "ab" | "oddOneOut" | "numberExact";

export interface Question {
  _id: string;
  question: string;
  type: QuestionType;
  options: string[] | null;
  category: string;
  duration: number;
}

export interface Session {
  sessionId: string;
  status: "running" | "completed" | "abandoned";
  startedAt: string;
  expiresAt: string;
  questions: Question[];
}

export interface AnswerResponse {
  isCorrect: boolean;
  score: number;
  totalScore: number;
  currentStreak: number;
  sessionComplete: boolean;
  finalScore?: number;
  correctAnswers?: number;
  bestStreak?: number;
}
