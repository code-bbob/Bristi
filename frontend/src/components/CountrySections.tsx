import type { ReactNode } from "react";
import Image from "next/image";

import { Reveal } from "@/components/motion";
import type { CountrySection } from "@/lib/types";
import { paragraphs, resolveImage } from "@/lib/utils";

const STYLE_EYEBROW: Record<CountrySection["style"], string> = {
  text: "Explore",
  facts: "At a Glance",
  list: "Good to Know",
  steps: "Step by Step",
  table: "Key Details",
  banner: "",
};

function SectionTitle({
  heading,
  eyebrow,
  light = false,
}: {
  heading: string;
  eyebrow: string;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.18em] text-secondary mb-3">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-display text-[2rem] md:text-[2.5rem] leading-tight font-bold tracking-[-0.02em] ${
          light ? "text-white" : "text-on-surface"
        }`}
      >
        {heading}
      </h2>
      <div className={`mt-3 h-1.5 w-16 rounded-full ${light ? "bg-white/70" : "bg-secondary"}`} />
    </div>
  );
}

function TextSection({
  section,
  flip,
}: {
  section: CountrySection;
  flip: boolean;
}) {
  const imageSrc = resolveImage(section.image);
  const copy = (
    <div className="space-y-5">
      <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.text} />
      {paragraphs(section.body).map((p, i) => (
        <p key={i} className="text-[1rem] leading-[1.8rem] text-on-surface-variant">
          {p}
        </p>
      ))}
    </div>
  );
  const image = imageSrc ? (
    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-outline-variant/40 bg-surface-container-lowest">
      <Image
        className="w-full aspect-[5/3] object-cover"
        src={imageSrc}
        alt={section.heading}
        width={960}
        height={576}
      />
    </div>
  ) : null;

  if (!image) {
    return (
      <div className="max-w-4xl space-y-5">
        <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.text} />
        {paragraphs(section.body).map((p, i) => (
          <p key={i} className="text-[1rem] leading-[1.8rem] text-on-surface-variant">
            {p}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
      <div className={flip ? "lg:order-2" : ""}>{copy}</div>
      <div className={flip ? "lg:order-1" : ""}>{image}</div>
    </div>
  );
}

function FactsSection({ section }: { section: CountrySection }) {
  return (
    <div>
      <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.facts} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {section.rows.map((row) => (
          <div
            key={row.label}
            className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-sm p-6"
          >
            <p className="text-[1.25rem] leading-snug font-bold text-primary">{row.value}</p>
            <p className="text-[0.72rem] font-bold uppercase tracking-wider text-on-surface-variant mt-2">
              {row.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListSection({ section }: { section: CountrySection }) {
  const cols = section.items.length > 5 ? "md:grid-cols-2" : "md:grid-cols-1";
  return (
    <div>
      <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.list} />
      <ul className={`grid grid-cols-1 ${cols} gap-x-10 gap-y-3.5 mt-10`}>
        {section.items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[1rem] leading-relaxed text-on-surface-variant">
            <span
              className="material-symbols-outlined text-secondary text-[20px] mt-0.5 shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepsSection({ section }: { section: CountrySection }) {
  return (
    <div>
      <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.steps} />
      <ol className="mt-10 space-y-5">
        {section.items.map((item, i) => (
          <li key={item} className="flex items-start gap-4">
            <span className="shrink-0 w-11 h-11 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center justify-center font-display text-[1.125rem] font-bold">
              {i + 1}
            </span>
            <p className="pt-2.5 text-[1rem] leading-relaxed text-on-surface-variant">{item}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TableSection({ section }: { section: CountrySection }) {
  return (
    <div>
      <SectionTitle heading={section.heading} eyebrow={STYLE_EYEBROW.table} />
      <div className="mt-10 overflow-x-auto rounded-2xl border border-outline-variant/60 shadow-sm">
        <table className="w-full text-left bg-surface-container-lowest">
          <tbody>
            {section.rows.map((row, i) => (
              <tr key={`${row.label}-${i}`} className={i % 2 === 1 ? "bg-surface-container-low/50" : undefined}>
                <td className="px-5 py-4 md:min-w-[280px] font-semibold text-on-surface text-[0.95rem]">
                  {row.label}
                </td>
                <td className="px-5 py-4 text-on-surface-variant text-[0.95rem] leading-relaxed">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BannerSection({ section }: { section: CountrySection }) {
  const imageSrc = resolveImage(section.image);
  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[320px] flex items-center">
      {imageSrc ? (
        <Image src={imageSrc} alt={section.heading} fill sizes="100vw" className="object-cover" />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/75 to-primary/35" />
      <div className="relative z-10 max-w-2xl px-8 py-14 md:px-14">
        <SectionTitle heading={section.heading} eyebrow="" light />
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/90">{section.body}</p>
        <a
          href="#enquire"
          className="inline-flex items-center gap-2 mt-7 bg-white text-primary font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          Talk to an Expert
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </a>
      </div>
    </div>
  );
}

export default function CountrySections({ sections }: { sections: CountrySection[] }) {
  const sorted = [...sections].sort((a, b) => a.order - b.order);
  return (
    <>
      {sorted.map((section, index) => {
        const even = index % 2 === 0;
        const bg = even ? "bg-surface" : "bg-surface-container-low/40";
        let content: ReactNode;
        if (section.style === "text") content = <TextSection section={section} flip={index % 2 === 1} />;
        else if (section.style === "facts") content = <FactsSection section={section} />;
        else if (section.style === "list") content = <ListSection section={section} />;
        else if (section.style === "steps") content = <StepsSection section={section} />;
        else if (section.style === "table") content = <TableSection section={section} />;
        else content = <BannerSection section={section} />;

        return (
          <Reveal key={section.id} className={`${bg} py-16 md:py-24`}>
            <div
              className={`max-w-[1600px] mx-auto px-6 md:px-8 ${
                section.style !== "text" ? "max-w-[1400px]" : ""
              }`}
            >
              {content}
            </div>
          </Reveal>
        );
      })}
    </>
  );
}