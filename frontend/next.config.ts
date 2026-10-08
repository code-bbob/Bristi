import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "";

const BACKEND_HOSTNAME =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || process.env.BACKEND_HOSTNAME || "";

const KNOWN_API_HOSTS = ["api.bristi.edu.np"];

function hostOf(value: string): string | null {
  if (!value) return null;
  try {
    return new URL(value.includes("://") ? value : `https://${value}`).hostname;
  } catch {
    return null;
  }
}

const apiHosts = [
  ...new Set(
    [hostOf(API_URL), hostOf(BACKEND_HOSTNAME), ...KNOWN_API_HOSTS].filter(
      (host): host is string => Boolean(host),
    ),
  ),
];

const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
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
      ...apiHosts.flatMap((hostname) => [
        { protocol: "http" as const, hostname, pathname: "/**" },
        { protocol: "https" as const, hostname, pathname: "/**" },
      ]),
    ],
  },
} satisfies NextConfig;

export default nextConfig;
