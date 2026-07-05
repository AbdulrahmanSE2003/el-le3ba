import TeamMembership from "../models/teamMembershipModel";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import { getOne } from "../utils/factory";
import resHandler from "../utils/resHandler";

export const getMyId = catchAsync(async (req, res, next) => {
  req.params.id = req.user._id.toString();
  next();
});

export const getMe = getOne(User);

export const updateMe = catchAsync(async (req, res, next) => {
  if ("password" in req.body || "passwordConfirm" in req.body) {
    return next(
      new AppError(
        "Invalid operation, you can't change password through this route",
        400,
      ),
    );
  }
  const { email, name, avatar } = req.body;

  if (!email && !name && !avatar)
    return next(
      new AppError("Invalid operation, please provide fields to update.", 400),
    );

  const newUser = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      email,
      name,
      avatar,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!newUser)
    return next(new AppError("Invalid operation, no such user to update", 404));

  resHandler(res, 200, "newUser", newUser);
});

export const changePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, newPasswordConfirm } = req.body;

  if (!oldPassword || !newPassword || !newPasswordConfirm)
    return next(
      new AppError("Invalid operation, please provide needed data.", 400),
    );

  const user = await User.findById(req.user._id).select("+password");
  if (!user)
    return next(new AppError("Invalid operation, no such a user found.", 400));

  if (!(await user.correctPassword(oldPassword)))
    return next(new AppError("Invalid operation, password is incorrect.", 400));

  user.password = newPassword;
  user.passwordConfirm = newPasswordConfirm;
  user.passwordChangedAt = new Date();

  await user.save();

  resHandler(res, 200, "user", user);
});

export const deleteMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user)
    return next(new AppError("Invalid operation, no such a user found.", 404));

  const membership = await TeamMembership.findOne({ userId: user._id });

  if (membership && membership.role === "captain")
    return next(
      new AppError(
        "Invalid operation, captain can't delete his account assign new captain first.",
        400,
      ),
    );
  await membership?.deleteOne();
  await user.deleteOne();

  res.status(204).send();
});
