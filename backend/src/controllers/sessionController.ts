import mongoose from "mongoose";
import Event from "../models/eventModel";
import Question from "../models/questionModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import Leaderboard from "../models/leaderboardModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { getAll } from "../utils/factory";
import resHandler from "../utils/resHandler";

const BASE_SCORE = 15;
const STREAK_BONUS = 5;
const STREAK_MILESTONE = 5;
const SESSION_DURATION_MS = 5 * 60 * 1000; // 5 minutes
const QUESTIONS_PER_SESSION = 20;
const MIN_TEAM_SIZE = 2;

// ============================================================
// POST /sessions/start
// Captain only — starts a new game session for their team
// ============================================================
export const startSession = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authenticated", 401));
  const userId = req.user._id;

  // 1. Verify there is a running event
  const event = await Event.findOne({ status: "running" });
  if (!event) return next(new AppError("No running event right now.", 404));

  // 2. Verify user is a team captain
  const team = await Team.findOne({ teamLeader: userId });
  if (!team)
    return next(new AppError("You are not a captain of any team.", 404));

  // 3. Verify team has minimum 2 members
  const memberCount = await TeamMembership.countDocuments({ teamId: team._id });
  if (memberCount < MIN_TEAM_SIZE)
    return next(
      new AppError(`Minimum ${MIN_TEAM_SIZE} members required to play.`, 400),
    );

  // 4. Verify team has remaining attempts for this event
  const attemptCount = await Session.countDocuments({
    teamId: team._id,
    eventId: event._id,
  });
  if (attemptCount >= event.maxAttempts)
    return next(new AppError("No attempts remaining for this event.", 400));

  // 5. Pick 20 random questions from the bank
  const questions = await Question.aggregate([
    { $sample: { size: QUESTIONS_PER_SESSION } },
  ]);

  // 6. Strip correct answers before sending to client
  const questionsForClient = questions.map(
    ({ correctAnswer, ...rest }) => rest,
  );

  // 7. Create the session document
  const session = await Session.create({
    teamId: team._id,
    eventId: event._id,
    questions: questions.map((q) => q._id),
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
  });

  resHandler(res, 201, "session", {
    sessionId: session._id,
    status: session.status,
    startedAt: session.startedAt,
    expiresAt: session.expiresAt,
    questions: questionsForClient,
  });
});

