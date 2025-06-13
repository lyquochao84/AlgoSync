import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import axios from "axios";

// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Register
export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Trigger OTP to be sent
    await axios.post(`${process.env.EMAIL_SERVICE_URL}/email/send-code`, { email });
    res.status(200).json({ message: "Check your email for the OTP" });
  } 
  catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
};

// Verify OTP code from email service and save user to the database
export const registerVerify = async (req: Request, res: Response) => {};

// Sync-In
export const login = async () => {};
