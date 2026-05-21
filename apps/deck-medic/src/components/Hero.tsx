import Image from "next/image";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20" style={{ background: "var(--off-white)" }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/Deck-Medic-Banner.png"
          alt="Beautiful restored cedar deck after professional Deck Medic treatment in Toronto, ON"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.2) 100%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 bg-white/10 text-white border border-white/20">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--blue-light)" }} />
            Serving Toronto &amp; Southern Ontario
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6">
            Professional{" "}
            <span style={{ color: "#60A5FA" }}>Deck Restoration</span>{" "}
            &amp; Staining Experts
          </h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-4 max-w-xl">
            We don't just stain decks — we restore them. Our surgical approach
            means{" "}
            <strong className="text-white">
              deep sanding, structural repairs, and premium weather-shield
              finishes
            </strong>{" "}
            built to survive the Canadian climate.
          </p>

          <div className="flex flex-wrap gap-3 mb-10">
            {["UV-Shield Stains", "Eco-Friendly Clean", "5-Star Rated", "Licensed & Insured"].map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-1.5 text-sm text-white/90 font-medium"
              >
                <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#60A5FA" }} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {b}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/contact"
              className="px-8 py-4 rounded-full font-bold text-white text-base transition-all hover:scale-105 hover:shadow-2xl min-h-11 flex items-center"
              style={{ background: "var(--blue)" }}
            >
              Get a Free Estimate
            </a>
            <a
              href={site.phoneHref}
              className="px-8 py-4 rounded-full font-bold text-base bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20 transition-all min-h-11 flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1v3.5a1 1 0 01-1 1A17 17 0 013 5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01L6.62 10.79z" />
              </svg>
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--off-white))" }} />
    </section>
  );
}
