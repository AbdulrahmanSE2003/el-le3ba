import mongoose from "mongoose";
import Question from "../models/questionModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";
import { finalizeSession } from "../utils/finalizeSession";
import { BASE_SCORE, STREAK_BONUS, STREAK_MILESTONE } from "../constants";
import { broadcastQuestionResult } from "../socket";
import { timed, logTiming } from "../utils/timing";
import type { TimingAccumulator } from "../utils/timing";

// ============================================================
// POST /sessions/:id/answer
// Any team member — submits one answer for one question
//
// Uses atomic findOneAndUpdate to prevent race conditions:
// the query filter includes "answerLogs.questionId: { $ne: ... }"
// so only the first concurrent request wins. The loser's update
// returns null → "already answered".
// ============================================================
export const submitAnswer = catchAsync(async (req, res, next) => {
  const userId = req.user._id;
  const sessionId = req.params.id;
  const { questionId, submittedAnswer, timeTaken } = req.body;

  const timing: TimingAccumulator = { steps: [] };

  try {
    // ── 1. Read-only validation (no writes yet) ──────────────
    const session = await timed("findSession", () =>
      Session.findById(sessionId).select(
        "status expiresAt teamId questions currentStreak bestStreak",
      ),
      timing,
    );
    if (!session) return next(new AppError("Session not found.", 404));

    if (session.status !== "running")
      return next(new AppError("This session is no longer active.", 400));

    if (session.expiresAt.getTime() < Date.now()) {
      await timed("finalizeExpired", () => finalizeSession(session, "expired", timing), timing);
      return next(new AppError("Session has expired.", 400));
    }

    // ── 2. Fetch membership and question concurrently ─────────
    // Neither depends on the other, so we save one round trip.
    const [membership, question] = await Promise.all([
      timed("findMembership", () => TeamMembership.findOne({ userId }), timing),
      timed("findQuestion", () =>
        Question.findById(questionId).select("correctAnswer duration"),
        timing,
      ),
    ]);

    if (!membership) return next(new AppError("You are not in a team.", 404));

    if (!session.teamId.equals(membership.teamId))
      return next(new AppError("You cannot answer for this session.", 403));

    // ── 3. Validate the question belongs to this session ──────
    const questionBelongsToSession = session.questions.some((q) =>
      q.equals(questionId),
    );
    if (!questionBelongsToSession)
      return next(new AppError("Invalid question for this session.", 400));

    if (!question) return next(new AppError("Question not found.", 404));

    // ── 5. Calculate score/streak locally (fast, no I/O) ─────
    const isCorrect = question.correctAnswer === submittedAnswer;

    let newStreak: number;
    let score = 0;

    if (isCorrect) {
      newStreak = session.currentStreak + 1;

      const safeTaken = Math.max(0, Math.min(timeTaken, question.duration));
      const remainingTime = question.duration - safeTaken;

      const streakBonus =
        newStreak % STREAK_MILESTONE === 0 ? STREAK_BONUS : 0;
      score = BASE_SCORE + remainingTime + streakBonus;
    } else {
      newStreak = 0;
    }

    const newBestStreak = Math.max(session.bestStreak, newStreak);

    // ── 6. Atomic update — only one request per question wins ─
    const updatedSession = await timed("atomicUpdate", () =>
      Session.findOneAndUpdate(
        {
          _id: sessionId,
          status: "running",
          expiresAt: { $gt: new Date() },
          "answerLogs.questionId": {
            $ne: new mongoose.Types.ObjectId(questionId),
          },
        },
        {
          $push: {
            answerLogs: {
              questionId: new mongoose.Types.ObjectId(questionId),
              submittedBy: userId,
              answer: submittedAnswer,
              isCorrect,
              score,
              answeredAt: new Date(),
              timeTaken,
            },
          },
          $inc: { correctAnswers: isCorrect ? 1 : 0 },
          $set: { currentStreak: newStreak, bestStreak: newBestStreak },
        },
        { returnDocument: "after" },
      ),
      timing,
    );

    if (!updatedSession) {
      // The filter didn't match → already answered / expired / not running
      return next(new AppError("Question already answered.", 400));
    }

    // ── 7. Lock other team members (UI hint only — DB is source of truth) ──
    const io = req.app.get("io");
    if (io) {
      io.to(String(updatedSession.teamId)).emit("answer-locked", { questionId });
    }

    // ── 8. Update team's bestStreak (fire-and-forget — doesn't affect response) ──
    timed("teamUpdate", () =>
      Team.findByIdAndUpdate(updatedSession.teamId, {
        $max: { bestStreak: newBestStreak },
      }),
      timing,
    ).catch((err: unknown) => {
      console.error("teamUpdate fire-and-forget error:", err);
    });

    // ── 9. Check if this was the last question ────────────────
    const isLastQuestion =
      updatedSession.answerLogs.length === updatedSession.questions.length;

    if (!isLastQuestion) {
      const result = {
        questionId,
        correctAnswer: question.correctAnswer,
        isCorrect,
        score,
        totalScore: updatedSession.answerLogs.reduce(
          (sum: number, log: any) => sum + log.score,
          0,
        ),
        currentStreak: newStreak,
        sessionComplete: false,
        answeredBy: String(userId),
        answeredByName: req.user.name,
      };

      if (io) {
        broadcastQuestionResult(io, String(updatedSession.teamId), result);
      }

      const { correctAnswer: _correctAnswer, ...answerResult } = result;

      return resHandler(res, 200, "answerDetails", {
        ...answerResult,
        alreadyAnswered: false,
      });
    }

    // ── Last question — finalize ──
    await timed("finalizeCompleted", () =>
      finalizeSession(updatedSession, "completed", timing),
      timing,
    );

    const result = {
      questionId,
      correctAnswer: question.correctAnswer,
      isCorrect,
      score,
      totalScore: updatedSession.finalScore,
      currentStreak: newStreak,
      sessionComplete: true,
      finalScore: updatedSession.finalScore,
      correctAnswers: updatedSession.correctAnswers,
      bestStreak: newBestStreak,
      answeredBy: String(userId),
      answeredByName: req.user.name,
    };

    if (io) {
      broadcastQuestionResult(io, String(updatedSession.teamId), result);
    }

    const { correctAnswer: _correctAnswer, ...answerResult } = result;

    resHandler(res, 200, "answerDetails", {
      ...answerResult,
      alreadyAnswered: false,
    });
  } finally {
    logTiming(timing);
  }
});

