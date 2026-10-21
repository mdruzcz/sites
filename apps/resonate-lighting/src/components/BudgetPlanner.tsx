"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { audio, coloursFor, hexRgb, renderSelection, syntheticPast, THEMES, type Selection } from "@/lib/lightshow/core";
import { SceneRenderer } from "@/lib/lightshow/renderer";
import { BUDGET_CAMERA, layoutScene } from "@/lib/lightshow/scenes";
import { addTicker } from "@/lib/lightshow/ticker";
import { encodeCounts, estimate, planForBudget, totalProps, type Counts, describeCounts } from "@/lib/estimate";
import { formatCad, pricing, PROP_TYPES, PROVINCES, zoneForProvince, type PropType } from "@/lib/pricing";
import { deviceQuality, useReducedMotion } from "./demo/useReducedMotion";

const { min: MIN, max: MAX } = pricing.planner;
const toBudget = (pos: number) => {
  const raw = MIN * Math.pow(MAX / MIN, pos / 1000);
  const step = raw < 20000 ? 500 : raw < 100000 ? 1000 : 5000;
  return Math.min(MAX, Math.max(MIN, Math.round(raw / step) * step));
};
const toPos = (b: number) => Math.round((1000 * Math.log(b / MIN)) / Math.log(MAX / MIN));

type Props = { defaultProvince?: string; cityName?: string; id?: string };

