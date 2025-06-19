import { Response } from "express"
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../middleware/onboardingMiddleware";

export const completeOnboarding = async (req: AuthRequest, res: Response) => {
  const prisma = new PrismaClient();
  const userId = req.user?.id;
  const { name, bio, avatarUrl, team } = req.body;
    
  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const newUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        bio,
        avatarUrl,
        team,
      },
    });

    res.status(200).json({
      message: "User profile completed successfully",
      user: newUser,
    });
  } 
  catch (error) {
    console.error("Error completing onboarding:", error);
    res.status(500).json({ error: "Failed to complete the user profile" });
  }
}