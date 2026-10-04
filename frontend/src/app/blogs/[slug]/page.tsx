import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import FallbackImage from "@/components/FallbackImage";
import { notFound } from "next/navigation";

import { getBlog, getBlogs } from "@/lib/api";
import { formatDate, paragraphs, resolveImage } from "@/lib/utils";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    const blog = await getBlog(slug);
    return { title: blog.title };
  } catch {
    return { title: "Blog" };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let blog;
  try {
    blog = await getBlog(slug);
  } catch {
    notFound();
  }
  const blogs = await getBlogs();
  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-16 pb-16 bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-8 relative">
          <nav className="text-[0.8125rem] text-on-surface-variant mb-6">
            <Link className="hover:text-primary" href="/blogs">Blogs</Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium">Article</span>
          </nav>
          <div className="flex items-center gap-3 text-[0.8125rem] text-on-surface-variant mb-4">
            <span className="inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
              {blog.published_at ? formatDate(blog.published_at) : ""}
            </span>
            <span>•</span>
            <span>{blog.author || "Bristi Team"}</span>
          </div>
          <h1 className="font-display text-[2rem] md:text-[2.75rem] leading-[2.5rem] md:leading-[3.25rem] font-bold tracking-[-0.02em] text-on-surface">
            {blog.title}
          </h1>
          <p className="font-body-lg text-[1.125rem] leading-[1.75rem] text-on-surface-variant mt-4">{blog.excerpt}</p>
        </div>
      </section>

      <section className="pb-20 bg-surface">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-outline-variant/40 bg-surface-container-lowest mb-10">
            {resolveImage(blog.cover_image) ? (
              <Image
                className="w-full h-[420px] object-cover"
                alt={blog.title}
                width={1024}
                height={420}
                src={resolveImage(blog.cover_image)}
              />
            ) : (
              <FallbackImage icon="article" className="w-full h-[420px]" />
            )}
          </div>
          <article>
            {blog.content
              ? paragraphs(blog.content).map((p, i) => (
                  <p key={i} className="text-[1.05rem] leading-[1.8rem] text-on-surface-variant mb-5">
                    {p}
                  </p>
                ))
              : null}
          </article>

          {blog.tags ? (
            <div className="flex flex-wrap gap-2 mt-8">
              {blog.tags.split(",").map((tag) => (
                <span key={tag} className="text-[0.75rem] px-3 py-1.5 rounded-full bg-surface-container text-primary font-semibold">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      {related.length > 0 ? (
        <section className="py-20 bg-surface-container-low/40 border-t border-outline-variant/30">
          <div className="max-w-[1600px] mx-auto px-6 md:px-8">
            <h2 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-on-surface mb-10">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blogs/${item.slug}`}
                  className="group rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col"
                >
                  <div className="h-40 overflow-hidden bg-surface-container">
                    {resolveImage(item.cover_image) ? (
                      <Image
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        alt={item.title}
                        width={400}
                        height={160}
                        src={resolveImage(item.cover_image)}
                      />
                    ) : (
                      <FallbackImage icon="article" className="w-full h-full" />
                    )}
                  </div>
                  <div className="p-5">
                    <p className="text-[0.75rem] text-on-surface-variant mb-2">
                      {item.published_at ? formatDate(item.published_at) : ""}
                    </p>
                    <h3 className="font-display text-[1.1rem] font-semibold text-on-surface line-clamp-2">{item.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}