import Link from "next/link";

import InquiryForm from "@/components/InquiryForm";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getCountries } from "@/lib/api";
import { OFFICES } from "@/lib/company";

export const metadata = {
  title: "Contact Us & Enquiry",
};

const [HEAD_OFFICE] = OFFICES;

const CHANNELS: {
  icon: string;
  title: string;
  lines: string[];
  hint: string;
  href?: string;
  altHref?: string;
}[] = [
  {
    icon: "location_on",
    title: "Our Office",
    lines: HEAD_OFFICE.lines,
    hint: "Walk-ins welcome, Sunday – Friday",
  },
  {
    icon: "call",
    title: "Guidance Desk",
    lines: [CONTACT_INFO.phone, CONTACT_INFO.phone2],
    href: CONTACT_INFO.phoneHref,
    altHref: CONTACT_INFO.phone2Href,
    hint: "Mon–Fri, 9:00 AM – 6:00 PM",
  },
  {
    icon: "mail",
    title: "Official Email",
    lines: [CONTACT_INFO.email],
    href: CONTACT_INFO.emailHref,
    hint: "Replies within 24 business hours",
  },
];

const WHY_MEET = [
  { icon: "person_check", text: "Honest profile evaluation with zero false promises" },
  { icon: "public", text: "Country-specific experts for every destination we serve" },
  { icon: "payments", text: "A clear cost, intake and scholarship breakdown" },
  { icon: "schedule", text: "A written roadmap within 24 business hours" },
];

