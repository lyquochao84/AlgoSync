import express from "express";
import { getDashboardUserInfos, searchUsers } from "../controllers/userContoller";
import { authenticateJWT } from "../middleware/userMiddleware";

const router = express.Router();

// Get User's Info for Dashboard Page
router.get("/infos", authenticateJWT, getDashboardUserInfos);

// Search users
router.get("/search", authenticateJWT, searchUsers);

export default router;
