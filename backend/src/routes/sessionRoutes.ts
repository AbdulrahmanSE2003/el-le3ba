import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { startSession } from "../controllers/sessionController";

const sessionRoutes = express.Router();

sessionRoutes.use(protect);

sessionRoutes.route("/start").post(startSession);

sessionRoutes.route("/:id/answer");
// POST team submit an answer

sessionRoutes.route("/:id");
// GET team get game result

sessionRoutes.use(restrictTo("admin", "superAdmin"));

sessionRoutes.route("/");
// GET all sessions

export default sessionRoutes;
