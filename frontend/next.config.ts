import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    process.env.VM_IP || "34.134.187.0",
    "localhost:3000",
    "127.0.0.1:3000"
  ],
};

export default nextConfig;
