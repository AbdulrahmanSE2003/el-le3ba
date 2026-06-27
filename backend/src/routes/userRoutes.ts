import express from "express";
import {
  forgotPassword,
  login,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

userRoutes.route("/me"); // will have (GET) getMe, (PATCH) updateMe, (DELETE) deleteMe
export default userRoutes;
