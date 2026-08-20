import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createNewAdminOrSuperAdmin,
  deactivateAdmin,
  editAdmin,
  getAdminsStats,
  getAllAdmins,
  getAppStats,
  getRecentAdminLogs,
  getRecentAdmins,
} from "../controllers/superAdminController";

const superAdminRoutes = express.Router();

superAdminRoutes.use(protect);
superAdminRoutes.use(restrictTo("superAdmin"));

superAdminRoutes.route("/").post(createNewAdminOrSuperAdmin);
superAdminRoutes.route("/stats").get(getAppStats);
superAdminRoutes.route("/recent-admins").get(getRecentAdmins);
superAdminRoutes.route("/recent-admin-logs").get(getRecentAdminLogs);

// ===================================================
// =================== Admins Page ===================
// ===================================================
superAdminRoutes.route("/admins").get(getAllAdmins);
superAdminRoutes.route("/admins/stats").get(getAdminsStats);
superAdminRoutes.route("/admins/:id").patch(editAdmin).delete(deactivateAdmin);

export default superAdminRoutes;
