import Image from "next/image";
import Link from "next/link";

import CTABanner from "@/components/CTABanner";
import FallbackImage from "@/components/FallbackImage";
import GalleryLightbox from "@/components/GalleryLightbox";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getGallerySections } from "@/lib/api";
import type { GallerySection } from "@/lib/types";
import { paragraphs, resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Gallery",
  description:
    "Photos from counselling sessions, education fairs, test preparation classes and student departures at Bristi Educational Consultancy, Kathmandu.",
};

export default async function GalleryPage() {
  const sections = await getGallerySections();
  const withPhotos = sections.filter((section) => section.images.length > 0);
  const photoCount = withPhotos.reduce((total, section) => total + section.images.length, 0);
  const heroImage = withPhotos.flatMap((section) => section.images).find((image) => image.image) ?? null;
  const heroImageSrc = resolveImage(heroImage?.image ?? null);

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
              <span className="material-symbols-outlined text-[16px]">photo_library</span>
              Gallery
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              The people, the paperwork,
              <br />
              the{" "}
              <span className="relative inline-block text-secondary-fixed">
                goodbyes.
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
              Counselling sessions, education fairs, mock test days and departure mornings — photographed in our
              Kathmandu office and at the events where we meet students.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>Book a Free Session</span>
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
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">photo_library</span>
                {photoCount} photos
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 border border-surface/20 px-3 py-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">folder_open</span>
                {withPhotos.length} sections
              </span>
            </div>
          </div>

          {/* PHOTO */}
          <div className="lg:col-span-5 relative hidden md:block h-[420px]">
            <div className="relative h-full w-full max-w-[460px] lg:ml-auto rounded-3xl overflow-hidden shadow-2xl border border-surface/15 bg-surface/5">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt="Life at Bristi Educational Consultancy"
                  fill
                  sizes="(min-width:1024px) 460px, 0px"
                  className="object-cover"
                />
              ) : (
                <FallbackImage icon="photo_camera" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/95 px-6 py-5">
                <p className="font-display text-[1.35rem] font-bold text-surface leading-tight">
                  Real rooms, real students
                </p>
                <p className="text-[0.875rem] text-surface/85 mt-1">no stock photos, no retouching.</p>
              </div>
            </div>
            <div className="absolute left-0 lg:-left-6 -bottom-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xl px-5 py-4 rotate-[-4deg]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">photo_camera</span>
                </span>
                <div>
                  <p className="font-display font-bold text-on-surface text-[0.95rem]">Shot in Kathmandu</p>
                  <p className="text-[0.75rem] text-on-surface-variant">Office, events &amp; classrooms</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          {withPhotos.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-[56px] text-outline">photo_library</span>
              <p className="mt-4 text-on-surface-variant">
                Photos are being uploaded. Check back soon, or come and see us in the meantime.
              </p>
            </div>
          ) : (
            <>
              <nav aria-label="Gallery sections" className="flex flex-wrap gap-2 mb-14">
                {withPhotos.map((section) => (
                  <a
                    key={section.id}
                    href={`#gallery-${section.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-outline-variant/60 bg-surface-container-lowest px-4 py-2 text-[0.875rem] font-semibold text-on-surface hover:border-secondary hover:text-secondary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px] text-secondary">
                      {section.icon || "photo"}
                    </span>
                    {section.name}
                    <span className="text-[0.75rem] text-on-surface-variant">{section.images.length}</span>
                  </a>
                ))}
              </nav>

              <div className="space-y-20 md:space-y-28">
                {withPhotos.map((section, index) => (
                  <GalleryBlock key={section.id} section={section} index={index} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CTABanner imageSrc={heroImageSrc} />
    </>
  );
}

function GalleryBlock({ section, index }: { section: GallerySection; index: number }) {
  const isGreen = index % 2 === 1;

  return (
    <Reveal>
      <div id={`gallery-${section.slug}`} className="scroll-mt-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
          <div className="max-w-2xl">
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[0.75rem] font-bold uppercase tracking-wider mb-3 ${
                isGreen ? "bg-secondary/10 text-secondary" : "bg-primary-container/10 text-primary-container"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{section.icon || "photo"}</span>
              {section.name}
            </span>
            <h2 className="font-display text-[2rem] md:text-[2.5rem] leading-[2.4rem] md:leading-[3rem] font-bold tracking-[-0.02em] text-on-surface">
              {section.name}
            </h2>
            {section.description ? (
              <div className="mt-3 space-y-3">
                {paragraphs(section.description).map((paragraph, i) => (
                  <p key={i} className="text-[1rem] leading-[1.75rem] text-on-surface-variant">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}
          </div>
          <p className="text-[0.8125rem] font-bold uppercase tracking-wider text-on-surface-variant shrink-0">
            {section.images.length} {section.images.length === 1 ? "photo" : "photos"}
          </p>
        </div>

        <GalleryLightbox images={section.images} />
      </div>
    </Reveal>
  );
}
