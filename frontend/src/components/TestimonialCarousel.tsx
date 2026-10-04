"use client";

import { useEffect, useRef, useState } from "react";

import type { Testimonial } from "@/lib/types";
import { initials } from "@/lib/utils";

const SPEED_PX_PER_SEC = 70;
const TWEEN_MS = 480;

const mod = (v: number, m: number) => ((v % m) + m) % m;

function TestimonialCard({ t, index }: { t: Testimonial; index: number }) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/60 shadow-sm flex flex-col justify-between h-full relative overflow-hidden">
      <div
        className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full pointer-events-none ${
          index % 2 === 0 ? "bg-primary-container/5" : "bg-secondary/5"
        }`}
      />
      <div>
        <div className="flex items-center gap-1 text-secondary mb-4">
          {Array.from({ length: t.rating }).map((_, s) => (
            <span key={s} className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
          ))}
        </div>
        <p className="text-[1rem] italic leading-relaxed text-on-surface">&ldquo;{t.quote}&rdquo;</p>
      </div>
      <div className="pt-6 mt-6 border-t border-outline-variant/30 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-lg">
          {initials(t.name)}
        </div>
        <div>
          <h4 className="font-display text-[1.25rem] font-semibold text-on-surface">{t.name}</h4>
          <p className="text-[0.875rem] text-on-surface-variant">{t.university}, {t.destination}</p>
          <span className="text-[0.6875rem] text-primary font-semibold">{t.course}</span>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const count = testimonials.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const stepRef = useRef(0);
  const pausedRef = useRef(false);
  const tweenRef = useRef<{ from: number; to: number; startedAt: number; duration: number } | null>(null);
  const [hovered, setHovered] = useState(false);

  const nudge = (dir: 1 | -1) => {
    const W = widthRef.current;
    const step = stepRef.current;
    if (W <= 0 || step <= 0) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    tweenRef.current = {
      from: posRef.current,
      to: posRef.current + dir * step,
      startedAt: performance.now(),
      duration: reduced ? 0 : TWEEN_MS,
    };
  };

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set || count === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      widthRef.current = set.offsetWidth;
      const first = set.firstElementChild as HTMLElement | null;
      stepRef.current = first ? first.offsetWidth : widthRef.current;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(set);

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.064);
      last = now;
      const W = widthRef.current;

      const tw = tweenRef.current;
      if (tw) {
        const p = tw.duration <= 0 ? 1 : Math.min((now - tw.startedAt) / tw.duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        posRef.current = tw.from + (tw.to - tw.from) * eased;
        if (p >= 1) {
          posRef.current = W > 0 ? mod(posRef.current, W) : 0;
          tweenRef.current = null;
        }
      } else if (!pausedRef.current && !reduced && W > 0) {
        posRef.current += SPEED_PX_PER_SEC * dt;
      }

      if (W > 0) {
        track.style.transform = `translate3d(${-mod(posRef.current, W)}px, 0, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [count]);

  if (count === 0) return null;

  return (
    <div
      className="group relative"
      onMouseEnter={() => {
        pausedRef.current = true;
        setHovered(true);
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
        setHovered(false);
      }}
    >
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex w-max will-change-transform select-none">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              ref={copy === 0 ? setRef : undefined}
              aria-hidden={copy === 1 ? "true" : undefined}
              className="flex"
            >
              {testimonials.map((t, i) => (
                <div
                  key={`${copy}-${t.id}`}
                  className="w-[300px] sm:w-[360px] md:w-[410px] shrink-0 pr-6 md:pr-8 h-full"
                >
                  <TestimonialCard t={t} index={i} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous testimonial"
            className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-outline-variant/60 bg-surface-container-lowest/95 shadow-md flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-colors ${
              hovered ? "opacity-100" : "opacity-70"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next testimonial"
            className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-outline-variant/60 bg-surface-container-lowest/95 shadow-md flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-colors ${
              hovered ? "opacity-100" : "opacity-70"
            } focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </>
      )}
    </div>
  );
}
