import { Server, Socket } from "socket.io";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import Event from "../models/eventModel";
import Session from "../models/sessionModel";
import Question from "../models/questionModel";
import { QUESTIONS_PER_SESSION, SESSION_DURATION_MS } from "../constants";

// Track online members: { teamId: Set<userId> }
const teamOnlineMembers = new Map<string, Set<string>>();

export const initSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // ── JOIN LOBBY ─────────────────────────────────────────
    socket.on("join-lobby", async ({ teamId, userId }) => {
      try {
        const stringTeamId = String(teamId);
        const stringUserId = String(userId);

        console.log("join-lobby start:", { stringTeamId, stringUserId });

        socket.join(stringTeamId);
        socket.data.teamId = stringTeamId;
        socket.data.userId = stringUserId;

        if (!teamOnlineMembers.has(stringTeamId)) {
          teamOnlineMembers.set(stringTeamId, new Set());
        }
        teamOnlineMembers.get(stringTeamId)!.add(stringUserId);

        console.log("before DB query");

        const members = await TeamMembership.find({
          teamId: stringTeamId,
        }).populate("userId", "name avatar");

        console.log("after DB query, members count:", members.length);

        const onlineIds = teamOnlineMembers.get(stringTeamId) || new Set();
        const presence = members.map((m: any) => ({
          userId: m.userId._id,
          name: m.userId.name,
          avatar: m.userId.avatar,
          role: m.role,
          isOnline: onlineIds.has(String(m.userId._id)),
        }));

        io.to(stringTeamId).emit("team-presence", presence);
        console.log("team-presence emitted");
      } catch (err) {
        console.error("join-lobby error:", err);
        socket.emit("game-error", { message: "Failed to join lobby." });
      }
    });

    // ── START GAME (captain only) ──────────────────────────
    socket.on("start-game", async ({ teamId, userId }) => {
      try {
        const stringTeamId = String(teamId);
        const stringUserId = String(userId);

        const team = await Team.findOne({ teamLeader: stringUserId });
        if (!team || team._id.toString() !== stringTeamId) {
          socket.emit("game-error", {
            message: "Only the captain can start the game.",
          });
          return;
        }

        const memberCount = await TeamMembership.countDocuments({
          teamId: stringTeamId,
        });
        if (memberCount < 2) {
          socket.emit("game-error", { message: "Minimum 2 members required." });
          return;
        }

        const event = await Event.findOne({ status: "running" });
        if (!event) {
          socket.emit("game-error", { message: "No running event right now." });
          return;
        }

        const attemptCount = await Session.countDocuments({
          teamId: stringTeamId,
          eventId: event._id,
        });
        if (attemptCount >= event.maxAttempts) {
          socket.emit("game-error", { message: "No attempts remaining." });
          return;
        }

        const questions = await Question.aggregate([
          { $sample: { size: QUESTIONS_PER_SESSION } },
        ]);

        const questionsForClient = questions.map(
          ({ correctAnswer, ...rest }) => rest,
        );

        const session = await Session.create({
          teamId: stringTeamId,
          eventId: event._id,
          questions: questions.map((q) => q._id),
          startedAt: new Date(),
          expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
        });

        io.to(stringTeamId).emit("game-started", {
          sessionId: session._id,
          teamId: stringTeamId,
          eventId: event._id,
          questions: questionsForClient,
          expiresAt: session.expiresAt,
        });
      } catch (err) {
        console.error(err);
        socket.emit("game-error", { message: "Failed to start game." });
      }
    });

    // ── ANSWER BROADCAST ───────────────────────────────────
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

    // ── DISCONNECT ─────────────────────────────────────────
    socket.on("disconnect", () => {
      const { teamId, userId } = socket.data;
      if (!teamId || !userId) return;

      const stringTeamId = String(teamId);
      const stringUserId = String(userId);

      // Delay execution to account for page changes and rapid reconnection
      setTimeout(async () => {
        // Check if the user successfully reconnected or joined from another tab/page
        const currentSockets = await io.in(stringTeamId).fetchSockets();
        const isUserStillInRoom = currentSockets.some(
          (s) => String(s.data.userId) === stringUserId,
        );

        if (isUserStillInRoom) {
          return; // Skip cleanup and event emit because user is still connected
        }

        teamOnlineMembers.get(stringTeamId)?.delete(stringUserId);

        const members = await TeamMembership.find({
          teamId: stringTeamId,
        }).populate("userId", "name avatar");

        const onlineIds = teamOnlineMembers.get(stringTeamId) || new Set();
        const presence = members.map((m: any) => ({
          userId: m.userId._id,
          name: m.userId.name,
          avatar: m.userId.avatar,
          role: m.role,
          isOnline: onlineIds.has(String(m.userId._id)),
        }));

        io.to(stringTeamId).emit("team-presence", presence);
      }, 1000);
    });
  });
};
