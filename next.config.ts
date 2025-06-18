import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com/**"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ Tắt ESLint khi build
  },
  experimental: {
    serverActions: {},
  },
  serverActions: {
    bodySizeLimit: "10mb",
  }
};

export default nextConfig;
