import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { createSuperAdmin } from "../controllers/superAdminController";

const superAdminRoutes = express.Router();

superAdminRoutes.use(protect);
superAdminRoutes.use(restrictTo("superAdmin"));

superAdminRoutes.route("/").post(createSuperAdmin);

export default superAdminRoutes;
