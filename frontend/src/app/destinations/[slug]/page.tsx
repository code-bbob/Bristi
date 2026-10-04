import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import InquiryForm from "@/components/InquiryForm";
import CountrySections from "@/components/CountrySections";
import { CONTACT_INFO, SectionBadge } from "@/components/ui";
import { getCountries, getCountry } from "@/lib/api";
import { paragraphs, resolveImage } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const country = await getCountry(slug);
    return { title: `Study in ${country.name}` };
  } catch {
    return { title: "Destination" };
  }
}

export default async function CountryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let country;
  try {
    country = await getCountry(slug);
  } catch {
    notFound();
  }
  const countries = await getCountries();

  const highlights = country.highlights.split(";").map((h) => h.trim()).filter(Boolean);

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          {resolveImage(country.image) ? (
            <Image
              src={resolveImage(country.image)}
              alt={`${country.name} study destination`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-secondary" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40" />
        </div>
        <div className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-24 md:pt-32 pb-16 md:pb-24">
          <nav className="text-[0.8125rem] text-white/70 mb-6">
            <Link className="hover:text-white" href="/destinations">Destinations</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{country.name}</span>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-5xl drop-shadow">{country.flag_emoji || "🌍"}</span>
            <h1 className="font-display text-[2.5rem] md:text-[3.5rem] leading-[2.75rem] md:leading-[4rem] font-bold tracking-[-0.02em] text-white">
              Study in {country.name}
            </h1>
          </div>
          <p className="font-body-lg text-[1.125rem] text-white/90 mt-4 max-w-2xl">{country.tagline}</p>
          <div className="flex flex-wrap gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 text-white text-[0.875rem] font-semibold backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              {country.intake}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 text-white text-[0.875rem] font-semibold backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]">payments</span>
              {country.tuition_range}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/15 text-white text-[0.875rem] font-semibold backdrop-blur-sm">
              <span className="material-symbols-outlined text-[18px]">work</span>
              {country.work_rights}
            </span>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <a href="#universities" className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
              <span>View Universities</span>
              <span className="material-symbols-outlined text-[18px]">school</span>
            </a>
            <a href="#enquire" className="inline-flex items-center justify-center gap-2 border-2 border-white/70 text-white font-semibold px-6 py-3 rounded-xl transition-colors hover:bg-white/10">
              <span>Enquire Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT THE COUNTRY */}
      <section className="py-16 bg-surface-container-low/40 border-y border-outline-variant/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <SectionBadge>Why Study in {country.name}</SectionBadge>
              <div className="space-y-4">
                {paragraphs(country.description).map((p, i) => (
                  <p key={i} className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm p-6">
                <h3 className="font-display text-[1.25rem] font-semibold text-on-surface mb-4">Key Highlights</h3>
                <ul className="space-y-3">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-3 text-[0.875rem] text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC COUNTRY GUIDE SECTIONS */}
      <CountrySections sections={country.sections} />

      {/* UNIVERSITIES */}
      <section className="py-20 md:py-28 bg-surface" id="universities">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <SectionBadge>Partner Institutions</SectionBadge>
              <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface">
                Universities in {country.name}
              </h2>
            </div>
            <a href="#enquire" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary-container transition-colors group">
              <span>Get Your Profile Evaluated</span>
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
          {country.universities.length === 0 ? (
            <p className="text-[1rem] text-on-surface-variant">
              University details for this destination are being updated. Contact us for the latest list.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {country.universities.map((u) => (
                <div
                  key={u.id}
                  className="group rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  <div className="h-44 overflow-hidden bg-surface-container">
                    {resolveImage(u.image) ? (
                      <Image
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={u.name}
                        width={640}
                        height={176}
                        src={resolveImage(u.image)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white/25 text-[48px]">school</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-display text-[1.25rem] font-semibold text-on-surface">{u.name}</h3>
                    <p className="inline-flex items-center gap-1.5 text-[0.8125rem] text-on-surface-variant mt-1">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {u.city}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <span className="text-[0.6875rem] px-2.5 py-1 rounded bg-secondary/10 text-secondary font-semibold">
                        {u.intake}
                      </span>
                    </div>
                    <p className="text-[0.875rem] text-on-surface-variant leading-relaxed mt-3 line-clamp-3">{u.description}</p>
                    <div className="mt-4 pt-4 border-t border-outline-variant/30 mt-auto flex flex-col gap-3">
                      <p className="text-[0.75rem] text-on-surface-variant">
                        <span className="font-semibold text-on-surface">Courses: </span>
                        {u.courses}
                      </p>
                      {u.website ? (
                        <a
                          href={u.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary font-semibold hover:text-primary-container transition-colors"
                        >
                          Visit Website
                          <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ENQUIRY */}
      <section className="py-20 bg-surface-container-low/50 border-t border-outline-variant/30" id="enquire">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <SectionBadge>Free Consultation</SectionBadge>
              <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold tracking-[-0.02em] text-on-surface mb-3">
                Apply to Study in {country.name}
              </h2>
              <p className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                Fill in your profile and our {country.name} country specialist will call you back with course
                suggestions, intakes and estimated costs.
              </p>
              <div className="mt-6 space-y-4">
                <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50">
                  <span className="w-10 h-10 rounded-lg bg-secondary/10 text-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">call</span>
                  </span>
                  <div>
                    <p className="text-[0.75rem] text-on-surface-variant">Phone Support</p>
                    <p className="text-[0.875rem] font-semibold text-on-surface">{CONTACT_INFO.phone}</p>
                  </div>
                </a>
                <a href={CONTACT_INFO.emailHref} className="flex items-center gap-3 p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/50">
                  <span className="w-10 h-10 rounded-lg bg-primary-container/10 text-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">mail</span>
                  </span>
                  <div>
                    <p className="text-[0.75rem] text-on-surface-variant">Official Email</p>
                    <p className="text-[0.875rem] font-semibold text-on-surface">{CONTACT_INFO.email}</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/60 shadow-lg">
                <h3 className="font-display text-[1.5rem] font-semibold text-on-surface mb-6">
                  Enquire About {country.name}
                </h3>
                <InquiryForm countries={countries} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}