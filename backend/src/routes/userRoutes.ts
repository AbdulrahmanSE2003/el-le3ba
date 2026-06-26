import express from "express";
import {
  forgotPassword,
  login,
  resetPassword,
  signUp,
} from "../controllers/authController";

const userRoutes = express.Router();

userRoutes.post("/login", login);
userRoutes.post("/signup", signUp);
userRoutes.post("/forgotPassword", forgotPassword);
userRoutes.patch("/resetPassword", resetPassword);

export default userRoutes;
