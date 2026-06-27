import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  createTeam,
  deleteMyTeam,
  getMyTeam,
  joinTeam,
  leaveTeam,
} from "../controllers/teamController";

const teamRoutes = express.Router();

teamRoutes.use(protect);

teamRoutes.route("/").post(createTeam);
//TODO GET all teams restrictTo("admin", "superAdmin")

teamRoutes.route("/my-team").get(getMyTeam).delete(deleteMyTeam);
// TODO DELETE my team

teamRoutes.route("/join").post(joinTeam); // TODO POST join a team
teamRoutes.route("/leave").delete(leaveTeam); // TODO DELETE leave a team

teamRoutes.route("/:id/attempts");
// GET remaining attempts for team

// NOTE: All next routes for captain only
teamRoutes.route("/:id/name"); // TODO PATCH change team name for

teamRoutes.route("/:id/captain"); // TODO PATCH change team captain

teamRoutes.route("/:id/members/:userId"); // TODO DELETE kick a member

// NOTE: Admins only
teamRoutes.route("/:id"); // TODO GET any team

export default teamRoutes;
