import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/template/:path*",
        destination: "http://localhost:4321/:path*",
      },
    ];
  },
};

export default nextConfig;
