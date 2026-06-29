import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { getLeaderboard } from "../controllers/leaderboardController";

const leaderboardRoutes = express.Router();

leaderboardRoutes.use(protect);

leaderboardRoutes.route("/").get(getLeaderboard);

export default leaderboardRoutes;
