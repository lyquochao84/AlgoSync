import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/onboardingMiddleware";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "algosync_jwt_secret";
const JWT_EXPIRES_IN = "2h"; 

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  const prisma = new PrismaClient();
  const userId = req.user?.id;
  const { name, bio, avatarUrl, team } = req.body;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        avatarUrl,
        team,
        isOnboarded: true,
      },
    });

    // Generate new JWT with updated isOnboarded claim
    const newToken = jwt.sign(
      {
        userId: updatedUser.id,
        email: updatedUser.email,
        isOnboarded: updatedUser.isOnboarded,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Set new token cookie, replacing old token
    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    });

    res.status(200).json({
      message: "User profile completed successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    res.status(500).json({ error: "Failed to complete the user profile" });
  }
};
