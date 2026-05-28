"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { WallLayout } from "./wall-layout";
import { useUI } from "./ui-context";
import { planWall, type Preferences, type WallPiece } from "@/lib/visualizer";
import { formatCad } from "@/lib/utils";

const PRESETS: Array<{ label: string; prefs: Preferences }> = [
  {
    label: "8 ft wall (96″) — basic run",
    prefs: {
      wallLength: 96,
      cabinetMix: "mostly-base-some-drawer",
      includeSink: false,
      includeLazySusan: false,
      includeBlindCorner: false,
      includeWallCabinets: true,
    },
  },
  {
    label: "10 ft wall (120″) — with sink",
    prefs: {
      wallLength: 120,
      cabinetMix: "mostly-base-some-drawer",
      includeSink: 33,
      includeLazySusan: false,
      includeBlindCorner: false,
      includeWallCabinets: true,
    },
  },
  {
    label: "12 ft L-shape (144″) — lazy susan + sink",
    prefs: {
      wallLength: 144,
      cabinetMix: "mostly-base-some-drawer",
      includeSink: 33,
      includeLazySusan: 33,
      includeBlindCorner: false,
      includeWallCabinets: true,
    },
  },
  {
    label: "All drawers, 96″",
    prefs: {
      wallLength: 96,
      cabinetMix: "all-drawer",
      includeSink: false,
      includeLazySusan: false,
      includeBlindCorner: false,
      includeWallCabinets: true,
    },
  },
];

