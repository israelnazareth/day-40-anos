import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*unsplash.com*",
      },
      {
        protocol: "https",
        hostname: "sonhodospes.vtexassets.com",
      },
      {
        protocol: "https",
        hostname: "rexuaeccrbontsanemyz.supabase.co",
      },
    ],
  },
  allowedDevOrigins: ["xanthochroid-homelier-malaya.ngrok-free.dev"],
};

export default nextConfig;
