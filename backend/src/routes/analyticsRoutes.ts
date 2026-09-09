import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getGamesOverTimeEndpoint,
  getLiveGamesEndpoint,
  getPlayersEndpoint,
  getSessionOutcomesEndpoint,
  getTeamsPerformanceEndpoint,
} from "../controllers/analyticsController";

const analyticsRoutes = express.Router();

analyticsRoutes.use(protect);
analyticsRoutes.use(restrictTo("admin", "superAdmin"));

analyticsRoutes.route("/games-over-time").get(getGamesOverTimeEndpoint);
analyticsRoutes.route("/teams-performance").get(getTeamsPerformanceEndpoint);
analyticsRoutes.route("/session-outcomes").get(getSessionOutcomesEndpoint);
analyticsRoutes.route("/live-games").get(getLiveGamesEndpoint);
analyticsRoutes.route("/players").get(getPlayersEndpoint);

export default analyticsRoutes;