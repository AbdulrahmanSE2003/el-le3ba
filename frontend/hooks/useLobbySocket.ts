"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import { useLobbyStore } from "@/store/lobbyStore";

interface UseLobbySocketProps {
  teamId: string;
  userId: string;
}

export const useLobbySocket = ({ teamId, userId }: UseLobbySocketProps) => {
  const router = useRouter();
  const { setMembers, setConnected, setError, setGameStarted } =
    useLobbyStore();

  useEffect(() => {
    const socket = connectSocket();

    // ── Connection ─────────────────────────────────────────
    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join-lobby", { teamId, userId });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    // ── Presence updates ───────────────────────────────────
    socket.on("team-presence", (members) => {
      setMembers(members);
    });

    // ── Game started — redirect all members ───────────────
    socket.on("game-started", (payload) => {
      setGameStarted(payload);
      router.push(`/match/${payload.sessionId}`);
    });

    // ── Errors from server ─────────────────────────────────
    socket.on("game-error", ({ message }) => {
      setError(message);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("team-presence");
      socket.off("game-started");
      socket.off("game-error");
      disconnectSocket();
    };
  }, [teamId, userId]);

  // ── Start game (captain only) ──────────────────────────
  const startGame = () => {
    const socket = getSocket();
    socket.emit("start-game", { teamId, userId });
  };

  return { startGame };
};
