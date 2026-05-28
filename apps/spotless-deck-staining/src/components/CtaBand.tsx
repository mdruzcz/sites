import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CtaBand() {
  return (
    <section className="py-16 lg:py-20 bg-[var(--driftwood-dark)] text-[var(--cream)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl font-extrabold mb-4 text-[var(--cream)]">
          Ready for a deck that looks like the day it was built?
        </h2>
        <p className="text-lg text-[var(--cream)]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          Free, no-obligation written quotes within 24 hours. Premium stains,
          proper prep, 2-year workmanship warranty.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition-all hover:scale-105 min-h-11"
          >
            Get a Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold border border-[var(--cream)]/40 hover:bg-[var(--cream)]/10 transition-all min-h-11"
          >
            <PhoneIcon className="w-5 h-5" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
