import {S3} from "aws-sdk";

export const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_KEY,
  },
  signatureVersion: "v4",
  region: "ap-south-1",
});
