import { StarIcon, ShieldIcon, BoltIcon, CalendarIcon } from "./icons";

const items = [
  { icon: StarIcon, label: "5.0 / 5", sub: "Customer Rating" },
  { icon: ShieldIcon, label: "Licensed", sub: "& Fully Insured" },
  { icon: BoltIcon, label: "50,000+ hr", sub: "Commercial-Grade LEDs" },
  { icon: CalendarIcon, label: "Lifetime", sub: "Warranty Coverage" },
];

export function TrustBar() {
  return (
    <section
      className="relative py-8 border-y"
      style={{
        backgroundColor: "var(--night)",
        borderColor: "rgba(245,194,107,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it) => (
            <div key={it.label} className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: "rgba(245,194,107,0.1)",
                  color: "var(--gold-bright)",
                }}
              >
                <it.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-display text-base font-bold text-white leading-tight">
                  {it.label}
                </p>
                <p className="text-xs text-white/55">{it.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
