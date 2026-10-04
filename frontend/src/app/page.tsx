import Image from "next/image";
import Link from "next/link";

import CTABanner from "@/components/CTABanner";
import DestinationCarousel from "@/components/DestinationCarousel";
import FallbackImage from "@/components/FallbackImage";
import InquiryForm from "@/components/InquiryForm";
import IntakeCarousel from "@/components/IntakeCarousel";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { Reveal, RevealWords } from "@/components/motion";
import { CONTACT_INFO, SectionBadge } from "@/components/ui";
import {
  getBlogs,
  getCountries,
  getEvents,
  getIntakes,
  getServices,
  getTestPreparations,
  getTestimonials,
} from "@/lib/api";
import { COMMITMENTS, COMPANY } from "@/lib/company";
import { formatDate, initials, resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Bristi Educational Consultancy Pvt. Ltd. | Study Abroad Experts",
};

const TEST_BADGES: Record<string, string> = {
  ielts: "7.0+",
  pte: "65+",
  "korean-language": "3-4",
};

const TEST_TARGETS: Record<string, string> = {
  ielts: "Target band 7.0+",
  pte: "Target score 65+",
  "korean-language": "Target TOPIK 3-4",
};

const blogTag = (tags: string) => (tags && tags.split(",")[0]?.trim()) || "Article";

