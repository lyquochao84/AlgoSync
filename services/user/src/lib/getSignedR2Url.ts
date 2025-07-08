import { GetObjectCommand } from "@aws-sdk/client-s3";
import { r2 } from "./r2Client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function getSignedR2Url(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(r2, command, { expiresIn: 3600 });
}
