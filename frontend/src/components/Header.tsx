"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import { API_URL } from "@/lib/api";
import type { Country } from "@/lib/types";

import { BristiLogo, CONTACT_INFO, NAV_LINKS } from "./ui";

const FALLBACK_COUNTRIES: Pick<Country, "name" | "slug" | "flag_emoji" | "tagline" | "universities_count">[] = [
  {
    name: "Australia",
    slug: "australia",
    flag_emoji: "🇦🇺",
    tagline: "Top-tier universities & 2–4 year post-study work rights",
    universities_count: 8,
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    flag_emoji: "🇬🇧",
    tagline: "Prestigious institutions & focused one-year masters",
    universities_count: 7,
  },
  {
    name: "Canada",
    slug: "canada",
    flag_emoji: "🇨🇦",
    tagline: "Welcoming communities & strong PR pathways",
    universities_count: 6,
  },
  {
    name: "USA",
    slug: "usa",
    flag_emoji: "🇺🇸",
    tagline: "World-leading research universities",
    universities_count: 6,
  },
  {
    name: "New Zealand",
    slug: "new-zealand",
    flag_emoji: "🇳🇿",
    tagline: "Safe, scenic & excellent work-rights programs",
    universities_count: 4,
  },
  {
    name: "Japan",
    slug: "japan",
    flag_emoji: "🇯🇵",
    tagline: "Innovation hubs & generous scholarships",
    universities_count: 5,
  },
  {
    name: "South Korea",
    slug: "south-korea",
    flag_emoji: "🇰🇷",
    tagline: "Global tech leaders & top-ranked universities",
    universities_count: 5,
  },
  {
    name: "Europe",
    slug: "europe",
    flag_emoji: "🇪🇺",
    tagline: "Affordable, English-taught degrees across the EU",
    universities_count: 6,
  },
];

const FRAUNCES = "[font-variation-settings:'opsz'_40,'SOFT'_0,'WONK'_0]";

const NAV_ITEM_BASE =
  `group relative inline-flex items-center gap-1.5 px-2 py-2 font-serif text-[1rem] leading-none font-medium tracking-[-0.005em] whitespace-nowrap transition-colors duration-300 ${FRAUNCES}`;

function navItemTone(active: boolean) {
  return active ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary";
}