export default async function HomePage() {
  const [countries, services, testPreparations, testimonials, blogs, events, intakes] = await Promise.all([
    getCountries(),
    getServices(),
    getTestPreparations(),
    getTestimonials(),
    getBlogs(),
    getEvents(),
    getIntakes(),
  ]);

  const heroImageSrc = resolveImage(countries[0]?.image ?? null);
  const processBannerSrc = resolveImage(countries[3]?.image ?? countries[0]?.image ?? null);
  const ctaImageSrc = resolveImage(countries[4]?.image ?? countries[0]?.image ?? null);

  const processSteps = [
    { n: "01", title: "Counselling", text: "Understand your goals, academic background, and preferences in an open 1-on-1 session." },
    { n: "02", title: "Choose", text: "Select the right country, accredited university, and course fitting your long-term career." },
    { n: "03", title: "Apply", text: "Prepare transcripts, SOP, and official applications with institutional verification." },
    { n: "04", title: "Visa", text: "Assemble financial dossiers, complete medicals, and lodge compliant visa paperwork." },
    { n: "05", title: "Depart", text: "Attend pre-departure briefings, finalize accommodation, and book student airfares." },
  ];

  return (
    <>
      {/* BANNER */}
      <section className="relative w-full overflow-hidden bg-[#192f59]">
        <Image
          src="https://graceintlgroup.com/wp-content/uploads/2025/04/WEB-BANNER-2-scaled.jpg"
          alt="Bristi Educational Consultancy"
          width={2560}
          height={1016}
          sizes="100vw"
          priority
          className="block w-full h-auto"
        />
      </section>

      {/* HERO */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 bg-gradient-to-b from-surface via-surface-container-low/40 to-surface" id="home">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/20">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="font-label-md text-[0.75rem] text-secondary font-bold tracking-wider uppercase">
                  Your Journey. Our Guidance.
                </span>
              </div>
              <h1 className="font-display font-bold text-primary-container">
                <span className="block text-[1.5rem] md:text-[1.8125rem] leading-tight">Your Journey to</span>
                <span className="block text-[2.25rem] md:text-[2.8125rem] leading-[1.1] tracking-[-0.02em]">
                  Global Education
                </span>
                <span className="block mt-1 text-[1.0625rem] md:text-[1.1875rem] font-medium tracking-normal text-secondary">
                  Starts Here.
                </span>
              </h1>
              <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant max-w-2xl">
                Personalized guidance for choosing the right course, university, and destination — from your first
                counselling session in Kathmandu to your safe arrival abroad.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2.5 bg-primary-container text-on-primary hover:bg-primary font-semibold px-7 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Book Free Counselling</span>
                  <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                </Link>
                <Link
                  href="/destinations"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary-container text-primary-container hover:bg-primary-container/5 font-semibold px-6 py-3.5 rounded-xl transition-colors"
                >
                  <span>Explore Study Destinations</span>
                  <span className="material-symbols-outlined text-[20px]">explore</span>
                </Link>
              </div>
              <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-on-surface-variant font-[0.875rem] font-semibold">
                {["Personalized Counselling", "University Applications", "Visa Guidance"].map((item) => (
                  <div key={item} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary-container via-secondary to-primary rounded-3xl opacity-15 transform rotate-2"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/40 bg-surface-container-lowest">
                {heroImageSrc ? (
                  <Image
                    alt={countries[0] ? `${countries[0].name} campus` : "University campus"}
                    className="w-full h-[460px] lg:h-[420px] object-contain object-top"
                    width={800}
                    height={520}
                    src={"/poster1.png"}
                  />
                ) : (
                  <div className="w-full h-[460px] lg:h-[520px] bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/25 text-[96px]">public</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl border border-outline-variant/60 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-[24px]">support_agent</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-[1.25rem] font-semibold text-on-surface truncate">
                        Start with a free consultation
                      </h4>
                      <p className="text-[0.875rem] text-on-surface-variant truncate">
                        Talk to our certified counsellors in Kathmandu
                      </p>
                    </div>
                    <a
                      className="hidden sm:inline-flex items-center justify-center p-2 rounded-lg bg-primary-container text-on-primary hover:bg-primary transition-colors"
                      href={CONTACT_INFO.phoneHref}
                    >
                      <span className="material-symbols-outlined text-[20px]">call</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      {/* <section className="relative overflow-hidden" id="stats"> */}
      {/*   <div className="absolute inset-0"> */}
      {/*     <div className="absolute inset-0 bg-primary/95" /> */}
      {/*   </div> */}
      {/*   <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 py-14 md:py-16"> */}
      {/*     <div className="grid grid-cols-2 lg:grid-cols-4 gap-6"> */}
      {/*       {stats.map((s) => ( */}
      {/*         <div key={s.label} className="flex items-center gap-3"> */}
      {/*           <span className="w-11 h-11 rounded-lg bg-surface/10 text-surface flex items-center justify-center backdrop-blur-sm border border-surface/20"> */}
      {/*             <span className="material-symbols-outlined text-[24px]">{s.icon}</span> */}
      {/*           </span> */}
      {/*           <div> */}
      {/*             <p className="font-display text-[1.5rem] font-bold text-surface">{s.value}</p> */}
      {/*             <p className="text-[0.75rem] text-surface/80">{s.label}</p> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   </div> */}
      {/* </section> */}
      {/**/}
      {/* NEXT INTAKES */}
      <IntakeCarousel intakes={intakes} />

      {/* DESTINATIONS */}
      <section className="relative py-20 md:py-12 bg-surface overflow-hidden" id="destinations">
        <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 right-1/4 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div className="max-w-2xl">
              <Reveal delay={100}>
                <SectionBadge>
                  <span className="material-symbols-outlined text-[16px]">public</span>
                  Global Pathways
                </SectionBadge>
              </Reveal>
              <RevealWords
                as="h2"
                text="Where Will Your Journey Take You?"
                className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface mt-3 mb-2"
              />
              <Reveal delay={260}>
                <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant">
                  Explore study destinations and find the pathway that fits your academic goals, budget, and future plans.
                </p>
              </Reveal>
            </div>
            <Reveal delay={320}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group"
              >
                <span>Speak with a Country Specialist</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </Reveal>
          </div>
          <DestinationCarousel countries={countries} />
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 md:py-28 bg-surface-container-low/60 border-t border-outline-variant/40" id="services">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-84">
              <SectionBadge color="secondary">Our Full Lifecycle Support</SectionBadge>
              <h2 className="font-display text-[2.5rem] md:text-[2.75rem] leading-[2.9rem] md:leading-[3.25rem] font-bold tracking-[-0.02em] text-on-surface">
                Everything You Need, From Counselling to Departure
              </h2>
              <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant mt-4">
                We eliminate the confusion from studying abroad with transparent, structured services at every milestone.
              </p>
              <div className="mt-8 space-y-3.5">
                {[
                  "1-on-1 guidance from certified counsellors",
                  "Verified documentation & compliant visa lodgement",
                  "Live support from Kathmandu to arrival",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[0.9375rem] font-medium text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                    {item}
                  </div>
                ))}
              </div>
              <Link
                href="/services"
                className="mt-9 inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary font-display font-semibold px-6 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 hover:-translate-y-0.5"
              >
                <span>Explore All Services</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, i) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.slug}`}
                    className="group relative flex flex-col rounded-2xl bg-surface-container-lowest border border-outline-variant/60 p-6 shadow-sm hover:shadow-xl hover:border-primary-container/50 hover:-translate-y-1.5 overflow-hidden transition-all duration-500 ease-out"
                  >
                    <span
                      className="pointer-events-none select-none absolute -top-3 -right-1 font-display text-[4.5rem] font-extrabold leading-none text-on-surface/[0.04] group-hover:text-primary/[0.07] transition-colors duration-700"
                      aria-hidden="true"
                    >
                      0{i + 1}
                    </span>
                    <div
                      className={`mb-5 w-12 h-12 rounded-xl flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6 ${
                        i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[26px]">{service.icon || "school"}</span>
                    </div>
                    <h3 className="font-display text-[1.25rem] font-bold text-on-surface mb-2 group-hover:text-primary transition-colors duration-500">
                      {service.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.6rem] text-on-surface-variant flex-1">
                      {service.short_description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-primary font-display font-semibold text-[0.875rem]">
                      Learn more
                      <span className="material-symbols-outlined text-[18px] -translate-x-1 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                        arrow_forward
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="relative py-20 md:py-28 overflow-hidden" id="process">
        <div className="absolute inset-0">
          {processBannerSrc ? (
            <Image src={processBannerSrc} alt="" fill sizes="100vw" className="object-cover" />
          ) : (
            <FallbackImage className="w-full h-full" icon="flight" />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/95 via-primary/85 to-primary/95" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 text-surface font-label-md text-[0.75rem] font-bold uppercase tracking-wider mb-3 border border-surface/20 backdrop-blur-sm">
              Clear 5-Stage Process
            </span>
            <RevealWords
              as="h2"
              text="From Nepal to Your Next Chapter"
              className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-surface"
            />
            <Reveal delay={200}>
              <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-surface/80 mt-3">
                A clear, transparent 5-step roadmap engineered for your peace of mind and success.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-y-14 gap-x-4 lg:gap-x-6">
              <span
                aria-hidden="true"
                className="process-line hidden lg:block absolute top-[36px] left-[10%] right-[10%] h-[3px] rounded-full bg-gradient-to-r from-secondary-fixed/70 via-surface/30 to-secondary-fixed/70"
              />
              <span
                aria-hidden="true"
                className="process-line-y lg:hidden absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-[3px] rounded-full bg-gradient-to-b from-secondary-fixed/70 via-surface/30 to-secondary-fixed/70"
              />
              {processSteps.map((step, i) => (
                <li
                  key={step.n}
                  className="process-step relative flex flex-col items-center text-center"
                  style={{ transitionDelay: `${160 + i * 180}ms` }}
                >
                  <div className="relative z-10">
                    <div
                      className={`relative z-10 w-[72px] h-[72px] rounded-full flex items-center justify-center shadow-xl font-display text-[1.5rem] font-extrabold tracking-tight border-4 border-surface/20 ${
                        i % 2 === 0 ? "bg-secondary text-on-secondary" : "bg-surface text-primary-container"
                      }`}
                    >
                      {step.n}
                    </div>
                    <span
                      aria-hidden="true"
                      className="process-ring absolute inset-0 rounded-full border-2 border-secondary-fixed/40"
                      style={{ animationDelay: `${i * 0.45}s` }}
                    />
                  </div>
                  <h3 className="mt-6 font-display text-[1.125rem] font-semibold text-surface tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[0.8125rem] leading-[1.5rem] text-surface/70 max-w-[17rem]">{step.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* WHY BRISTI */}
      <section className="py-20 md:py-28 bg-surface-container-low/40 border-t border-outline-variant/30" id="about">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-outline-variant/50 bg-surface-container-lowest">
                  <Image
                    alt={countries[1] ? `${countries[1].name} campus` : "University campus"}
                    className="w-full h-[480px] object-contain"
                    width={800}
                    height={480}
                    src={"/placeholder-image-1.webp"}
                  />
                               </div>
              <div className="absolute -bottom-6 -right-4 md:right-6 bg-surface-container-lowest p-4 rounded-xl shadow-lg border border-outline-variant/60 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <p className="text-[0.6875rem] text-on-surface-variant uppercase tracking-wider font-bold">
                    Official Registration
                  </p>
                  <p className="text-[0.875rem] text-on-surface font-semibold">Nepal Govt. Regd. No. {CONTACT_INFO.regdNo}</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 space-y-6 pt-6 lg:pt-0">
              <SectionBadge color="secondary">Our Core Values</SectionBadge>
              <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
                Guidance That Puts Your Future First
              </h2>
              <p className="text-[1rem] leading-[1.5rem] text-on-surface-variant">
                Founded in {COMPANY.foundedYear}, we believe an international education is a life-changing
                investment for families across Nepal. We avoid false hype and focus exclusively on transparent,
                student-aligned counselling.
              </p>
              <div className="space-y-4 pt-2">
                {COMMITMENTS.map((item, i) => (
                  <div key={item.title} className="p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/40 flex items-start gap-4 shadow-sm">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        i % 2 === 0 ? "bg-primary-container/10 text-primary-container" : "bg-secondary/10 text-secondary"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-[1.25rem] font-semibold text-on-surface">{item.title}</h4>
                      <p className="text-[0.875rem] text-on-surface-variant mt-1">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group"
              >
                <span>More about Bristi</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

{/* TEST PREPARATION */}
      <section className="relative py-20 md:py-28 bg-primary overflow-hidden" id="test-preparation">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-primary via-primary to-primary-container/40"
        />
        <div aria-hidden="true" className="absolute -top-28 -right-28 h-96 w-96 rounded-full bg-secondary-fixed/15 blur-3xl" />
        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-32 h-[26rem] w-[26rem] rounded-full bg-primary-fixed/20 blur-3xl opacity-60"
        />
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/10 text-surface font-label-md text-[0.75rem] font-bold uppercase tracking-wider mb-3 border border-surface/20 backdrop-blur-sm">
              Test Preparation Classes
            </span>
            <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-surface">
              Ace IELTS, PTE & Korean Language
            </h2>
            <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-surface/80 mt-2">
              Small-batch coaching with live practice, weekly mock tests and personalised score feedback from experienced trainers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testPreparations.map((t, i) => (
              <Reveal key={t.id} delay={i * 160} className="h-full">
                <Link
                  href={`/test-preparation/${t.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-surface/15 bg-surface/5 p-8 shadow-lg shadow-black/20 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-secondary/50 hover:bg-surface/10 hover:shadow-2xl"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-9 -right-3 select-none font-display text-[6.5rem] font-extrabold leading-none tracking-tighter text-surface/5 transition-colors duration-700 group-hover:text-surface/25"
                  >
                    {TEST_BADGES[t.slug] ?? ""}
                  </span>
                  <div className="relative flex flex-1 flex-col">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
                        i % 2 === 0
                          ? "bg-gradient-to-br from-secondary to-secondary-fixed-dim text-on-secondary shadow-secondary/30"
                          : "bg-gradient-to-br from-primary-container to-primary text-surface shadow-black/30"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[28px]">{t.icon || "edit_note"}</span>
                    </div>
                    <span className="mt-7 text-[0.75rem] font-bold uppercase tracking-[0.18em] text-secondary-fixed-dim">
                      {TEST_TARGETS[t.slug] ?? "Test coaching"}
                    </span>
                    <h3 className="mt-1.5 font-display text-[1.75rem] font-bold tracking-[-0.01em] text-surface transition-colors duration-300 group-hover:text-secondary-fixed">
                      {t.title}
                    </h3>
                    <p className="mt-3 flex-1 text-[0.9375rem] leading-[1.6rem] text-surface/75">
                      {t.short_description}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 font-display text-[0.9rem] font-semibold text-secondary-fixed">
                      View program
                      <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 md:py-28 bg-surface-container-low/40 border-t border-outline-variant/30" id="testimonials">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionBadge>Student Voices</SectionBadge>
            <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
              Where Our Students Are Headed
            </h2>
            <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant mt-2">
              Real aspirations turning into reality through personalized mentoring and meticulous paperwork.
            </p>
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* LATEST BLOGS & EVENTS */}
      <section className="py-20 md:py-28 bg-surface border-t border-outline-variant/30" id="blog">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionBadge color="secondary">Latest News & Insights</SectionBadge>
              <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
                Insights from Our Experts
              </h2>
            </div>
            <Link href="/blogs" className="group inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors">
              <span>Read All Articles</span>
              <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">arrow_forward</span>
            </Link>
          </div>
          {blogs[0] ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <Link
                href={`/blogs/${blogs[0].slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden border border-outline-variant/60 bg-surface-container-lowest shadow-sm hover:shadow-2xl transition-all duration-500 lg:col-span-7"
              >
                <div className="relative h-64 md:h-80 overflow-hidden bg-surface-container">
                  {resolveImage(blogs[0].cover_image) ? (
                    <Image
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={blogs[0].title}
                      width={900}
                      height={520}
                      src={resolveImage(blogs[0].cover_image)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/25 text-[56px]">article</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-surface/15 border border-surface/25 backdrop-blur-sm px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-surface">
                    {blogTag(blogs[0].tags)}
                  </span>
                </div>
                <div className="p-6 md:p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[0.8rem] text-on-surface-variant mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-on-primary text-[0.7rem] font-bold">
                      {initials(blogs[0].author)}
                    </span>
                    <span className="font-semibold text-on-surface/80">{blogs[0].author}</span>
                    <span className="h-1 w-1 rounded-full bg-outline" />
                    <span className="inline-flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                      {blogs[0].published_at ? formatDate(blogs[0].published_at) : ""}
                    </span>
                  </div>
                  <h3 className="font-display text-[1.5rem] md:text-[1.875rem] font-bold tracking-[-0.01em] leading-snug text-on-surface group-hover:text-primary transition-colors duration-300">
                    {blogs[0].title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.6rem] text-on-surface-variant">
                    {blogs[0].excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display font-semibold text-[0.9rem] text-primary">
                    Read Article
                    <span className="material-symbols-outlined text-[18px] -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </Link>

              {blogs.slice(1, 3).length > 0 && (
                <div className="lg:col-span-5 flex flex-col divide-y divide-outline-variant/60 overflow-hidden rounded-3xl border border-outline-variant/60 bg-surface-container-lowest shadow-sm">
                  {blogs.slice(1, 3).map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="group flex items-start gap-4 p-5 md:p-6 transition-colors duration-300 hover:bg-surface-container-low"
                    >
                      <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-surface-container">
                        {resolveImage(blog.cover_image) ? (
                          <Image
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            alt={blog.title}
                            fill
                            sizes="(min-width:1024px) 112px, 112px"
                            src={resolveImage(blog.cover_image)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white/25 text-[28px]">article</span>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[0.7rem] font-bold uppercase tracking-wider text-secondary">
                          {blogTag(blog.tags)}
                        </span>
                        <h3 className="mt-1 line-clamp-2 font-display text-[1.0625rem] font-semibold leading-snug text-on-surface transition-colors duration-300 group-hover:text-primary">
                          {blog.title}
                        </h3>
                        <span className="mt-2 block text-[0.75rem] text-on-surface-variant">
                          {blog.published_at ? formatDate(blog.published_at) : ""} · {blog.author}
                        </span>
                      </div>
                      <span className="material-symbols-outlined mt-6 shrink-0 text-[20px] text-outline transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                        arrow_forward
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </div>
      </section>

      {/* EVENTS */}
      {events.length > 0 ? (
        <section className="py-20 md:py-24 bg-surface-container-low/40 border-t border-outline-variant/30" id="events">
          <div className="max-w-[1600px] mx-auto px-6 md:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <SectionBadge>Events At Bristi</SectionBadge>
                <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
                  Upcoming Education Fairs & Sessions
                </h2>
              </div>
              <Link href="/events" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group">
                <span>View All Events</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/60 shadow-sm flex flex-col sm:flex-row"
                >
                  <div className="sm:w-2/5 relative">
                    {resolveImage(event.image) ? (
                      <Image
                        className="w-full h-44 sm:h-full object-cover"
                        alt={event.title}
                        width={420}
                        height={280}
                        src={resolveImage(event.image)}
                      />
                    ) : (
                      <div className="w-full h-44 sm:h-full bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/25 text-[44px]">event</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex-1">
                    <p className="text-[0.75rem] font-semibold text-secondary uppercase tracking-wider">
                      {event.event_date ? formatDate(event.event_date) : ""}
                    </p>
                    <h3 className="font-display text-[1.25rem] font-semibold text-on-surface mt-1 mb-2">{event.title}</h3>
                    <p className="inline-flex items-center gap-1.5 text-[0.875rem] text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {event.location}
                    </p>
                    <p className="text-[0.875rem] text-on-surface-variant mt-2 line-clamp-2">{event.short_description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABanner imageSrc={ctaImageSrc} />

      {/* CONTACT */}
      <section className="py-20 md:py-28 bg-surface-container-low/50 border-t border-outline-variant/30" id="contact">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <SectionBadge>Visit Our Kathmandu Office</SectionBadge>
                <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
                  Get in Touch With Our Counselling Team
                </h2>
                <p className="text-[1rem] text-on-surface-variant mt-2">
                  We welcome prospective students and parents for in-person advisory sessions. Walk in or schedule a
                  specific time below.
                </p>
              </div>
              <div className="space-y-5">
                {[
                  { icon: "location_on", title: "Office Address", value: "7th Floor, City Square Mall, Samakhusi Chowk, Kathmandu, Nepal" },
                  { icon: "call", title: "Phone Support", value: CONTACT_INFO.phone, href: CONTACT_INFO.phoneHref },
                  { icon: "mail", title: "Official Email", value: CONTACT_INFO.email, href: CONTACT_INFO.emailHref },
                  { icon: "schedule", title: "Working Hours", value: "Sunday – Friday: 9:30 AM – 5:30 PM (Saturday Closed)" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50">
                    <div className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-display text-[1.25rem] font-semibold text-on-surface">{item.title}</h4>
                      {item.href ? (
                        <p className="text-[0.875rem] text-on-surface-variant mt-1">
                          <a className="hover:text-primary transition-colors font-medium" href={item.href}>
                            {item.value}
                          </a>
                        </p>
                      ) : (
                        <p className="text-[0.875rem] text-on-surface-variant mt-1">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/60 shadow-lg">
                <h3 className="font-display text-[1.5rem] font-semibold text-on-surface mb-2">Book Your Free Session</h3>
                <p className="text-[0.875rem] text-on-surface-variant mb-6">
                  Fill out your details and our team will get back to you within 24 business hours.
                </p>
                <InquiryForm countries={countries} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
