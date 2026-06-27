import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  deleteEvent,
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  getCurrentEvent,
} from "../controllers/eventController";

const eventRoutes = express.Router();

eventRoutes.use(protect);

eventRoutes.route("/current").get(getCurrentEvent);

eventRoutes.use(restrictTo("admin", "superAdmin"));
eventRoutes.route("/").get(getAllEvents).post(createEvent);

eventRoutes.route("/:id").get(getEvent).patch(updateEvent).delete(deleteEvent);

export default eventRoutes;
