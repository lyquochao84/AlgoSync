import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "algosync_jwt_secret";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email?: string;
    isOnboarded?: boolean;
  };
}

// Middleware to authenticate JWT from cookies
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email?: string;
      isOnboarded?: boolean;
    };

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      isOnboarded: decoded.isOnboarded,
    };
    
    next(); // pass to controller
  } 
  catch (err) {
    console.error("JWT authentication error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
    return;
  }
};