// ============================================================
// POST /sessions/:id/answer
// Any team member — submits one answer for one question
// ============================================================
export const submitAnswer = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authenticated.", 401));
  const userId = req.user._id;

  const sessionId = req.params.id;
  const { questionId, submittedAnswer, timeTaken } = req.body;

  // ── 1. Load and validate session ──────────────────────────
  const session = await Session.findById(sessionId);
  if (!session) return next(new AppError("Session not found.", 404));

  if (session.status !== "running")
    return next(new AppError("This session is no longer active.", 400));

  if (session.expiresAt.getTime() < Date.now())
    return next(new AppError("Session has expired.", 400));

  // ── 2. Verify user belongs to this session's team ─────────
  const membership = await TeamMembership.findOne({ userId });
  if (!membership) return next(new AppError("You are not in a team.", 404));

  if (!session.teamId.equals(membership.teamId))
    return next(new AppError("You cannot answer for this session.", 403));

  // ── 3. Validate the question ───────────────────────────────
  const questionBelongsToSession = session.questions.some((q) =>
    q.equals(questionId),
  );
  if (!questionBelongsToSession)
    return next(new AppError("Invalid question for this session.", 400));

  const alreadyAnswered = session.answerLogs.some((log) =>
    log.questionId.equals(questionId),
  );
  if (alreadyAnswered)
    return next(new AppError("Question already answered.", 400));

  // ── 4. Fetch question to check answer ─────────────────────
  const question = await Question.findById(questionId).select(
    "correctAnswer duration",
  );
  if (!question) return next(new AppError("Question not found.", 404));

  // ── 5. Calculate score ────────────────────────────────────
  let isCorrect = false;
  let score = 0;

  if (question.correctAnswer === submittedAnswer) {
    isCorrect = true;

    // Cap timeTaken between 0 and question duration (anti-cheat)
    const safeTaken = Math.max(0, Math.min(timeTaken, question.duration));
    const remainingTime = question.duration - safeTaken;

    // Update streak
    session.currentStreak += 1;
    if (session.currentStreak > session.bestStreak)
      session.bestStreak = session.currentStreak;

    // Streak milestone bonus
    const streakBonus =
      session.currentStreak % STREAK_MILESTONE === 0 ? STREAK_BONUS : 0;

    score = BASE_SCORE + remainingTime + streakBonus;
  } else {
    // Wrong answer — reset streak
    session.currentStreak = 0;
  }

  // ── 6. Record the answer log ──────────────────────────────
  session.answerLogs.push({
    questionId,
    submittedBy: userId,
    answer: submittedAnswer,
    isCorrect,
    score,
    answeredAt: new Date(),
    timeTaken,
  });

  if (isCorrect) session.correctAnswers += 1;

  // ── 7. Check if this was the last question ────────────────
  const isLastQuestion = session.answerLogs.length === session.questions.length;

  if (!isLastQuestion) {
    // Not last — just save and return result
    await session.save();
    return resHandler(res, 200, "answerDetails", {
      isCorrect,
      score,
      totalScore: session.answerLogs.reduce((sum, log) => sum + log.score, 0),
      currentStreak: session.currentStreak,
      sessionComplete: false,
    });
  }

  // ── 8. Last question — finalize session in a transaction ──
  const MSession = await mongoose.startSession();
  MSession.startTransaction();

  try {
    // Finalize session fields
    session.status = "completed";
    session.completedAt = new Date();
    session.endReason = "completed";
    session.finalScore = session.answerLogs.reduce(
      (total, log) => total + log.score,
      0,
    );

    await session.save({ session: MSession });

    // Update leaderboard entry (create if first game, update if not)
    await Leaderboard.findOneAndUpdate(
      { teamId: session.teamId, eventId: session.eventId },
      {
        $inc: {
          totalPoints: session.finalScore,
          sessionsPlayed: 1,
        },
        $set: { lastPlayedSession: new Date() },
      },
      { upsert: true, session: MSession, new: true },
    );

    // Update team lifetime stats
    await Team.findByIdAndUpdate(
      session.teamId,
      { $inc: { points: session.finalScore, totalGames: 1 } },
      { session: MSession },
    );

    // Update all team members' lifetime stats
    const teamMembers = await TeamMembership.find({
      teamId: session.teamId,
    });
    const memberIds = teamMembers.map((m) => m.userId);

    await User.updateMany(
      { _id: { $in: memberIds } },
      { $inc: { gamesPlayed: 1, totalScore: session.finalScore } },
      { session: MSession },
    );

    await MSession.commitTransaction();
  } catch (error) {
    await MSession.abortTransaction();
    throw error;
  } finally {
    MSession.endSession();
  }

  // Return final result
  resHandler(res, 200, "answerDetails", {
    isCorrect,
    score,
    currentStreak: session.currentStreak,
    sessionComplete: true,
    finalScore: session.finalScore,
    correctAnswers: session.correctAnswers,
    bestStreak: session.bestStreak,
  });
});

// ============================================================
// GET /sessions/:id
// Any team member - gets the session result (score - correctAnswers count - best streak)
// ============================================================
export const getSessionResult = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authenticated", 401));
  const userId = req.user._id;

  const sessionId = req.params.id;
  if (!sessionId)
    return next(new AppError("Invalid operation, provide session id", 400));

  // 1. check the session has ended normally and not flagged
  const session = await Session.findOne({ _id: sessionId });
  if (!session) return next(new AppError("There is no such a session", 404));

  if (session.status === "running")
    return next(new AppError("Session is not completed yet", 400));

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
  if (!req.user) return next(new AppError("Not Authenticated", 401));
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

  resHandler(res, 200, "session", session);
});

// ============================================================
// GET /sessions — Admin only
// ============================================================
export const getAllSessions = getAll(Session, [
  { path: "teamId", select: "teamName" },
  { path: "eventId", select: "title" },
]);
