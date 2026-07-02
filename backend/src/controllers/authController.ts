// /src/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import crypto from "node:crypto";
import { AppError } from "../utils/appError";
import { catchAsync } from "../utils/catchAsync";
import User, { IUser } from "../models/userModel";
import { sendEmail } from "../utils/sendEmail";
import resHandler from "../utils/resHandler";

interface AuthRequest extends Request {
  user?: IUser;
}

const signToken = (id: string): string => {
  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET is missing from env!");
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

const createSendToken = (
  user: any,
  statusCode: number,
  res: Response,
): void => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN || 90) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  resHandler(res, statusCode, "auth", { user, token });
};

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      avatar: req.body.avatar,
      role: "student",
    });

    createSendToken(newUser, 201, res);
  },
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Please provide email and password.", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Invalid Credentials.", 401));
    }

    createSendToken(user, 200, res);
  },
);

export const protect = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    let token: string | undefined;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Then fall back to cookie  ← ADD THIS
    else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError(
          "You are not logged in. Please log in to get access.",
          401,
        ),
      );
    }

    if (!process.env.JWT_SECRET)
      throw new Error("JWT_SECRET is missing from env!");
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const freshUser = await User.findById(decoded.id);
    if (!freshUser) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401),
      );
    }

    if (freshUser.passwordChangedAt) {
      const changedTimestamp = Math.floor(
        freshUser.passwordChangedAt.getTime() / 1000,
      );
      if (decoded.iat && decoded.iat < changedTimestamp) {
        return next(
          new AppError(
            "Password was recently changed. Please log in again.",
            401,
          ),
        );
      }
    }

    req.user = freshUser;
    next();
  },
);

export const restrictTo = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("You are not logged in", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError("There is no such user with this email.", 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    try {
      await sendEmail({
        email: user.email,
        name: user.name,
        subject:
          "رابط إعادة تعيين كلمة المرور الخاصة بك - اللعبة (صالح لمدة 10 دقائق)",
        resetURL,
      });

      res.status(200).json({
        status: true,
        message: "Token was sent to email!",
      });
    } catch (e) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.error(e);
      return next(
        new AppError(
          "There was an error sending the email, Try again later.",
          500,
        ),
      );
    }
  },
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.resetToken as string;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: new Date() },
    });

    if (!user) {
      return next(new AppError("Token is invalid or has expired.", 404));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    user.passwordChangedAt = new Date(Date.now() - 1000);
    await user.save();

    createSendToken(user, 200, res);
  },
);

export const logout = catchAsync(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: true, message: "Logged out successfully" });
});
