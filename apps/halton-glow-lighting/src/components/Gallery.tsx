import Image from "next/image";

export function Gallery() {
  return (
    <section
      id="gallery"
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{ backgroundColor: "var(--night-deep)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Real Halton Region Installs
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Lighting That{" "}
            <span className="text-gradient-gold">Lasts.</span>
            <br />
            Service You Can Trust.
          </h2>
          <p className="text-lg text-white/65">
            Custom-designed permanent lighting systems that highlight your
            home's architecture and add curb appeal every season of the year.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/images/halton-glow-installation.webp"
              alt="Warm white permanent LED lighting installation on a Burlington home by Halton Glow"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                style={{
                  backgroundColor: "rgba(245,194,107,0.2)",
                  color: "var(--gold-bright)",
                  border: "1px solid rgba(245,194,107,0.3)",
                }}
              >
                Burlington, ON
              </span>
              <p className="text-white font-semibold">
                Custom Soffit-Mounted LED Installation
              </p>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
            <Image
              src="/images/hero-led-house.png"
              alt="Color-changing permanent outdoor LED lighting on a luxury Oakville home at night by Halton Glow"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                style={{
                  backgroundColor: "rgba(245,194,107,0.2)",
                  color: "var(--gold-bright)",
                  border: "1px solid rgba(245,194,107,0.3)",
                }}
              >
                Oakville, ON
              </span>
              <p className="text-white font-semibold">
                Year-Round Smart LED Roofline
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-white/40 text-sm mt-10">
          Want to see more work? <a href="#contact" className="text-[var(--gold-bright)] underline hover:text-[var(--gold)]">Book a free consultation</a> and we'll bring photos from recent installs near you.
        </p>
      </div>
    </section>
  );
}
