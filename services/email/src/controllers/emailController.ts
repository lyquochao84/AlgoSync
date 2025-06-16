import { Request, Response } from "express";
import { sendOTPEmail } from "../services/emailService";
import { generateOTP, storeOTP, verifyStoredOTP } from "../services/otpService";

// Send OTP Code
export const sendCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).json({ message: "Invalid Email" });
    return
  }

  const code = generateOTP();
  storeOTP(email, code);

  try {
    await sendOTPEmail(email, code);
    res.status(200).json({ message: "OTP sent" });
  } 
  catch (error) {
    console.error("SendGrid error:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP Code
export const verifyCode = (req: Request, res: Response) => {
  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  const result = verifyStoredOTP(email, verificationCode);

  if (result === "expired") {
    res.status(400).json({ message: "OTP expired" });
    return;
  }

  if (result === "invalid") {
    res.status(400).json({ message: "Invalid OTP" });
    return;
  }

  res.status(200).json({ message: "OTP verified" });
  return;
};