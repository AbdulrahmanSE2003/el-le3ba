import { io, Socket } from "socket.io-client";

export interface ServerToClientEvents {
  "team-presence": (members: PresenceMember[]) => void;
  "game-started": (payload: GameStartedPayload) => void;
  "game-error": (payload: { message: string }) => void;
  "answer-update": (payload: AnswerUpdatePayload) => void;
}

export interface ClientToServerEvents {
  "join-lobby": (payload: { teamId: string; userId: string }) => void;
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

export interface PresenceMember {
  userId: string;
  name: string;
  avatar: string | null;
  role: "captain" | "member";
  isOnline: boolean;
}

export interface GameStartedPayload {
  sessionId: string;
  questions: import("@/features/match/types").Question[];
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

const SOCKET_URL: string =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://localhost:5000";

let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export const getSocket = (): Socket<
  ServerToClientEvents,
  ClientToServerEvents
> => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: false,
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

export const disconnectSocket = (): void => {
  if (socket?.connected) {
    socket.disconnect();
  }
};
