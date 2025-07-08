import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Request, Response } from "express";
import { r2 } from "../lib/r2Client";

export const uploadAvatar = async (req: Request, res: Response) => {
  const { filename, type } = req.body;
  const randomFolder = Math.floor(Math.random() * 1e9).toString();
  const key = `avatars/${randomFolder}/${Date.now()}_${filename}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: type,
  });

  const url = await getSignedUrl(r2, command, { expiresIn: 3600 });

  res.json({
    uploadUrl: url,
    publicUrl: key,
  });
};