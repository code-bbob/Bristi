import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import FallbackImage from "@/components/FallbackImage";
import InquiryForm from "@/components/InquiryForm";
import { PageHero, SectionBadge } from "@/components/ui";
import { getCountries, getServices } from "@/lib/api";
import { paragraphs, resolveImage } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  return { title: service?.title ?? "Service" };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const services = await getServices();
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const countries = await getCountries();

  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title={service.title}
        subtitle="Transparent, dedicated support designed around your academic record, budget and career ambitions."
      />
      <section className="py-20 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-8 border border-outline-variant/60 shadow-lg">
                {resolveImage(service.image) ? (
                  <Image
                    src={resolveImage(service.image)}
                    alt={service.title}
                    fill
                    sizes="(min-width:1024px) 700px, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <FallbackImage icon={service.icon || "school"} className="w-full h-full" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
              </div>
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-primary-container/10 text-primary-container`}>
                <span className="material-symbols-outlined text-[36px]">{service.icon || "school"}</span>
              </div>
              <SectionBadge>What we do</SectionBadge>
              <div className="space-y-4">
                {paragraphs(service.description).map((p, i) => (
                  <p key={i} className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm p-6 mb-6">
                <p className="text-[0.6875rem] uppercase tracking-wider font-bold text-on-surface-variant mb-2">
                  Short description
                </p>
                <p className="text-[1rem] leading-[1.5rem] text-on-surface">{service.short_description}</p>
              </div>
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm p-6">
                <h3 className="font-display text-[1.25rem] font-semibold text-on-surface mb-3">Next Steps</h3>
                <ol className="space-y-3 text-[0.875rem] text-on-surface-variant list-decimal list-inside">
                  <li>Walk in or book a free counselling session.</li>
                  <li>Bring your transcripts and English test scores.</li>
                  <li>Receive a personalised roadmap within 48 hours.</li>
                </ol>
                <Link href="/contact" className="mt-5 inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary font-semibold px-6 py-3 rounded-xl shadow-sm transition-all">
                  <span>Book Free Counselling</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-surface-container-low/40 border-t border-outline-variant/30" id="enquire">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/60 shadow-lg max-w-3xl mx-auto">
            <h3 className="font-display text-[1.5rem] font-semibold text-on-surface mb-6">
              Enquire About {service.title}
            </h3>
            <InquiryForm countries={countries} />
          </div>
        </div>
      </section>
    </>
  );
}