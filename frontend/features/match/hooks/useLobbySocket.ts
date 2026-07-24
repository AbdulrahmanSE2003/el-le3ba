"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { connectSocket, getSocket } from "@/features/match/lib/socket";
import { useLobbyStore } from "@/features/match/store/lobbyStore";
import { useGameStore } from "@/features/match/store/gameStore";
import type {
  GameStartedPayload,
  PresenceMember,
} from "@/features/match/lib/socket";
import { toast } from "sonner";

interface UseLobbySocketProps {
  teamId: string;
  userId: string;
}

export const useLobbySocket = ({ teamId, userId }: UseLobbySocketProps) => {
  const [isStarting, setIsStarting] = useState(false);
  const router = useRouter();
  const { setMembers, setConnected, setError, members } = useLobbyStore();
  const setGame = useGameStore((s) => s.setGame);

  useEffect(() => {
    if (!teamId || !userId || userId.trim() === "") return;

    const socket = connectSocket();

    const handleConnect = () => {
      setConnected(true);
      socket.emit("join-lobby", { teamId, userId });
    };

    if (socket.connected) {
      handleConnect();
    }

    const handleDisconnect = () => {
      setConnected(false);
    };

    const handleTeamPresence = (presenceMembers: PresenceMember[]) => {
      const prevMembers = useLobbyStore.getState().members;

      for (const member of presenceMembers) {
        const prev = prevMembers.find((m) => m.userId === member.userId);
        if (
          prev &&
          !prev.isOnline &&
          member.isOnline &&
          member.userId !== userId
        ) {
          toast.success(`${member.name} متصل الآن 🟢`);
        }
      }

      setMembers(presenceMembers);
    };

    const handleGameStarted = (payload: GameStartedPayload) => {
      setIsStarting(false);

      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("team-presence", handleTeamPresence);
      socket.off("game-started", handleGameStarted);
      socket.off("game-error", handleGameError);

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

      router.replace(`/match/${payload.sessionId}`);
    };

    const handleGameError = ({ message }: { message: string }) => {
      setIsStarting(false);
      setError(message);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("team-presence", handleTeamPresence);
    socket.on("game-started", handleGameStarted);
    socket.on("game-error", handleGameError);

    return () => {
      socket.emit("leave-lobby", { teamId, userId });
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("team-presence", handleTeamPresence);
      socket.off("game-started", handleGameStarted);
      socket.off("game-error", handleGameError);
    };
  }, [teamId, userId, router, setMembers, setConnected, setError, setGame]);

  const startGame = useCallback(() => {
    if (isStarting) return;

    const connectedMembers = members.filter((member) => member.isOnline);

    if (connectedMembers.length < 1) {
      toast.warning(
        "متقدرش تلعب لوحدك كمل التيم بتاعك أو عالأقل 2 يكونوا أونلاين.",
      );
      return;
    }

    const socket = getSocket();

    if (!socket.connected) {
      setError("Not connected to server");
      return;
    }

    setIsStarting(true);
    socket.emit("start-game", { teamId, userId });
  }, [teamId, userId, members, setError, isStarting]);
  return { startGame, isStarting };
};
