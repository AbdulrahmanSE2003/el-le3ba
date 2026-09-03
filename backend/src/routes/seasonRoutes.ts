import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getActiveSeason,
  getSeasonLeaderboard,
  getSeasonLeaderboardStats,
  createSeason,
  getAllSeasons,
  getSeason,
  updateSeason,
  deleteSeason,
  getSeasonsStats,
} from "../controllers/seasonController";

const seasonRoutes = express.Router();

seasonRoutes.use(protect);

seasonRoutes.route("/active").get(getActiveSeason);
seasonRoutes.route("/:seasonId/leaderboard/stats").get(getSeasonLeaderboardStats);
seasonRoutes.route("/:seasonId/leaderboard").get(getSeasonLeaderboard);

seasonRoutes.use(restrictTo("admin", "superAdmin"));
seasonRoutes.route("/").get(getAllSeasons).post(createSeason);
seasonRoutes.route("/stats").get(getSeasonsStats);
seasonRoutes
  .route("/:id")
  .get(getSeason)
  .patch(updateSeason)
  .delete(deleteSeason);

export default seasonRoutes;
