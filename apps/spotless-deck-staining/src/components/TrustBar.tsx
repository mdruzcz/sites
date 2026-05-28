import { StarIcon, CheckIcon, ShieldIcon } from "./icons";

const items = [
  { Icon: StarIcon,   label: "5.0 Google Rating" },
  { Icon: ShieldIcon, label: "Fully Insured" },
  { Icon: CheckIcon,  label: "Eco-Friendly Stains" },
  { Icon: CheckIcon,  label: "Free 24-Hour Quote" },
  { Icon: CheckIcon,  label: "2-Year Warranty" },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--line)] bg-[var(--greige-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {items.map((it, i) => (
            <div
              key={`${it.label}-${i}`}
              className="flex items-center gap-2 text-sm font-medium text-[var(--driftwood)]/85"
            >
              <span className="text-[var(--terracotta)]">
                <it.Icon className="w-5 h-5" />
              </span>
              {it.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
