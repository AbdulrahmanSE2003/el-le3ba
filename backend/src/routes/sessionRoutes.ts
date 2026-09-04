import express from "express";
import rateLimit from "express-rate-limit";
import { protect, restrictTo } from "../controllers/authController";
import {
  abandonSession,
  getAllSessions,
  getSessionResult,
  getSessionsStats,
  submitAnswer,
} from "../controllers/sessionController";

const sessionRoutes = express.Router();

const answerLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { status: false, message: "Too many requests" },
});

sessionRoutes.use(protect);

sessionRoutes.route("/stats").get(restrictTo("admin", "superAdmin"), getSessionsStats);
sessionRoutes.route("/").get(restrictTo("admin", "superAdmin"), getAllSessions);

sessionRoutes.route("/:id/answer").post(answerLimiter, submitAnswer);
sessionRoutes.route("/:id").get(getSessionResult);
sessionRoutes.route("/:id/abandon").post(abandonSession);

export default sessionRoutes;
