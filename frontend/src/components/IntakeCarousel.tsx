"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import type { Intake } from "@/lib/types";

const SPEED_PX_PER_SEC = 55;
const DRAG_THRESHOLD = 6;

const mod = (v: number, m: number) => ((v % m) + m) % m;

function IntakeCard({ it }: { it: Intake }) {
  return (
    <Link
      href={`/destinations/${it.country_slug}`}
      draggable={false}
      className="group/item flex items-center gap-3 rounded-xl p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-fixed focus-visible:ring-offset-0"
      aria-label={`${it.intake} intake in ${it.country_name}`}
    >
      <span className="w-11 h-11 shrink-0 rounded-lg bg-surface/10 backdrop-blur-sm border border-surface/20 flex items-center justify-center text-[22px] leading-none">
        {it.country_flag || "🌍"}
      </span>
      <div className="min-w-0">
        <p className="font-display text-[1.35rem] leading-tight font-bold text-surface group-hover/item:text-secondary-fixed transition-colors duration-300">
          {it.intake}
        </p>
        <p className="text-[0.75rem] text-surface/85 truncate">
          {it.country_name}
          {it.deadline ? ` · ${it.deadline}` : ""}
        </p>
      </div>
    </Link>
  );
}

export default function IntakeCarousel({ intakes }: { intakes: Intake[] }) {
  const sorted = [...intakes].sort((a, b) =>
    (a.start_date ?? "9999").localeCompare(b.start_date ?? "9999"),
  );
  const count = sorted.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const pausedRef = useRef(false);
  const hoveringRef = useRef(false);
  const drag = useRef({ active: false, startX: 0, startPos: 0, moved: 0 });
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    const set = setRef.current;
    if (!track || !set || count === 0) return;

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
      }
      if (widthRef.current > 0 && track) {
        track.style.transform = `translate3d(${-mod(posRef.current, widthRef.current)}px, 0, 0)`;
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

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    drag.current = { active: true, startX: e.clientX, startPos: posRef.current, moved: 0 };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* capture may already be lost */
    }
    pausedRef.current = true;
    setDragging(true);
  };

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const track = trackRef.current;
    if (!d.active || !track || widthRef.current <= 0) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > DRAG_THRESHOLD) {
      d.moved = DRAG_THRESHOLD;
      e.preventDefault();
    }
    if (d.moved) {
      posRef.current = d.startPos - dx;
      track.style.transform = `translate3d(${-mod(posRef.current, widthRef.current)}px, 0, 0)`;
    }
  };

  const endDrag = () => {
    const d = drag.current;
    if (d.moved) suppressClick.current = true;
    d.active = false;
    pausedRef.current = hoveringRef.current;
    setDragging(false);
  };

  return (
    <section className="relative overflow-hidden hidden md:block" id="intakes">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-primary/95" />
      </div>
      <div className="relative flex max-w-[1600px] mx-auto px-6 md:px-8 py-12 md:py-14">
        <div className="">
          <h2 className="font-display whitespace-nowrap mr-8 text-[1.5rem] md:text-[2rem] font-bold tracking-[-0.02em] text-surface">
            Next Intakes
          </h2>
        </div>

        <div
          className="relative"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={(e) => {
            if (suppressClick.current) {
              e.preventDefault();
              e.stopPropagation();
              suppressClick.current = false;
            }
          }}
          onMouseEnter={() => {
            hoveringRef.current = true;
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            hoveringRef.current = false;
            pausedRef.current = false;
          }}
        >
          <div className={`overflow-hidden select-none ${dragging ? "cursor-grabbing" : "cursor-grab"}`} style={{ touchAction: "pan-y" }}>
            <div ref={trackRef} className="flex w-max will-change-transform">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  ref={copy === 0 ? setRef : undefined}
                  aria-hidden={copy === 1 ? "true" : undefined}
                  className="flex shrink-0"
                >
                  {sorted.map((it) => (
                    <div
                      key={`${copy}-${it.id}`}
                      className="w-[300px] sm:w-[340px] shrink-0 flex items-center"
                      style={{ paddingRight: "28px" }}
                    >
                      <IntakeCard it={it} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
