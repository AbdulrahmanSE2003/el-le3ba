import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  deleteQuestion,
  bulkCreateQuestions,
  getQuestion,
  updateQuestion,
  createQuestion,
  getAllQuestions,
  getQuestionsStats,
  getQuestionsMeta,
  bulkDeleteQuestions,
} from "../controllers/questionController";

const questionRoutes = express.Router();

questionRoutes.use(protect);
questionRoutes.use(restrictTo("admin", "superAdmin"));

questionRoutes.get("/stats", getQuestionsStats);
questionRoutes.get("/meta", getQuestionsMeta);

questionRoutes.route("/").get(getAllQuestions).post(createQuestion);

questionRoutes
  .route("/bulk")
  .post(bulkCreateQuestions)
  .delete(bulkDeleteQuestions);

questionRoutes
  .route("/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default questionRoutes;
