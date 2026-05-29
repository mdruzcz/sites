import { site } from "@/lib/site";
import { PhoneIcon } from "./icons";

export function CtaBand({ heading = "Ready to Make This Your Best Holiday Yet?", sub = "Book your free quote today — spots fill up fast in October and November." }: { heading?: string; sub?: string }) {
  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--crimson-deep) 0%, #6B0000 50%, var(--crimson-deep) 100%)" }}
    >
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-twinkle"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? "var(--gold-bright)" : "#fff",
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1.5 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg text-white/75 mb-10 max-w-xl mx-auto">{sub}</p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold transition-all hover:scale-105 min-h-11"
            style={{
              background: "linear-gradient(135deg, var(--gold-bright), var(--gold))",
              color: "#0A0A14",
              boxShadow: "0 8px 32px rgba(201,168,76,0.5)",
            }}
          >
            Get My Free Quote
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/15 transition-all min-h-11"
          >
            <PhoneIcon className="w-5 h-5" />
            {site.phone}
          </a>
        </div>

        <p className="mt-6 text-sm text-white/50">
          $5M insured · WSIB compliant · Family-owned · {site.yearsExperience}+ years experience
        </p>
      </div>
    </section>
  );
}
