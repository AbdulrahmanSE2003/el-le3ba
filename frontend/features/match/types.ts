export type QuestionType = "mcq" | "a/b" | "oddOneOut" | "numberExact" | "speed";

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
  correctAnswer?: string;
}

export interface LastAnswer {
  isCorrect: boolean;
  score: number;
  totalScore: number;
  currentStreak: number;
  correctAnswer?: string;
  sessionComplete: boolean;
  answeredByName?: string;
}

export type GamePhase =
  | "intro"
  | "countdown"
  | "question"
  | "correct"
  | "wrong"
  | "timeout"
  | "finished";
