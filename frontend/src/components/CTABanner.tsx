import Image from "next/image";
import Link from "next/link";

import { CONTACT_INFO } from "./ui";

export default function CTABanner({ imageSrc = "" }: { imageSrc?: string }) {
  return (
    <section className="py-12 bg-surface">
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container text-on-primary p-10 md:p-14 shadow-xl">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(min-width:1600px) 1536px, 100vw"
              className="object-cover"
            />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60" />
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary/30 blur-2xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-primary/40 blur-xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3.5 py-1 rounded-full bg-surface-container-lowest/15 text-primary-fixed text-[0.75rem] font-semibold inline-block">
                Free Initial Assessment
              </span>
              <h2 className="font-display text-[2.25rem] leading-[2.75rem] font-bold text-on-primary leading-tight">
                Not Sure Where to Start?
              </h2>
              <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-primary-container max-w-2xl leading-relaxed">
                Tell us about your academic background and goals. Our counsellors can help you understand your
                options and map out a concrete pathway.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-6 py-3.5 rounded-xl shadow-md transition-colors text-center"
              >
                <span>Book Free Counselling</span>
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </Link>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-primary hover:bg-surface font-semibold px-6 py-3.5 rounded-xl shadow-md transition-colors text-center"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>{CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}