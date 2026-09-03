'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Icon } from './icons';

// ─── Pricing model (client-side, honest, shown as a range) ───────────────────
const pricing = {
  currency: 'CAD',
  perLinearFootLow: 28,
  perLinearFootHigh: 44,
  minimumJobCad: 1900,
  resultDisclaimer:
    'This is a ballpark estimate based on typical rooflines, not a binding quote — a free on-site measurement confirms your exact linear footage and final pricing.',
  homeSizePresets: [
    { label: 'Bungalow / small single-storey', approxLinearFeet: 110 },
    { label: 'Storey-and-a-half / mid-size home', approxLinearFeet: 150 },
    { label: 'Two-storey detached', approxLinearFeet: 200 },
    { label: 'Large two-storey / complex roofline', approxLinearFeet: 280 },
    { label: 'Estate / multi-peak with detached garage', approxLinearFeet: 360 },
  ],
  featureModifiers: [
    {
      key: 'second_storey_access',
      label: 'Two-storey or hard-to-reach access',
      addPerFootCad: 4,
      note: 'Second-storey runs, steep pitches, or areas needing a lift add labour and safety time.',
    },
    {
      key: 'premium_rgbw_white',
      label: 'Premium RGBW + dedicated warm-white channel',
      addPerFootCad: 3,
      note: 'Adds a true warm-white channel for crisp everyday accent light alongside full-colour holiday scenes.',
    },
    {
      key: 'extra_zones_controller',
      label: 'Extra controller / multi-zone control',
      addPerFootCad: 2,
      note: 'Independent zones (e.g. house, garage, peaks) controlled separately in the app.',
    },
    {
      key: 'outbuilding_tiein',
      label: 'Detached garage or outbuilding tie-in',
      addPerFootCad: 2,
      note: 'Extends the system to a separate structure with its own wiring run and power feed.',
    },
  ],
} as const;

const MIN_FEET = 40;
const MAX_FEET = 500;

