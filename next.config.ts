import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cleanDistDir: false,
  experimental: {
    cpus: 1,
  },
};

export default nextConfig;
