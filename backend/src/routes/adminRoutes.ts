import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { createAdmin } from "../controllers/adminController";

const adminRoutes = express.Router();

adminRoutes.use(protect);
adminRoutes.use(restrictTo("admin", "superAdmin"));

adminRoutes.route("/").post(createAdmin);
export default adminRoutes;
