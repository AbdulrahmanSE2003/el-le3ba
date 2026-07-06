import { io, Socket } from "socket.io-client";

// Import the Question type - adjust the path as needed
// If this import doesn't work, you might need to use `any` or define a local type
import type { Question } from "@/features/match/types";

export interface PresenceMember {
  userId: string;
  name: string;
  avatar: string | null;
  role: "captain" | "member";
  isOnline: boolean;
}

export interface GameStartedPayload {
  sessionId: string;
  teamId: string;
  eventId: string;
  questions: Question[];
  expiresAt: string;
}

export interface AnswerUpdatePayload {
  userId: string;
  userName: string;
  questionId: string;
  isCorrect: boolean;
  score: number;
  currentStreak: number;
}

export interface ServerToClientEvents {
  "team-presence": (members: PresenceMember[]) => void;
  "game-started": (payload: GameStartedPayload) => void;
  "game-error": (payload: { message: string }) => void;
  "answer-update": (payload: AnswerUpdatePayload) => void;
}

export interface ClientToServerEvents {
  "join-lobby": (payload: { teamId: string; userId: string }) => void;
  "leave-lobby": (payload: { teamId: string; userId: string }) => void;
  "start-game": (payload: { teamId: string; userId: string }) => void;
  "answer-submitted": (payload: {
    teamId: string;
    userId: string;
    userName: string;
    questionId: string;
    isCorrect: boolean;
    score: number;
    currentStreak: number;
  }) => void;
}

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

// FIXED: Proper return type syntax
export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 5000,
    });
  }
  return socket;
};

export const connectSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  const s = getSocket();
  if (!s.connected) s.connect();
  return s;
};

// FIXED: Better cleanup with event removal
export const disconnectSocket = (): void => {
  if (socket) {
    // Remove all listeners to prevent memory leaks
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};

// OPTIONAL: Helper to check connection status
export const isSocketConnected = (): boolean => {
  return socket?.connected ?? false;
};

// OPTIONAL: Cleanup on page unload (for client-side)
if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    disconnectSocket();
  });
}
export interface QuestionResultPayload {
  questionId: string;
  correctAnswer: string;
  isCorrect: boolean;
  score: number;
  totalScore: number;
  currentStreak: number;
  sessionComplete: boolean;
  finalScore?: number;
  correctAnswers?: number;
  bestStreak?: number;
  abandoned?: boolean;
  answeredBy?: string;
  answeredByName?: string;
}

export interface ServerToClientEvents {
  "team-presence": (members: PresenceMember[]) => void;
  "game-started": (payload: GameStartedPayload) => void;
  "game-error": (payload: { message: string }) => void;
  "answer-update": (payload: AnswerUpdatePayload) => void;
  "answer-locked": (payload: { questionId: string }) => void;
  "question-result": (payload: QuestionResultPayload) => void;
  "next-question": () => void;
  "game-ended": (payload: {
    finalScore?: number;
    correctAnswers?: number;
    bestStreak?: number;
    abandoned?: boolean;
  }) => void;
}

export interface ClientToServerEvents {
  "join-lobby": (payload: { teamId: string; userId: string }) => void;
  "leave-lobby": (payload: { teamId: string; userId: string }) => void;
  "start-game": (payload: { teamId: string; userId: string }) => void;
  "abandon-game": (payload: {
    teamId: string;
    sessionId: string;
    userId: string;
  }) => void;
  "answer-submitted": (payload: {
    teamId: string;
    userId: string;
    userName: string;
    questionId: string;
    isCorrect: boolean;
    score: number;
    currentStreak: number;
  }) => void;
}
