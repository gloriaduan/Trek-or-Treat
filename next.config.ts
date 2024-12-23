import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{protocol: 'https', hostname: 'img.clerk.com'}, {protocol: 'https', hostname: 'utfs.io'}], // Add the allowed domain here
  },
};

export default nextConfig;
