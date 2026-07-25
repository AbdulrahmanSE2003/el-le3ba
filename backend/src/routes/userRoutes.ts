import express from "express";
import {
  forgotPassword,
  login,
  logout,
  protect,
  resetPassword,
  signUp,
} from "../controllers/authController";
import {
  changePassword,
  deleteMe,
  getMe,
  getMyId,
  updateMe,
} from "../controllers/userController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/forgot-password", forgotPassword);
userRoutes.post("/logout", logout);
userRoutes.patch("/reset-password/:resetToken", resetPassword);

userRoutes.use(protect);

userRoutes.route("/me").get(getMyId, getMe).patch(updateMe).delete(deleteMe);
userRoutes.route("/me/change-password").patch(changePassword);

export default userRoutes;
