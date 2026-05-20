import type { City } from "@/lib/site";
import { MapPinIcon } from "./icons";

export function CityOverview({ city }: { city: City }) {
  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--night) 0%, var(--midnight) 100%)",
      }}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold uppercase tracking-[0.25em] mb-3"
            style={{ color: "var(--gold-bright)" }}
          >
            Local Expertise
          </p>
          <h2 className="font-display text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-tight">
            Permanent LED Lighting{" "}
            <span className="text-gradient-gold">Built for {city.name}</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-3xl mx-auto">
            {city.description}
          </p>
        </div>

        <div
          className="p-8 rounded-2xl border"
          style={{
            backgroundColor: "rgba(255,255,255,0.025)",
            borderColor: "rgba(245,194,107,0.15)",
          }}
        >
          <h3
            className="font-display text-xl font-bold mb-5 flex items-center gap-2"
            style={{ color: "var(--gold-bright)" }}
          >
            <MapPinIcon /> {city.name} Neighbourhoods We Serve
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {city.neighbourhoods.map((n) => (
              <span
                key={n}
                className="px-3.5 py-1.5 rounded-full text-sm"
                style={{
                  backgroundColor: "rgba(245,194,107,0.08)",
                  border: "1px solid rgba(245,194,107,0.2)",
                  color: "white",
                }}
              >
                {n}
              </span>
            ))}
          </div>
          <p className="text-sm text-white/55 mt-5">
            Not seeing your neighbourhood? We serve all of {city.name} and the
            wider Halton Region — call{" "}
            <a
              href="tel:+15192666796"
              className="underline hover:text-white transition"
              style={{ color: "var(--gold-bright)" }}
            >
              (519) 266-6796
            </a>{" "}
            to confirm.
          </p>
        </div>
      </div>
    </section>
  );
}
