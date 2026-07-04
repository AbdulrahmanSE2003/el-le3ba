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

export interface Member {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
    avatar: string | null;
  };
  teamId: string;
  role: "captain" | "member";
}

export interface Event {
  _id: string;
  title: string;
  createdBy: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "running" | "finished";
  maxAttempts: number;
  createdAt: string;
  updatedAt: string;
}

export interface Team {
  _id: string;
  teamName: string;
  teamCode: string;
  teamLeader: string;
  totalGames: number;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export type GamePhase =
  | "intro"
  | "countdown"
  | "question"
  | "correct"
  | "wrong"
  | "timeout"
  | "finished";
