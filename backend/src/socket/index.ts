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
      // Add to room
      socket.join(teamId);
      socket.data.teamId = teamId;
      socket.data.userId = userId;

      // Track online
      if (!teamOnlineMembers.has(teamId)) {
        teamOnlineMembers.set(teamId, new Set());
      }
      teamOnlineMembers.get(teamId)!.add(userId);

      // Get all team members
      const members = await TeamMembership.find({ teamId }).populate(
        "userId",
        "name avatar",
      );

      // Build presence list
      const onlineIds = teamOnlineMembers.get(teamId) || new Set();
      const presence = members.map((m: any) => ({
        userId: m.userId._id,
        name: m.userId.name,
        avatar: m.userId.avatar,
        role: m.role,
        isOnline: onlineIds.has(m.userId._id.toString()),
      }));

      // Broadcast to whole room
      io.to(teamId).emit("team-presence", presence);
    });

    // ── START GAME (captain only) ──────────────────────────
    socket.on("start-game", async ({ teamId, userId }) => {
      try {
        // Verify captain
        const team = await Team.findOne({ teamLeader: userId });
        if (!team || team._id.toString() !== teamId) {
          socket.emit("game-error", {
            message: "Only the captain can start the game.",
          });
          return;
        }

        // Verify member count
        const memberCount = await TeamMembership.countDocuments({ teamId });
        if (memberCount < 2) {
          socket.emit("game-error", { message: "Minimum 2 members required." });
          return;
        }

        // Verify running event
        const event = await Event.findOne({ status: "running" });
        if (!event) {
          socket.emit("game-error", { message: "No running event right now." });
          return;
        }

        // Verify attempts remaining
        const attemptCount = await Session.countDocuments({
          teamId,
          eventId: event._id,
        });
        if (attemptCount >= event.maxAttempts) {
          socket.emit("game-error", { message: "No attempts remaining." });
          return;
        }

        // Pick random questions
        const questions = await Question.aggregate([
          { $sample: { size: QUESTIONS_PER_SESSION } },
        ]);

        const questionsForClient = questions.map(
          ({ correctAnswer, ...rest }) => rest,
        );

        // Create session
        const session = await Session.create({
          teamId,
          eventId: event._id,
          questions: questions.map((q) => q._id),
          startedAt: new Date(),
          expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
        });

        // Emit to ALL team members
        io.to(teamId).emit("game-started", {
          sessionId: session._id,
          questions: questionsForClient,
          expiresAt: session.expiresAt,
        });
      } catch (err) {
        console.error(err);
        socket.emit("game-error", { message: "Failed to start game." });
      }
    });

    // ── ANSWER BROADCAST ───────────────────────────────────
    // After any member submits an answer via REST API,
    // frontend emits this to sync all team members
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
        io.to(teamId).emit("answer-update", {
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
    socket.on("disconnect", async () => {
      const { teamId, userId } = socket.data;
      if (!teamId || !userId) return;

      // Remove from online tracking
      teamOnlineMembers.get(teamId)?.delete(userId);

      // Re-broadcast presence
      const members = await TeamMembership.find({ teamId }).populate(
        "userId",
        "name avatar",
      );

      const onlineIds = teamOnlineMembers.get(teamId) || new Set();
      const presence = members.map((m: any) => ({
        userId: m.userId._id,
        name: m.userId.name,
        avatar: m.userId.avatar,
        role: m.role,
        isOnline: onlineIds.has(m.userId._id.toString()),
      }));

      io.to(teamId).emit("team-presence", presence);
    });
  });
};
