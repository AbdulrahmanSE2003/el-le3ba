import Question from "../models/questionModel";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from "../utils/factory";
import resHandler from "../utils/resHandler";

export const bulkCreateQuestions = catchAsync(async (req, res, next) => {
  const questions = await Question.insertMany(req.body.questions);
  await logAudit({
    actor: req.user._id,
    action: "question.bulk_created",
    target: questions[0]?._id,
    targetModel: "Question",
  });
  resHandler(res, 201, "questions", questions);
});

export const createQuestion = createOne(Question);

export const getAllQuestions = getAll(Question);

export const getQuestion = getOne(Question);

export const updateQuestion = updateOne(Question);

export const deleteQuestion = deleteOne(Question);
