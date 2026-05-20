import Image from "next/image";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  location: string;
};

const shots: Shot[] = [
  {
    src: "/images/uploads/green-led-home.jpg",
    alt: "Large two-story Halton home with permanent green LED outdoor lighting along every roofline at night",
    caption: "Premium Two-Story Install",
    location: "Burlington, ON",
  },
  {
    src: "/images/uploads/warm-white-christmas-house.jpg",
    alt: "Winter night view of a home with red permanent LED roofline lighting and lit Christmas trees, snow on the ground",
    caption: "Winter & Holiday Mode",
    location: "Oakville, ON",
  },
  {
    src: "/images/uploads/hot-tub-teal-leds.jpg",
    alt: "Teal permanent LED soffit lighting in a backyard hot tub area at night",
    caption: "Backyard Ambiance",
    location: "Milton, ON",
  },
  {
    src: "/images/uploads/led-pucks-closeup.jpg",
    alt: "Close-up of permanent LED nodes installed under the soffit of a white board-and-batten home in winter",
    caption: "Commercial-Grade LEDs · Up Close",
    location: "The Halton Glow System",
  },
];

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
            Real Installs · Real Homes
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
          {shots.map((s) => (
            <div
              key={s.src}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/85 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2"
                  style={{
                    backgroundColor: "rgba(245,194,107,0.2)",
                    color: "var(--gold-bright)",
                    border: "1px solid rgba(245,194,107,0.3)",
                  }}
                >
                  {s.location}
                </span>
                <p className="text-white font-semibold">{s.caption}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/40 text-sm mt-10">
          Want to see more work?{" "}
          <a
            href="/#contact"
            className="text-[var(--gold-bright)] underline hover:text-[var(--gold)]"
          >
            Book a free consultation
          </a>{" "}
          and we'll bring photos from recent installs near you.
        </p>
      </div>
    </section>
  );
}
