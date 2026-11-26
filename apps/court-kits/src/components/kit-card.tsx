import Link from "next/link";
import { kitArea, kitPrice, kitSizeShort, kitTypeName, money, type Kit } from "@/lib/content";
import { defaultColours } from "@/lib/colours";
import { CourtDiagram } from "./court-diagram";

export function KitCard({ kit, className = "" }: { kit: Kit; className?: string }) {
  const price = kitPrice(kit);
  return (
    <Link href={`/court-kits/${kit.slug}`} className={`card group flex flex-col overflow-hidden transition-transform hover:-translate-y-0.5 ${className}`}>
      <div className="relative aspect-[4/3] bg-[#F4F1ED]">
        {kit.tag && <span className="pill pill-dark absolute left-3 top-3 z-[1]">{kit.tag}</span>}
        <CourtDiagram
          layout={kit.layout}
          w={kit.w}
          d={kit.d}
          colours={defaultColours(kit.layout)}
          grid={false}
          title={`Plan view of a ${kitSizeShort(kit)} ${kitTypeName(kit).toLowerCase()}`}
          className="absolute inset-0 h-full w-full p-6"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{kitTypeName(kit).replace(" Kit", "")}</p>
        <h3 className="h3 mt-1">{kitSizeShort(kit)}</h3>
        <p className="mt-1.5 text-sm text-[var(--muted)]">{kit.bestFor}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <p className="text-sm">
            <span className="font-black">{kitArea(kit).toLocaleString("en-CA")} sq ft</span>
            <span className="block text-[var(--muted)]">{price ? `From ${money(price)}` : "Delivered price on request"}</span>
          </p>
          <span aria-hidden className="grid h-11 w-11 shrink-0 place-items-center rounded-[12px] bg-[var(--accent)] text-lg font-black text-white transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
