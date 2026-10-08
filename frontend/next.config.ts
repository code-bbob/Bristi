import type { NextConfig } from "next";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "";

const BACKEND_HOSTNAME =
  process.env.NEXT_PUBLIC_BACKEND_HOSTNAME || process.env.BACKEND_HOSTNAME || "";

const KNOWN_API_HOSTS = ["api.bristi.edu.np"];

// Cloudflare R2 CDN — hardcoded so image optimization never depends on a
// build-time env var; NEXT_PUBLIC_R2_PUBLIC_URL only adds extra hosts.
const KNOWN_MEDIA_HOSTS = ["cdn.bristi.edu.np"];

const R2_PUBLIC_URL =
  process.env.NEXT_PUBLIC_R2_PUBLIC_URL || process.env.R2_PUBLIC_URL || "";

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

const imageHosts = [
  ...new Set(
    [...apiHosts, hostOf(R2_PUBLIC_URL), ...KNOWN_MEDIA_HOSTS].filter(
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
      ...imageHosts.flatMap((hostname) => [
        { protocol: "http" as const, hostname, pathname: "/**" },
        { protocol: "https" as const, hostname, pathname: "/**" },
      ]),
    ],
  },
} satisfies NextConfig;

export default nextConfig;
