import Image from "next/image";
import Link from "next/link";

import CTABanner from "@/components/CTABanner";
import FallbackImage from "@/components/FallbackImage";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO, SectionBadge, SectionHeading } from "@/components/ui";
import { getCountries } from "@/lib/api";
import {
  COMMITMENTS,
  COMPANY,
  MISSION,
  OFFICES,
  STATS,
  VISION,
  WHO_WE_ARE,
} from "@/lib/company";
import { resolveImage } from "@/lib/utils";

export const metadata = {
  title: "About Us",
  description:
    "Founded in 2024 in Kathmandu, Bristi Educational Consultancy Pvt. Ltd. helps Nepali students study abroad with honest counselling, applications and visa support.",
};

export default async function AboutPage() {
  const countries = await getCountries();
  const aboutImage = resolveImage(countries[0]?.image ?? null);
  const ctaImage = resolveImage(countries[4]?.image ?? countries[0]?.image ?? null);

  return (
    <>
      {/* DARK HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full bg-primary-container/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-14 md:pt-24 pb-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">info</span>
              Who We Are
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              Built in Kathmandu,
              <br />
              grown on{" "}
              <span className="relative inline-block text-secondary-fixed">
                honest counselling.
                <svg
                  className="pointer-events-none absolute -bottom-2 left-0 w-full text-secondary"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M3 9C60 3 140 3 197 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="font-body-lg text-[1.125rem] leading-[1.9rem] text-on-primary-container max-w-xl mt-7">
              Founded in {COMPANY.foundedYear} in Kathmandu, we place Nepali students in universities they
              actually want to study at.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>Book a Free Consultation</span>
                <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              </Link>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-surface/25 text-surface hover:bg-surface/10 font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed">call</span>
                {CONTACT_INFO.phone}
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3 text-[0.875rem] font-semibold text-surface/80">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 border border-surface/20 px-3 py-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">verified</span>
                Nepal Govt. Regd. No. {CONTACT_INFO.regdNo}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 border border-surface/20 px-3 py-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">calendar_today</span>
                Est. {COMPANY.foundedYear}
              </span>
            </div>
          </div>

          {/* PHOTO */}
          <div className="lg:col-span-5 relative hidden md:block h-[420px]">
            <div className="relative h-full w-full max-w-[460px] lg:ml-auto rounded-3xl overflow-hidden shadow-2xl border border-surface/15 bg-surface/5">
              {aboutImage ? (
                <Image
                  src={aboutImage}
                  alt="Students on a study abroad journey with Bristi Educational Consultancy"
                  fill
                  sizes="(min-width:1024px) 460px, 0px"
                  className="object-cover"
                />
              ) : (
                <FallbackImage icon="school" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/95 px-6 py-5">
                <p className="font-display text-[1.35rem] font-bold text-surface leading-tight">
                  Numerous students placed
                </p>
                <p className="text-[0.875rem] text-surface/85 mt-1">
                  in the universities of their choice.
                </p>
              </div>
            </div>
            <div className="absolute left-0 lg:-left-6 -bottom-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xl px-5 py-4 rotate-[-4deg]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">public</span>
                </span>
                <div>
                  <p className="font-display font-bold text-on-surface text-[0.95rem]">
                    {COMPANY.destinations.length}+ Destinations
                  </p>
                  <p className="text-[0.75rem] text-on-surface-variant">Australia to Europe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-surface border-b border-outline-variant/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-12">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-4">
                  <span
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                      i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{s.icon}</span>
                  </span>
                  <div>
                    <p className="font-display text-[1.75rem] font-bold text-on-surface leading-none">{s.value}</p>
                    <p className="text-[0.8125rem] text-on-surface-variant mt-1">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionBadge>
                <span className="material-symbols-outlined text-[16px]">domain</span>
                Who We Are
              </SectionBadge>
              <h2 className="font-display text-[2.25rem] md:text-[2.75rem] leading-[2.75rem] md:leading-[3.25rem] font-bold tracking-[-0.02em] text-on-surface">
                Top-notch facilities for students pursuing an international degree.
              </h2>
              <p className="text-[1rem] leading-[1.75rem] text-on-surface-variant mt-4">
                We remove the noise around studying abroad — one accountable team, real information, and a plan
                your family can actually follow.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-5">
              {WHO_WE_ARE.map((para, i) => (
                <Reveal key={i} delay={i * 80}>
                  <p className="text-[1.0625rem] leading-[1.9rem] text-on-surface-variant">{para}</p>
                </Reveal>
              ))}
              <Reveal delay={320}>
                <div className="pt-3">
                  <p className="text-[0.75rem] font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                    We serve students bound for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {COMPANY.destinations.map((name, i) => (
                      <span
                        key={name}
                        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[0.875rem] font-semibold ${
                          i % 2 === 0
                            ? "bg-primary-container/10 text-primary-container"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="py-20 md:py-24 bg-surface-container-low/50 border-y border-outline-variant/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-primary text-on-primary p-10 md:p-16">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,176,32,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(18,76,143,0.9),transparent_60%)]" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-secondary/30 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">visibility</span>
                    Our Vision
                  </span>
                  <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.1] font-bold tracking-[-0.02em] text-surface mt-4">
                    Become a leader clients recommend.
                  </h2>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  {VISION.map((para) => (
                    <p key={para} className="text-[1.0625rem] leading-[1.9rem] text-on-primary-container">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <SectionHeading
            badge={<><span className="material-symbols-outlined text-[16px]">flag</span>Our Mission Statement</>}
            title="Five promises we hold ourselves to."
            subtitle="Every counsellor, every document and every deadline is measured against these."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MISSION.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div
                  className={`h-full rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-7 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${
                    i === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.25rem] font-bold text-on-surface">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6rem] text-on-surface-variant">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section className="py-20 md:py-28 bg-surface-container-low/50 border-t border-outline-variant/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <SectionHeading
              color="secondary"
              badge={<><span className="material-symbols-outlined text-[16px]">handshake</span>Our Commitment</>}
              title="What you can hold us to."
              subtitle="No fine print, no verbal promises — these four commitments are written into every file we handle."
            />
            <Reveal delay={200}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group shrink-0"
              >
                <span>See How We Help</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMMITMENTS.map((item, i) => (
              <Reveal key={item.title} delay={i * 80} className="h-full">
                <div className="h-full flex flex-col rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-sm">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
                      i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.15rem] font-bold text-on-surface">{item.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-[1.6rem] text-on-surface-variant">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OFFICES */}
      <section className="py-20 md:py-28 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <SectionHeading
            badge={<><span className="material-symbols-outlined text-[16px]">location_on</span>Our Offices</>}
            title="Come see us in Kathmandu."
            subtitle="Walk in, call, or send a note. A senior counsellor will see you — no appointment needed for a first conversation."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {OFFICES.map((office, i) => (
              <Reveal key={office.country} delay={i * 100} className="lg:col-span-7">
                <div className="h-full rounded-[1.75rem] border border-outline-variant/60 bg-surface-container-lowest p-7 md:p-9 shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-[2.5rem] leading-none">{office.flag}</span>
                    <div>
                      <h3 className="font-display text-[1.5rem] font-bold text-on-surface">{office.country}</h3>
                      <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-on-surface-variant">
                        Head Office
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 space-y-4">
                    {office.lines.map((line) => (
                      <div key={line} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                          {office.icon}
                        </span>
                        <p className="text-[0.9375rem] font-medium text-on-surface">{line}</p>
                      </div>
                    ))}
                    <div className="flex items-start gap-3">
                      <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                        schedule
                      </span>
                      <p className="text-[0.9375rem] font-medium text-on-surface">{office.hours}</p>
                    </div>
                  </div>

                  <p className="mt-7 pt-6 border-t border-outline-variant/50 text-[0.9375rem] leading-[1.75rem] text-on-surface-variant">
                    {office.note}
                  </p>

                  <div className="mt-7 flex flex-col sm:flex-row gap-3">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-primary font-semibold px-6 py-3.5 rounded-xl shadow-sm transition-all duration-500 hover:-translate-y-0.5"
                    >
                      <span className="material-symbols-outlined text-[20px]">directions</span>
                      Get Directions
                    </a>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      className="inline-flex items-center justify-center gap-2 border-2 border-primary-container text-primary-container hover:bg-primary-container/5 font-semibold px-6 py-3 rounded-xl transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">call</span>
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={180} className="lg:col-span-5">
              <div className="h-full rounded-[1.75rem] border border-outline-variant/60 bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col">
                <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                <iframe
                  title="Bristi Educational Consultancy office location"
                  className="w-full h-[280px] border-0"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39071.25870755798!2d85.3127003!3d27.7214482!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f447a702e9%3A0x88f9c3894f46475c!2sCITY%20SQUARE%20MALL!5e1!3m2!1sen!2snp!4v1790053830957!5m2!1sen!2snp"
                />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-[1.25rem] font-bold text-on-surface">Easy to reach, from anywhere</h3>
                  <ul className="mt-4 space-y-3 text-[0.9375rem] text-on-surface-variant">
                    {[
                      "Bus and tempo routes from nearly every part of the city",
                      "Minimised commuting hassle for students and parents",
                      "Walk-ins welcome — Sunday to Friday",
                    ].map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span
                          className="material-symbols-outlined text-secondary text-[20px] shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="mt-auto pt-6 inline-flex items-center gap-2 font-display font-semibold text-[0.95rem] text-primary hover:text-primary-container transition-colors group"
                  >
                    <span>Plan your visit</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <CTABanner imageSrc={ctaImage} />
    </>
  );
}
