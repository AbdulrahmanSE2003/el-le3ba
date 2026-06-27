import express from "express";
import { protect, restrictTo } from "../controllers/authController";

const leaderboardRoutes = express.Router();

leaderboardRoutes.use(protect);

leaderboardRoutes.route("/");
// GET 50 top teams + current team rank + team score
// NOTE: or getting all ranking for admin only via /leaderboard/?eventId=xxx&limit=all

// Get all leaderboard teams

export default leaderboardRoutes;
