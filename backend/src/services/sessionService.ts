import mongoose from "mongoose";
import Event from "../models/eventModel";
import Question from "../models/questionModel";
import Session from "../models/sessionModel";
import TeamMembership from "../models/teamMembershipModel";
import Team from "../models/teamModel";
import {
  MIN_TEAM_SIZE,
  QUESTIONS_PER_SESSION,
  SESSION_DURATION_MS,
} from "../constants";

export interface CreateSessionResult {
  sessionId: string;
  teamId: string;
  eventId: string;
  questions: any[];
  expiresAt: Date;
}

/**
 * Shared logic for starting a game session.
 *
 * Validates captain, running event, min team size, remaining attempts,
 * samples questions, and creates the session document.
 *
 * Both the socket handler and (if kept) the REST controller call this
 * so that validation rules stay in one place.
 */
export async function createSessionForTeam(
  teamId: string,
  userId: string,
): Promise<CreateSessionResult> {
  const tid = new mongoose.Types.ObjectId(teamId);
  const uid = new mongoose.Types.ObjectId(userId);

  // 1. Verify user is team captain
  const team = await Team.findOne({ teamLeader: uid });
  if (!team || !team._id.equals(tid)) {
    throw new SessionServiceError("أنت مش الكابتن.");
  }

  // 2. Verify there is a running event
  const event = await Event.findOne({ status: "running" });
  if (!event) {
    throw new SessionServiceError("مفيش ايفنت شغال دلوقتي.");
  }

  // 3. Verify team has minimum members
  const memberCount = await TeamMembership.countDocuments({ teamId: tid });
  if (memberCount < MIN_TEAM_SIZE) {
    throw new SessionServiceError(
      `فريقك محتاج على الأقل ${MIN_TEAM_SIZE} أعضاء عشان تلعب.`,
    );
  }

  // 4. Verify team has remaining attempts for this event
  const attemptCount = await Session.countDocuments({
    teamId: tid,
    eventId: event._id,
  });
  if (attemptCount >= event.maxAttempts) {
    throw new SessionServiceError("خلصت المحاولات.");
  }

  // 5. Sample random questions
  const questions = await Question.aggregate([
    { $sample: { size: QUESTIONS_PER_SESSION } },
  ]);

  // 6. Strip correct answers before sending to client
  const questionsForClient = questions.map(
    ({ correctAnswer, ...rest }: any) => rest,
  );

  // 7. Create session document
  const session = await Session.create({
    teamId: tid,
    eventId: event._id,
    seasonId: event.seasonId,
    questions: questions.map((q: any) => q._id),
    startedAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
  });

  return {
    sessionId: String(session._id),
    teamId: String(team._id),
    eventId: String(event._id),
    questions: questionsForClient,
    expiresAt: session.expiresAt!,
  };
}

export class SessionServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SessionServiceError";
  }
}
