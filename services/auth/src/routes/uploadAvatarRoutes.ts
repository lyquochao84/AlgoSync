import express from "express";
import { uploadAvatar } from "../controllers/uploadAvatarController";

const router = express.Router();

router.post("/avatar", uploadAvatar);

export default router;
