import { User } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails";

const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      username,
      email,
      verifyToken,
      verifyTokenExpires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      password: hashedPassword,
    });

    await newUser.save();

    generateTokenAndSetCookie(res, newUser?._id.toString());

    await sendVerificationEmail(email, verifyToken);

    res.status(201).json({
      success: true,
      user: { ...newUser.toObject(), password: undefined },
      message: "User registered successfully",
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;

    if (!verificationCode) {
      throw new Error("Verification code is required");
    }

    const user = await User.findOne({
      verifyToken: verificationCode,
      verifyTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpires = undefined;

    await user.save();

    await sendWelcomeEmail(user.email, user.username);

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        ...user.toObject(),
        password: undefined,
      },
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export { register, verifyEmail };
