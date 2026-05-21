import { site } from "@/lib/site";

const stats = [
  { value: "5★", label: "Google Rating", sub: "Local homeowners" },
  { value: "500+", label: "Decks Restored", sub: "Across Southern Ontario" },
  { value: "2–3 yr", label: "Stain Durability", sub: "Our weather-shield finish" },
  { value: "48 hr", label: "Dry Before Stain", sub: "We wait — no shortcuts" },
];

export function TrustBar() {
  return (
    <section className="py-12 border-b" style={{ background: "var(--white)", borderColor: "var(--light-grey)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p
                className="font-display text-3xl lg:text-4xl font-extrabold mb-1"
                style={{ color: "var(--blue)" }}
              >
                {s.value}
              </p>
              <p className="font-semibold text-sm mb-0.5" style={{ color: "var(--slate)" }}>
                {s.label}
              </p>
              <p className="text-xs" style={{ color: "var(--slate-muted)" }}>
                {s.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
