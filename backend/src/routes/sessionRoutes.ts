import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { startSession, submitAnswer } from "../controllers/sessionController";

const sessionRoutes = express.Router();

sessionRoutes.use(protect);

sessionRoutes.route("/start").post(startSession);

sessionRoutes.route("/:id/answer").post(submitAnswer);

sessionRoutes.route("/:id");
// GET team get game result

sessionRoutes.route("/:id/abandon");
// POST abandon session

sessionRoutes.use(restrictTo("admin", "superAdmin"));

sessionRoutes.route("/");
// GET all sessions

export default sessionRoutes;
