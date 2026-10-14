import Link from "next/link";
import { Icon } from "@/components/icons";

const PLACES = [
  "Toronto", "Mississauga", "Brampton", "Hamilton", "London", "Kitchener-Waterloo", "Ottawa", "Windsor", "Niagara", "Barrie", "Kingston", "Sudbury",
  "Montréal", "Québec City", "Halifax", "Moncton", "Winnipeg", "Regina", "Saskatoon", "Calgary", "Edmonton", "Vancouver", "Victoria", "Kelowna"
];

export function ServiceAreas() {
  return (
    <section className="bg-warm">
      <div className="shell section grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <div>
          <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Where we ship</p>
          <h2 className="font-display h2-fluid mt-4">Stocked in Ontario. Delivered across Canada.</h2>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
            Bulbs, spools and accessories ship by courier; 3D displays and trees ship freight on a pallet or crate. Shipping is quoted per order so a BIA in Alberta pays what it actually costs, not a blanket surcharge.
          </p>
          <ul className="mt-6 space-y-2 text-sm text-[var(--color-text-soft)]">
            <li className="flex items-center gap-2"><Icon.check size={16} className="text-[var(--color-brand)]" /> Free courier shipping over $150</li>
            <li className="flex items-center gap-2"><Icon.check size={16} className="text-[var(--color-brand)]" /> Freight quoted for displays, trees and pallet orders</li>
            <li className="flex items-center gap-2"><Icon.check size={16} className="text-[var(--color-brand)]" /> Warehouse pickup in London, Ontario by arrangement</li>
          </ul>
          <Link href="/shipping-returns" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline">
            Shipping details <Icon.arrow size={14} />
          </Link>
        </div>
        <ul className="flex flex-wrap gap-2">
          {PLACES.map((c) => (
            <li key={c} className="chip">{c}</li>
          ))}
          <li className="chip !border-[var(--color-brand)] !bg-[var(--color-brand-soft)] !text-[var(--color-brand)]">+ every Canadian postal code</li>
        </ul>
      </div>
    </section>
  );
}
