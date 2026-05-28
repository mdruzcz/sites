import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Wood grain texture overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 2px,
            rgba(180, 83, 9, 0.3) 2px,
            rgba(180, 83, 9, 0.3) 4px
          )`,
        }}
      />
      <div className="container relative z-10 text-center">
        <p className="eyebrow text-[var(--accent)] mb-4">Get Started Today</p>
        <h2 className="h-display text-3xl md:text-5xl text-white mb-6">
          Ready to Transform Your Deck?
        </h2>
        <p className="text-white/70 text-lg max-w-xl mx-auto mb-8 normal-case font-normal leading-relaxed">
          Get a free photo quote in 2 business days. Just send us photos — no in-person visit needed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact" className="btn btn-primary">
            Get Free Quote
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-white">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
