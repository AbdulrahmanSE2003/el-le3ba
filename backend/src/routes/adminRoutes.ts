import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { createAdmin, getDashboardStats } from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
adminRoutes.route("/dashboard/stats").get(getDashboardStats);
export default adminRoutes;
