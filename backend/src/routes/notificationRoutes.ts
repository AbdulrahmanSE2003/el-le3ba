import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getNotifications,
  markAsRead,
  sendNotifications,
} from "../controllers/notificationController";

const notificationRoutes = express.Router();

notificationRoutes.use(protect);

notificationRoutes
  .route("/")
  .get(getNotifications)
  .post(restrictTo("admin", "superAdmin"), sendNotifications);
notificationRoutes.route("/:id").patch(markAsRead);

export default notificationRoutes;