export function BudgetPlanner({ defaultProvince = "SK", cityName, id = "budget-planner" }: Props) {
  const [budget, setBudget] = useState<number>(pricing.planner.default);
  const [province, setProvince] = useState(defaultProvince);
  const [custom, setCustom] = useState<Counts | null>(null);
  const [theme, setTheme] = useState("Christmas");
  const zone = zoneForProvince(province);

  const plan = useMemo(() => planForBudget(budget, zone), [budget, zone]);
  const counts = custom ?? plan.counts;
  const est = useMemo(() => estimate(counts, zone), [counts, zone]);
  const provinceName = PROVINCES.find((p) => p.code === province)?.name ?? province;
  const pkgLabel = est.pkg ? est.pkg.fullName : null;

  const quoteHref = `/contact?${new URLSearchParams({
    budget: String(budget),
    layout: encodeCounts(counts),
    prov: province,
    ...(est.pkg ? { kit: est.pkg.slug } : {}),
    ...(cityName ? { city: cityName } : {}),
  }).toString()}#quote`;

  const fill = `${(toPos(budget) / 10).toFixed(1)}%`;

  const step = (t: PropType, d: number) => {
    const next = { ...counts, [t]: Math.max(0, Math.min(pricing.planner.caps[t], counts[t] + d)) };
    if (totalProps(next) === 0) return;
    setCustom(next);
  };

  return (
    <div id={id} className="card overflow-hidden scroll-mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 relative bg-[#04060b] min-h-[280px]">
          <div className="relative w-full aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[520px]">
            <BudgetScene counts={counts} theme={theme} />
          </div>
          <div className="absolute top-3 left-3 right-3 flex flex-wrap items-start justify-between gap-2 pointer-events-none">
            <div className="pointer-events-none">
              <p className="text-[11px] uppercase tracking-widest text-muted-strong font-semibold">{custom ? "Your custom layout" : "Layout for this budget"}</p>
              <p className="text-sm text-white/90 font-semibold max-w-[34ch]">{describeCounts(counts)}</p>
            </div>
            <label className="pointer-events-auto">
              <span className="sr-only">Preview theme</span>
              <select value={theme} onChange={(e) => setTheme(e.target.value)} className="rounded-lg border border-line bg-[rgba(11,15,26,0.8)] text-white text-xs px-2 min-h-[44px]">
                {THEMES.map((t) => (
                  <option key={t.name}>{t.name}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="lg:col-span-5 p-5 sm:p-7 space-y-5">
          <div>
            <label htmlFor={`${id}-budget`} className="block text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">
              Project budget (installed, before tax)
            </label>
            <p className="h-display text-4xl text-white" aria-live="polite">
              {formatCad(budget)}
            </p>
            <input
              id={`${id}-budget`}
              type="range"
              min={0}
              max={1000}
              step={1}
              value={toPos(budget)}
              onChange={(e) => {
                setBudget(toBudget(+e.target.value));
                setCustom(null);
              }}
              aria-valuetext={formatCad(budget)}
              className="range-rl"
              style={{ ["--fill" as string]: fill }}
            />
            <div className="flex justify-between text-[11px] text-muted -mt-1">
              <span>{formatCad(MIN)}</span>
              <span>{formatCad(25000)}</span>
              <span>{formatCad(100000)}</span>
              <span>{formatCad(MAX)}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Jump to a package">
            {pricing.packages.map((p) => (
              <button
                key={p.slug}
                type="button"
                className="seg"
                aria-pressed={!!custom && est.pkg?.slug === p.slug && totalProps(counts) === totalProps(p.contents)}
                onClick={() => {
                  setCustom({ ...p.contents });
                  setBudget(Math.min(MAX, Math.max(MIN, Math.ceil(estimate(p.contents, zone).total / 500) * 500)));
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor={`${id}-prov`} className="block text-[11px] uppercase tracking-widest text-muted font-semibold mb-1">
              Where is the project?
            </label>
            <select
              id={`${id}-prov`}
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface px-3 text-sm text-white min-h-[44px]"
            >
              {PROVINCES.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name} · {pricing.travel.zones[zoneForProvince(p.code)].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold mb-2">Adjust props</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
              {PROP_TYPES.map((t) => (
                <li key={t} className="flex items-center justify-between gap-2 rounded-lg border border-line bg-surface px-3 py-1.5">
                  <span className="text-sm text-muted-strong">{pricing.props[t].plural}</span>
                  <span className="flex items-center gap-1">
                    <button type="button" className="w-11 h-11 rounded-lg text-white text-lg hover:bg-white/10 disabled:opacity-30" onClick={() => step(t, -1)} disabled={counts[t] === 0} aria-label={`Remove one ${pricing.props[t].label.toLowerCase()}`}>
                      −
                    </button>
                    <span className="w-6 text-center text-white font-semibold tabular-nums">{counts[t]}</span>
                    <button
                      type="button"
                      className="w-11 h-11 rounded-lg text-white text-lg hover:bg-white/10 disabled:opacity-30"
                      onClick={() => step(t, 1)}
                      disabled={counts[t] >= pricing.planner.caps[t]}
                      aria-label={`Add one ${pricing.props[t].label.toLowerCase()}`}
                    >
                      +
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-soft p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7">
          <h3 className="text-lg font-bold text-white mb-1">Itemised estimate</h3>
          <p className="text-xs text-muted mb-4">
            {pkgLabel ? `Priced as the ${pkgLabel}${est.hardware.length > 1 ? " plus extras" : ""}. ` : ""}
            Installation in {provinceName}: {pricing.travel.zones[zone].summary}
          </p>
          <table className="est-table w-full text-sm">
            <tbody>
              {est.hardware.map((l) => (
                <tr key={l.label}>
                  <td className="pr-3">
                    <span className="text-white font-semibold">{l.label}</span>
                    {l.detail && <span className="block text-xs text-muted">{l.detail}</span>}
                  </td>
                  <td className="text-right text-muted whitespace-nowrap pr-3">{l.qty > 1 ? `${l.qty} × ${formatCad(l.unit)}` : ""}</td>
                  <td className="text-right text-white tabular-nums whitespace-nowrap">{formatCad(l.total)}</td>
                </tr>
              ))}
              <tr>
                <td className="text-muted-strong font-semibold">Kit subtotal</td>
                <td />
                <td className="text-right text-white font-semibold tabular-nums">{formatCad(est.hardwareTotal)}</td>
              </tr>
              {est.install.map((l) => (
                <tr key={l.label}>
                  <td className="pr-3">
                    <span className="text-white font-semibold">{l.label}</span>
                    {l.detail && <span className="block text-xs text-muted">{l.detail}</span>}
                  </td>
                  <td className="text-right text-muted whitespace-nowrap pr-3">{`${l.qty} × ${formatCad(l.unit)}`}</td>
                  <td className="text-right text-white tabular-nums whitespace-nowrap">{formatCad(l.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-5 flex flex-col">
          <div className="card card-glow is-active p-6 mb-4">
            <p className="text-[11px] uppercase tracking-widest text-muted font-semibold">Estimated project total</p>
            <p className="h-display text-4xl text-white mt-1">{formatCad(est.total)}</p>
            <p className="text-xs text-muted mt-1">CAD, {pricing.taxNote}. Kit {formatCad(est.hardwareTotal)} + installation and travel {formatCad(est.installTotal)}.</p>
            {!custom && plan.underMinimum && (
              <p className="text-sm text-[#FFD08A] mt-3">
                Our smallest complete system is the Starter Kit at {formatCad(est.total)} installed in {provinceName}. Smaller budgets: ask about a supply-only kit.
              </p>
            )}
            {!custom && !plan.underMinimum && plan.remaining >= 1000 && (
              <p className="text-sm text-muted-strong mt-3">
                {formatCad(plan.remaining)} of your budget is unallocated{plan.atCap ? "" : " (the next prop would go over)"}. We will suggest options in your quote.
              </p>
            )}
            {custom && est.total > budget && (
              <p className="text-sm text-[#FFD08A] mt-3">This layout is {formatCad(est.total - budget)} over the budget on the slider.</p>
            )}
          </div>
          <Link href={quoteHref} className="btn btn-primary w-full">
            Request a quote for this layout
          </Link>
          <p className="text-xs text-muted mt-3 leading-relaxed">
            Starting prices. Every quote is confirmed after a site review: tree sizes, roofline lengths, power and access change the final figure. {pricing.installation.liftNote}
          </p>
        </div>
      </div>
    </div>
  );
}

function BudgetScene({ counts, theme }: { counts: Counts; theme: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const rRef = useRef<SceneRenderer | null>(null);
  const selRef = useRef<Selection>({ kind: "theme", name: theme });
  const reduced = useReducedMotion();
  const key = encodeCounts(counts);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    try {
      rRef.current = new SceneRenderer(cv, { camera: BUDGET_CAMERA, reduced });
    } catch {
      return;
    }
    const r = rRef.current;
    let t = 4;
    return addTicker(cv, (dt) => {
      t += dt * (reduced ? 0.35 : 1);
      const sel = selRef.current;
      const C = coloursFor(sel, []).map(hexRgb);
      r.draw(dt, (p, out) => renderSelection(sel, C, t, p.g, out, audio(t), syntheticPast(t), false));
    });
  }, [reduced]);

  useEffect(() => {
    selRef.current = { kind: "theme", name: theme };
  }, [theme]);

  useEffect(() => {
    const r = rRef.current;
    if (!r) return;
    const c = Object.fromEntries(key.split(".").map((kv) => kv.split("-"))) as Record<PropType, string>;
    const parsed = Object.fromEntries(PROP_TYPES.map((t) => [t, +c[t] || 0])) as Counts;
    r.setProps(layoutScene(parsed, deviceQuality() < 1 ? 1300 : 2600), BUDGET_CAMERA, r.props.length > 0);
  }, [key, reduced]);

  return (
    <canvas ref={ref} className="absolute inset-0 block w-full h-full" role="img" aria-label={`3D preview of the layout: ${describeCounts(counts)}`}>
      {describeCounts(counts)}
    </canvas>
  );
}
