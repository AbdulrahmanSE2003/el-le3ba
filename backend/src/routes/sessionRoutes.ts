import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  abandonSession,
  getAllSessions,
  getSessionResult,
  getSessionsStats,
  submitAnswer,
} from "../controllers/sessionController";

const sessionRoutes = express.Router();

sessionRoutes.use(protect);

sessionRoutes.route("/stats").get(restrictTo("admin", "superAdmin"), getSessionsStats);
sessionRoutes.route("/").get(restrictTo("admin", "superAdmin"), getAllSessions);

sessionRoutes.route("/:id/answer").post(submitAnswer);
sessionRoutes.route("/:id").get(getSessionResult);
sessionRoutes.route("/:id/abandon").post(abandonSession);

export default sessionRoutes;
