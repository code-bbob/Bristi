import Image from "next/image";
import Link from "next/link";

import FallbackImage from "@/components/FallbackImage";
import { Reveal } from "@/components/motion";
import { CONTACT_INFO } from "@/components/ui";
import { getBlogs } from "@/lib/api";
import type { BlogPost } from "@/lib/types";
import { formatDate, resolveImage } from "@/lib/utils";

export const metadata = {
  title: "Blogs & News",
};

const tagClass = (i: number) =>
  i % 3 === 0
    ? "bg-primary/10 text-primary"
    : i % 3 === 1
      ? "bg-secondary/10 text-secondary"
      : "bg-surface-container-high text-on-surface-variant";

function firstTag(tags: string): string {
  return (tags && tags.split(",")[0]?.trim()) || "Article";
}

function FeaturedStory({ blog }: { blog: BlogPost }) {
  const imageSrc = resolveImage(blog.cover_image);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
      <div className="lg:col-span-7 relative rounded-[1.75rem] overflow-hidden min-h-[20rem] border border-outline-variant/50 shadow-xl">
        {imageSrc ? (
          <Image src={imageSrc} alt={blog.title} fill sizes="(min-width:1024px) 800px, 100vw" className="object-cover" />
        ) : (
          <FallbackImage icon="article" className="w-full h-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/10 to-transparent" />
        <div className="absolute top-5 left-5 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/90 backdrop-blur px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider text-on-surface">
            <span className="material-symbols-outlined text-[15px]">star</span>
            Cover story
          </span>
          <span className={`rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${tagClass(0)}`}>
            {firstTag(blog.tags)}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
          <p className="text-[0.78rem] font-semibold text-surface/80">
            {blog.published_at ? formatDate(blog.published_at) : ""} · {blog.author || "Bristi Team"}
          </p>
          <h2 className="mt-2 font-display text-[1.75rem] md:text-[2.5rem] leading-[1.15] font-bold tracking-[-0.02em] text-surface max-w-2xl">
            {blog.title}
          </h2>
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center">
        <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary" />
          From the desk
        </span>
        <p className="mt-4 text-[1.0625rem] leading-[1.85rem] text-on-surface-variant">{blog.excerpt}</p>
        <Link
          href={`/blogs/${blog.slug}`}
          className="mt-7 inline-flex items-center gap-2 font-display font-semibold text-[0.95rem] text-primary hover:text-primary-container transition-colors group self-start"
        >
          <span>Read the full story</span>
          <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1.5 transition-transform">east</span>
        </Link>
      </div>
    </div>
  );
}

function ContentsRow({ blog, index }: { blog: BlogPost; index: number }) {
  const imageSrc = resolveImage(blog.cover_image);
  const number = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={(index % 2) * 80}>
      <Link
        href={`/blogs/${blog.slug}`}
        className="group grid grid-cols-[3.5rem_1fr] md:grid-cols-[4.5rem_1fr_auto] items-stretch gap-4 md:gap-8 py-6 md:py-7 border-b border-outline-variant/50 last:border-b-0 transition-colors"
      >
        <div className="relative hidden sm:block self-center">
          <span
            aria-hidden="true"
            className="font-display font-extrabold tracking-tighter leading-none text-on-surface/10 text-[3rem] md:text-[3.75rem] transition-colors duration-300 group-hover:text-secondary/60"
          >
            {number}
          </span>
        </div>

        <div className="min-w-0 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2 text-[0.72rem] font-bold uppercase tracking-wider">
            <span className={tagClass(index)}>{firstTag(blog.tags)}</span>
            <span className="inline-flex items-center gap-1 text-on-surface-variant font-semibold">
              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
              {blog.published_at ? formatDate(blog.published_at) : "TBA"}
            </span>
            <span className="text-on-surface-variant">· {blog.author || "Bristi Team"}</span>
          </div>
          <h3 className="mt-2 font-display text-[1.375rem] md:text-[1.75rem] leading-snug font-bold tracking-[-0.01em] text-on-surface transition-colors duration-300 group-hover:text-primary">
            {blog.title}
          </h3>
          <p className="mt-2 text-[0.9375rem] leading-[1.6rem] text-on-surface-variant line-clamp-2 max-w-3xl">
            {blog.excerpt}
          </p>
        </div>

        <div className="hidden md:block relative self-center w-40 h-28 rounded-xl overflow-hidden border border-outline-variant/40 shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={blog.title}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <span className="absolute inset-0 bg-gradient-to-br from-primary via-primary-container to-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-white/30 text-[40px]">article</span>
            </span>
          )}
        </div>
      </Link>
    </Reveal>
  );
}

