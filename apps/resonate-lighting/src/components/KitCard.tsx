import Link from "next/link";
import type { Kit } from "@/lib/content";
import { describeCounts } from "@/lib/estimate";
import { formatCad, pricing } from "@/lib/pricing";
import { MediaSlot } from "./MediaSlot";
import { Check } from "./Icons";

export function KitCard({ kit }: { kit: Kit }) {
  return (
    <article className="card card-glow overflow-hidden flex flex-col">
      <MediaSlot id={`kit-${kit.slug}`} className="aspect-[4/3]" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
      <div className="p-6 flex flex-col flex-1">
        <p className="eyebrow">{kit.tier}</p>
        <h3 className="text-lg font-bold text-white mb-1">{kit.name}</h3>
        <p className="text-sm text-muted mb-3">{kit.pkg.priceLabel}</p>
        <p className="h-display text-3xl text-white mb-1">{formatCad(kit.pkg.price)}</p>
        <p className="text-xs text-muted mb-4">CAD, {pricing.taxNote}, installation extra</p>
        <ul className="space-y-2 text-sm text-muted-strong mb-6 flex-1">
          <li className="flex items-start gap-2">
            <Check /> Control system + lifetime software
          </li>
          <li className="flex items-start gap-2">
            <Check /> <span className="first-letter:uppercase">{describeCounts(kit.pkg.contents)}</span>
          </li>
          <li className="flex items-start gap-2">
            <Check /> {kit.audience}
          </li>
        </ul>
        <Link href={`/kits#${kit.slug}`} className="text-resonant font-semibold text-sm min-h-[44px] inline-flex items-center">
          What&apos;s in the {kit.name} →
        </Link>
      </div>
    </article>
  );
}
