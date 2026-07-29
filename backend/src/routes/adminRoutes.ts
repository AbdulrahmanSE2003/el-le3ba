import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  adminResetPassword,
  bulkDeactivateUsers,
  createAdmin,
  createUser,
  deleteNotificationCampaign,
  deleteUser,
  getAllNotificationCampaigns,
  getAllUsers,
  getDashboardStats,
  getNotificationCampaign,
  getNotificationStats,
  getRecentSessions,
  getUserStats,
  updateUser,
} from "../controllers/adminController";
import { sendNotifications } from "../controllers/notificationController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
adminRoutes.route("/dashboard/stats").get(getDashboardStats);
adminRoutes.route("/dashboard/recent-sessions").get(getRecentSessions);
adminRoutes.route("/notifications").get(getAllNotificationCampaigns);
adminRoutes.route("/notifications/stats").get(getNotificationStats);
adminRoutes
  .route("/notifications/:id")
  .get(getNotificationCampaign)
  .delete(deleteNotificationCampaign);

// ==================================================
// ================= User Dashboard =================
// ==================================================

adminRoutes.route("/users").get(getAllUsers).post(createUser);
adminRoutes.route("/users/stats").get(getUserStats);
adminRoutes.route("/users/notifications").post(sendNotifications);
adminRoutes.route("/users/deactivate").patch(bulkDeactivateUsers);
adminRoutes.route("/users/:id").patch(updateUser).delete(deleteUser);
adminRoutes.route("/users/:id/reset-password").patch(adminResetPassword);

export default adminRoutes;
