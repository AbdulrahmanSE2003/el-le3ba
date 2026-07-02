import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { getOne } from "../utils/factory";

export const getMyId = catchAsync(async (req, res, next) => {
  if (!req.user) return next(new AppError("Invalid operation", 400));
  req.params.id = req.user._id.toString();
  next();
});

export const getMe = getOne(User);
