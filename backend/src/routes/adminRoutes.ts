import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  adminResetPassword,
  bulkDeactivateUsers,
  createAdmin,
  createUser,
  deleteNotificationCampaign,
  deleteTeam,
  deleteUser,
  editTeam,
  getAllNotificationCampaigns,
  getAllTeams,
  getAllUsers,
  getDashboardStats,
  getNotificationStats,
  getProfileRecentLogs,
  getProfileStats,
  getTeamsStats,
  getUserStats,
  sendNotificationToTeamMembers,
  updateUser,
} from "../controllers/adminController";
import { sendNotifications } from "../controllers/notificationController";
import { getRecentSessions } from "../controllers/sessionController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
adminRoutes.route("/dashboard/stats").get(getDashboardStats);
adminRoutes.route("/dashboard/recent-sessions").get(getRecentSessions);
adminRoutes
  .route("/notifications")
  .get(getAllNotificationCampaigns)
  .post(sendNotifications);
adminRoutes.route("/notifications/stats").get(getNotificationStats);
adminRoutes.route("/notifications/:id").delete(deleteNotificationCampaign);

// ==================================================
// ================= User Dashboard =================
// ==================================================

adminRoutes.route("/users").get(getAllUsers).post(createUser);
adminRoutes.route("/users/stats").get(getUserStats);
adminRoutes.route("/users/notifications").post(sendNotifications);
adminRoutes.route("/users/deactivate").patch(bulkDeactivateUsers);
adminRoutes.route("/users/:id").patch(updateUser).delete(deleteUser);
adminRoutes.route("/users/:id/reset-password").patch(adminResetPassword);

// ==================================================
// ================ Profile Account =================
// ==================================================

adminRoutes.route("/profile/stats").get(getProfileStats);
adminRoutes.route("/profile/recent-logs").get(getProfileRecentLogs);

// ==================================================
// ================= Team Dashboard =================
// ==================================================
adminRoutes.route("/teams").get(getAllTeams);
adminRoutes.route("/teams/stats").get(getTeamsStats);
adminRoutes
  .route("/teams/:id")
  .post(sendNotificationToTeamMembers)
  .patch(editTeam)
  .delete(deleteTeam);

export default adminRoutes;
