import { Photo } from "@/components/photo";

const SPECS = [
  { value: "46", unit: "lumens", label: "Per puck at maximum brightness" },
  { value: "0.3", unit: "watts", label: "Per LED — efficient by design" },
  { value: "50k", unit: "hours", label: "Roughly 20 years of typical use" },
  { value: "−40°C", unit: "tested", label: "Built for Canadian winters" }
];

export function SpecCallouts() {
  return (
    <section className="bg-[var(--color-surface)]">
      <div className="shell section">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">The numbers</p>
            <h2 className="font-display mt-6 text-[2.1rem] md:text-[3rem]">
              Engineered for serious lighting.
            </h2>
            <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-[var(--color-text-soft)]">
              Every puck is potted and sealed to IP68, seated in extruded aluminum rather than clipped to a
              wire, and driven by a CSA-approved Class 2 supply. It is the hardware spec installers ask for
              because it is the one that survives a decade of Ontario weather.
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-11">
              {SPECS.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-[2rem] leading-none text-[var(--color-gold-text)] sm:text-[2.5rem] md:text-5xl">
                    {s.value}
                    <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted)] sm:ml-1.5 sm:mt-0 sm:inline sm:align-middle">
                      {s.unit}
                    </span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-[var(--color-text-soft)]">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="order-1 grid gap-5 sm:grid-cols-2 lg:order-2">
            <Photo
              name="detail-led-pucks"
              ratio="aspect-[4/5]"
              sizes="(max-width: 640px) 100vw, 320px"
              rounded="rounded-2xl"
              className="sm:col-span-1"
            />
            <div className="grid gap-5">
              <Photo
                name="detail-track-mounting"
                ratio="aspect-[4/3]"
                sizes="(max-width: 640px) 100vw, 320px"
                rounded="rounded-2xl"
              />
              <Photo
                name="track-residential"
                ratio="aspect-square"
                sizes="(max-width: 640px) 100vw, 320px"
                rounded="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
