import Image from "next/image";
import Link from "next/link";

import FallbackImage from "@/components/FallbackImage";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getServices } from "@/lib/api";
import { STATS } from "@/lib/company";
import type { Service } from "@/lib/types";
import { paragraphs, resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Our Services",
};

const JOURNEY_NOTES = [
  "One-on-one, judgement-free counselling",
  "No commission chasing, ever",
  "Every file double-checked before lodgement",
  "Live support from Kathmandu to arrival",
];

function JourneyRow({ service, index, total }: { service: Service; index: number; total: number }) {
  const flipped = index % 2 === 1;
  const number = String(index + 1).padStart(2, "0");
  const imageSrc = resolveImage(service.image);
  const body = paragraphs(service.description || service.short_description);
  const isGreen = index % 2 === 0;

  return (
    <div className="relative py-16 md:py-24">
      <span
        aria-hidden="true"
        className="pointer-events-none select-none absolute -top-4 left-0 md:left-6 font-display font-extrabold tracking-tighter leading-none text-[7rem] md:text-[13rem] text-transparent z-0"
        style={{ WebkitTextStroke: isGreen ? "1.5px rgba(0,176,32,0.18)" : "1.5px rgba(0,51,102,0.14)" }}
      >
        {number}
      </span>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-[1600px] mx-auto px-6 md:px-8">
        <Reveal className={`lg:col-span-5 ${flipped ? "lg:order-2" : ""}`}>
          <div className="relative">
            <div
              className={`absolute -inset-3 rounded-[2rem] ${
                flipped ? "bg-secondary/10" : "bg-primary/10"
              } rotate-[1.5deg] pointer-events-none`}
            />
            <Link href={`/services/${service.slug}`} className="group relative block rounded-3xl overflow-hidden shadow-xl aspect-[4/3] border border-outline-variant/50">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={service.title}
                  fill
                  sizes="(min-width:1024px) 640px, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <FallbackImage icon={service.icon || "school"} className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent opacity-80" />
              <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-on-primary font-semibold">
                <span className="material-symbols-outlined text-[20px]">{service.icon || "school"}</span>
                {service.title}
              </span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={120} className={`lg:col-span-7 ${flipped ? "lg:order-1" : ""}`}>
          <div className="flex items-center gap-4 mb-4">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase tracking-wider ${
                isGreen ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">route</span>
              Chapter {number}
            </span>
            <span className="h-px flex-1 bg-outline-variant/60" />
            <span className="font-display text-[0.875rem] font-bold text-on-surface-variant tracking-widest">
              {String(index + 1)} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <h2 className="font-display text-[2rem] md:text-[2.75rem] leading-[2.4rem] md:leading-[3.25rem] font-bold tracking-[-0.02em] text-on-surface">
            {service.title}
          </h2>
          <div className="mt-4 space-y-4">
            {body.map((p, i) => (
              <p key={i} className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                {p}
              </p>
            ))}
          </div>
          <Link
            href={`/services/${service.slug}`}
            className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-[0.95rem] text-primary hover:text-primary-container transition-colors group"
          >
            <span className="underline decoration-primary-container/50 underline-offset-4 group-hover:underline-offset-8 transition-all">
              Explore this service
            </span>
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">
              arrow_forward
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const services = await getServices();
  const heroImageSrc = resolveImage(services[0]?.image ?? null);

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
              <span className="material-symbols-outlined text-[16px]">route</span>
              A Journey, Not a Checklist
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              From the First Call
              <br />
              to the{" "}
              <span className="relative inline-block text-secondary-fixed">
                First Day Abroad.
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
              {services.length} chapters. One team. We move with you from counselling in Kathmandu to your seat in a
              lecture hall on the other side of the world.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>Start the Journey</span>
                <span className="material-symbols-outlined text-[20px]">flight</span>
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
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">route</span>
                {services.length} chapters, end to end
              </span>
            </div>
            <div className="mt-10 grid grid-cols-3 max-w-md divide-x divide-surface/15">
              {STATS.slice(1).map((s) => (
                <div key={s.label} className="px-4 first:pl-0">
                  <p className="font-display text-[1.75rem] font-bold text-secondary-fixed">{s.value}</p>
                  <p className="text-[0.75rem] text-surface/80 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PHOTO */}
          <div className="lg:col-span-5 relative hidden md:block h-[420px]">
            <div className="relative h-full w-full max-w-[460px] lg:ml-auto rounded-3xl overflow-hidden shadow-2xl border border-surface/15 bg-surface/5">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt="Study abroad support at Bristi"
                  fill
                  sizes="(min-width:1024px) 460px, 0px"
                  className="object-cover"
                />
              ) : (
                <FallbackImage icon="route" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/95 px-6 py-5">
                <p className="font-display text-[1.35rem] font-bold text-surface leading-tight">
                  From counselling to campus
                </p>
                <p className="text-[0.875rem] text-surface/85 mt-1">one accountable team, chapter by chapter.</p>
              </div>
            </div>
            <div className="absolute left-0 lg:-left-6 -bottom-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xl px-5 py-4 rotate-[-4deg]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">verified</span>
                </span>
                <div>
                  <p className="font-display font-bold text-on-surface text-[0.95rem]">Nepal Govt. Regd.</p>
                  <p className="text-[0.75rem] text-on-surface-variant">Regd. No. {CONTACT_INFO.regdNo}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section className="relative bg-gradient-to-b from-surface to-surface-container-low/40">
        <div className="relative">
          {services.map((service, i) => (
            <div key={service.id} className={i % 2 === 1 ? "bg-surface-container-low/40" : "bg-surface"}>
              <JourneyRow service={service} index={i} total={services.length} />
            </div>
          ))}
        </div>
      </section>

      {/* NOTES STRIP */}
      <section className="py-14 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {JOURNEY_NOTES.map((note, i) => (
                <div key={note} className="flex items-start gap-3.5 rounded-2xl border border-outline-variant/60 bg-surface-container-low/40 p-5">
                  <span
                    className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center font-display font-bold text-[0.9rem] ${
                      i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.9375rem] font-medium text-on-surface leading-[1.5rem]">{note}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-primary text-on-primary p-10 md:p-16">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,176,32,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(18,76,143,0.9),transparent_60%)]" />
              <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-secondary/30 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">stars</span>
                    Chapter {String(services.length + 1).padStart(2, "0")} — yours
                  </span>
                  <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.1] font-bold tracking-[-0.02em] text-surface mt-4">
                    Your chapter starts with one conversation.
                  </h2>
                  <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-primary-container max-w-xl mt-4">
                    Walk in, call, or send a note. A senior counsellor will map your pathway — no pressure, no
                    promises we can&apos;t keep.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                  <div className="w-full max-w-sm rounded-2xl bg-surface/10 border border-surface/20 backdrop-blur-md p-5">
                    <p className="text-[0.75rem] uppercase tracking-wider text-surface/80 font-bold">Walk in or call</p>
                    <a href={CONTACT_INFO.phoneHref} className="font-display text-[1.4rem] font-bold text-surface hover:text-secondary-fixed transition-colors mt-1.5 inline-block">
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-[0.875rem] text-surface/80 mt-2">{CONTACT_INFO.address}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg transition-colors"
                  >
                    <span>Book a Free Session</span>
                    <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}