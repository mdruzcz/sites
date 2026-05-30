import Image from "next/image";
import { site } from "@/lib/site";
import { PhoneIcon, CheckIcon } from "./icons";

export function Hero() {
  return (
    <section className="relative min-h-[88vh] lg:min-h-screen flex items-center overflow-hidden pt-20 lg:pt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-deck.jpg"
          alt="Freshly stained cedar deck with rich amber finish in a Kitchener-Waterloo backyard at golden hour"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(51,46,38,0.78) 0%, rgba(74,66,56,0.55) 45%, rgba(74,66,56,0.25) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(176,125,98,0.18)",
              color: "#FAF8F3",
              border: "1px solid rgba(250,248,243,0.35)",
            }}
          >
            Kitchener · Waterloo · Cambridge · Guelph
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-6 text-[#FAF8F3]">
            Decks That Look{" "}
            <br />
            <span className="text-[var(--terracotta)]">Brand New</span>{" "}
            <br />
            Every Single Season
          </h1>

          <p className="text-lg lg:text-xl text-[#FAF8F3]/85 mb-9 leading-relaxed max-w-xl">
            Premium penetrating stains, proper prep, and a fully insured local
            crew. We protect, restore and transform decks and fences across
            Kitchener-Waterloo &mdash; with a written 2-year warranty.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white bg-[var(--terracotta)] hover:bg-[var(--terracotta-deep)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(176,125,98,0.5)] min-h-11"
            >
              Get a Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[#FAF8F3] border border-[#FAF8F3]/40 hover:bg-[#FAF8F3]/10 backdrop-blur-sm transition-all min-h-11"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {site.trustBadges.map((b) => (
              <div key={b.label} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[var(--terracotta)]"
                  style={{ backgroundColor: "rgba(250,248,243,0.92)" }}
                >
                  <CheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#FAF8F3]">{b.label}</p>
                  <p className="text-xs text-[#FAF8F3]/65">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
