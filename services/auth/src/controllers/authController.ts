import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// Register
export const register = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
    }
    catch(error) {

    }
};

// Sync-In
export const login = async () => {

};


