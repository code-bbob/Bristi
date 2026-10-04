import Image from "next/image";
import Link from "next/link";

import FallbackImage from "@/components/FallbackImage";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO, SectionBadge } from "@/components/ui";
import { getTestPreparations } from "@/lib/api";
import type { TestPreparation } from "@/lib/types";
import { resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Test Preparation Classes",
};

const TEST_BADGES: Record<string, string> = {
  ielts: "7.0+",
  pte: "65+",
  "korean-language": "3–4",
};

const TEST_TARGETS: Record<string, string> = {
  ielts: "Target band 7.0+",
  pte: "Target score 65+",
  "korean-language": "Target TOPIK 3–4",
};

const TRAINING_STEPS = [
  { icon: "manage_search", title: "Diagnose", text: "Free placement test that pinpoints exactly where you are today." },
  { icon: "school", title: "Train", text: "Live classes in small batches with certified, experienced trainers." },
  { icon: "quiz", title: "Mock", text: "Weekly full-length mock tests that mirror the real exam conditions." },
  { icon: "insights", title: "Refine", text: "Personalised score feedback and a revised plan every single week." },
];

function BandMeter({ label, pct, accent }: { label: string; pct: string; accent: "green" | "blue" }) {
  return (
    <div>
      <div className="flex items-center justify-between text-[0.72rem] font-bold uppercase tracking-wider text-surface/70">
        <span>{label}</span>
      </div>
      <div className="mt-1.5 h-1.5 rounded-full bg-surface/15">
        <div
          className={`h-1.5 rounded-full ${accent === "green" ? "bg-secondary" : "bg-primary-fixed"}`}
          style={{ width: pct }}
        />
      </div>
    </div>
  );
}

function Scorecard({ test, index }: { test: TestPreparation; index: number }) {
  const imageSrc = resolveImage(test.image);
  const isGreen = index % 2 === 0;
  const accentText = isGreen ? "text-secondary" : "text-primary-container";

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <Reveal className={`lg:col-span-5 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
        <div className="relative">
          <div
            className={`absolute -inset-3 rounded-[2rem] ${isGreen ? "bg-secondary/10" : "bg-primary/10"} -rotate-1 pointer-events-none`}
          />
          <Link href={`/test-preparation/${test.slug}`} className="group relative block rounded-3xl overflow-hidden shadow-xl aspect-[16/10] border border-outline-variant/50">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${test.title} test preparation`}
                fill
                sizes="(min-width:1024px) 640px, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <FallbackImage icon={test.icon || "edit_note"} className="w-full h-full" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-on-surface">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              Weekly mocks included
            </span>
          </Link>
          <div
            className={`absolute -bottom-6 -right-4 md:right-6 rounded-2xl ${isGreen ? "bg-secondary" : "bg-primary"} text-on-primary px-5 py-4 shadow-xl`}
          >
            <p className="text-[0.68rem] font-bold uppercase tracking-widest opacity-80">Target</p>
            <p className="font-display text-[2rem] leading-none font-extrabold tracking-tight">{TEST_BADGES[test.slug] ?? ""}</p>
          </div>
        </div>
      </Reveal>

      <Reveal delay={120} className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-1" : ""}`}>
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase tracking-wider ${
              isGreen ? "bg-secondary/10 text-secondary" : "bg-primary/10 text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">strategy</span>
            {TEST_TARGETS[test.slug] ?? "Test coaching"}
          </span>
          <span className="h-px flex-1 bg-outline-variant/60" />
        </div>
        <h2 className="font-display text-[2rem] md:text-[2.75rem] leading-[2.4rem] md:leading-[3.25rem] font-bold tracking-[-0.02em] text-on-surface">
          {test.title}
        </h2>
        <p className="mt-4 text-[1rem] leading-[1.75rem] text-on-surface-variant">{test.description}</p>

        <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-5">
          <BandMeter label="Practice Matter" pct="92%" accent={isGreen ? "green" : "blue"} />
          <BandMeter label="Weekly Mocks" pct="100%" accent={isGreen ? "green" : "blue"} />
          <BandMeter label="Live Batches" pct="84%" accent={isGreen ? "green" : "blue"} />
          <BandMeter label="Score Feedback" pct="96%" accent={isGreen ? "green" : "blue"} />
        </div>

        <Link
          href={`/test-preparation/${test.slug}`}
          className={`mt-8 inline-flex items-center gap-2 font-display font-semibold text-[0.95rem] transition-colors group ${accentText}`}
        >
          <span className={`underline decoration-outline-variant underline-offset-4 group-hover:underline-offset-8 transition-all ${
            isGreen ? "hover:text-primary" : "hover:text-secondary"
          }`}>
            View full program
          </span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">
            arrow_forward
          </span>
        </Link>
      </Reveal>
    </div>
  );
}

