import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    qualities: [75, 88],
  },
  trailingSlash: true,
};

export default nextConfig;