export function VisualizerForm() {
  const { addItem, openDrawer } = useUI();
  const [prefs, setPrefs] = useState<Preferences>(PRESETS[1].prefs);
  const [draftLength, setDraftLength] = useState(String(prefs.wallLength));

  const solverPlan = useMemo(() => planWall(prefs), [prefs]);

  // Allow user to reorder pieces independently of the solver
  const [basePieces, setBasePieces] = useState<WallPiece[]>(solverPlan.pieces);
  const [wallPieces, setWallPieces] = useState<WallPiece[] | undefined>(solverPlan.wallPieces);

  useEffect(() => {
    setBasePieces(solverPlan.pieces);
    setWallPieces(solverPlan.wallPieces);
  }, [solverPlan]);

  const plan = useMemo(
    () => ({
      ...solverPlan,
      pieces: basePieces,
      wallPieces: wallPieces,
      totalWidth: basePieces.reduce((s, p) => s + p.width_in, 0),
      totalPrice: basePieces.reduce((s, p) => s + (p.cabinet?.price_cad ?? 0), 0),
      wallTotalPrice: wallPieces?.reduce((s, p) => s + (p.cabinet?.price_cad ?? 0), 0),
      exactMatch: basePieces.reduce((s, p) => s + p.width_in, 0) === prefs.wallLength,
    }),
    [solverPlan, basePieces, wallPieces, prefs.wallLength],
  );

  const reorderBase = (from: number, to: number) => {
    setBasePieces((prev) => {
      const next = prev.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };
  const reorderWall = (from: number, to: number) => {
    setWallPieces((prev) => {
      if (!prev) return prev;
      const next = prev.slice();
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const applyDraft = () => {
    const n = Math.max(24, Math.min(240, Number(draftLength) || 0));
    setPrefs((p) => ({ ...p, wallLength: n }));
    setDraftLength(String(n));
  };

  const addAllToList = () => {
    // Aggregate by SKU across base + wall pieces
    const counts = new Map<string, number>();
    for (const p of plan.pieces) {
      counts.set(p.cabinet.sku, (counts.get(p.cabinet.sku) ?? 0) + 1);
    }
    for (const p of plan.wallPieces ?? []) {
      counts.set(p.cabinet.sku, (counts.get(p.cabinet.sku) ?? 0) + 1);
    }
    for (const [sku, qty] of counts) addItem(sku, qty);
    openDrawer();
  };

  const totalPieces = plan.pieces.length + (plan.wallPieces?.length ?? 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
      <div className="space-y-6">
        <div>
          <label className="block text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Wall length (inches)
          </label>
          <div className="mt-2 flex gap-2">
            <input
              type="number"
              min={24}
              max={240}
              step="1"
              value={draftLength}
              onChange={(e) => setDraftLength(e.target.value)}
              onBlur={applyDraft}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyDraft();
                }
              }}
              className="h-11 w-full rounded-sm border border-[var(--color-line)] bg-white px-3 text-base focus:border-[var(--color-navy)] focus:outline-none"
            />
            <button
              type="button"
              onClick={applyDraft}
              className="btn-secondary h-11 px-4 text-xs"
            >
              Update
            </button>
          </div>
          <p className="mt-1 text-xs text-[var(--color-ink-soft)]">
            96″ = 8 ft · 120″ = 10 ft · 144″ = 12 ft
          </p>
        </div>

        <fieldset>
          <legend className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Cabinet mix
          </legend>
          <div className="mt-2 space-y-2 text-sm">
            {(
              [
                ["all-base", "All single-door bases"],
                ["mostly-base-some-drawer", "Mostly bases, one drawer stack"],
                ["mostly-drawer-some-base", "Mostly drawer stacks, one base"],
                ["all-drawer", "All drawer stacks"],
              ] as const
            ).map(([val, label]) => (
              <label
                key={val}
                className={`flex cursor-pointer items-center gap-2 rounded-sm border px-3 py-2 ${
                  prefs.cabinetMix === val
                    ? "border-[var(--color-navy)] bg-[var(--color-sandstone-soft)]"
                    : "border-[var(--color-line)] bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="mix"
                  checked={prefs.cabinetMix === val}
                  onChange={() => setPrefs((p) => ({ ...p, cabinetMix: val }))}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Include
          </legend>
          <div className="mt-2 space-y-2 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!prefs.includeSink}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, includeSink: e.target.checked ? 33 : false }))
                }
              />
              <span>Sink base (33″)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!prefs.includeLazySusan}
                onChange={(e) =>
                  setPrefs((p) => ({
                    ...p,
                    includeLazySusan: e.target.checked ? 33 : false,
                  }))
                }
              />
              <span>Lazy Susan corner (33″)</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={prefs.includeBlindCorner}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, includeBlindCorner: e.target.checked }))
                }
              />
              <span>Blind base corner (42–45″)</span>
            </label>
            <label className="flex items-center gap-2 border-t border-[var(--color-line)] pt-2 mt-2">
              <input
                type="checkbox"
                checked={prefs.includeWallCabinets}
                onChange={(e) =>
                  setPrefs((p) => ({ ...p, includeWallCabinets: e.target.checked }))
                }
              />
              <span><strong>Wall cabinets above</strong> (36″ tall)</span>
            </label>
          </div>
        </fieldset>

        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--color-ink-soft)]">
            Quick presets
          </p>
          <div className="mt-2 space-y-1">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setPrefs(p.prefs);
                  setDraftLength(String(p.prefs.wallLength));
                }}
                className="block w-full rounded-sm px-2 py-1.5 text-left text-xs text-[var(--color-ink-soft)] hover:bg-[var(--color-sandstone-soft)] hover:text-[var(--color-navy)]"
              >
                {p.label} →
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <WallLayout
          plan={plan}
          wallLength={prefs.wallLength}
          onReorderBase={reorderBase}
          onReorderWall={reorderWall}
        />

        <div className="border border-[var(--color-line)] bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] text-left text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-[var(--color-sandstone-soft)]/60">
                <td colSpan={3} className="px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                  Base cabinets
                </td>
              </tr>
              {plan.pieces.map((p, i) => (
                <tr key={`base-row-${i}`} className="border-b border-[var(--color-line)] last:border-b-0">
                  <td className="px-4 py-3">
                    <Link
                      href={`/cabinets/${p.cabinet.slug}`}
                      className="font-medium hover:underline underline-offset-4"
                    >
                      {p.cabinet.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-brass-dark)]">{p.cabinet.sku}</td>
                  <td className="px-4 py-3 text-right">{formatCad(p.cabinet.price_cad)}</td>
                </tr>
              ))}
              {plan.wallPieces && plan.wallPieces.length > 0 && (
                <>
                  <tr className="bg-[var(--color-sandstone-soft)]/60">
                    <td colSpan={3} className="px-4 py-2 text-[10px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                      Wall cabinets above
                    </td>
                  </tr>
                  {plan.wallPieces.map((p, i) => (
                    <tr key={`wall-row-${i}`} className="border-b border-[var(--color-line)] last:border-b-0">
                      <td className="px-4 py-3">
                        <Link
                          href={`/cabinets/${p.cabinet.slug}`}
                          className="font-medium hover:underline underline-offset-4"
                        >
                          {p.cabinet.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-[var(--color-brass-dark)]">{p.cabinet.sku}</td>
                      <td className="px-4 py-3 text-right">{formatCad(p.cabinet.price_cad)}</td>
                    </tr>
                  ))}
                </>
              )}
              <tr className="bg-[var(--color-sandstone-soft)]">
                <td className="px-4 py-3 text-right uppercase text-xs tracking-widest text-[var(--color-ink-soft)]" colSpan={2}>
                  Total
                </td>
                <td className="px-4 py-3 text-right font-display text-xl">
                  {formatCad(plan.totalPrice + (plan.wallTotalPrice ?? 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-3 no-print">
          <button type="button" onClick={addAllToList} className="btn-primary">
            Add all {totalPieces} cabinets to Request List
          </button>
          <button
            type="button"
            onClick={() => typeof window !== "undefined" && window.print()}
            className="btn-secondary"
            aria-label="Print or save as PDF"
          >
            🖨 Print / Save as PDF
          </button>
          <Link href="/cabinets" className="btn-secondary">
            Browse the full catalog
          </Link>
        </div>
        <div className="print-show mt-8 border-t-2 border-[var(--color-navy)] pt-6">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
                Forever Cabinets · Design Sheet
              </p>
              <h2 className="font-display text-2xl">{prefs.wallLength}″ wall layout</h2>
            </div>
            <p className="text-xs text-[var(--color-ink-soft)]">
              forevercabinets.ca · {new Date().toLocaleDateString("en-CA")}
            </p>
          </div>
          <p className="mt-2 text-xs text-[var(--color-ink-soft)]">
            Quote subject to in-stock confirmation. Final freight quoted by postal code. Lead time 2–3 weeks.
          </p>
        </div>
        <p className="text-xs text-[var(--color-ink-soft)]">
          The visualizer suggests an exact-fit combination from our catalog. Edit cabinets in your Request List, or contact us for custom layouts (corners, peninsulas, islands, etc.).
        </p>
      </div>
    </div>
  );
}
