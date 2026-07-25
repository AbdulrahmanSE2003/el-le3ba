import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createAdmin,
  getDashboardStats,
  getRecentSessions,
} from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
adminRoutes.route("/dashboard/stats").get(getDashboardStats);
adminRoutes.route("/dashboard/recent-sessions").get(getRecentSessions);
export default adminRoutes;
