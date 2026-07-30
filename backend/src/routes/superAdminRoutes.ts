import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createSuperAdmin,
  getAppStats,
} from "../controllers/superAdminController";

const superAdminRoutes = express.Router();

superAdminRoutes.use(protect);
superAdminRoutes.use(restrictTo("superAdmin"));

superAdminRoutes.route("/").post(createSuperAdmin);
superAdminRoutes.route("/stats").get(getAppStats);

export default superAdminRoutes;