export default async function BlogsPage() {
  const blogs = await getBlogs();
  const [featured, ...rest] = blogs;
  const heroImageSrc = resolveImage(featured?.cover_image ?? null);

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
              <span className="material-symbols-outlined text-[16px]">newspaper</span>
              The Bristi Journal
            </span>
            <h1 className="font-display text-[2.75rem] md:text-[4.25rem] leading-[1.05] font-bold tracking-[-0.03em] text-surface mt-5">
              Field notes from
              <br />
              <span className="relative inline-block text-secondary-fixed">
                studying abroad.
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
              Guides, digests and honest explainers written by our counsellors for Nepali students — visas, test
              prep, intakes and every question you didn&apos;t know to ask yet.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                href={featured ? `/blogs/${featured.slug}` : "/contact"}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary hover:bg-on-secondary-container font-semibold px-7 py-4 rounded-xl shadow-lg hover:shadow-xl transition-colors"
              >
                <span>{featured ? "Read the Cover Story" : "Talk to a Counsellor"}</span>
                <span className="material-symbols-outlined text-[20px]">{featured ? "article" : "calendar_today"}</span>
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
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">history_edu</span>
                {blogs.length} stories in the archive
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 border border-surface/20 px-3 py-1.5">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">menu_book</span>
                Guides &amp; explainers
              </span>
            </div>
          </div>

          {/* PHOTO */}
          <div className="lg:col-span-5 relative hidden md:block h-[420px]">
            <div className="relative h-full w-full max-w-[460px] lg:ml-auto rounded-3xl overflow-hidden shadow-2xl border border-surface/15 bg-surface/5">
              {heroImageSrc ? (
                <Image
                  src={heroImageSrc}
                  alt="The Bristi Journal — studying abroad guides"
                  fill
                  sizes="(min-width:1024px) 460px, 0px"
                  className="object-cover"
                />
              ) : (
                <FallbackImage icon="article" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 bg-primary/95 px-6 py-5">
                <p className="font-display text-[1.35rem] font-bold text-surface leading-tight">
                  Numerous guides published
                </p>
                <p className="text-[0.875rem] text-surface/85 mt-1">by counsellors who have done the paperwork.</p>
              </div>
            </div>
            <div className="absolute left-0 lg:-left-6 -bottom-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/60 shadow-xl px-5 py-4 rotate-[-4deg]">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">menu_book</span>
                </span>
                <div>
                  <p className="font-display font-bold text-on-surface text-[0.95rem]">The Bristi Journal</p>
                  <p className="text-[0.75rem] text-on-surface-variant">Visas, tests, intakes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED STORY */}
      {featured ? (
        <section className="py-16 md:py-20 bg-surface">
          <div className="max-w-[1600px] mx-auto px-6 md:px-8">
            <FeaturedStory blog={featured} />
          </div>
        </section>
      ) : null}

      {/* TABLE OF CONTENTS */}
      <section className="py-10 md:py-16 bg-gradient-to-b from-surface to-surface-container-low/40">
        <div className="max-w-[1600px] mx-auto px-6 md:px-8">
          {rest.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 font-display font-bold text-[1.125rem] text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary">format_list_numbered</span>
                  In this issue
                </span>
                <span className="text-[0.78rem] font-semibold uppercase tracking-wider text-on-surface-variant">
                  {rest.length} more stories
                </span>
              </div>
              <div className="relative">
                {rest.map((blog, i) => (
                  <ContentsRow key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            </>
          ) : null}

          {blogs.length === 0 ? (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-[56px] text-outline">menu_book</span>
              <p className="mt-4 text-on-surface-variant">Stories are being written. Check back soon.</p>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}