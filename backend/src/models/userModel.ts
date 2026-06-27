import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose, { Document, Model } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatar?: string;
  role: "student" | "admin" | "superAdmin";
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  passwordChangedAt?: Date;
  totalScore: number;
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  correctPassword(
    candidatePassword: string,
    userPassword: string,
  ): Promise<boolean>;
  createPasswordResetToken(): string;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please tell us your name!"],
      trim: true,
      maxLength: [
        40,
        "A user name must have less or equal than 40 characters.",
      ],
    },

    email: {
      type: String,
      required: [true, "Please provide your email!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email!"],
    },

    password: {
      type: String,
      required: [true, "Please provide a password!"],
      minLength: [8, "Password must be at least 8 characters."],
      select: false,
    },

    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password!"],
      validate: {
        validator: function (this: any, el: string) {
          return el === this.password;
        },
        message: "Passwords are not the same!",
      },
    },

    avatar: {
      type: String,
      default: null,
      enum: [
        "avatar1.png",
        "avatar2.png",
        "avatar3.png",
        "avatar4.png",
        "avatar5.png",
        "avatar6.png",
        "avatar7.png",
        "avatar8.png",
        "avatar9.png",
        "avatar10.png",
      ],
    },

    role: {
      type: String,
      default: "student",
      enum: ["student", "admin", "superAdmin"],
    },

    totalScore: { type: Number, default: 0 },
    gamesPlayed: { type: Number, default: 0 },
    gamesWon: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },

    passwordResetToken: { type: String, select: false },
    passwordResetExpires: { type: Date },
    passwordChangedAt: { type: Date },
  },

  {
    timestamps: true,
  },
);

// ========================================================

// 3. Mongoose Middlewares (Pre-save Hook)

// ========================================================

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined as any;
});

// ========================================================

// 4. Instance Methods

// ========================================================

userSchema.methods.correctPassword = async function (
  candidatePassword: string,

  userPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function (): string {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = require("crypto")
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return resetToken;
};

// ==========================
//            Indexes
// ==========================
userSchema.index({ totalScore: -1 });
userSchema.index({ role: 1 });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
