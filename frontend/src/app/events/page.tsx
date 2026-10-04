import Image from "next/image";
import Link from "next/link";

import FallbackImage from "@/components/FallbackImage";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getEvents } from "@/lib/api";
import type { EventItem } from "@/lib/types";
import { resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Events At Bristi",
};

const HOW_TO_ATTEND = [
  { step: "01", title: "Reserve", text: "Seat count is capped per session — lock yours through the enquiry form." },
  { step: "02", title: "Prepare", text: "Bring your latest transcripts and English test scorecard if you have one." },
  { step: "03", title: "Walk in", text: "Show up early at the venue. Off-the-spot profile evaluations beat the queue." },
];

function parseDate(iso: string): { day: string; month: string; year: string; weekday: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return { day: "--", month: "TBA", year: "", weekday: "" };
  }
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    year: String(d.getFullYear()),
    weekday: d.toLocaleDateString("en-US", { weekday: "long" }),
  };
}

function EventTicket({ event, index }: { event: EventItem; index: number }) {
  const date = parseDate(event.event_date || "");
  const imageSrc = resolveImage(event.image);
  const isGreen = index % 2 === 0;
  const tint = isGreen ? "bg-secondary" : "bg-primary-container";

  return (
    <Reveal delay={(index % 2) * 100}>
      <div
        className={`relative rounded-[1.75rem] bg-surface-container-lowest border border-outline-variant/60 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${
          index % 2 === 1 ? "lg:rotate-[0.4deg]" : "lg:-rotate-[0.4deg]"
        } hover:rotate-0 transition-transform duration-500`}
      >
        {/* DATE STUB */}
        <div className={`relative lg:col-span-3 ${tint} text-on-primary p-8 flex items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] bg-[size:14px_14px]" />
          <div className="relative text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.3em] opacity-80">{date.weekday || "TBA"}</p>
            <p className="font-display text-[4.5rem] leading-none font-extrabold tracking-tight text-surface mt-2">
              {date.day}
            </p>
            <p className="text-[0.875rem] font-bold tracking-[0.2em] mt-1">
              {date.month} {date.year}
            </p>
          </div>
          {/* ticket notches */}
          <span className="absolute top-1/2 -translate-y-1/2 -right-3.5 w-7 h-7 rounded-full bg-surface" />
          <span className="absolute top-1/2 -translate-y-1/2 -left-3.5 w-7 h-7 rounded-full bg-surface" />
        </div>

        {/* EVENT BODY */}
        <div className="relative lg:col-span-9 p-8 md:p-9 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:col-span-4 relative w-full md:w-52 shrink-0 rounded-2xl overflow-hidden border border-outline-variant/50 aspect-[4/3] self-stretch min-h-[10rem]">
            {imageSrc ? (
              <Image src={imageSrc} alt={event.title} fill sizes="(min-width:1024px) 208px, 100vw" className="object-cover" />
            ) : (
              <FallbackImage icon="confirmation_number" className="w-full h-full" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 text-[0.8rem]">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${isGreen ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"} font-bold`}>
                <span className="material-symbols-outlined text-[15px]">confirmation_number</span>
                {String(index + 1).padStart(2, "0")} / 04
              </span>
              <span className="inline-flex items-center gap-1.5 text-on-surface-variant font-medium">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                {event.location}
              </span>
            </div>
            <h3 className="mt-3 font-display text-[1.5rem] md:text-[1.75rem] leading-snug font-bold tracking-[-0.01em] text-on-surface">
              {event.title}
            </h3>
            <p className="mt-3 text-[0.9375rem] leading-[1.65rem] text-on-surface-variant">
              {event.short_description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-[0.875rem] text-on-primary shadow-md transition-all hover:-translate-y-0.5 ${
                  isGreen ? "bg-secondary hover:bg-on-secondary-container" : "bg-primary hover:bg-primary-container"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                Reserve a Seat
              </Link>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 text-[0.875rem] font-semibold text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      {/* POSTER-WALL HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full bg-primary-container/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
              Events & Education Fairs
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              Consider this
              <br />
              your formal
              <br />
              <span className="relative inline-block text-secondary-fixed">
                invitation.
                <svg className="pointer-events-none absolute -bottom-2 left-0 w-full text-secondary" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C60 3 140 3 197 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="font-body-lg text-[1.125rem] leading-[1.9rem] text-on-primary-container max-w-xl mt-7">
              Education fairs, info sessions and mock-test days in Kathmandu. Meet university delegates in person, get
              your profile evaluated for free, and leave with answers.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>Reserve a Seat</span>
                <span className="material-symbols-outlined text-[20px]">event_available</span>
              </Link>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-surface/25 text-surface hover:bg-surface/10 font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed">call</span>
                {CONTACT_INFO.phone}
              </a>
            </div>
          </div>

          {/* STACKED INVITATION CARDS */}
          <div className="lg:col-span-6 relative hidden md:block h-[420px]">
            {events.slice(0, 3).map((e, i) => {
              const date = parseDate(e.event_date || "");
              const imageSrc = resolveImage(e.image);
              return (
                <div
                  key={e.id}
                  className={`absolute w-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 transition-transform duration-500 hover:scale-105 hover:z-30 ${
                    i === 0 ? "left-[2%] top-6 z-20" : i === 1 ? "left-[30%] top-12 z-10" : "left-[58%] top-4 z-0"
                  }`}
                  style={{ zIndex: 10 - i, transform: `rotate(${-6 + i * 6}deg)` }}
                >
                  <div className="relative h-40">
                    {imageSrc ? (
                      <Image src={imageSrc} alt={e.title} fill sizes="(min-width:1024px) 256px, 0px" className="object-cover" />
                    ) : (
                      <FallbackImage icon="confirmation_number" className="w-full h-full" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  </div>
                  <div className="bg-surface-container-lowest text-on-surface px-5 py-4">
                    <p className="font-display font-extrabold text-[1rem] leading-tight text-on-surface line-clamp-1">
                      {e.title}
                    </p>
                    <p className="text-[0.72rem] text-on-surface-variant mt-1.5 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {date.weekday ? `${date.weekday}, ${date.month} ${date.day}` : "TBA"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TICKETS */}
      <section className="relative bg-gradient-to-b from-surface to-surface-container-low/40 py-20 md:py-28">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-bold text-[0.75rem] uppercase tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Upcoming Sessions
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface mt-2">
              Every date worth putting in your diary.
            </h2>
          </Reveal>

          {events.length === 0 ? (
            <p className="text-center text-on-surface-variant py-16">
              No events scheduled yet. Check back soon or contact us for the next session.
            </p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {events.map((event, i) => (
                <EventTicket key={event.id} event={event} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW TO ATTEND */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-[0.75rem] uppercase tracking-wider mb-3">
              How to attend
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface">
              Three steps to a seat.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HOW_TO_ATTEND.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="relative rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-7 h-full overflow-hidden">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-4 -right-1 font-display text-[5.5rem] font-extrabold leading-none text-on-surface/[0.05]"
                  >
                    {step.step}
                  </span>
                  <div className="relative">
                    <span className={`w-11 h-11 rounded-2xl flex items-center justify-center ${i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"}`}>
                      <span className="material-symbols-outlined text-[24px]">
                        {i === 0 ? "event_available" : i === 1 ? "folder_shared" : "login"}
                      </span>
                    </span>
                    <h3 className="mt-5 font-display text-[1.375rem] font-bold text-on-surface">{step.title}</h3>
                    <p className="mt-2 text-[0.9375rem] leading-[1.6rem] text-on-surface-variant">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM CTA */}
      <section className="py-16 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-primary-container text-on-primary p-10 md:p-16">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,176,32,0.35),transparent_55%),radial-gradient(ellipse_at_top_right,rgba(0,51,102,0.9),transparent_60%)]" />
              <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-secondary/30 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
                    Free entry, always
                  </span>
                  <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.1] font-bold tracking-[-0.02em] text-surface mt-4">
                    Seats are capped. Your curiosity isn&apos;t.
                  </h2>
                  <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-primary-container max-w-xl mt-4">
                    Most sessions fill before the advertised date. Reserve your seat now, or walk in and join the
                    standby list on the day.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                  <div className="w-full max-w-sm rounded-2xl bg-surface/10 border border-surface/20 backdrop-blur-md p-5">
                    <p className="text-[0.75rem] uppercase tracking-wider text-surface/80 font-bold">Questions?</p>
                    <a href={CONTACT_INFO.phoneHref} className="font-display text-[1.4rem] font-bold text-surface hover:text-secondary-fixed transition-colors mt-1.5 inline-block">
                      {CONTACT_INFO.phone}
                    </a>
                    <p className="text-[0.875rem] text-surface/80 mt-2">{CONTACT_INFO.address}</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg transition-colors"
                  >
                    <span>Reserve My Seat</span>
                    <span className="material-symbols-outlined text-[20px]">event_available</span>
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