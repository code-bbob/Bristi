import { API_URL } from "@/lib/api";

const API_ORIGIN = API_URL.replace(/\/+$/, "");

function isBackendMedia(pathname: string): boolean {
  return pathname === "/media" || pathname.startsWith("/media/");
}

export function resolveImage(image: string | null): string {
  const img = image?.trim();
  if (!img) return "";

  if (!/^https?:\/\//i.test(img)) {
    return `${API_ORIGIN}${img.startsWith("/") ? img : `/${img}`}`;
  }

  try {
    const url = new URL(img);
    const base = API_ORIGIN ? new URL(API_ORIGIN) : null;
    if (base && (url.host === base.host || isBackendMedia(url.pathname))) {
      return `${API_ORIGIN}${url.pathname}${url.search}`;
    }
    return url.toString();
  } catch {
    return img;
  }
}

export function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(value: string): string {
  return new Date(value).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .slice(0, 2)
    .join("");
}

export function flagUrl(emoji: string): string {
  const code = Array.from(emoji)
    .filter((cp) => {
      const c = cp.codePointAt(0)!;
      return c >= 0x1f1e6 && c <= 0x1f1ff;
    })
    .map((cp) => String.fromCharCode(cp.codePointAt(0)! - 0x1f1e6 + 65))
    .join("")
    .toLowerCase();
  return code ? `https://flagcdn.com/w80/${code}.png` : "";
}

export function paragraphs(text: string): string[] {
  return text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
}