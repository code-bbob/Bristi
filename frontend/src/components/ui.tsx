import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function SectionBadge({
  children,
  color = "primary",
}: {
  children: ReactNode;
  color?: "primary" | "secondary";
}) {
  const styles =
    color === "primary"
      ? "bg-primary/10 text-primary"
      : "bg-secondary/10 text-secondary";
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${styles} font-label-md text-[0.75rem] font-bold uppercase tracking-wider mb-3`}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  badge,
  color = "primary",
  title,
  subtitle,
  center = false,
}: {
  badge?: ReactNode;
  color?: "primary" | "secondary";
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto mb-16" : "max-w-2xl mb-14"}>
      <SectionBadge color={color}>{badge}</SectionBadge>
      <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
        {title}
      </h2>
      {subtitle ? (
        <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant mt-2">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-20 md:pb-24 bg-surface">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 relative text-center">
        <SectionBadge color="primary">{eyebrow}</SectionBadge>
        <h1 className="font-display text-[2.5rem] md:text-[3.5rem] leading-[2.75rem] md:leading-[4rem] font-bold tracking-[-0.02em] text-on-surface">
          {title}
        </h1>
        <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant max-w-2xl mx-auto mt-4">
          {subtitle}
        </p>
      </div>
    </section>
  );
}

export function BristiLogo({ className = "h-14" }: { className?: string }) {
  return (
    <Link href="/" className="flex items-center shrink-0" aria-label="Bristi Educational Consultancy – Home">
      <Image
        src="/bristi-new-logo-png.png"
        alt="Bristi Educational Consultancy Pvt. Ltd."
        width={1065}
        height={920}
        priority
        className={`${className} w-auto object-contain`}
      />
    </Link>
  );
}

export const CONTACT_INFO = {
  phone: "+977 9851413678",
  phoneHref: "tel:+9779851413678",
  email: "bristieducation766@gmail.com",
  emailHref: "mailto:bristieducation766@gmail.com",
  address: "7th Floor, City Square Mall, Samakhusi Chowk, Kathmandu, Nepal",
  regdNo: "357870",
};

export const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Destinations", href: "/destinations" },
  { label: "Services", href: "/services" },
  { label: "Test Preparation", href: "/test-preparation" },
  { label: "Events", href: "/events" },
  { label: "Our Team", href: "/team" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
];
