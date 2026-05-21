import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-charcoal relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-[var(--accent)] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--accent)] rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <p className="eyebrow !text-[var(--accent)]">Ready to Get Started?</p>
            <h2 className="h-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
              Free On-Site Estimate in 24 Hours
            </h2>
            <p className="text-[var(--concrete-200)] text-base sm:text-lg max-w-2xl">
              Tell us about your driveway, patio, or concrete project. Honest pricing, written warranty, no high-pressure sales.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={site.phoneHref} className="btn btn-primary text-base">
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost text-base">
              Request an Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
