import {S3} from "aws-sdk";

export const s3Client = new S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  signatureVersion: "v4",
  region: "ap-south-1",
});
