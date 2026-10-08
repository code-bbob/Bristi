import Link from "next/link";

import { COMPANY } from "@/lib/company";

import { BristiLogo, CONTACT_INFO, NAV_LINKS } from "./ui";

export default function Footer() {
  return (
    <footer className="w-full bg-on-surface text-surface border-t border-outline-variant/20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-outline-variant/20">
          <div className="lg:col-span-4 space-y-4">
            <BristiLogo className="h-14" />
            <p className="font-body-sm text-[0.875rem] leading-[1.25rem] text-outline-variant max-w-sm">
              {COMPANY.tagline} {COMPANY.positioning}
            </p>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface/10 text-secondary-fixed text-[0.75rem] font-semibold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              Govt. Regd. No. {CONTACT_INFO.regdNo}
            </span>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-display font-semibold text-[1.25rem] text-surface">Quick Links</h4>
            <ul className="space-y-2 font-body-sm text-[0.875rem]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link className="text-outline-variant hover:text-secondary-fixed transition-colors" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-[1.25rem] text-surface">Study Destinations</h4>
            <ul className="grid grid-cols-2 gap-2 font-body-sm text-[0.875rem]">
              {[
                "Australia",
                "United Kingdom",
                "Canada",
                "USA",
                "New Zealand",
                "Japan",
                "South Korea",
                "Europe",
              ].map((name) => (
                  <li key={name}>
                    <Link
                      className="text-outline-variant hover:text-secondary-fixed transition-colors"
                      href={`/destinations/${name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      Study in {name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display font-semibold text-[1.25rem] text-surface">Kathmandu Office</h4>
            <p className="font-body-sm text-[0.875rem] text-outline-variant">{CONTACT_INFO.address}</p>
            <p className="font-body-sm text-[0.875rem] text-outline-variant">
              Phone:{" "}
              <a className="text-surface hover:text-secondary-fixed" href={CONTACT_INFO.phoneHref}>
                {CONTACT_INFO.phone}
              </a>
              ,{" "}
              <a className="text-surface hover:text-secondary-fixed" href={CONTACT_INFO.phone2Href}>
                {CONTACT_INFO.phone2}
              </a>
            </p>
            <p className="font-body-sm text-[0.875rem] text-outline-variant">
              Email:{" "}
              <a className="text-surface hover:text-secondary-fixed" href={CONTACT_INFO.emailHref}>
                {CONTACT_INFO.email}
              </a>
            </p>
            <p className="font-body-sm text-[0.875rem] text-outline-variant">{COMPANY.hours}</p>
            <div className="pt-2 flex items-center gap-3 text-surface">
              <a
                className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-secondary transition-colors"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-secondary transition-colors"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a className="w-8 h-8 rounded-full bg-surface/10 flex items-center justify-center hover:bg-secondary transition-colors" href={CONTACT_INFO.emailHref} aria-label="Mail">
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-outline-variant font-body-sm text-[0.875rem]">
          <p>© {new Date().getFullYear()} Bristi Educational Consultancy Pvt. Ltd. 7th Floor, City Square Mall, Samakhusi Chowk, Kathmandu, Nepal. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <a className="hover:text-secondary-fixed transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-secondary-fixed transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-secondary-fixed transition-colors" href="#">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}