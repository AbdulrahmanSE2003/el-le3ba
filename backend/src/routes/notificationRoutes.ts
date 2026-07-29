import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  getNotifications,
  markAllAsRead,
  markAsRead,
  sendNotifications,
} from "../controllers/notificationController";

const notificationRoutes = express.Router();

notificationRoutes.use(protect);

notificationRoutes.route("/").get(getNotifications);
notificationRoutes.route("/all").patch(markAllAsRead);
notificationRoutes.route("/:id").patch(markAsRead);

export default notificationRoutes;
