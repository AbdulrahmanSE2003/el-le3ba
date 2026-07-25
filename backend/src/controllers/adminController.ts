import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const createAdmin = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return next(new AppError("Please provide all required fields.", 400));

  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError("Email already in use.", 400));

  const newAdmin = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role: "admin",
  });

  newAdmin.password = undefined as any;

  resHandler(res, 201, "admin", newAdmin);
});
