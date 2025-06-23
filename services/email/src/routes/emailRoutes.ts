import express from "express";
import { sendCode, verifyCode } from "../controllers/emailController";

const router = express.Router();

// Send OTP Code to user's email
router.post('/send-code', sendCode);

// Save OTP Code and verify it
router.post('/verify-code', verifyCode);

export default router;