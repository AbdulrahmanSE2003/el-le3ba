import validator from "validator";
import bcrypt from "bcryptjs";
import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  role: "student" | "admin" | "superAdmin";
  avatar?: string;
  team?: mongoose.Types.ObjectId;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  passwordChangedAt?: Date;
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
  const resetToken = require("crypto").randomBytes(32).toString("hex");
  this.passwordResetToken = require("crypto")
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  return resetToken;
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
