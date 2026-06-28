import Event from "../models/eventModel";
import Question, { IQuestion } from "../models/questionModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { getAll } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const startSession = catchAsync(async (req, res, next) => {
  /*
  1. check the team is minimum 2 members
  2. //NOTE: check both are online or what to do here do we allow not whole the team required to be   online or what
  3. start the session, create session doc with current teamId and eventId and startedAt Date , increase the attempts of team by 1 getting random 20 questions
  4. send the questions to the frontend without answers just (question + options + duration)
  5. user submits each answer we check it fast then send him the result with formula calculating
  6. if this question is last question, then we need to [end session - submit completedAt session field - calc the total score - update leaderboard - update team points]
  
  */

  if (!req.user) return next(new AppError("Not Authenticated", 401));
  const userId = req.user._id;

  // check there is a running event
  const event = await Event.findOne({ status: "running" });

  if (!event)
    return next(
      new AppError(
        "There is no running events right now, please try again later",
        404,
      ),
    );

  // Check the team is minimum 2 members
  const team = await Team.findOne({ teamLeader: userId });
  if (!team)
    return next(
      new AppError("There is no such a team you are captain of", 404),
    );

  const teamMembership = await TeamMembership.find({ teamId: team._id });

  if (teamMembership.length < 2)
    return next(
      new AppError("Minimum members to play is 2, add more members", 400),
    );

  // Checking if the team has attempts to play
  const attemptCount = await Session.countDocuments({
    teamId: team._id,
    eventId: event._id,
  });

  if (attemptCount >= event.maxAttempts)
    return next(
      new AppError("You have used all your attempts for this event.", 400),
    );

  // NOTE Start Session
  const questions = await Question.aggregate([{ $sample: { size: 20 } }]);

  const questionsForClient = questions.map(
    ({ correctAnswer, ...rest }) => rest,
  );

  const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes
  const SESSION_EXPIRY = new Date(Date.now() + SESSION_DURATION);

  const session = await Session.create({
    teamId: team._id,
    eventId: event._id,
    questions: questions.map((q) => q._id),
    startedAt: new Date(),
    expiresAt: SESSION_EXPIRY,
  });

  resHandler(res, 201, "session", {
    sessionId: session._id,
    status: session.status,
    startedAt: session.startedAt,
    questions: questionsForClient,
    expiresAt: SESSION_EXPIRY,
  });
});

export const submitAnswer = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authenticated", 401));
  const userId = req.user._id;

  const sessionId = req.params.id;
  const { questionId, answer, timeTaken, submittedBy } = req.body;
});

export const getAllSessions = getAll(Session);
