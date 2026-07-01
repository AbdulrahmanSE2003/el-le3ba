import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController";
import { getMe, getMyId } from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/logout", logout);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

userRoutes.route("/me").get(getMyId, getMe);
// TODO: will have (GET) getMe, (PATCH) updateMe, (DELETE) deleteMe
export default userRoutes;