export default async function TestPreparationPage() {
  const tests = await getTestPreparations();
  const heroImageSrc = resolveImage(tests[0]?.image ?? null);

  return (
    <>
      {/* DARK SCOREBOARD HERO */}
      <section className="relative overflow-hidden bg-primary text-on-primary">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:44px_44px]" />
        <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-secondary/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-24 w-[420px] h-[420px] rounded-full bg-primary-container/60 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-14 md:pt-24 pb-20 md:pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px]">strategy</span>
              Test Preparation Classes
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              Train until the
              <br />
              scoreboard
              <br />
              <span className="relative inline-block text-secondary-fixed">
                says you won.
                <svg className="pointer-events-none absolute -bottom-2 left-0 w-full text-secondary" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M3 9C60 3 140 3 197 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="font-body-lg text-[1.125rem] leading-[1.9rem] text-on-primary-container max-w-xl mt-7">
              Small-batch IELTS, PTE and Korean Language coaching. Weekly mocks, live practice, and score feedback
              that moves your numbers — not your luck.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>Book a Free Placement Test</span>
                <span className="material-symbols-outlined text-[20px]">edit_note</span>
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

          <div className="lg:col-span-6 relative hidden md:block">
            <div className="relative mx-auto max-w-md rotate-2 rounded-3xl bg-surface-container-lowest text-on-surface shadow-2xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-5 py-3.5 border-b border-outline-variant/50">
                <span className="w-3 h-3 rounded-full bg-error/70" />
                <span className="w-3 h-3 rounded-full bg-secondary/70" />
                <span className="w-3 h-3 rounded-full bg-primary-container/70" />
                <span className="ml-3 text-[0.72rem] font-semibold text-on-surface-variant">mock_test_results.pdf</span>
              </div>
              <div className="p-7 relative">
                {heroImageSrc ? (
                  <Image
                    src={heroImageSrc}
                    alt="Test preparation score report"
                    fill
                    sizes="(min-width:1024px) 480px, 0px"
                    className="object-cover opacity-[0.08]"
                  />
                ) : null}
                <div className="relative">
                  <p className="text-[0.72rem] font-bold uppercase tracking-widest text-on-surface-variant">
                    Mock Test — Result Card
                  </p>
                  <div className="mt-4 flex items-end gap-4">
                    <p className="font-display text-[5rem] leading-[0.85] font-extrabold tracking-tight text-primary">
                      7.0<span className="text-[1.5rem] align-middle text-secondary">+</span>
                    </p>
                    <div className="pb-1.5">
                      <p className="font-display font-bold text-on-surface text-[1.05rem]">IELTS</p>
                      <p className="text-[0.78rem] text-on-surface-variant">Target achieved</p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-3">
                    {[
                      { l: "Listening", v: "7.5" },
                      { l: "Reading", v: "7.0" },
                      { l: "Writing", v: "6.5" },
                      { l: "Speaking", v: "7.0" },
                    ].map((b) => (
                      <div key={b.l} className="rounded-xl border border-outline-variant/50 bg-surface p-3 text-center">
                        <p className="font-display text-[1.15rem] font-extrabold text-on-surface">{b.v}</p>
                        <p className="text-[0.62rem] font-semibold uppercase tracking-wider text-on-surface-variant mt-1">
                          {b.l}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 rounded-xl bg-secondary/10 border border-secondary/25 p-4 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[26px]">where_to_vote</span>
                    <p className="text-[0.875rem] font-semibold text-on-surface">
                      Ready for the real exam — <span className="text-secondary">mock average 7.1</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -left-4 top-12 bg-secondary text-on-secondary rounded-2xl shadow-xl px-4 py-3 -rotate-3 hidden lg:block">
              <p className="font-display font-extrabold text-[1.2rem] leading-none">Weekly Mocks</p>
              <p className="text-[0.7rem] text-on-secondary/90 mt-1">result in 24 hrs</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM SCORECARDS */}
      <section className="relative bg-gradient-to-b from-surface to-surface-container-low/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 py-20 md:py-28">
          <Reveal className="max-w-2xl mb-16">
            <SectionBadge color="secondary">The Programs</SectionBadge>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface mt-2">
              Pick your target. Let&apos;s chase it.
            </h2>
          </Reveal>
          <div className="space-y-20 md:space-y-28">
            {tests.map((test, i) => (
              <Scorecard key={test.id} test={test} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TRAINING METHOD */}
      <section className="py-20 md:py-24 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <Reveal className="max-w-2xl mx-auto text-center mb-16">
            <SectionBadge>The Method</SectionBadge>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface mt-2">
              Four moves. Every single week.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRAINING_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 90}>
                <div className="relative overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface-container-lowest p-7 h-full">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none select-none absolute -top-3 -right-1 font-display text-[5rem] font-extrabold leading-none text-on-surface/[0.05]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    <span className="w-12 h-12 rounded-2xl flex items-center justify-center bg-secondary/10 text-secondary">
                      <span className="material-symbols-outlined text-[26px]">{step.icon}</span>
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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,176,32,0.35),transparent_55%),radial-gradient(ellipse_at_top_left,rgba(0,51,102,0.9),transparent_60%)]" />
              <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-secondary/30 blur-3xl" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 border border-surface/20 text-[0.75rem] font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[16px]">terminal</span>
                    Free diagnostic
                  </span>
                  <h2 className="font-display text-[2.25rem] md:text-[3rem] leading-[1.1] font-bold tracking-[-0.02em] text-surface mt-4">
                    Know your starting score before you pay a single rupee.
                  </h2>
                  <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-primary-container max-w-xl mt-4">
                    Sit a free placement test at our office, get an honest gap analysis, and only then decide whether
                    a batch is right for you.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                  <div className="w-full max-w-sm rounded-2xl bg-surface/10 border border-surface/20 backdrop-blur-md p-5">
                    <p className="text-[0.75rem] uppercase tracking-wider text-surface/80 font-bold">Next batch starts</p>
                    <p className="font-display text-[1.4rem] font-bold text-surface mt-1.5">Every Sunday</p>
                    <p className="text-[0.875rem] text-surface/80 mt-2">Walk in with your transcripts — no appointment needed for the diagnostic.</p>
                  </div>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg transition-colors"
                  >
                    <span>Book My Free Test</span>
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