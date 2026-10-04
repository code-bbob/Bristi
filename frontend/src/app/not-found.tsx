import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-28 bg-surface">
        <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="font-display text-[6rem] font-extrabold text-primary-container leading-none">404</p>
        <h1 className="font-display text-[2rem] font-bold tracking-[-0.02em] text-on-surface mt-4">
          Page not found
        </h1>
        <p className="text-[1rem] text-on-surface-variant mt-3">
          The page you are looking for doesn&apos;t exist or may have been moved. Let us guide you back.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary hover:bg-primary font-semibold px-6 py-3.5 rounded-xl shadow-md transition-all"
          >
            <span>Back to Home</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary-container text-primary-container font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
