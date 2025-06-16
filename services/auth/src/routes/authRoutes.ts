import express from "express";
import { register, resendVerification, registerVerify, login } from "../controllers/authController";

const router = express.Router();

router.post('/register', register);

router.post('/resend-verification', resendVerification);

router.post('/register-verify', registerVerify);

router.post('/log-in', login);

export default router;