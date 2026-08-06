import Question from "../models/questionModel";
import { AppError } from "../utils/appError";
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

export const getAllQuestions = catchAsync(async (req, res) => {
  const {
    search,
    category,
    type,
    sort = "newest",
    page = "1",
    limit = "10",
  } = req.query as Record<string, string>;

  const filter: Record<string, any> = {};

  // Search
  if (search) {
    filter.$or = [
      {
        question: {
          $regex: search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // Filters
  if (category) {
    filter.category = category;
  }

  if (type) {
    filter.type = type;
  }

  // Sorting
  const sortMap: Record<string, string> = {
    newest: "-createdAt",
    oldest: "createdAt",

    durationAsc: "duration",
    durationDesc: "-duration",

    categoryAsc: "category",
    categoryDesc: "-category",

    typeAsc: "type",
    typeDesc: "-type",
  };

  const pageNumber = Math.max(Number(page), 1);
  const limitNumber = Math.max(Number(limit), 1);
  const skip = (pageNumber - 1) * limitNumber;

  const [questions, total] = await Promise.all([
    Question.find(filter)
      .sort(sortMap[sort] || "-createdAt")
      .skip(skip)
      .limit(limitNumber),

    Question.countDocuments(filter),
  ]);

  resHandler(res, 200, "questions", {
    questions,
    pagination: {
      totalResults: total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  });
});

export const getQuestionsStats = catchAsync(async (req, res) => {
  const [totalQuestions, totalCategories, types, duration] = await Promise.all([
    Question.countDocuments(),

    Question.distinct("category"),

    Question.aggregate([
      {
        $group: {
          _id: "$type",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    Question.aggregate([
      {
        $group: {
          _id: null,
          averageDuration: {
            $avg: "$duration",
          },
          minDuration: {
            $min: "$duration",
          },
          maxDuration: {
            $max: "$duration",
          },
        },
      },
    ]),
  ]);

  resHandler(res, 200, "stats", {
    totalQuestions,
    totalCategories: totalCategories.filter(Boolean).length,
    types,
    duration: duration[0] ?? {
      averageDuration: 0,
      minDuration: 0,
      maxDuration: 0,
    },
  });
});

export const getQuestionsMeta = catchAsync(async (req, res) => {
  const [categories, types] = await Promise.all([
    Question.distinct("category"),
    Question.distinct("type"),
  ]);

  resHandler(res, 200, "meta", {
    categories: categories.filter(Boolean),
    types,
  });
});
export const getQuestion = getOne(Question);

export const updateQuestion = updateOne(Question);

export const deleteQuestion = deleteOne(Question);

export const bulkDeleteQuestions = catchAsync(async (req, res, next) => {
  const { questionIds } = req.body;

  if (!Array.isArray(questionIds) || questionIds.length === 0) {
    return next(new AppError("Please provide question IDs", 400));
  }

  const result = await Question.deleteMany({
    _id: { $in: questionIds },
  });

  await logAudit({
    actor: req.user._id,
    action: "question.bulk_deleted",
    targetModel: "Question",
    metadata: {
      deletedCount: result.deletedCount,
    },
  });

  resHandler(res, 200, "questions", {
    deletedCount: result.deletedCount,
  });
});