export default async function ContactPage() {
  const countries = await getCountries();

  return (
    <>
      {/* DARK POSTCARD HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute -top-24 -right-24 w-[460px] h-[460px] rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[400px] h-[400px] rounded-full bg-primary-container/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-14 md:pt-24 pb-20 md:pb-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">contact_mail</span>
              Contact us
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              Send the postcard
              <br />
              your future self
              <br />
              <span className="relative inline-block text-secondary-fixed">
                will thank you for.
                <svg className="pointer-events-none absolute -bottom-2 left-0 w-full text-secondary" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C60 3 140 3 197 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="font-body-lg text-[1.125rem] leading-[1.9rem] text-on-primary-container max-w-xl mt-7">
              One message is all it takes. Tell us where you are now, and our counsellors will map where you could
              be — response within 24 business hours.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Call {CONTACT_INFO.phone}
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="inline-flex items-center justify-center gap-2 border border-surface/25 text-surface hover:bg-surface/10 font-semibold px-7 py-4 rounded-xl transition-colors"
              >
                <span className="material-symbols-outlined text-[20px] text-secondary-fixed">mail</span>
                {CONTACT_INFO.email}
              </a>
            </div>
          </div>

          {/* POSTCARD STACK */}
          <div className="lg:col-span-5 relative hidden md:block h-[420px]">
            <div
              className="absolute left-[4%] top-8 w-64 h-72 rounded-2xl bg-surface/15 border border-surface/20 backdrop-blur-sm overflow-hidden shadow-xl -rotate-6"
            >
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface/15">
                <span className="w-2.5 h-2.5 rounded-full bg-error/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary-fixed" />
              </div>
              <div className="p-4">
                <div className="h-24 rounded-lg bg-surface/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-surface/50 text-[44px]">landscape</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-2.5 w-4/5 rounded-full bg-surface/25" />
                  <div className="h-2.5 w-3/5 rounded-full bg-surface/25" />
                  <div className="h-2.5 w-2/3 rounded-full bg-surface/25" />
                </div>
              </div>
            </div>

            <div
              className="absolute left-[38%] top-2 w-64 h-72 rounded-2xl bg-surface-container-lowest text-on-surface overflow-hidden shadow-2xl rotate-2 z-10"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-outline-variant/50">
                <span className="text-[0.72rem] font-bold text-on-surface-variant">To: Your Future</span>
                <span className="material-symbols-outlined text-primary text-[20px]">mail</span>
              </div>
              <div className="p-4 relative h-[calc(100%-3rem)]">
                <div className="absolute top-6 right-4 flex flex-col items-end gap-1">
                  <span className="text-[0.6rem] font-bold text-primary bg-primary/10 rounded px-1.5 py-0.5 rotate-3">STAMP</span>
                </div>
                <span className="font-display text-[2.5rem] font-extrabold leading-none text-secondary flex items-center gap-2">
                  Hello.
                  <span className="material-symbols-outlined text-[28px] text-primary">flight_takeoff</span>
                </span>
                <p className="mt-3 text-[0.82rem] leading-relaxed text-on-surface-variant">
                  I&apos;m ready to plan my study-abroad journey. Please write back with a roadmap.
                </p>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-[0.8rem]">B</span>
                    <span className="text-[0.7rem] font-semibold text-on-surface-variant">Bristi, Kathmandu</span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">arrow_forward</span>
                </div>
              </div>
            </div>

            <div className="absolute left-[78%] top-20 w-48 h-40 rounded-2xl bg-secondary text-on-secondary shadow-xl rotate-6 overflow-hidden">
              <div className="p-4 h-full flex flex-col items-start justify-between">
                <span className="material-symbols-outlined text-[26px]">verified</span>
                <div>
                  <p className="font-display font-extrabold text-[1.05rem] leading-tight">24 hr reply</p>
                  <p className="text-[0.7rem] text-on-secondary/90 mt-0.5">every single message</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="py-14 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CHANNELS.map((card, i) => (
              <Reveal key={card.title} delay={i * 90}>
                <div className="rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-6 h-full shadow-sm">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 shrink-0 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[26px]">{card.icon}</span>
                    </span>
                    <div className="min-w-0">
                      <h3 className=" text-[1.15rem] font-semibold font-sans text-on-surface">{card.title}</h3>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-wider text-on-surface-variant mt-0.5">
                        {card.hint}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-outline-variant/40">
                    {card.href ? (
                      <div className="flex flex-col gap-1">
                        {card.lines.map((line, i) => (
                          <a
                            key={line}
                            href={i === 1 && card.altHref ? card.altHref : card.href}
                            className="font-display text-[1.05rem] font-bold text-primary hover:text-primary-container break-all transition-colors"
                          >
                            {line}
                          </a>
                        ))}
                      </div>
                    ) : (
                      card.lines.map((line) => (
                        <p key={line} className="text-[0.9375rem] font-medium text-on-surface-variant">
                          {line}
                        </p>
                      ))
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FORM + MAP */}
      <section className="pb-24 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* LETTER FORM */}
            <Reveal className="lg:col-span-7">
              <div className="relative rounded-[1.75rem] border border-outline-variant/60 bg-surface-container-lowest shadow-xl overflow-hidden">
                <div className="flex items-center gap-1.5 px-6 py-4 border-b border-outline-variant/50 bg-surface-container-low/60">
                  <span className="w-3 h-3 rounded-full bg-error/70" />
                  <span className="w-3 h-3 rounded-full bg-secondary/70" />
                  <span className="w-3 h-3 rounded-full bg-primary-container/70" />
                  <span className="ml-3 text-[0.75rem] font-semibold text-on-surface-variant">
                    Information & Inquiry
                  </span>
                </div>
                <div className="p-7 md:p-10">
                  <h2 className="font-display text-[1.75rem] font-bold tracking-[-0.01em] text-on-surface">
                    Write to us.
                  </h2>
                  <p className="text-[0.9375rem] text-on-surface-variant mt-1.5 mb-7">
                    The more you share, the sharper your roadmap gets.
                  </p>
                  <InquiryForm countries={countries} />
                </div>
              </div>
            </Reveal>

            {/* RIGHT RAIL */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
              <Reveal delay={100}>
                <div className="rounded-[1.75rem] overflow-hidden shadow-lg border border-outline-variant/40 bg-surface-container-lowest">
                  <div className="h-2 bg-gradient-to-r from-primary via-secondary to-primary" />
                  <iframe
                    title="Bristi Educational Consultancy location"
                    className="w-full h-[300px] border-0"
                    loading="lazy"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d39071.25870755798!2d85.3127003!3d27.7214482!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19f447a702e9%3A0x88f9c3894f46475c!2sCITY%20SQUARE%20MALL!5e1!3m2!1sen!2snp!4v1790053830957!5m2!1sen!2snp"
                  />
                  <div className="p-5 flex items-center justify-between gap-4 bg-surface-container-lowest">
                    <div>
                      <p className="font-display font-bold text-on-surface">Find us at City Square Mall</p>
                      <p className="text-[0.85rem] text-on-surface-variant mt-0.5">{HEAD_OFFICE.lines[1]}</p>
                    </div>
                    <a
                      href={HEAD_OFFICE.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 shrink-0 px-4 py-2.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary font-semibold text-[0.85rem] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">directions</span>
                      Directions
                    </a>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-[1.75rem] border border-outline-variant/50 bg-surface-container-low/50 p-7">
                  <h3 className="font-display text-[1.25rem] font-semibold text-on-surface mb-4">
                    Why book a session?
                  </h3>
                  <ul className="space-y-3.5 text-[0.9rem] text-on-surface-variant">
                    {WHY_MEET.map((item) => (
                      <li key={item.text} className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          {item.icon}
                        </span>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/"
                    className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-[0.9rem] text-primary hover:text-primary-container transition-colors group"
                  >
                    <span>Explore what we do first</span>
                    <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
