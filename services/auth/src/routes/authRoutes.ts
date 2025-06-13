import express from "express";
import { register, registerVerify, login } from "../controllers/authController";

const router = express.Router();

router.post('/register', register);

router.post('/register/verify', registerVerify);

router.post('/login', login);

export default router;