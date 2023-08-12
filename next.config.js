/* eslint-disable unicorn/prefer-module */

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["impact-hub.s3.ap-south-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
