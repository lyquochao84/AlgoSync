import { PrismaClient } from "@prisma/client";
import { Response } from "express";
import { AuthRequest } from "../middleware/userMiddleware";
import { getSignedR2Url } from "../lib/getSignedR2Url";

const prisma = new PrismaClient();

// Get user's infos data for dashboard page (left panel)
export const getDashboardUserInfos = async (
  req: AuthRequest,
  res: Response
) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized: no user ID found" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        followers: {
          include: {
            follower: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        followings: {
          include: {
            following: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const avatarUrl = user.avatarUrl
      ? await getSignedR2Url(user.avatarUrl)
      : null;

    const bannerUrl = user.bannerUrl
      ? await getSignedR2Url(user.bannerUrl)
      : null;

    res.json({
      id: user.id,
      name: user.name,
      avatarUrl,
      bannerUrl,
      bio: user.bio,
      team: user.team,
      followersCount: user.followers.length,
      followersList: user.followers.map((f) => f.follower),
      followingsCount: user.followings.length,
      followingsList: user.followings.map((f) => f.following),
      level: user.level,
      xp: user.xp,
    });
  } catch (error) {
    console.error("Dashboard user info error:", error);
    res.status(500).json({ message: "Something went wrong." });
  }
};

// Search users by name
export const searchUsers = async (req: AuthRequest, res: Response) => {
  const query = req.query.query as string;

  if (!query || query.trim().length === 0) {
    res.status(400).json({ message: "Missing search query" });
    return;
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        avatarUrl: true,
        bio: true,
        team: true,
      },
      take: 10,
    });

    const usersWithSignedUrls = await Promise.all(
      users.map(async (user) => ({
        ...user,
        avatarUrl: user.avatarUrl ? await getSignedR2Url(user.avatarUrl) : null,
      }))
    );
    
    res.json(usersWithSignedUrls);
  } 
  catch (error) {
    console.error("Search user error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
