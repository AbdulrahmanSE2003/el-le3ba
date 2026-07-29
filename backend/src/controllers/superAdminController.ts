import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { logAudit } from "../utils/AuditLog";
import { catchAsync } from "../utils/catchAsync";
import resHandler from "../utils/resHandler";

export const createSuperAdmin = catchAsync(async (req, res, next) => {
  const userId = req.user._id;

  const { name, email, password, passwordConfirm } = req.body;

  if (!name || !email || !password || !passwordConfirm)
    return next(
      new AppError(
        "Invalid operation, please provide name, email, password, passwordConfirm.",
        400,
      ),
    );

  const superAdmin = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    role: "superAdmin",
  });

  await logAudit({
    actor: req.user._id,
    action: "super_admin.created",
    target: superAdmin._id,
    targetModel: "User",
  });

  resHandler(res, 201, "superAdmin", superAdmin);
});
