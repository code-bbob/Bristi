"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import FallbackImage from "@/components/FallbackImage";
import type { GalleryImage } from "@/lib/types";
import { resolveImage } from "@/lib/utils";

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  if (images.length === 0) return null;

  const active = openIndex === null ? null : images[openIndex];
  const activeSrc = active ? resolveImage(active.image) : "";

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => {
          const src = resolveImage(image.image);
          return (
            <button
              key={image.id}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden border border-outline-variant/50 bg-surface-container-low shadow-sm hover:shadow-xl transition-shadow duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={image.title ? `View photo: ${image.title}` : "View photo"}
            >
              {src ? (
                <Image
                  src={src}
                  alt={image.title || "Bristi gallery photo"}
                  fill
                  sizes="(min-width:768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <FallbackImage icon="photo_camera" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-3 left-3 right-3 text-left text-[0.8rem] font-semibold text-surface opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {image.title}
              </span>
            </button>
          );
        })}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title || "Gallery photo"}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4 md:p-10"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-surface/10 border border-surface/20 text-surface flex items-center justify-center hover:bg-surface/20 transition-colors"
            aria-label="Close photo viewer"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(-1);
            }}
            className="absolute left-2 md:left-6 w-11 h-11 rounded-full bg-surface/10 border border-surface/20 text-surface flex items-center justify-center hover:bg-surface/20 transition-colors"
            aria-label="Previous photo"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </button>

          <figure className="relative max-w-5xl w-full" onClick={(event) => event.stopPropagation()}>
            <div className="relative w-full max-h-[75vh] aspect-[4/3] rounded-2xl overflow-hidden border border-surface/15">
              {activeSrc ? (
                <Image
                  src={activeSrc}
                  alt={active.title || "Bristi gallery photo"}
                  fill
                  sizes="(min-width:1024px) 1024px, 100vw"
                  className="object-contain"
                />
              ) : (
                <FallbackImage icon="photo_camera" className="w-full h-full" />
              )}
            </div>
            <figcaption className="mt-4 flex items-center justify-between gap-4 text-surface">
              <span className="font-display font-semibold text-[0.95rem]">{active.title}</span>
              <span className="text-[0.8rem] text-surface/70">
                {(openIndex ?? 0) + 1} / {images.length}
              </span>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              step(1);
            }}
            className="absolute right-2 md:right-6 w-11 h-11 rounded-full bg-surface/10 border border-surface/20 text-surface flex items-center justify-center hover:bg-surface/20 transition-colors"
            aria-label="Next photo"
          >
            <span className="material-symbols-outlined text-[24px]">chevron_right</span>
          </button>
        </div>
      ) : null}
    </>
  );
}
