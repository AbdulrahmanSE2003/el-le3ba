import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  abandonSession,
  getAllSessions,
  getSessionResult,
  startSession,
  submitAnswer,
} from "../controllers/sessionController";

const sessionRoutes = express.Router();

sessionRoutes.use(protect);

sessionRoutes.route("/start").post(startSession);

sessionRoutes.route("/:id/answer").post(submitAnswer);

sessionRoutes.route("/:id").get(getSessionResult);

sessionRoutes.route("/:id/abandon").post(abandonSession);

sessionRoutes.route("/").get(restrictTo("admin", "superAdmin"), getAllSessions);

export default sessionRoutes;
