import { Request, Response } from "express";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_FROM = process.env.EMAIL_FROM!;
const otpMap = new Map<string, { code: string; expiresAt: number }>();

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Invalid Email" }); 
    return; 
  }

  const code = generateOTP();
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpMap.set(email, { code, expiresAt });
  
  const msg = {
    to: email,
    from: EMAIL_FROM,
    subject: "Your OTP Code",
    text: `Your OTP code is ${code}. It will expire in 10 minutes.`,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: "OTP sent" });
  } 
  catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyCode = async (req: Request, res: Response) => {};
