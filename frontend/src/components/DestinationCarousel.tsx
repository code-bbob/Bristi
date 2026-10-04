"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type Ref,
} from "react";

import type { Country } from "@/lib/types";
import { flagUrl, resolveImage } from "@/lib/utils";

export interface DestinationCarouselHandle {
  scrollToIndex: (index: number) => void;
}

export default function DestinationCarousel({
  countries,
  onCenterChange,
  compact = false,
  loop = false,
  className = "",
  ref,
}: {
  countries: Country[];
  onCenterChange?: (index: number) => void;
  compact?: boolean;
  loop?: boolean;
  className?: string;
  ref?: Ref<DestinationCarouselHandle>;
}) {
  const router = useRouter();
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRaf = useRef(0);
  const settleTimer = useRef(0);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });
  const suppressClick = useRef(false);
  const initialized = useRef(false);
  const [dragging, setDragging] = useState(false);

  const count = countries.length;
  const items = loop ? [...countries, ...countries] : countries;

  const findCenterIndex = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < el.children.length; i++) {
      const child = el.children[i] as HTMLElement;
      const c = child.offsetLeft + child.offsetWidth / 2;
      const diff = Math.abs(c - center);
      if (diff < bestDiff) {
        bestDiff = diff;
        best = i;
      }
    }
    return best;
  };

  const syncFromScroll = () => {
    const i = findCenterIndex();
    onCenterChange?.(loop && count > 0 ? i % count : i);
  };

  const rewrap = () => {
    const el = trackRef.current;
    if (!loop || !el || count === 0) return;
    const idx = findCenterIndex();
    if (idx === 0 || idx === count * 2 - 1) {
      const child = el.children[idx] as HTMLElement | undefined;
      if (!child) return;
      el.scrollTo({ left: child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2, behavior: "instant" });
    }
  };

  const handleScroll = () => {
    if (scrollRaf.current) return;
    scrollRaf.current = requestAnimationFrame(() => {
      scrollRaf.current = 0;
      syncFromScroll();
    });
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(rewrap, 180);
  };

  const scrollToIndex = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const child = (loop ? el.children[count + index] : el.children[index]) as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: Math.min(Math.max(target, 0), max), behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({ scrollToIndex }));

  useEffect(() => {
    if (!loop || initialized.current || count === 0) return;
    initialized.current = true;
    const raf = requestAnimationFrame(() => {
      const el = trackRef.current;
      const child = el?.children[count] as HTMLElement | undefined;
      if (!el || !child) return;
      el.scrollTo({ left: child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2, behavior: "instant" });
    });
    return () => cancelAnimationFrame(raf);
  }, [loop, count]);

  useEffect(() => {
    return () => window.clearTimeout(settleTimer.current);
  }, []);

  const go = (slug: string) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    router.push(`/destinations/${slug}`);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current?.scrollLeft ?? 0, moved: 0 };
    trackRef.current?.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d.active || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 6) d.moved = 6;
    if (d.moved) trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const onPointerUp = () => {
    if (drag.current.moved) suppressClick.current = true;
    drag.current.active = false;
    setDragging(false);
  };

  const onPointerCancel = () => {
    drag.current.active = false;
    setDragging(false);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        className={`flex items-center gap-7 overflow-x-auto scrollbar-hide snap-x snap-mandatory select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ height: compact ? "400px" : "460px", scrollbarWidth: "none" }}
      >
        {items.map((country, i) => {
          const imageSrc = resolveImage(country.image);
          const flagSrc = flagUrl(country.flag_emoji ?? "");
          const clone = loop && i >= count;
          return (
            <div
              key={`${country.id}-${i}`}
              role="button"
              tabIndex={clone ? -1 : 0}
              draggable={false}
              onClick={() => go(country.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  go(country.slug);
                }
              }}
              aria-hidden={clone ? "true" : undefined}
              className="snap-start shrink-0 w-[calc(100vw-3rem)] sm:w-[420px] relative rounded-3xl overflow-hidden shadow-2xl group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{ height: compact ? "380px" : "440px" }}
              aria-label={clone ? undefined : `Explore ${country.name}`}
            >
              {imageSrc ? (
                <Image
                  alt={country.name}
                  draggable={false}
                  fill
                  sizes="420px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  src={imageSrc}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/25 text-[96px]">public</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute top-5 left-5 drop-shadow-lg">
                {flagSrc ? (
                  <Image
                    src={flagSrc}
                    alt={`${country.name} flag`}
                    width={40}
                    height={30}
                    className="inline-block object-cover rounded-sm"
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                  />
                ) : (
                  <span className="flex h-[30px] w-10 items-center justify-center rounded-sm bg-black/50 text-sm backdrop-blur-sm">
                    {country.flag_emoji || "🌍"}
                  </span>
                )}
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-1">{country.name}</h3>
                <p className="text-sm text-white/70 line-clamp-2">{country.tagline || country.description}</p>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/90 font-medium group-hover:gap-3 transition-all">
                  Explore
                  <span className="material-symbols-outlined text-[16px]">east</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}