import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-[var(--navy)] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="eyebrow justify-center !text-[var(--accent)]">Get Started Today</p>
        <h2 className="h-display text-3xl sm:text-4xl text-white mb-4">
          Ready to Protect Your Concrete?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
          Get a free, no-obligation quote. We respond within {site.responseTime} and back every job with our{" "}
          <span className="text-[var(--accent)] font-semibold">{site.warrantyYears}-year written warranty</span>.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact" className="btn btn-primary text-base px-8 py-4">
            Get a Free Quote
            <ArrowIcon />
          </Link>
          <a href={site.emailHref} className="btn btn-ghost text-base px-8 py-4">
            Email Us Directly
          </a>
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  );
}
