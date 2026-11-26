import Link from "next/link";
import { kitArea, kitRate, kitSizeShort, kitTypeName, money, rate, type Kit } from "@/lib/content";
import { defaultColours } from "@/lib/colours";
import { CourtDiagram } from "./court-diagram";

export function KitCard({ kit, className = "" }: { kit: Kit; className?: string }) {
  return (
    <Link href={`/court-kits/${kit.slug}`} className={`card kit-card group flex flex-col overflow-hidden ${className}`}>
      <div className="relative aspect-[4/3] bg-[var(--well)]">
        {kit.tag && <span className="pill pill-dark absolute left-3 top-3 z-[1]">{kit.tag}</span>}
        <CourtDiagram
          layout={kit.layout}
          w={kit.w}
          d={kit.d}
          colours={defaultColours(kit.layout)}
          grid={false}
          title={`Plan view of a ${kitSizeShort(kit)} ${kitTypeName(kit).toLowerCase()}`}
          className="absolute inset-0 h-full w-full p-6 transition-transform duration-300 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{kitTypeName(kit).replace(" Kit", "")}</p>
        <h3 className="h3 mt-1">{kitSizeShort(kit)}</h3>
        <p className="mt-1.5 text-sm text-[var(--muted)]">{kit.bestFor}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p>
            <span className="block text-xl font-black leading-tight tracking-[-0.02em]">{money(kit.price)}</span>
            <span className="block text-xs text-[var(--muted)]">
              {kitArea(kit).toLocaleString("en-CA")} sq ft · {rate(kitRate(kit))}/sq ft
            </span>
          </p>
          <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-[var(--accent)] text-lg font-black text-[var(--on-accent)] transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
