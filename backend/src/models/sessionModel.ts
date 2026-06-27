import mongoose from "mongoose";

type AnswerLog = {
  questionId: mongoose.Types.ObjectId;
  submittedBy: mongoose.Types.ObjectId;
  answer: string;
  isCorrect: boolean;
  score: number;
  answeredAt: Date;
  timeTaken: number;
};

export interface ISession extends Document {
  teamId: mongoose.Types.ObjectId;
  eventId: mongoose.Types.ObjectId;
  questions: mongoose.Types.ObjectId[];
  status: "running" | "completed" | "scored";
  startedAt: Date;
  completedAt: Date;
  finalScore: number;
  correctAnswers: number;
  currentStreak: number;
  bestStreak: number;
  answerLogs: AnswerLog[];
}

const sessionSchema = new mongoose.Schema(
  {
    teamId: { type: mongoose.Schema.ObjectId, ref: "Team", required: true },

    eventId: { type: mongoose.Schema.ObjectId, ref: "Event", required: true },

    questions: [
      { type: mongoose.Schema.ObjectId, ref: "Question", required: true },
    ],

    status: {
      type: String,
      enum: ["running", "completed", "scored"],
      default: "running",
    },

    startedAt: Date,
    completedAt: Date,

    finalScore: { type: Number, default: 0 },
    correctAnswers: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },

    answerLogs: [
      {
        questionId: {
          type: mongoose.Schema.ObjectId,
          ref: "Question",
          required: true,
        },
        submittedBy: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        answer: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
        score: { type: Number, default: 0 },
        answeredAt: { type: Date, required: true },
        timeTaken: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

sessionSchema.index({ teamId: 1, eventId: 1 });

sessionSchema.index({ eventId: 1, finalScore: -1 });

sessionSchema.index({ status: 1 });
// find all inProgress sessions (timeout cleanup later)

const Session = mongoose.model<ISession>("Session", sessionSchema);

export default Session;
