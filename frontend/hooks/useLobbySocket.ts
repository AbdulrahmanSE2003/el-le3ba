"use client";
import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { useLobbyStore } from "@/store/lobbyStore";
import { useGameStore } from "@/store/gameStore";
import type { GameStartedPayload, PresenceMember } from "@/lib/socket";

interface UseLobbySocketProps {
  teamId: string;
  userId: string;
}

export const useLobbySocket = ({ teamId, userId }: UseLobbySocketProps) => {
  const router = useRouter();
  const { setMembers, setConnected, setError, setGameStarted } =
    useLobbyStore();
  const setGame = useGameStore((s) => s.setGame);

  useEffect(() => {
    if (!teamId || !userId) return;

    const socket = connectSocket();

    const handleConnect = () => {
      setConnected(true);
      socket.emit("join-lobby", { teamId, userId });
    };

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleTeamPresence = (members: PresenceMember[]) => {
      setMembers(members);
    };

    const handleGameStarted = (payload: GameStartedPayload) => {
      setGameStarted(payload);
      setGame({
        sessionId: payload.sessionId,
        teamId,
        eventId: "",
        sessionExpiresAt: payload.expiresAt,
        questions: payload.questions.map((q) => ({
          _id: q._id,
          question: q.question,
          type: q.type,
          category: q.category,
          duration: q.duration,
          options: q.options ?? undefined,
        })),
      });
      router.push(`/match/${payload.sessionId}`);
    };

    const handleGameError = ({ message }: { message: string }) => {
      setError(message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("team-presence", handleTeamPresence);
    socket.on("game-started", handleGameStarted);
    socket.on("game-error", handleGameError);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("team-presence", handleTeamPresence);
      socket.off("game-started", handleGameStarted);
      socket.off("game-error", handleGameError);
      disconnectSocket();
    };
  }, [teamId, userId, router, setMembers, setConnected, setError, setGameStarted, setGame]);

  const startGame = useCallback(() => {
    const socket = getSocket();
    if (socket.connected) {
      socket.emit("start-game", { teamId, userId });
    } else {
      setError("Not connected to server");
    }
  }, [teamId, userId, setError]);

  return { startGame };
};
