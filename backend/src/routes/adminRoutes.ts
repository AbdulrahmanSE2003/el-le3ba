import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createAdmin,
  createUser,
  deleteUser,
  getAllUsers,
  getDashboardStats,
  getRecentSessions,
  getUserStats,
  updateUser,
} from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
adminRoutes.route("/dashboard/stats").get(getDashboardStats);
adminRoutes.route("/dashboard/recent-sessions").get(getRecentSessions);

// ==================================================
// ================= User Dashboard =================
// ==================================================

adminRoutes.route("/users").get(getAllUsers).post(createUser);
adminRoutes.route("/users/stats").get(getUserStats);
adminRoutes.route("/users/:id").patch(updateUser).delete(deleteUser);

export default adminRoutes;
