import Image from "next/image";

const scenes = [
  {
    src: "/images/uploads/warm-white-twilight-house.jpg",
    alt: "Permanent LED roofline lighting set to warm white on a Halton home at twilight",
    mood: "Everyday Warm White",
    desc: "Tasteful curb appeal that complements your home year-round",
  },
  {
    src: "/images/uploads/pink-magenta-house.jpg",
    alt: "Same home with permanent LED lighting set to bright pink and magenta for Valentine's Day",
    mood: "Pink for the Holidays",
    desc: "Pink for Valentine's, blue for IIHF, orange for Halloween — one tap",
  },
  {
    src: "/images/uploads/rainbow-house.jpg",
    alt: "Same home with permanent LED lighting set to a full rainbow gradient showing all available colors",
    mood: "Full Color Spectrum",
    desc: "Millions of colors and patterns, all programmable per LED",
  },
];

export function ColorShowcase() {
  return (
    <section
      className="relative py-20 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--night) 0%, var(--midnight) 50%, var(--night) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            One System · Every Mood
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            One Home.{" "}
            <span className="text-gradient-gold">Every Color.</span>
          </h2>
          <p className="text-lg text-white/65">
            The same permanent LED system, controlled from your phone. Swap
            colors and patterns to match any occasion in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 lg:gap-6">
          {scenes.map((s) => (
            <figure
              key={s.src}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-[#050816]/30 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="text-xs font-bold uppercase tracking-[0.25em] mb-1.5"
                  style={{ color: "var(--gold-bright)" }}
                >
                  {s.mood}
                </p>
                <p className="text-white font-medium leading-snug">
                  {s.desc}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