// ============================================================
// GET /sessions/:id
// Any team member - gets the session result (score - correctAnswers count - best streak)
// ============================================================
export const getSessionResult = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const sessionId = req.params.id;
  if (!sessionId)
    return next(new AppError("Invalid operation, provide session id", 400));

  // 1. check the session has ended normally and not flagged
  const session = await Session.findOne({ _id: sessionId });
  if (!session) return next(new AppError("There is no such a session", 404));

  if (session.status === "running") {
    if (session.expiresAt.getTime() < Date.now()) {
      await finalizeSession(session, "expired");
    } else {
      return next(new AppError("Session is not completed yet", 400));
    }
  }

  if (session.endReason === "flagged")
    return next(
      new AppError(
        "Sorry this session is under processing, please check later",
        400,
      ),
    );

  // 2. check the user get his team session not anyone else
  const membership = await TeamMembership.findOne({ userId });
  if (!membership) return next(new AppError("The user is not in team.", 400));
  if (!session.teamId.equals(membership.teamId))
    return next(
      new AppError("You are not authorized to perform this action", 400),
    );

  // 4. Get session details
  resHandler(res, 200, "sessionDetails", {
    score: session.finalScore,
    correctAnswers: session.correctAnswers,
    bestStreak: session.bestStreak,
  });
});

// ============================================================
// POST /sessions/:id/abandon
// Only captains and admins - can end leave
// ============================================================
export const abandonSession = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const membership = await TeamMembership.findOne({ userId });
  if (!membership) return next(new AppError("The user is not in team.", 400));

  if (membership.role !== "captain")
    return next(
      new AppError("You are not authorized to perform this action", 400),
    );

  const session = await Session.findOne({
    _id: req.params.id,
    teamId: membership.teamId,
  });
  if (!session) return next(new AppError("There is no such a session.", 400));
  if (session.status !== "running")
    return next(new AppError("Session has already finished.", 400));

  // End session
  session.status = "completed";
  session.endReason = "abandoned";
  session.completedAt = new Date();
  session.finalScore = 0;

  await session.save();

  const io = req.app.get("io");
  if (io) {
    io.to(String(session.teamId)).emit("game-ended", {
      abandoned: true,
      finalScore: 0,
      correctAnswers: 0,
      bestStreak: 0,
    });
  }

  res.status(200).json({ status: true });
});

// ============================================================
// GET /sessions — Admin only
// ============================================================
export const getAllSessions = catchAsync(async (req, res, next) => {
  const {
    search,
    status,
    sort = "-startedAt",
    page = "1",
    limit = "10",
  } = req.query;

  const currentPage = Math.max(Number(page) || 1, 1);
  const currentLimit = Math.max(Number(limit) || 10, 1);
  const skip = (currentPage - 1) * currentLimit;

  const filter: Record<string, unknown> = {};

  if (
    status &&
    ["running", "completed", "scored"].includes(String(status))
  ) {
    filter.status = status;
  }

  const searchTerm = typeof search === "string" ? search.trim() : "";

  if (searchTerm) {
    const matchingTeams = await Team.find({
      teamName: { $regex: searchTerm, $options: "i" },
    }).select("_id");
    const teamIds = matchingTeams.map((t) => t._id);
    filter.teamId = { $in: teamIds };
  }

  const [sessions, total] = await Promise.all([
    Session.find(filter)
      .select("-__v")
      .populate("teamId", "teamName")
      .populate("eventId", "title")
      .populate("seasonId", "title")
      .sort(String(sort))
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    Session.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / currentLimit);

  resHandler(res, 200, "sessions", {
    sessions,
    pagination: {
      currentPage,
      limit: currentLimit,
      total,
      totalPages,
    },
  });
});


export const getRecentSessions = catchAsync(async (req, res, next) => {
  
  const sessions= await Session.find()
    .sort("-startedAt")
      .select("-__v -seasonId -questions -answerLogs")
      .populate("teamId", "teamName")
      .populate("eventId", "title")
      .limit(10)

  resHandler(res, 200, "sessions",
    sessions,
  );
});


export const getSessionsStats = catchAsync(async (req, res, next) => {
  const [total, completed, running, avgScoreResult] = await Promise.all([
    Session.countDocuments(),
    Session.countDocuments({ endReason: "completed" }),
    Session.countDocuments({ status: "running" }),
    Session.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: null, avg: { $avg: "$finalScore" } } },
    ]),
  ]);

  resHandler(res, 200, "stats", {
    total,
    completed,
    running,
    averageScore: Math.round(avgScoreResult[0]?.avg ?? 0),
  });
});
