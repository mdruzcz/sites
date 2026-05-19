import Image from "next/image";
import { CheckIcon } from "./icons";

const bullets = [
  "Smart device control with intuitive mobile app",
  "Weather-resistant LED technology with 50,000+ hour lifespan",
  "Energy-efficient design reduces electricity costs",
  "Professional installation with lifetime warranty",
];

export function SmartControl() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #050816 0%, #0A0E1F 50%, #050816 100%)",
        }}
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/2] shadow-2xl gold-glow">
              <Image
                src="/images/halton-glow-installation.webp"
                alt="Permanent LED lighting installation by Halton Glow on a luxury home soffit in Oakville, Ontario"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-[var(--gold)]/20 rounded-2xl pointer-events-none" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p
              className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "var(--gold-bright)" }}
            >
              Our Key Feature
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
              Smart Control
              <br />
              <span className="text-gradient-gold">From Your Pocket</span>
            </h2>
            <p className="text-lg text-white/65 leading-relaxed mb-8">
              Control your entire lighting system from your smartphone. Create
              custom scenes for every occasion, schedule automatic lighting
              changes, and choose from millions of colors with our intuitive app.
            </p>
            <ul className="space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                    style={{
                      backgroundColor: "rgba(245,194,107,0.18)",
                      color: "var(--gold-bright)",
                    }}
                  >
                    <CheckIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-white/80">{b}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-9 px-7 py-3.5 rounded-full font-semibold text-[#0A0E1F] bg-gradient-to-r from-[var(--gold-bright)] to-[var(--gold)] hover:from-[var(--gold)] hover:to-[var(--amber)] transition-all hover:scale-105 hover:shadow-[0_10px_30px_rgba(245,194,107,0.4)] min-h-11"
            >
              Get Your Free Quote
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
