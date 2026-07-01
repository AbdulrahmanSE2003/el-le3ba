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

export interface Member {
  _id: number;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar: null | string;
  };
  teamId: string;
  role: string;
}

export interface Event {
  _id: string;
  title: string;
  createdBy: string;
  startTime: Date;
  endTime: Date;
  status: "scheduled" | "running" | "finished";
  maxAttempts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Team {
  _id: string;
  teamName: string;
  teamCode: string;
  teamLeader: string;
  totalGames: number;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}
