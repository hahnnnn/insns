import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/insns",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
