import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  devIndicators: false,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${(process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api").replace(/\/api$/, "")}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;
