import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "algosync_jwt_secret";
const JWT_EXPIRES_IN = "2h";

// Register
export const register = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Trigger OTP to be sent
    await axios.post(`${process.env.EMAIL_SERVICE_URL}/email/send-code`, {
      email,
    });
    res.status(200).json({ message: "Check your email for the OTP" });
    return;
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
    return;
  }
};

// Resend code if user haven't received it
export const resendVerification = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    // Resend OTP using your email service
    await axios.post(`${process.env.EMAIL_SERVICE_URL}/email/send-code`, {
      email,
    });

    res.status(200).json({ message: "Verification code resent" });
    return;
  } catch (error) {
    console.error("Error resending code:", error);
    res.status(500).json({ message: "Failed to resend verification code" });
    return;
  }
};

// Verify OTP code from email service and save user to the database
export const registerVerify = async (req: Request, res: Response) => {
  const { email, password, verificationCode } = req.body;

  try {
    const verifyResponse = await axios.post(
      `${process.env.EMAIL_SERVICE_URL}/email/verify-code`,
      { email, verificationCode }
    );

    // Continue if status is OK
    if (verifyResponse.status === 200) {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save new user
      const newUser = await prisma.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          isOnboarded: false,
        },
      });

      // Generate JWT
      const token = jwt.sign(
        {
          userId: newUser.id,
          email: newUser.email,
          isOnboarded: newUser.isOnboarded,
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      // Set token in cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 4, // 4 hours
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          isOnboarded: newUser.isOnboarded,
        },
      });
      return;
    }
  } catch (error: any) {
    // Axios-specific handling
    if (axios.isAxiosError(error) && error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "OTP verification failed";
      res.status(status).json({ message });
      return;
    }

    // Unexpected error
    console.error("Verify error:", error);
    res.status(500).json({ message: "Verification failed" });
    return;
  }
};

// Sync-In
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.passwordHash) {
      res.status(401).json({ message: "The account does not exist" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: "Passwords do not match" });
      return;
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, isOnboarded: user.isOnboarded },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    // Send token as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // only send over HTTPS in production
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isOnboarded: user.isOnboarded,
      },
    });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};
