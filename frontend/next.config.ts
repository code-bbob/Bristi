import type { NextConfig } from "next";

const BACKEND_HOSTNAME = process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || process.env.BACKEND_HOSTNAME || "127.0.0.1";
const BACKEND_PROTOCOL = process.env.NEXT_PUBLIC_BACKEND_PROTOCOL || process.env.BACKEND_PROTOCOL || "http";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true, // backend media is served from configured backend host
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.bristieducation.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
        pathname: "/**",
      },
      {
        // Temporary: reference banner borrowed from graceintlgroup.com
        protocol: "https",
        hostname: "graceintlgroup.com",
        pathname: "/**",
      },
      {
        protocol: BACKEND_PROTOCOL === "https" ? "https" : "http",
        hostname: BACKEND_HOSTNAME,
        pathname: "/**",
      },
      ...(BACKEND_HOSTNAME === "127.0.0.1" || BACKEND_HOSTNAME === "localhost"
        ? [
            {
              protocol: "http",
              hostname: BACKEND_HOSTNAME,
              pathname: "/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;