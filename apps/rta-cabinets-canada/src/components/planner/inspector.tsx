"use client";

// Right-hand panel in step 2: properties of the selected unit, the island, or the active surface.

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePlanner } from "./planner-context";
import { CORNER_NAMES, WALL_NAMES, formatInches, type CornerId, type SurfaceId, type WallId } from "@/lib/planner/types";
import { getPlannerItem, getWidthAlternatives } from "@/lib/planner/catalog";
import { cornerIsUsable, freeSpans, surfaceFrame } from "@/lib/planner/geometry";
import { describeSurface } from "@/lib/planner/store";
import { autofillSurface, DEFAULT_AUTOFILL, type AutofillOptions } from "@/lib/planner/autofill";
import { formatCad } from "@/lib/planner-utils";

export function Inspector() {
  const { design, ui, setUi, dispatch, toast } = usePlanner();
  const selected = ui.selectedId ? design.items.find((i) => i.id === ui.selectedId) : null;
  const def = selected ? getPlannerItem(selected.sku) : null;

  if (selected && def) {
    const alternatives = getWidthAlternatives(def);
    const itemNotes = design.notes.filter((n) => n.itemId === selected.id);
    const isCorner = selected.corner !== undefined;
    return (
      <div className="flex h-full min-h-0 flex-col">
        <div className="border-b border-[var(--color-border)] p-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-dark)]">Selected</p>
          <div className="mt-2 flex gap-3">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[var(--color-border)] bg-white">
              {def.image ? <Image src={def.image} alt="" fill sizes="80px" className="object-contain p-1" /> : <div className="flex h-full items-center justify-center text-[10px] uppercase text-[var(--color-ink-soft)]">Space</div>}
            </div>
            <div className="min-w-0">
              <h3 className="text-[15px] font-medium leading-snug text-[var(--color-ink)]">{def.name}</h3>
              <p className="mt-1 font-mono text-[11px] text-[var(--color-accent-dark)]">{def.sold ? def.sku : "your appliance · not sold here, drawn to size"}</p>
              <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
                {formatInches(def.width)} W × {formatInches(def.height)} H × {formatInches(def.depth)} D
              </p>
              <p className="mt-1 font-display text-lg">{def.sold ? formatCad(def.price) : "—"}</p>
            </div>
          </div>
          {def.cabinet && (
            <Link href={`/cabinets/${def.cabinet.slug}`} target="_blank" className="mt-2 inline-block text-[12px] underline underline-offset-4 decoration-[var(--color-accent)]">
              View product details ↗
            </Link>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin p-4 space-y-5">
          {/* Position */}
          <section>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Position</h4>
            {isCorner ? (
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {([0, 1, 2, 3] as CornerId[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    disabled={!cornerIsUsable(design, c)}
                    onClick={() => dispatch({ type: "move-item", id: selected.id, corner: c })}
                    className={`rounded-md border px-2 py-1.5 text-[11px] ${selected.corner === c ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white hover:border-[var(--color-ink)] disabled:opacity-40"}`}
                  >
                    {CORNER_NAMES[c]}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
                  On the <strong>{describeSurface(selected.surface).toLowerCase()}</strong>, {formatInches(selected.t)} from the left.
                </p>
                <div className="mt-2 flex items-center gap-1.5">
                  <button type="button" className="btn-mini" onClick={() => dispatch({ type: "nudge-item", id: selected.id, delta: -12 })} aria-label="Move left 12 inches">
                    ⟸ 12″
                  </button>
                  <button type="button" className="btn-mini" onClick={() => dispatch({ type: "nudge-item", id: selected.id, delta: -1 })} aria-label="Move left 1 inch">
                    ← 1″
                  </button>
                  <button type="button" className="btn-mini" onClick={() => dispatch({ type: "nudge-item", id: selected.id, delta: 1 })} aria-label="Move right 1 inch">
                    1″ →
                  </button>
                  <button type="button" className="btn-mini" onClick={() => dispatch({ type: "nudge-item", id: selected.id, delta: 12 })} aria-label="Move right 12 inches">
                    12″ ⟹
                  </button>
                </div>
                <label className="mt-3 block text-[11px] text-[var(--color-ink-soft)]">
                  Move to
                  <select
                    className="mt-1 block h-9 w-full rounded-md border border-[var(--color-border)] bg-white px-2 text-sm"
                    value={String(selected.surface)}
                    onChange={(e) => {
                      const s = e.target.value === "island" ? "island" : (Number(e.target.value) as WallId);
                      dispatch({ type: "move-item", id: selected.id, surface: s, t: 0 });
                    }}
                  >
                    {([0, 1, 2, 3] as WallId[]).filter((w) => !design.room.openWalls.includes(w)).map((w) => (
                      <option key={w} value={w}>
                        {WALL_NAMES[w]}
                      </option>
                    ))}
                    {design.island.enabled && def.level === "base" && <option value="island">Island</option>}
                  </select>
                </label>
              </>
            )}
          </section>

          {/* Width swap */}
          {alternatives.length > 0 && (
            <section>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Swap width</h4>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {alternatives.map((a) => (
                  <button key={a.id} type="button" onClick={() => dispatch({ type: "swap-item", id: selected.id, sku: a.id })} className="btn-mini" title={a.name}>
                    {formatInches(a.width)}
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Actions */}
          <section className="flex flex-wrap gap-1.5">
            <button type="button" className="btn-mini" onClick={() => dispatch({ type: "duplicate-item", id: selected.id })}>
              Duplicate
            </button>
            <button type="button" className="btn-mini" onClick={() => setUi({ panel: "notes" })}>
              Add note
            </button>
            <button
              type="button"
              className="btn-mini border-red-300 text-red-700 hover:bg-red-600 hover:text-white"
              onClick={() => {
                dispatch({ type: "remove-item", id: selected.id });
                setUi({ selectedId: null });
              }}
            >
              Remove
            </button>
          </section>

          {itemNotes.length > 0 && (
            <section>
              <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Notes on this unit</h4>
              <ul className="mt-2 space-y-1.5">
                {itemNotes.map((n) => (
                  <li key={n.id} className="rounded-md border border-[var(--color-border)] bg-[var(--color-cream)] p-2 text-[12px]">
                    {n.text}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    );
  }

  return <SurfaceInspector />;
}

function SurfaceInspector() {
  const { design, ui, setUi, dispatch, toast } = usePlanner();
  const s = ui.activeSurface;
  const isIsland = s === "island";
  const frame = surfaceFrame(design, s);
  const items = design.items.filter((i) => i.surface === s && i.corner === undefined);
  const total = items.reduce((sum, i) => sum + (getPlannerItem(i.sku)?.price ?? 0), 0);
  const probe = getPlannerItem("B24")!;
  const free = useMemo(() => (isIsland && !design.island.enabled ? [] : freeSpans(design, s, probe)), [design, s, isIsland, probe]);
  const freeTotal = free.reduce((a, [x, y]) => a + (y - x), 0);
  const [opts, setOpts] = useState<AutofillOptions>(DEFAULT_AUTOFILL);
  const openWall = !isIsland && design.room.openWalls.includes(s as WallId);

  const runAutofill = () => {
    const r = autofillSurface(design, s, opts);
    if (!r.actions.length) {
      toast(r.summary);
      return;
    }
    dispatch({ type: "batch", actions: r.actions });
    toast(r.summary);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-[var(--color-border)] p-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-dark)]">{isIsland ? "Island" : "Selected wall"}</p>
        <h3 className="mt-1 font-display text-xl text-[var(--color-ink)]">{describeSurface(s)}</h3>
        <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">
          {openWall ? "This side is open — nothing mounts here." : isIsland && !design.island.enabled ? "Turn the island on to add cabinets to it." : `${formatInches(isIsland ? frame.length : frame.length)} long · ${items.length} unit${items.length === 1 ? "" : "s"} · ${formatCad(total)}`}
        </p>
        {!openWall && !(isIsland && !design.island.enabled) && (
          <p className="mt-1 text-[11px] text-[var(--color-ink-soft)]">{isIsland ? "Island grows as you add cabinets." : `${formatInches(Math.round(freeTotal))} of free base-level space.`}</p>
        )}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scrollbar-thin p-4 space-y-5">
        {/* Pick a surface */}
        <section>
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Work on</h4>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {([0, 1, 2, 3] as WallId[]).map((w) => (
              <button
                key={w}
                type="button"
                disabled={design.room.openWalls.includes(w)}
                onClick={() => setUi({ activeSurface: w, selectedId: null })}
                className={`rounded-md border px-2 py-1.5 text-[11px] ${s === w ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white hover:border-[var(--color-ink)] disabled:opacity-40"}`}
              >
                {WALL_NAMES[w]}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setUi({ activeSurface: "island", selectedId: null })}
              className={`col-span-2 rounded-md border px-2 py-1.5 text-[11px] ${s === "island" ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white hover:border-[var(--color-ink)]"}`}
            >
              Island {design.island.enabled ? "" : "(off)"}
            </button>
          </div>
        </section>

        {/* Island controls */}
        <section>
          <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Island</h4>
          <label className="mt-2 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={design.island.enabled}
              onChange={(e) => {
                dispatch({ type: "set-island", patch: { enabled: e.target.checked } });
                if (e.target.checked) setUi({ activeSurface: "island", selectedId: null });
                else if (s === "island") setUi({ activeSurface: 0 });
              }}
            />
            <span>Add an island</span>
          </label>
          {design.island.enabled && (
            <div className="mt-2 space-y-2 text-[12px]">
              <p className="text-[var(--color-ink-soft)]">Drag the island around in the floor or 3D view. Doors face:</p>
              <div className="grid grid-cols-2 gap-1.5">
                {(["front wall", "left wall", "back wall", "right wall"] as const).map((label, f) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => dispatch({ type: "set-island", patch: { facing: f as 0 | 1 | 2 | 3 } })}
                    className={`rounded-md border px-2 py-1.5 text-[11px] capitalize ${design.island.facing === f ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white hover:border-[var(--color-ink)]"}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <label className="text-[11px] text-[var(--color-ink-soft)]">
                  From left wall (centre)
                  <input
                    type="number"
                    className="mt-1 h-9 w-full rounded-md border border-[var(--color-border)] bg-white px-2 text-sm"
                    value={Math.round(design.island.x)}
                    onChange={(e) => dispatch({ type: "set-island", patch: { x: Number(e.target.value) || 0 } })}
                  />
                </label>
                <label className="text-[11px] text-[var(--color-ink-soft)]">
                  From back wall (centre)
                  <input
                    type="number"
                    className="mt-1 h-9 w-full rounded-md border border-[var(--color-border)] bg-white px-2 text-sm"
                    value={Math.round(design.island.y)}
                    onChange={(e) => dispatch({ type: "set-island", patch: { y: Number(e.target.value) || 0 } })}
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        {/* Auto-fill */}
        {!openWall && !(isIsland && !design.island.enabled) && (
          <section>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Auto-fill {isIsland ? "the island" : "this wall"}</h4>
            <p className="mt-1 text-[12px] text-[var(--color-ink-soft)]">Fills the largest open stretch with an exact-fit run from the catalog. You can drag things around afterwards.</p>
            <div className="mt-2 space-y-1.5 text-[12px]">
              <select className="h-9 w-full rounded-md border border-[var(--color-border)] bg-white px-2 text-sm" value={opts.mix} onChange={(e) => setOpts({ ...opts, mix: e.target.value as AutofillOptions["mix"] })}>
                <option value="all-base">All door bases</option>
                <option value="mostly-base-some-drawer">Mostly bases, one drawer stack</option>
                <option value="mostly-drawer-some-base">Mostly drawer stacks</option>
                <option value="all-drawer">All drawer stacks</option>
              </select>
              {!isIsland && (
                <>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={opts.includeSink} onChange={(e) => setOpts({ ...opts, includeSink: e.target.checked })} /> Sink base (33″)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={opts.includeDishwasher} onChange={(e) => setOpts({ ...opts, includeDishwasher: e.target.checked })} /> Dishwasher space beside the sink
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={opts.includeRange} onChange={(e) => setOpts({ ...opts, includeRange: e.target.checked })} /> Range space (30″)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={opts.includeWallCabinets} onChange={(e) => setOpts({ ...opts, includeWallCabinets: e.target.checked })} /> Wall cabinets above
                  </label>
                </>
              )}
            </div>
            <button type="button" onClick={runAutofill} className="btn-primary mt-3 w-full text-sm">
              Auto-fill
            </button>
          </section>
        )}

        {items.length > 0 && (
          <section>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[var(--color-ink-soft)]">Units here</h4>
            <ul className="mt-2 divide-y divide-[var(--color-border)] border border-[var(--color-border)] bg-white">
              {items
                .slice()
                .sort((a, b) => a.t - b.t)
                .map((i) => {
                  const d = getPlannerItem(i.sku);
                  return (
                    <li key={i.id}>
                      <button type="button" onClick={() => setUi({ selectedId: i.id })} className="flex w-full items-center justify-between px-3 py-2 text-left text-[12px] hover:bg-[var(--color-cream)]">
                        <span>
                          <span className="font-mono text-[var(--color-accent-dark)]">{d?.short}</span> · {formatInches(d?.width ?? 0)} {d?.level === "wall" ? "wall" : ""}
                        </span>
                        <span className="text-[var(--color-ink-soft)]">{formatInches(i.t)}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
            <button
              type="button"
              onClick={() => {
                dispatch({ type: "clear-surface", surface: s as SurfaceId });
              }}
              className="btn-mini mt-2 border-red-300 text-red-700 hover:bg-red-600 hover:text-white"
            >
              Clear {isIsland ? "island" : "this wall"}
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
