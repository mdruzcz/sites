import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden hero-gradient text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div>
            <p className="eyebrow text-blue-200">Ready to Get Started?</p>
            <h2 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-3">
              Let's make your space <span className="text-yellow-300">accessible</span>.
            </h2>
            <p className="text-blue-100 text-base sm:text-lg max-w-2xl">
              Call us or fill out our quote form and we'll get back to you within {site.responseTime}. Free consultations, no-obligation quotes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a href={site.phoneHref} className="btn btn-cta text-base">
              <PhoneIcon />
              {site.phone}
            </a>
            <Link href="/contact" className="btn btn-ghost text-base border-white/40 text-white hover:bg-white/10">
              Request a Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  );
}
