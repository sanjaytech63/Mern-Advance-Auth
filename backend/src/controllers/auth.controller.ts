import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails";

import { User } from "../models/user.model";
import { config } from "../config/config";

import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthenticatedRequest } from "../middlewares/verifyToken";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyToken = Math.floor(100000 + Math.random() * 900000).toString();

  const newUser = new User({
    username,
    email,
    verifyToken,
    verifyTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    password: hashedPassword,
  });

  await newUser.save();

  generateTokenAndSetCookie(res, newUser._id.toString());
  await sendVerificationEmail(email, verifyToken);

  return res.status(201).json(
    new ApiResponse("User registered successfully", {
      user: { ...newUser.toObject(), password: undefined },
    })
  );
});

const verifyEmail = asyncHandler(async (req: Request, res: Response) => {
  const { verifyToken } = req.body;

  if (!verifyToken) {
    throw new ApiError(400, "Verification code is required");
  }

  const user = await User.findOne({
    verifyToken,
    verifyTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw new ApiError(400, "Invalid or expired verification code");
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpires = undefined;
  await user.save();

  await sendWelcomeEmail(user.email, user.username);

  return res.json(
    new ApiResponse("Email verified successfully", {
      user: { ...user.toObject(), password: undefined },
    })
  );
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) throw new ApiError(400, "Invalid credentials");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new ApiError(400, "Invalid credentials");

  generateTokenAndSetCookie(res, user._id.toString());
  user.lastLogin = new Date();
  await user.save();

  return res.json(
    new ApiResponse("Login successful", {
      token: res.getHeader("Authorization"),
      user: { ...user.toObject(), password: undefined },
    })
  );
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token");
  return res.json(new ApiResponse("Logout successful"));
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = resetTokenExpiresAt;

  await user.save();

  await sendPasswordResetEmail(
    user.email,
    `${config.frontendDomain}/reset-password/${resetToken}`
  );

  return res.json(new ApiResponse("Password reset link sent to your email"));
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const resetToken = req.params.resetToken;
  const { password } = req.body;

  if (!resetToken || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) throw new ApiError(400, "Invalid or expired reset token");

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  await sendResetSuccessEmail(user.email);

  return res.json(new ApiResponse("Password reset successful"));
});

const checkAuth = asyncHandler(
  async (req: AuthenticatedRequest, res: Response) => {
    const user = await User.findById(req.userId).select("-password");

    if (!user) throw new ApiError(404, "User not found");

    return res.json(new ApiResponse("User authenticated", { user }));
  }
);

export {
  register,
  verifyEmail,
  login,
  logout,
  forgotPassword,
  resetPassword,
  checkAuth,
};
