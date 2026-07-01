import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getLeaderboard,
  getMyRank,
} from "../controllers/leaderboardController";

const leaderboardRoutes = express.Router();

leaderboardRoutes.use(protect);

leaderboardRoutes.route("/").get(getLeaderboard);

leaderboardRoutes.route("/my-rank").get(getMyRank);

export default leaderboardRoutes;
