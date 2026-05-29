import Link from "next/link";
import { site } from "@/lib/site";

export default function CtaBand() {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden bg-[var(--charcoal)]">
      {/* Subtle diagonal accent stripe */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 20px,
            rgba(180, 83, 9, 0.8) 20px,
            rgba(180, 83, 9, 0.8) 22px
          )`,
        }}
      />
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="eyebrow text-[var(--accent)] mb-4">Get Started Today</p>
          <h2 className="h-display text-3xl md:text-4xl lg:text-5xl text-white mb-5">
            Ready to Transform Your Deck?
          </h2>
          <p className="text-white/65 text-base md:text-lg mb-8 font-normal leading-relaxed">
            Get a free photo quote in 2 business days. Just send us photos — no in-person visit needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn btn-primary">
              Get Free Quote
            </Link>
            <a href={site.phoneHref} className="btn btn-outline-white">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
