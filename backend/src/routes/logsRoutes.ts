import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import { getAllLogs, getLogsStats } from "../controllers/logsController";

const logsRoutes = express.Router();

logsRoutes.use(protect);
logsRoutes.use(restrictTo("superAdmin"));

logsRoutes.route("/stats").get(getLogsStats);
logsRoutes.route("/").get(getAllLogs);

export default logsRoutes;