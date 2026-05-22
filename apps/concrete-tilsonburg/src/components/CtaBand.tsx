import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-[var(--accent)] relative overflow-hidden">
      {/* Decorative diagonal stripe */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.15) 20px, rgba(255,255,255,0.15) 22px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div>
            <p className="text-white/75 text-sm font-bold uppercase tracking-widest mb-2">
              Ready to get started?
            </p>
            <h2 className="h-display text-2xl sm:text-3xl lg:text-4xl text-white mb-2">
              Free On-Site Estimate in 24 Hours
            </h2>
            <p className="text-white/80 text-base sm:text-lg max-w-xl">
              Honest pricing, written warranty, no high-pressure sales. Just concrete done right.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={site.phoneHref} className="btn btn-light text-base px-7 py-4 shadow-lg">
              <PhoneIcon />
              Call {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost text-base px-7 py-4 !border-white/40">
              Request an Estimate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
