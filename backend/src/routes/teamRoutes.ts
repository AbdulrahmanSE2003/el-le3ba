import express from "express";
import { protect, restrictTo } from "../controllers/authController";
import {
  changeCaptain,
  changeTeamName,
  createTeam,
  deleteMyTeam,
  getAllTeams,
  getMyTeam,
  getTeam,
  getTeamAttempts,
  joinTeam,
  kickMember,
  leaveTeam,
} from "../controllers/teamController";

const teamRoutes = express.Router();

teamRoutes.use(protect);

teamRoutes
  .route("/")
  .get(restrictTo("admin", "superAdmin"), getAllTeams)
  .post(createTeam);

teamRoutes.route("/my-team").get(getMyTeam).delete(deleteMyTeam);

teamRoutes.route("/join").post(joinTeam);
teamRoutes.route("/leave").delete(leaveTeam);
teamRoutes.route("/:id/attempts").get(getTeamAttempts);

// NOTE: All next routes for captain only
teamRoutes.route("/:id/name").patch(changeTeamName);
teamRoutes.route("/:id/captain").patch(changeCaptain);
teamRoutes.route("/:id/members/:userId").delete(kickMember);

// NOTE: Admins only
teamRoutes.route("/:id").get(restrictTo("admin", "superAdmin"), getTeam);

export default teamRoutes;
