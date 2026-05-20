import Image from "next/image";
import type { City } from "@/lib/site";
import { site } from "@/lib/site";
import { PhoneIcon, SparkleIcon, CheckIcon } from "./icons";

export function CityHero({ city }: { city: City }) {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 lg:pt-24">
      <div className="absolute inset-0">
        <Image
          src="/images/uploads/blue-led-house-app.jpg"
          alt={`Permanent outdoor LED lighting installed on a ${city.name} home by Halton Glow Lighting at night`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(5,8,22,0.92) 0%, rgba(10,14,31,0.78) 35%, rgba(19,25,51,0.55) 70%, rgba(10,14,31,0.4) 100%)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
        <div className="max-w-2xl">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(245,194,107,0.12)",
              color: "var(--gold-bright)",
              border: "1px solid rgba(245,194,107,0.3)",
            }}
          >
            <SparkleIcon className="w-3.5 h-3.5" />
            {city.name} · {city.region}
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] mb-6 text-white">
            Permanent Outdoor
            <br />
            <span className="text-gradient-gold">LED Lighting</span>
            <br />
            in {city.name}
          </h1>

          <p className="text-lg lg:text-xl text-white/75 mb-9 leading-relaxed max-w-xl">
            {city.heroIntro}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_rgba(245,194,107,0.5)] min-h-11"
            >
              Free Estimate in {city.name}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-semibold text-white border border-white/25 hover:bg-white/10 backdrop-blur-sm transition-all min-h-11"
            >
              <PhoneIcon className="w-5 h-5" />
              {site.phone}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {site.trustBadges.map((b) => (
              <div key={b.label} className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{
                    backgroundColor: "rgba(245,194,107,0.15)",
                    border: "1px solid rgba(245,194,107,0.3)",
                    color: "var(--gold-bright)",
                  }}
                >
                  <CheckIcon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{b.label}</p>
                  <p className="text-xs text-white/55">{b.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
