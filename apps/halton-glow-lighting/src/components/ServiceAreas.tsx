import { MapPinIcon } from "./icons";

const areas = [
  {
    city: "Burlington",
    desc: "From historic downtown neighbourhoods to the lakeshore estates of Roseland and Tyandaga, we install permanent outdoor lighting that complements every Burlington home's character.",
    highlights: ["Aldershot", "Roseland", "Tyandaga", "Millcroft", "Alton Village"],
  },
  {
    city: "Oakville",
    desc: "Whether you're in classic Old Oakville or a newer Glen Abbey or Joshua Creek home, our team delivers premium LED installations that elevate curb appeal year-round.",
    highlights: ["Old Oakville", "Glen Abbey", "Bronte", "Joshua Creek", "West Oak Trails"],
  },
  {
    city: "Surrounding Halton",
    desc: "We also serve homeowners across Milton, Hamilton, Mississauga and the rest of the Halton Region with the same lifetime warranty and professional install standards.",
    highlights: ["Milton", "Hamilton", "Mississauga", "Waterdown", "Carlisle"],
  },
];

export function ServiceAreas() {
  return (
    <section
      id="service-areas"
      className="relative py-20 lg:py-28"
      style={{ backgroundColor: "var(--night)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Service Areas
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
            Proudly Serving{" "}
            <span className="text-gradient-gold">Halton Region</span>
          </h2>
          <p className="text-lg text-white/65">
            Local experts who know the architecture, weather and bylaws of every
            community we serve.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {areas.map((a) => (
            <div
              key={a.city}
              className="p-7 rounded-2xl border"
              style={{
                backgroundColor: "rgba(255,255,255,0.03)",
                borderColor: "rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="flex items-center gap-2 mb-3"
                style={{ color: "var(--gold-bright)" }}
              >
                <MapPinIcon />
                <h3 className="font-display text-2xl font-bold">{a.city}</h3>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-5">
                {a.desc}
              </p>
              <div className="flex flex-wrap gap-2">
                {a.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: "rgba(245,194,107,0.1)",
                      color: "var(--gold-bright)",
                      border: "1px solid rgba(245,194,107,0.2)",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/50 text-sm mt-10">
          Don't see your area listed?{" "}
          <a
            href="#contact"
            className="underline hover:text-white transition"
            style={{ color: "var(--gold-bright)" }}
          >
            Contact us
          </a>{" "}
          — we might still serve your neighbourhood.
        </p>
      </div>
    </section>
  );
}
