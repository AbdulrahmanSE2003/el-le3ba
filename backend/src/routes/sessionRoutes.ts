import express from "express";
import { protect, restrictTo } from "../controllers/authController";

const sessionRoutes = express.Router();

sessionRoutes.use(protect);

sessionRoutes.route("/start");
// POST team starts a game

sessionRoutes.route("/:id/answer");
// POST team submit an answer

sessionRoutes.route("/:id");
// GET team get game result

sessionRoutes.use(restrictTo("admin", "superAdmin"));

sessionRoutes.route("/");
// GET all sessions

export default sessionRoutes;
