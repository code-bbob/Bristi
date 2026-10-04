import type { Metadata } from "next";
import Image from "next/image";

import FallbackImage from "@/components/FallbackImage";
import { notFound } from "next/navigation";

import InquiryForm from "@/components/InquiryForm";
import { PageHero, SectionBadge } from "@/components/ui";
import { getCountries, getTestPreparations } from "@/lib/api";
import { paragraphs, resolveImage } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tests = await getTestPreparations();
  const test = tests.find((t) => t.slug === slug);
  return { title: test?.title ?? "Test Preparation" };
}

export default async function TestPreparationDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tests = await getTestPreparations();
  const test = tests.find((t) => t.slug === slug);
  if (!test) notFound();
  const countries = await getCountries();

  return (
    <>
      <PageHero
        eyebrow="Preparation Classes"
        title={`${test.title} Preparation in Kathmandu`}
        subtitle={test.short_description}
      />
      <section className="py-20 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/40 bg-surface-container-lowest mb-8">
                {resolveImage(test.image) ? (
                  <Image
                    className="w-full h-[380px] object-cover"
                    alt={`${test.title} test preparation class`}
                    width={800}
                    height={380}
                    src={resolveImage(test.image)}
                  />
                ) : (
                  <FallbackImage icon="edit_note" className="w-full h-[380px]" />
                )}
              </div>
              <SectionBadge>About the program</SectionBadge>
              <div className="space-y-4">
                {paragraphs(test.description).map((p, i) => (
                  <p key={i} className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 bg-surface-container-lowest border border-outline-variant/60 rounded-2xl p-6">
                <h3 className="font-display text-[1.25rem] font-semibold text-on-surface mb-3">What&apos;s included</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[0.875rem] text-on-surface-variant">
                  {[
                    "Diagnostic placement test",
                    "Live classes by certified trainers",
                    "Weekly full-length mock tests",
                    "Personalised band-score feedback",
                    "Official practice material",
                    "Small batch sizes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-2xl border border-outline-variant/60 shadow-sm mb-6">
                <h3 className="font-display text-[1.5rem] font-semibold text-on-surface mb-4">Book a Free Session</h3>
                <p className="text-[0.875rem] text-on-surface-variant mb-6">
                  Take a free placement test and get a personalised plan to reach your target score.
                </p>
                <InquiryForm countries={countries} compact />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}