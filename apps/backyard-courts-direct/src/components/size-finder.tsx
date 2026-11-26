"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export interface FinderKit {
  slug: string;
  sport: string;
  sportName: string;
  label: string;
  long: number;
  short: number;
  price: number;
}

interface Props {
  kits: FinderKit[];
  sports: { slug: string; name: string }[];
}

const money = (n: number) => `$${Math.round(n).toLocaleString("en-CA")}`;

/**
 * "What fits my yard?" Enter a length and width in feet and see the kits that
 * fit, largest first, plus a ballpark for a court cut to exactly that size.
 */
export function SizeFinder({ kits, sports }: Props) {
  const [length, setLength] = useState("60");
  const [width, setWidth] = useState("30");
  const [sport, setSport] = useState("all");

  const L = Math.max(Number(length) || 0, Number(width) || 0);
  const W = Math.min(Number(length) || 0, Number(width) || 0);
  const valid = L >= 6 && W >= 6 && L <= 400 && W <= 400;

  const { fits, estimate } = useMemo(() => {
    const pool = kits.filter((k) => sport === "all" || k.sport === sport);
    const fits = valid
      ? pool
          .filter((k) => k.long <= L && k.short <= W)
          .sort((a, b) => b.long * b.short - a.long * a.short)
          .slice(0, 4)
      : [];
    // Rate of the kit closest in area, applied to the space entered.
    const area = L * W;
    const ref = pool.filter((k) => sport !== "all" || k.sport !== "shuffleboard").sort((a, b) => Math.abs(a.long * a.short - area) - Math.abs(b.long * b.short - area))[0];
    const estimate = valid && ref ? Math.round((area * (ref.price / (ref.long * ref.short))) / 5) * 5 : 0;
    return { fits, estimate };
  }, [kits, sport, L, W, valid]);

  const customHref = `/contact?space=${encodeURIComponent(`${L} x ${W}`)}${sport !== "all" ? `&sport=${encodeURIComponent(sports.find((s) => s.slug === sport)?.name ?? "")}` : ""}#quote`;

  return (
    <div className="card grid gap-6 p-5 md:p-8 lg:grid-cols-[20rem_1fr] lg:gap-10">
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="sf-length" className="label">
              Length (ft)
            </label>
            <input id="sf-length" className="field" type="number" inputMode="numeric" min={6} max={400} value={length} onChange={(e) => setLength(e.target.value)} />
          </div>
          <div>
            <label htmlFor="sf-width" className="label">
              Width (ft)
            </label>
            <input id="sf-width" className="field" type="number" inputMode="numeric" min={6} max={400} value={width} onChange={(e) => setWidth(e.target.value)} />
          </div>
        </div>
        <div>
          <label htmlFor="sf-sport" className="label">
            Sport
          </label>
          <select id="sf-sport" className="field" value={sport} onChange={(e) => setSport(e.target.value)}>
            <option value="all">Any sport</option>
            {sports.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        {valid && estimate > 0 && (
          <div className="rounded-[12px] bg-[var(--accent-soft)] p-4">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-[var(--accent-ink)]">Cut to {L} x {W} ft</p>
            <p className="mt-1 text-2xl font-black tracking-[-0.02em]">About {money(estimate)}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">
              Estimate for {(L * W).toLocaleString("en-CA")} sq ft of tile, before freight and tax. Your quote confirms the price.
            </p>
            <Link href={customHref} className="link-arrow !min-h-0 mt-2 text-sm">
              Quote this size <span aria-hidden>→</span>
            </Link>
          </div>
        )}
      </form>

      <div aria-live="polite">
        <p className="text-sm font-bold text-[var(--muted)]">
          {!valid ? "Enter a length and width between 6 and 400 feet." : fits.length ? `Kits that fit a ${L} x ${W} ft space` : "No standard kit fits that space. A custom size will."}
        </p>
        <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
          {fits.map((k) => (
            <li key={k.slug}>
              <Link href={`/court-kits/${k.slug}`} className="group flex min-h-[72px] items-center justify-between gap-3 rounded-[12px] border-[1.5px] border-[var(--line)] p-3.5 transition-colors hover:border-[var(--accent)]">
                <span>
                  <span className="block text-xs font-bold uppercase tracking-[0.1em] text-[var(--muted)]">{k.label}</span>
                  <span className="block font-black">
                    {k.long} x {k.short} ft
                  </span>
                </span>
                <span className="text-right">
                  <span className="block font-black">{money(k.price)}</span>
                  <span className="block text-xs font-bold text-[var(--accent-ink)] group-hover:underline">View kit →</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {valid && fits.length === 0 && (
          <Link href={customHref} className="btn btn-accent mt-4">
            Ask about a custom size <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
