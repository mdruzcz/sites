import { FOUNDED } from "@/lib/site";

/** Proof numbers. Keep these honest — they are repeated on landing pages. */
export function SpecCallouts() {
  const specs = [
    { value: String(FOUNDED), unit: "since", label: "Supplying Canadian holiday displays" },
    { value: "150+", unit: "SKUs", label: "Bulbs, displays, décor and permanent lighting" },
    { value: "10", unit: "provinces", label: "Shipped from our London, Ontario warehouse" },
    { value: "−40°C", unit: "rated", label: "Commercial-grade LEDs and aluminum frames" }
  ];
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-cream)]">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-12 md:grid-cols-4">
        {specs.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-display text-4xl text-[var(--color-brand)] md:text-5xl">
              {s.value}
              <span className="ml-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-[var(--color-muted)]">{s.unit}</span>
            </p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
