import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  deleteQuestion,
  bulkCreateQuestions,
  getQuestion,
  updateQuestion,
  createQuestion,
  getAllQuestions,
} from "../controllers/questionController";

const questionRoutes = express.Router();

questionRoutes.use(protect);
questionRoutes.use(restrictTo("admin", "superAdmin"));

questionRoutes.route("/").get(getAllQuestions).post(createQuestion);

questionRoutes.route("/bulk").post(bulkCreateQuestions);

questionRoutes
  .route("/:id")
  .get(getQuestion)
  .patch(updateQuestion)
  .delete(deleteQuestion);

export default questionRoutes;
