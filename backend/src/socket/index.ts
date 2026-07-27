import { Server, Socket } from "socket.io";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import Session from "../models/sessionModel";
import { createSessionForTeam, SessionServiceError } from "../services/sessionService";

// TODO: teamOnlineMembers is in-memory and only works for a single Node process.
// For multi-instance deployment, replace with a Redis-backed adapter
// (e.g. socket.io-redis) so presence data is shared across instances.
const teamOnlineMembers = new Map<string, Set<string>>();

const getPresence = async (teamId: string) => {
  const members = await TeamMembership.find({ teamId }).populate(
    "userId",
    "name avatar",
  );
  const onlineIds = teamOnlineMembers.get(teamId) ?? new Set<string>();
  return members.map((m: any) => ({
    userId: String(m.userId._id),
    name: m.userId.name,
    avatar: m.userId.avatar,
    role: m.role,
    isOnline: onlineIds.has(String(m.userId._id)),
  }));
};

// ضيف في الأول
export const broadcastQuestionResult = (
  io: Server,
  teamId: string,
  payload: {
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
    answeredBy?: string;
    answeredByName?: string;
  },
) => {
  io.to(teamId).emit("question-result", payload);

  if (!payload.sessionComplete) {
    setTimeout(() => {
      io.to(teamId).emit("next-question");
    }, 2000);
  } else {
    setTimeout(() => {
      io.to(teamId).emit("game-ended", {
        finalScore: payload.finalScore,
        correctAnswers: payload.correctAnswers,
        bestStreak: payload.bestStreak,
      });
    }, 2000);
  }
};

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    socket.on("join-lobby", async ({ teamId, userId }) => {
      try {
        const tid = String(teamId);
        const uid = String(userId);

        socket.join(tid);
        socket.data.teamId = tid;
        socket.data.userId = uid;

        if (!teamOnlineMembers.has(tid)) {
          teamOnlineMembers.set(tid, new Set());
        }
        teamOnlineMembers.get(tid)!.add(uid);

        const presence = await getPresence(tid);
        io.to(tid).emit("team-presence", presence);
      } catch (err) {
        console.error("join-lobby error:", err);
      }
    });

    socket.on("leave-lobby", async ({ teamId, userId }) => {
      try {
        const tid = String(teamId);
        const uid = String(userId);
        teamOnlineMembers.get(tid)?.delete(uid);
        const presence = await getPresence(tid);
        io.to(tid).emit("team-presence", presence);
      } catch (err) {
        console.error("leave-lobby error:", err);
      }
    });

    socket.on("start-game", async ({ teamId, userId }) => {
      try {
        const result = await createSessionForTeam(
          String(teamId),
          String(userId),
        );
        io.to(result.teamId).emit("game-started", {
          sessionId: result.sessionId,
          teamId: result.teamId,
          eventId: result.eventId,
          questions: result.questions,
          expiresAt: String(result.expiresAt),
        });
      } catch (err) {
        if (err instanceof SessionServiceError) {
          socket.emit("game-error", { message: err.message });
        } else {
          console.error("start-game error:", err);
          socket.emit("game-error", { message: "حصل خطأ، حاول تاني." });
        }
      }
    });

    socket.on(
      "answer-submitted",
      ({
        teamId,
        userId,
        userName,
        questionId,
        isCorrect,
        score,
        currentStreak,
      }) => {
        io.to(String(teamId)).emit("answer-update", {
          userId,
          userName,
          questionId,
          isCorrect,
          score,
          currentStreak,
        });
      },
    );

    socket.on("disconnect", () => {
      const tid = socket.data.teamId as string | undefined;
      const uid = socket.data.userId as string | undefined;
      if (!tid || !uid) return;

      setTimeout(async () => {
        try {
          const sockets = await io.in(tid).fetchSockets();
          const stillConnected = sockets.some(
            (s) => String(s.data.userId) === uid,
          );
          if (stillConnected) return;

          teamOnlineMembers.get(tid)?.delete(uid);
          const presence = await getPresence(tid);
          io.to(tid).emit("team-presence", presence);
        } catch (err) {
          console.error("disconnect cleanup error:", err);
        }
      }, 2000);
    });

    socket.on("abandon-game", async ({ teamId, sessionId, userId }) => {
      try {
        const tid = String(teamId);
        const uid = String(userId);

        const team = await Team.findOne({ teamLeader: uid });
        if (!team || team._id.toString() !== tid) {
          socket.emit("game-error", {
            message: "فقط الكابتن يمكنه إنهاء الجلسة.",
          });
          return;
        }

        const session = await Session.findById(sessionId);
        if (session && session.status === "running") {
          session.status = "completed";
          session.endReason = "abandoned";
          session.completedAt = new Date();
          session.finalScore = 0;
          await session.save();
        }
        io.to(tid).emit("game-ended", {
          abandoned: true,
          finalScore: 0,
          correctAnswers: 0,
          bestStreak: 0,
        });
      } catch (err) {
        console.error("abandon-game error:", err);
      }
    });
  });
};
