import express from "express";
import { protect, restrictTo } from "../controllers/authController";

const questionRoutes = express.Router();

questionRoutes.use(protect);
questionRoutes.use(restrictTo("admin", "superAdmin"));

questionRoutes.route("/");
// GET all questions
// POST create question

questionRoutes.route("/:id");
// GET get one question
// PATCH Edit one question
// DELETE remove one question

export default questionRoutes;
