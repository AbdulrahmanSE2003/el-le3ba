import express from "express";
import { protect, restrictTo } from "../controllers/authController";

const teamRoutes = express.Router();

teamRoutes.use(protect);

teamRoutes.route("/");
// POST create a team,
// GET all teams restrictTo("admin", "superAdmin")

teamRoutes.route("/my-team");
// GET my team
// DELETE my team

teamRoutes.route("/join"); // POST join a team
teamRoutes.route("/leave"); // DELETE leave a team

teamRoutes.route("/:id/attempts");
// GET remaining attempts for team

// NOTE: All next routes for captain only
teamRoutes.route("/:id/name"); // PATCH change team name for

teamRoutes.route("/:id/captain"); // PATCH change team captain

teamRoutes.route("/:id/members/:userId"); // DELETE kick a member

// NOTE: Admins only
teamRoutes.route("/:id"); // GET any team

export default teamRoutes;
