"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { GROUP_ORDER, getPlannerItems, type PlannerGroup, type PlannerItem } from "@/lib/planner/catalog";
import { formatInches } from "@/lib/planner/types";
import { formatCad } from "@/lib/utils";
import { DRAG_MIME } from "./floor-view";

const CHIP_LABEL: Record<PlannerGroup | "all", string> = {
  all: "All",
  base: "Base",
  drawer: "Drawers",
  sink: "Sinks",
  corner: "Corners",
  wall: "Wall",
  tall: "Tall",
  specialty: "Specialty",
  filler: "Fillers",
  appliance: "Appliances",
};

type Props = {
  onAdd: (sku: string) => void;
  activeLabel: string;
  compact?: boolean;
};

export function CatalogPanel({ onAdd, activeLabel, compact }: Props) {
  const items = useMemo(() => getPlannerItems(), []);
  const [group, setGroup] = useState<PlannerGroup | "all">("base");
  const [q, setQ] = useState("");
  const counts = useMemo(() => {
    const m = new Map<PlannerGroup, number>();
    for (const i of items) m.set(i.group, (m.get(i.group) ?? 0) + 1);
    return m;
  }, [items]);

  const visible = useMemo(() => {
    const query = q.trim().toLowerCase();
    return items.filter((i) => {
      // A search looks across every group; otherwise stick to the selected tab.
      if (query) return i.sku.toLowerCase().includes(query) || i.name.toLowerCase().includes(query) || String(i.width).includes(query);
      return group === "all" || i.group === group;
    });
  }, [items, group, q]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[var(--color-line)] p-3">
        <label htmlFor="planner-search" className="sr-only">
          Search cabinets
        </label>
        <input
          id="planner-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search: SB33, 30, fridge, hood…"
          className="h-10 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 text-sm focus:border-[var(--color-navy)] focus:outline-none"
        />
        <div className="mt-2 flex flex-wrap gap-1" role="tablist" aria-label="Cabinet categories">
          {(["all", ...GROUP_ORDER] as const).map((g) => {
            const count = g === "all" ? items.length : (counts.get(g) ?? 0);
            const active = group === g && !q.trim();
            return (
              <button
                key={g}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setGroup(g);
                  setQ("");
                }}
                className={`inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-[11px] leading-none ${
                  active ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-white" : "border-[var(--color-line)] bg-white text-[var(--color-navy)] hover:border-[var(--color-navy)]"
                }`}
              >
                {CHIP_LABEL[g]}
                <span className={`text-[10px] ${active ? "text-white/70" : "text-[var(--color-ink-soft)]"}`}>{count}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-[11px] text-[var(--color-ink-soft)]">
          {group === "appliance" && !q.trim() ? (
            <>
              Standard-size appliances to plan around — <strong>not sold here</strong>, drawn for layout.{" "}
            </>
          ) : null}
          Click <strong>Add</strong> to place on the <strong>{activeLabel}</strong>, or drag onto the plan.
        </p>
      </div>
      <ul className={`min-h-0 flex-1 overflow-y-auto scrollbar-thin ${compact ? "flex gap-2 p-2" : "divide-y divide-[var(--color-line)]"}`}>
        {visible.length === 0 && <li className="p-4 text-sm text-[var(--color-ink-soft)]">Nothing matches — try a width like “30” or a SKU like “SB33”.</li>}
        {visible.map((it) => (
          <CatalogRow key={it.id} item={it} onAdd={onAdd} compact={compact} />
        ))}
      </ul>
    </div>
  );
}

function CatalogRow({ item, onAdd, compact }: { item: PlannerItem; onAdd: (sku: string) => void; compact?: boolean }) {
  const dims = `${formatInches(item.width)} W × ${formatInches(item.height)} H × ${formatInches(item.depth)} D`;
  return (
    <li
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(DRAG_MIME, item.id);
        e.dataTransfer.effectAllowed = "copy";
      }}
      className={`group flex items-center gap-3 bg-white p-2.5 hover:bg-[var(--color-sandstone-soft)] ${compact ? "w-48 shrink-0 flex-col items-stretch rounded-sm border border-[var(--color-line)]" : ""}`}
      title="Drag onto the plan, or click Add"
    >
      <div className={`relative shrink-0 overflow-hidden rounded-sm border border-[var(--color-line)] bg-white ${compact ? "h-24 w-full" : "h-14 w-14"}`}>
        {item.image ? (
          <Image src={item.image} alt="" fill sizes="80px" className="object-contain p-1" draggable={false} />
        ) : (
          <ApplianceGlyph kind={item.front} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="line-clamp-2 text-[13px] font-medium leading-tight text-[var(--color-navy)]">{item.name}</p>
        <p className="mt-0.5 text-[11px] text-[var(--color-ink-soft)]">
          <span className="font-mono text-[var(--color-brass-dark)]">{item.sold ? item.sku : "appliance"}</span> · {dims}
        </p>
        <p className="mt-0.5 text-[12px] font-medium">{item.sold ? formatCad(item.price) : <span className="text-[var(--color-ink-soft)]">Your appliance · not sold here</span>}</p>
      </div>
      <button
        type="button"
        onClick={() => onAdd(item.id)}
        className="inline-flex h-9 shrink-0 items-center justify-center rounded-sm border border-[var(--color-navy)] px-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-navy)] transition-colors hover:bg-[var(--color-navy)] hover:text-white"
        aria-label={`Add ${item.name}`}
      >
        Add
      </button>
    </li>
  );
}

function ApplianceGlyph({ kind }: { kind: string }) {
  const label = kind === "range" ? "Range" : kind === "fridge" ? "Fridge" : kind === "dishwasher" ? "DW" : "?";
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e7e9eb] text-[10px] font-semibold uppercase tracking-wider text-[#3f4549]">
      {label}
    </div>
  );
}
