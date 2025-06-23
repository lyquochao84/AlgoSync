import express from "express";
import { register, resendVerification, registerVerify, login } from "../controllers/authController";
import { completeOnboarding } from "../controllers/onboardingController";
import { authenticate } from "../middleware/onboardingMiddleware";

const router = express.Router();

router.post('/register', register);

router.post('/resend-verification', resendVerification);

router.post('/register-verify', registerVerify);

router.post('/log-in', login);

router.patch('/users/onboarding', authenticate, completeOnboarding);

export default router;