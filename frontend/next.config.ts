import type { NextConfig } from "next";

const backend =
  process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") ??
  "http://localhost:5000";

const url = new URL(backend);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: url.protocol.replace(":", "") as "http" | "https",
        hostname: url.hostname,
        port: url.port,
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
