"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

import DestinationCarousel, { type DestinationCarouselHandle } from "@/components/DestinationCarousel";
import { Reveal } from "@/components/motion";
import type { Country } from "@/lib/types";
import { flagUrl, resolveImage } from "@/lib/utils";

export default function DestinationsExplorer({ countries }: { countries: Country[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<DestinationCarouselHandle>(null);

  if (countries.length === 0) {
    return (
      <section className="py-24 text-center">
        <p className="text-on-surface-variant">Destination details are being updated. Contact us for the latest list.</p>
      </section>
    );
  }

  const active = countries[activeIndex] ?? countries[0];
  const heroWords = "Choose Your Destination".split(" ");
  const heroImageSrc = resolveImage(active.image);
  const activeFlagSrc = flagUrl(active.flag_emoji ?? "");

  const selectCountry = (i: number) => {
    setActiveIndex(i);
    carouselRef.current?.scrollToIndex(i);
  };

  return (
    <main className="min-h-screen bg-surface overflow-hidden relative z-0">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary-fixed/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] right-[5%] w-[350px] h-[350px] bg-secondary-fixed/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[20%] left-[20%] w-[300px] h-[300px] bg-primary-fixed/10 rounded-full blur-[80px]" />
        <div className="absolute top-[60%] right-[30%] w-[250px] h-[250px] bg-secondary-fixed/15 rounded-full blur-[80px]" />
        <div className="absolute bottom-40 right-[10%] w-[200px] h-[200px] bg-primary-fixed/10 rounded-full blur-[60px]" />
      </div>

      {/* HERO */}
      <section className="relative max-w-[1600px] mx-auto px-6 md:px-8 pt-16 md:pt-24 pb-10 md:pb-16 my-4 md:my-10">
        <div className="flex gap-12 items-center">
          <div className="min-w-0">
            <div className="rise-in" style={{ animationDelay: "0.05s" }}>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-on-surface mb-4 tracking-[-0.02em]">
                {heroWords.reduce<ReactNode[]>((nodes, word, i) => {
                  if (i > 0) nodes.push(" ");
                  nodes.push(
                    <span
                      key={`${word}-${i}`}
                      className="word-in inline-block"
                      style={{ animationDelay: `${0.1 + i * 0.12}s` }}
                    >
                      {word}
                    </span>
                  );
                  return nodes;
                }, [])}
              </h1>
            </div>
            <div className="rise-in" style={{ animationDelay: "0.55s" }}>
              <p className="text-lg text-on-surface-variant max-w-2xl">
                Explore detailed information about the world&apos;s top study destinations, from universities to visa
                requirements.
              </p>
            </div>
          </div>

          <div className="hidden lg:block relative group shrink-0 ml-auto">
            <div className="relative aspect-[4/3] w-80 rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
              <div key={activeIndex} className="fade-in absolute inset-0">
                {heroImageSrc ? (
                  <Image
                    alt={`${active.name} study destinations`}
                    fill
                    sizes="400px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    src={heroImageSrc}
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/25 text-[72px]">public</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-surface-container-lowest rounded-2xl shadow-xl p-4 border border-outline-variant/60 pop-in" style={{ animationDelay: "1s" }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">public</span>
                </div>
                <div>
                  <p className="text-on-surface font-bold text-lg leading-tight">{countries.length}</p>
                  <p className="text-on-surface-variant text-xs">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAROUSEL */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-8">
        <DestinationCarousel countries={countries} onCenterChange={setActiveIndex} ref={carouselRef} loop />
      </div>

      {/* FEATURED / SELECTOR */}
      <section className="relative max-w-[1600px] mx-auto px-6 md:px-8 mt-10 mb-20">
        <Reveal delay={100}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2 flex items-center gap-3">
                {activeFlagSrc ? (
                  <Image
                    src={activeFlagSrc}
                    alt={`${active.name} flag`}
                    width={37}
                    height={28}
                    className="inline-block object-cover rounded-sm"
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary text-[28px]">public</span>
                )}
                {active.name}
              </h2>
              <p className="text-on-surface-variant max-w-xl text-lg">{active.tagline}</p>
            </div>
            <Link
              href={`/destinations/${active.slug}`}
              className="inline-flex items-center gap-2 bg-secondary text-white px-7 py-3.5 rounded-full font-semibold hover:bg-secondary hover:brightness-110 transition shrink-0 text-sm shadow-lg shadow-secondary/20"
            >
              Explore {active.name}
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            {countries.map((country, i) => {
              const flagSrc = flagUrl(country.flag_emoji ?? "");
              return (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => selectCountry(i)}
                  aria-label={`${country.name} flag`}
                  aria-pressed={i === activeIndex}
                  className={`relative p-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "ring-2 ring-primary bg-primary/10 scale-110"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  {flagSrc ? (
                    <Image
                      src={flagSrc}
                      alt=""
                      width={29}
                      height={22}
                      className="inline-block object-cover rounded-sm"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span className="flex h-[22px] w-[29px] items-center justify-center rounded-sm bg-primary-container/40 text-primary">
                      <span className="material-symbols-outlined text-[18px]">public</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>
      </section>
    </main>
  );
}