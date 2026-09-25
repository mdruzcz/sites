"use client";

// Filterable cabinet grid: type (group), width, availability (in stock / on sale / coming soon) and sort.

import { useMemo, useState } from "react";
import type { Cabinet } from "@/lib/catalog";
import type { StockInfo } from "@/lib/inventory";
import { pricingFor } from "@/lib/sale";
import CabinetCard from "./CabinetCard";

type Props = {
  cabinets: Cabinet[];
  stock: Record<string, StockInfo>; // keyed by catalog SKU
  groups: { slug: string; label: string }[];
  /** Hide the type chips when the page is already a single group. */
  lockedGroup?: string;
};

type Avail = "all" | "in-stock" | "on-sale" | "coming-soon";
type Sort = "featured" | "price-asc" | "price-desc" | "width-asc" | "width-desc";

const COLLECTIONS = [
  { id: "all", label: "All collections" },
  { id: "white-shaker", label: "White Shaker (36″ uppers)" },
  { id: "white-shaker-30", label: "White Shaker 30″ uppers — coming soon" },
];

export default function CatalogGrid({ cabinets, stock, groups, lockedGroup }: Props) {
  const [group, setGroup] = useState<string>(lockedGroup ?? "all");
  const [collection, setCollection] = useState("all");
  const [width, setWidth] = useState<string>("all");
  const [avail, setAvail] = useState<Avail>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const widths = useMemo(() => [...new Set(cabinets.map((c) => c.width_in).filter((w): w is number => w !== null))].sort((a, b) => a - b), [cabinets]);

  const shown = useMemo(() => {
    let list = cabinets.filter((c) => (group === "all" ? true : c.group === group));
    if (collection === "white-shaker-30") list = list.filter((c) => c.coming_soon);
    if (collection === "white-shaker") list = list.filter((c) => !c.coming_soon);
    if (width !== "all") list = list.filter((c) => c.width_in === Number(width));
    if (avail === "in-stock") list = list.filter((c) => !c.coming_soon && (stock[c.sku] ? stock[c.sku].in_stock : true));
    if (avail === "on-sale") list = list.filter((c) => pricingFor(c.sku, c.price_cad, { comingSoon: c.coming_soon })?.onSale);
    if (avail === "coming-soon") list = list.filter((c) => c.coming_soon);
    const price = (c: Cabinet) => pricingFor(c.sku, c.price_cad, { comingSoon: c.coming_soon })?.price ?? c.price_cad ?? Number.POSITIVE_INFINITY;
    if (sort === "price-asc") list = [...list].sort((a, b) => price(a) - price(b));
    if (sort === "price-desc") list = [...list].sort((a, b) => price(b) - price(a));
    if (sort === "width-asc") list = [...list].sort((a, b) => (a.width_in ?? 0) - (b.width_in ?? 0));
    if (sort === "width-desc") list = [...list].sort((a, b) => (b.width_in ?? 0) - (a.width_in ?? 0));
    return list;
  }, [cabinets, group, collection, width, avail, sort, stock]);

  const saleCount = cabinets.filter((c) => pricingFor(c.sku, c.price_cad, { comingSoon: c.coming_soon })?.onSale).length;
  const select = "min-h-[44px] rounded-md border border-border bg-white px-3 text-sm";

  return (
    <div>
      <div className="mb-6 rounded-lg border border-border bg-sand p-3 md:p-4">
        {!lockedGroup && (
          <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            <Chip active={group === "all"} onClick={() => setGroup("all")}>
              All types <span className="opacity-60">{cabinets.length}</span>
            </Chip>
            {groups.map((g) => {
              const n = cabinets.filter((c) => c.group === g.slug).length;
              if (!n) return null;
              return (
                <Chip key={g.slug} active={group === g.slug} onClick={() => setGroup(g.slug)}>
                  {g.label} <span className="opacity-60">{n}</span>
                </Chip>
              );
            })}
          </div>
        )}
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-wrap md:items-center">
          <label className="flex flex-col text-xs font-medium text-ink-soft">
            Collection
            <select className={select} value={collection} onChange={(e) => setCollection(e.target.value)}>
              {COLLECTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-soft">
            Width
            <select className={select} value={width} onChange={(e) => setWidth(e.target.value)}>
              <option value="all">Any width</option>
              {widths.map((w) => (
                <option key={w} value={w}>
                  {w}″
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-soft">
            Availability
            <select className={select} value={avail} onChange={(e) => setAvail(e.target.value as Avail)}>
              <option value="all">Everything</option>
              <option value="in-stock">In stock</option>
              <option value="on-sale">On sale{saleCount ? ` (${saleCount})` : ""}</option>
              <option value="coming-soon">Coming soon</option>
            </select>
          </label>
          <label className="flex flex-col text-xs font-medium text-ink-soft">
            Sort
            <select className={select} value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="width-asc">Width: narrow to wide</option>
              <option value="width-desc">Width: wide to narrow</option>
            </select>
          </label>
          <p className="col-span-2 self-end text-xs text-ink-soft md:ml-auto" aria-live="polite">
            {shown.length} of {cabinets.length} cabinets
            {(group !== (lockedGroup ?? "all") || collection !== "all" || width !== "all" || avail !== "all") && (
              <button
                type="button"
                className="ml-2 underline"
                onClick={() => {
                  setGroup(lockedGroup ?? "all");
                  setCollection("all");
                  setWidth("all");
                  setAvail("all");
                }}
              >
                Clear
              </button>
            )}
          </p>
        </div>
      </div>
      {shown.length === 0 ? (
        <p className="rounded-lg border border-border bg-white p-8 text-center text-ink-soft">No cabinets match those filters.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {shown.map((c) => (
            <CabinetCard key={c.slug} cabinet={c} stock={stock[c.sku]} />
          ))}
        </div>
      )}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-[36px] rounded-full border px-3 py-1 text-xs font-medium transition-colors ${active ? "border-accent bg-accent text-white" : "border-border bg-white text-ink hover:border-accent hover:text-accent"}`}
    >
      {children}
    </button>
  );
}
