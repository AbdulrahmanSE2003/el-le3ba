import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createSuperAdmin,
  getAppStats,
  getRecentAdminLogs,
} from "../controllers/superAdminController";

const superAdminRoutes = express.Router();

superAdminRoutes.use(protect);
superAdminRoutes.use(restrictTo("superAdmin"));

superAdminRoutes.route("/").post(createSuperAdmin);
superAdminRoutes.route("/stats").get(getAppStats);
superAdminRoutes.route("/recent-admin-logs").get(getRecentAdminLogs);

export default superAdminRoutes;