function formatCad(n: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

// Numbered step label used for each fieldset legend.
function StepLegend({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <legend className="mb-4">
      <span className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-ink text-white text-sm font-bold flex items-center justify-center shrink-0">{n}</span>
        <span className="font-heading text-lg md:text-xl font-bold text-ink">{children}</span>
      </span>
    </legend>
  );
}

export function CostEstimator() {
  // Default to the two-storey preset (index 2).
  const [presetIndex, setPresetIndex] = useState(2);
  const [feet, setFeet] = useState<number>(pricing.homeSizePresets[2].approxLinearFeet);
  const [active, setActive] = useState<Record<string, boolean>>({});

  // Selecting a preset sets the linear-foot value; editing feet directly
  // switches the mode to "custom" (presetIndex = -1).
  function selectPreset(i: number) {
    setPresetIndex(i);
    setFeet(pricing.homeSizePresets[i].approxLinearFeet);
  }

  function setCustomFeet(value: number) {
    const clamped = Math.min(MAX_FEET, Math.max(MIN_FEET, Math.round(value)));
    setFeet(clamped);
    setPresetIndex(-1);
  }

  function toggleModifier(key: string) {
    setActive(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const { low, high, addPerFoot } = useMemo(() => {
    const extraPerFoot = pricing.featureModifiers.reduce(
      (sum, m) => (active[m.key] ? sum + m.addPerFootCad : sum),
      0,
    );
    const rawLow = feet * (pricing.perLinearFootLow + extraPerFoot);
    const rawHigh = feet * (pricing.perLinearFootHigh + extraPerFoot);
    return {
      addPerFoot: extraPerFoot,
      low: Math.max(pricing.minimumJobCad, rawLow),
      high: Math.max(pricing.minimumJobCad, rawHigh),
    };
  }, [feet, active]);

  const atMinimum = low === pricing.minimumJobCad && high === pricing.minimumJobCad;

  // Financing: 10% APR over a 24-month term. Standard amortized monthly payment
  // per dollar financed = r / (1 - (1 + r)^-24), r = 0.10/12 ≈ 0.046145.
  const FIN_MONTHLY_FACTOR = 0.046145;
  const monthlyLow = Math.round(low * FIN_MONTHLY_FACTOR);
  const monthlyHigh = Math.round(high * FIN_MONTHLY_FACTOR);

  return (
    <div className="grid lg:grid-cols-5 gap-8 lg:gap-10">
      {/* ─── Inputs ─── */}
      <div className="lg:col-span-3 space-y-10">
        {/* Home size presets */}
        <fieldset>
          <StepLegend n={1}>Pick your home size</StepLegend>
          <div className="grid sm:grid-cols-2 gap-3">
            {pricing.homeSizePresets.map((p, i) => {
              const selected = presetIndex === i;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => selectPreset(i)}
                  aria-pressed={selected}
                  className={`card text-left p-4 md:p-5 min-h-[44px] flex items-start justify-between gap-3 transition-colors ${
                    selected ? 'border-ink bg-tint' : 'hover:border-ink/40'
                  }`}
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-ink leading-snug">{p.label}</span>
                    <span className="block text-xs text-muted mt-1">About {p.approxLinearFeet} linear ft</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      selected ? 'bg-accent text-ink' : 'border-[1.5px] border-line text-transparent'
                    }`}
                  >
                    <Icon.check size={12} strokeWidth={2.5} />
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        {/* Linear feet override */}
        <fieldset>
          <StepLegend n={2}>Or fine-tune your roofline</StepLegend>
          <div className="card p-5 md:p-6">
            <div className="flex items-end justify-between gap-4 mb-4">
              <label htmlFor="feet-input" className="label mb-0">
                Approximate roofline length
              </label>
              <div className="flex items-baseline gap-1.5">
                <input
                  id="feet-input"
                  type="number"
                  inputMode="numeric"
                  min={MIN_FEET}
                  max={MAX_FEET}
                  value={feet}
                  onChange={e => setCustomFeet(Number(e.target.value) || MIN_FEET)}
                  className="input w-24 text-right text-lg font-bold"
                />
                <span className="text-muted text-sm">ft</span>
              </div>
            </div>
            <input
              type="range"
              min={MIN_FEET}
              max={MAX_FEET}
              step={5}
              value={feet}
              onChange={e => setCustomFeet(Number(e.target.value))}
              aria-label="Approximate roofline length in linear feet"
              className="w-full min-h-[44px] accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted">
              <span>{MIN_FEET} ft</span>
              <span>{MAX_FEET} ft</span>
            </div>
            <p className="text-xs text-muted mt-3 leading-relaxed">
              Not sure? Most single-family homes land between 100 and 250 ft. A free site visit measures it exactly.
            </p>
          </div>
        </fieldset>

        {/* Feature modifiers */}
        <fieldset>
          <StepLegend n={3}>Add what applies to your home</StepLegend>
          <div className="space-y-3">
            {pricing.featureModifiers.map(m => {
              const on = !!active[m.key];
              return (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => toggleModifier(m.key)}
                  aria-pressed={on}
                  className={`card w-full text-left flex items-start gap-4 p-4 md:p-5 transition-colors ${
                    on ? 'border-ink bg-tint' : 'hover:border-ink/40'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 w-6 h-6 rounded-md border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                      on ? 'bg-ink border-ink text-white' : 'bg-white border-line text-transparent'
                    }`}
                  >
                    <Icon.check size={14} strokeWidth={2.5} />
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-ink leading-snug">{m.label}</span>
                      <span className="chip whitespace-nowrap">+${m.addPerFootCad}/ft</span>
                    </span>
                    <span className="block text-xs text-muted mt-1.5 leading-relaxed">{m.note}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ─── Result ─── */}
      <div className="lg:col-span-2">
        <div className="card p-7 lg:sticky lg:top-24">
          <span className="eyebrow">Estimated installed cost</span>
          <p className="mt-4 flex flex-wrap items-baseline gap-x-2 font-heading text-4xl font-bold text-ink leading-none" aria-live="polite">
            <span>{formatCad(low)}</span>
            <span className="text-muted font-normal">–</span>
            <span>{formatCad(high)}</span>
          </p>
          <p className="text-xs text-muted mt-3">
            {feet} linear ft · {formatCad(pricing.perLinearFootLow + addPerFoot)}–
            {formatCad(pricing.perLinearFootHigh + addPerFoot)} per ft
            {addPerFoot > 0 && <> (incl. +${addPerFoot}/ft options)</>}
          </p>

          <div className="mt-5 rounded-xl bg-tint px-4 py-3">
            <p className="flex flex-wrap items-baseline gap-1.5">
              <span className="font-heading text-2xl font-bold text-ink">{formatCad(monthlyLow)}–{formatCad(monthlyHigh)}</span>
              <span className="text-sm font-semibold text-ink-soft">/month</span>
            </p>
            <p className="text-xs text-muted mt-1 leading-relaxed">
              with financing: 24 months at 10% APR (on approved credit).
            </p>
          </div>

          {atMinimum && (
            <p className="mt-3 text-xs text-ink-soft rounded-xl border border-accent/40 bg-accent/10 px-3 py-2 leading-relaxed">
              This lands at our {formatCad(pricing.minimumJobCad)} minimum job. Small runs cost more per foot because
              setup, travel, power and commissioning apply whatever the length.
            </p>
          )}

          <div className="my-5 h-px bg-line" aria-hidden="true" />

          <p className="text-xs text-muted leading-relaxed">{pricing.resultDisclaimer}</p>

          <Link href="/contact" className="btn btn-primary btn-lg w-full mt-5">
            Get my free exact quote
          </Link>

          {/* Compact financing note */}
          <div className="mt-4 card-soft p-4">
            <p className="text-sm font-semibold text-ink flex items-center gap-2">
              <Icon.card size={18} /> Prefer to spread the cost?
            </p>
            <p className="text-xs text-muted leading-relaxed mt-1.5">
              Monthly financing over a 24-month term at 10% APR, on approved credit. We show the monthly option
              alongside your written estimate.
            </p>
            <Link href="/financing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink min-h-[44px]">
              Ask about financing <Icon.arrow size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
