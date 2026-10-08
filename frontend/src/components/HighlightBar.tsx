"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { API_URL } from "@/lib/api";
import type { Highlight } from "@/lib/types";

const SPEED_PX_PER_SEC = 55;

const mod = (v: number, m: number) => ((v % m) + m) % m;

function HighlightItem({ h }: { h: Highlight }) {
  const inner = (
    <>
      <span className="material-symbols-outlined text-[12px] sm:text-[14px] shrink-0 text-secondary">
        bolt
      </span>
      <span>{h.text}</span>
      {h.link && (
        <span className="material-symbols-outlined text-[14px] shrink-0 opacity-70 group-hover/item:translate-x-0.5 transition-transform duration-300">
          east
        </span>
      )}
    </>
  );

  const classes =
    "group/item inline-flex items-center gap-1.5 sm:gap-2 text-[0.75rem] sm:text-[0.875rem] text-primary-container font-bold whitespace-nowrap transition-opacity duration-300 hover:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded";

  return h.link ? (
    <Link href={h.link} className={classes}>
      {inner}
    </Link>
  ) : (
    <span className={classes}>{inner}</span>
  );
}

export default function HighlightBar() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`${API_URL}/api/highlights/?is_active=true`)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled && Array.isArray(data?.results)) setHighlights(data.results);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set || highlights.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      widthRef.current = set.offsetWidth;
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
      if (W > 0 && !pausedRef.current && !reduced) {
        posRef.current += SPEED_PX_PER_SEC * dt;
        track.style.transform = `translate3d(${-mod(posRef.current, W)}px, 0, 0)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [highlights.length]);

  if (highlights.length === 0) return null;

  return (
    <div className="bg-surface-container-lowest text-on-surface border-b border-outline-variant/50">
<div className="flex items-stretch max-w-[1600px] mx-auto ">

      <div className="shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-1.5 sm:py-2 border-r border-outline-variant/50">
        <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-secondary">bolt</span>
        <span className="font-display text-red-500 font-bold text-[0.6875rem] sm:text-[0.8125rem] uppercase tracking-[0.12em] text-on-surface-variant">
          Highlights
        </span>
      </div>
      <div
        className="relative flex-1 overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
        }}
        onFocus={() => {
          pausedRef.current = true;
        }}
        onBlur={() => {
          pausedRef.current = false;
        }}
      >
        <div aria-hidden="true" className="overflow-hidden">
          <div ref={trackRef} className="flex w-max will-change-transform items-center py-1 sm:py-2 pr-6">
            {[0, 1].map((copy) => (
              <div key={copy} ref={copy === 0 ? setRef : undefined} className="flex shrink-0">
                {highlights.map((h) => (
                  <div
                    key={`${copy}-${h.id}`}
                    className="flex items-center shrink-0"
                    style={{ paddingRight: "16px" }}
                  >
                    <HighlightItem h={h} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="sr-only">
        <ul>
          {highlights.map((h) => (
            <li key={h.id}>{h.text}{h.link ? ` (${h.link})` : ""}</li>
          ))}
        </ul>
      </div>
    </div>
</div>
  );
}