function NavMarker({ active }: { active: boolean }) {
  return (
    <span
        className={`absolute left-2 right-2 -bottom-0.5 h-[2px] rounded-full transition-all duration-300 ease-out ${
        active
          ? "scale-x-100 bg-secondary"
          : "scale-x-0 bg-transparent group-hover:scale-x-100 group-hover:bg-secondary/40"
      }`}
    />
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState(FALLBACK_COUNTRIES);
  const [destOpen, setDestOpen] = useState(false);
  const [destClosing, setDestClosing] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/countries/?limit=50`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.results) && data.results.length > 0) {
          setCountries(data.results);
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const openDestDropdown = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setDestClosing(false);
    setDestOpen(true);
  };

  const beginCloseDestDropdown = () => {
    if (destClosing) return;
    setDestClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setDestOpen(false);
      setDestClosing(false);
    }, 260);
  };

  const closeDestDropdown = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    setDestClosing(false);
    setDestOpen(false);
  };

  const handleDestKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      closeDestDropdown();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (destOpen) closeDestDropdown();
      else openDestDropdown();
    }
  };

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setDestOpen(false);
    setDestClosing(false);
  }

  return (
    <>
      <div className="bg-primary text-on-primary text-[0.75rem] font-medium tracking-[0.06em] py-2.5 px-6 hidden md:block overflow-hidden">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0 text-on-primary/75">
            <span className="inline-flex items-center gap-1.5 shrink-0">
              <span className="material-symbols-outlined text-[15px] text-secondary-fixed">
                verified
              </span>
              Govt. Regd. No. {CONTACT_INFO.regdNo}
            </span>
            <span className="text-secondary-fixed/50 shrink-0">/</span>
            <span className="inline-flex items-center gap-1.5 min-w-0">
              <span className="material-symbols-outlined text-[15px] shrink-0">location_on</span>
              <span className="truncate">{CONTACT_INFO.address}</span>
            </span>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <a className="inline-flex items-center gap-1.5 hover:text-secondary-fixed transition-colors duration-300 whitespace-nowrap" href={CONTACT_INFO.phoneHref}>
              <span className="material-symbols-outlined text-[15px] shrink-0">call</span>
              {CONTACT_INFO.phone}
            </a>
            <a className="hidden lg:inline-flex items-center gap-1.5 hover:text-secondary-fixed transition-colors duration-300 whitespace-nowrap" href={CONTACT_INFO.emailHref}>
              <span className="material-symbols-outlined text-[15px] shrink-0">mail</span>
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/60">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-3 flex items-center justify-between gap-6">
          <BristiLogo className="h-16" />
          <nav className="hidden xl:flex items-center gap-1 relative" aria-label="Primary">
            {NAV_LINKS.map((link) =>
              link.label === "Destinations" ? (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openDestDropdown}
                  onMouseLeave={beginCloseDestDropdown}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={destOpen}
                    onKeyDown={handleDestKey}
                    className={`${NAV_ITEM_BASE} ${navItemTone(destOpen || isActive(link.href))}`}
                  >
                    {link.label}
                    <NavMarker active={destOpen || isActive(link.href)} />
                  </button>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`${NAV_ITEM_BASE} ${navItemTone(isActive(link.href))}`}
                >
                  {link.label}
                  <NavMarker active={isActive(link.href)} />
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3 shrink-0">
            <a
              className="hidden md:inline-flex xl:hidden items-center gap-2 text-on-surface-variant hover:text-primary text-[0.875rem] font-medium px-3 py-2 rounded-full hover:bg-primary/5 transition-colors duration-300 whitespace-nowrap"
              href={CONTACT_INFO.phoneHref}
            >
              <span className="material-symbols-outlined text-[18px] shrink-0 text-secondary">phone_in_talk</span>
              {CONTACT_INFO.phone}
            </a>
            <Link
              href="/contact"
              className={`group hidden sm:inline-flex items-center justify-center gap-2 bg-primary text-on-primary hover:bg-primary-container font-serif text-[0.875rem] font-semibold tracking-[0.005em] px-5 py-3 rounded-full hover:shadow-[0_10px_30px_-8px_rgba(0,51,102,0.45)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap ${FRAUNCES}`}
            >
              <span>Book Free Counselling</span>
              <span className="material-symbols-outlined text-[18px] shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
                arrow_forward
              </span>
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen(!open)}
              className="xl:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-outline-variant text-on-surface shrink-0"
            >
              <span className="material-symbols-outlined text-[22px]">{open ? "close" : "menu"}</span>
            </button>
          </div>
        </div>

        {destOpen ? (
          <div
            className={`absolute left-0 right-0 top-full shadow-2xl shadow-primary/10 ${destClosing ? "dropdown-out" : "dropdown-in"}`}
            onMouseEnter={openDestDropdown}
            onMouseLeave={beginCloseDestDropdown}
          >
            <div className="h-3" aria-hidden="true" />
            <div className="max-w-[1600px] mx-auto px-6 md:px-8">
              <div className="rounded-3xl bg-surface-container-lowest border border-outline-variant/60 overflow-hidden">
                <div className="p-8 grid grid-cols-12 gap-10">
                  <div className="col-span-12 xl:col-span-9">
                    <div className="flex items-center justify-between gap-4 mb-7">
                      <h3 className={`font-serif text-[1.75rem] leading-none font-semibold tracking-[-0.01em] text-on-surface ${FRAUNCES}`}>
                        Study Destinations
                      </h3>
                      <Link
                        href="/destinations"
                        onClick={closeDestDropdown}
                        className="group inline-flex items-center gap-1.5 text-primary font-semibold text-[0.9375rem] hover:text-primary-container transition-colors duration-300"
                      >
                        View All Destinations
                        <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-0.5">
                          arrow_forward
                        </span>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-1">
                      {countries.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/destinations/${c.slug}`}
                          onClick={closeDestDropdown}
                          className="group/item flex items-center gap-4 rounded-xl -mx-3 px-3 py-2.5 hover:bg-surface-container-low transition-colors duration-300"
                        >
                          <span className="w-11 h-9 shrink-0 rounded-lg bg-surface-container flex items-center justify-center text-[22px] leading-none shadow-sm">
                            {c.flag_emoji || "🌍"}
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[0.9375rem] font-semibold text-on-surface group-hover/item:text-primary transition-colors duration-300">
                              {c.name}
                            </span>
                            <span className="block text-[0.8125rem] text-on-surface-variant truncate">
                              {c.tagline || `${c.universities_count || "Top"} universities`}
                            </span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="col-span-12 xl:col-span-3 flex flex-col justify-between gap-6 rounded-2xl bg-gradient-to-br from-primary via-primary-container to-secondary-fixed/60 p-6 text-on-primary overflow-hidden relative">
                    <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-surface/10 blur-2xl pointer-events-none" />
                    <span className="material-symbols-outlined text-[32px] text-secondary-fixed">support_agent</span>
                    <div className="relative">
                      <h4 className={`font-serif text-[1.375rem] leading-snug font-semibold mb-2 ${FRAUNCES}`}>
                        Not sure where to go?
                      </h4>
                      <p className="text-[0.875rem] text-on-primary/80 leading-relaxed">
                        Talk to a certified country specialist in Kathmandu and find the right fit for your profile.
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      onClick={closeDestDropdown}
                      className={`inline-flex items-center justify-center gap-2 bg-on-primary text-primary font-serif text-[0.9375rem] font-semibold rounded-full px-5 py-3 transition-transform duration-300 hover:scale-[1.02] ${FRAUNCES}`}
                    >
                      Book Free Counselling
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {open ? (
          <nav className="xl:hidden bg-surface-container-lowest border-t border-outline-variant/50 max-h-[70vh] overflow-auto">
            <div className="px-6 py-4 flex flex-col">
              {NAV_LINKS.map((link) =>
                link.label === "Destinations" ? (
                  <div key={link.href} className="border-b border-outline-variant/30">
                    <div className="flex items-center gap-1.5">
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex-1 py-3.5 pl-4 border-l-2 font-serif text-[1.125rem] leading-none transition-colors duration-300 ${
                          isActive(link.href)
                            ? "border-secondary text-primary"
                            : "border-transparent text-on-surface-variant"
                        }`}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle destinations"
                        aria-expanded={destOpen}
                        onClick={() => (destOpen ? closeDestDropdown() : openDestDropdown())}
                        className="p-2 text-on-surface-variant"
                      >
                        <span
                          className={`material-symbols-outlined text-[22px] transition-transform duration-300 ${
                            destOpen ? "rotate-180" : ""
                          }`}
                        >
                          expand_more
                        </span>
                      </button>
                    </div>
                    {destOpen ? (
                      <div className="pb-3 flex flex-col">
                        {countries.map((c) => (
                          <Link
                            key={c.slug}
                            href={`/destinations/${c.slug}`}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-3 py-2 pl-3 text-on-surface-variant text-[0.9375rem] hover:text-primary transition-colors duration-300"
                          >
                            <span className="text-[20px] leading-none">{c.flag_emoji || "🌍"}</span>
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`py-3.5 pl-4 border-b border-l-2 border-outline-variant/30 font-serif text-[1.125rem] leading-none transition-colors duration-300 ${
                      isActive(link.href)
                        ? "border-l-secondary text-primary"
                        : "border-l-transparent text-on-surface-variant"
                    }`}
                  >
                    {link.label}
                  </Link>
                ),
              )}
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className={`mt-4 flex items-center justify-center gap-2 bg-primary text-on-primary font-serif text-[0.9375rem] font-semibold px-5 py-3.5 rounded-full ${FRAUNCES}`}
              >
                <span>Book Free Counselling</span>
              </Link>
            </div>
          </nav>
        ) : null}
      </header>
    </>
  );
}
