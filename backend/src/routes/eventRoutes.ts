import express from "express";
import { protect, restrictTo } from "../controllers/authController";

const eventRoutes = express.Router();

eventRoutes.use(protect);

eventRoutes.route("/current");

eventRoutes.use(restrictTo("admin", "superAdmin"));
eventRoutes.route("/");
// GET all events **admin only**
// POST create an event

eventRoutes.route("/:id");
// GET one event
// PATCH edit an event **admin only**
// DELETE delete an event **admin only**

export default eventRoutes;
