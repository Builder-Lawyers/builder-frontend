import type { NextConfig } from "next";
import unpluginIcons from "unplugin-icons/webpack";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  reactStrictMode: false,

  // 🔧 вимикаємо ESLint під час build / start
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 🔧 вимикаємо type-checking під час build
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config) {
    config.plugins.push(
      unpluginIcons({
        compiler: "jsx",
        jsx: "react",
      }),
    );
    return config;
  },

  async rewrites() {
    return [
      {
        source: "/template",
        destination: "http://localhost:4321/:path*",
      },
    ];
  },
};

export default nextConfig;
