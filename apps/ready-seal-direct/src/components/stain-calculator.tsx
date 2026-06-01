"use client";

import { useState } from "react";
import Link from "next/link";

// Ready Seal coverage (sq ft per gallon).
// First coat soaks into bare wood; rough/weathered wood drinks up far more than smooth.
// A SECOND coat goes onto already-sealed wood, so it behaves like a smooth surface and
// covers much further — it uses noticeably less product than the first.
const COVERAGE = {
  roughFirst: 125,
  smoothFirst: 250,
  sealedSecond: 250
};

function fmt(n: number) {
  // one decimal, but drop a trailing .0
  return Number.isInteger(n) ? String(n) : n.toFixed(1);
}

export function StainCalculator() {
  const [project, setProject] = useState<"deck" | "fence">("deck");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [surface, setSurface] = useState<"smooth" | "rough">("rough");
  const [coats, setCoats] = useState(2);

  const l = parseFloat(length) || 0;
  const w = parseFloat(width) || 0;
  // Deck: length × width (top surface). Fence: length × height, ×2 for both sides.
  const area = project === "deck" ? l * w : l * w * 2;

  const coat1Coverage = surface === "smooth" ? COVERAGE.smoothFirst : COVERAGE.roughFirst;
  const coat1Gal = area > 0 ? area / coat1Coverage : 0;
  // Second coat lands on sealed wood — covers like a smooth deck, so it needs less.
  const coat2Gal = area > 0 && coats === 2 ? area / COVERAGE.sealedSecond : 0;
  const totalGal = coat1Gal + coat2Gal;
  const gallonsRounded = Math.ceil(totalGal - 1e-9);

  // Recommend pail mix: prefer 5-gallon pails for 5+ gallons
  const fivePacks = Math.floor(gallonsRounded / 5);
  const singles = gallonsRounded - fivePacks * 5;

  return (
    <div className="mt-8 rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <div className="flex gap-2">
        {(["deck", "fence"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setProject(p)}
            className={`rounded-md px-4 py-2 text-sm font-semibold capitalize transition ${
              project === p
                ? "bg-[var(--color-brand)] text-white"
                : "border border-[var(--color-border)] bg-white text-slate-600"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Num label={project === "deck" ? "Deck length (ft)" : "Fence length (ft)"} value={length} onChange={setLength} />
        <Num label={project === "deck" ? "Deck width (ft)" : "Fence height (ft)"} value={width} onChange={setWidth} />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Wood surface (first coat)</span>
          <select
            value={surface}
            onChange={(e) => setSurface(e.target.value as "smooth" | "rough")}
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm"
          >
            <option value="rough">Rough / weathered — soaks up more (~125 sq ft/gal)</option>
            <option value="smooth">Smooth / planed — covers further (~250 sq ft/gal)</option>
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-medium text-slate-600">Coats</span>
          <select
            value={coats}
            onChange={(e) => setCoats(Number(e.target.value))}
            className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm"
          >
            <option value={2}>2 coats (recommended)</option>
            <option value={1}>1 coat</option>
          </select>
        </label>
      </div>

      {area > 0 && (
        <div className="mt-6 rounded-xl bg-[var(--color-brand-soft)] p-5">
          <p className="text-sm text-slate-600">
            Estimated area to cover: <strong>{Math.round(area).toLocaleString()} sq ft</strong>
            {project === "fence" && " (both sides)"}
          </p>
          <p className="font-display mt-1 text-3xl text-[var(--color-brand)]">
            ≈ {fmt(Math.round(totalGal * 10) / 10)} gallon{totalGal === 1 ? "" : "s"}
            <span className="ml-2 align-middle text-base font-medium text-slate-500">
              → order {gallonsRounded} gal
            </span>
          </p>

          {coats === 2 && (
            <p className="mt-2 text-sm text-slate-600">
              <strong>Coat 1:</strong> {fmt(Math.round(coat1Gal * 10) / 10)} gal on{" "}
              {surface === "smooth" ? "smooth" : "rough"} wood &nbsp;·&nbsp;{" "}
              <strong>Coat 2:</strong> {fmt(Math.round(coat2Gal * 10) / 10)} gal — the wood is now
              sealed, so the second coat covers like a smooth deck and uses less.
            </p>
          )}

          <p className="mt-3 text-sm text-slate-700">
            Suggested:{" "}
            {fivePacks > 0 && (
              <strong>
                {fivePacks} × 5-gallon pail{fivePacks === 1 ? "" : "s"}
              </strong>
            )}
            {fivePacks > 0 && singles > 0 && " + "}
            {singles > 0 && (
              <strong>
                {singles} × 1-gallon pail{singles === 1 ? "" : "s"}
              </strong>
            )}
            {gallonsRounded >= 5 && (
              <span className="ml-1 text-[var(--color-success)]">— buying the 5-gallon pail saves you money.</span>
            )}
          </p>

          <Link href="/shop" className="btn-primary mt-4 inline-flex justify-center">
            Shop Ready Seal colors →
          </Link>
        </div>
      )}

      <p className="mt-4 text-xs text-slate-500">
        Ready Seal recommends <strong>two coats</strong> for the richest, longest-lasting color —
        applied wet-on-wet, the second coat goes on within ~15&ndash;45 minutes while the first is
        still tacky. Because the wood is already sealed, that second coat covers much further than
        the first. Coverage varies with how porous and dry your wood is, so order a little extra —
        Ready Seal stores well in a sealed pail.
      </p>
    </div>
  );
}

function Num({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <input
        type="number"
        min={0}
        inputMode="decimal"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-md border border-[var(--color-border)] px-3 py-2 text-sm shadow-sm"
        placeholder="0"
      />
    </label>
  );
}
