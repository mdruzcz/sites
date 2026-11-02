"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/content";
import { COUNT_OPTIONS, COVERAGE_OPTIONS, HOME_OPTIONS, describe, estimate, rangeLabel, type Coverage, type EstimateInput, type HomeSize } from "@/lib/estimator";
import { site } from "@/lib/site";
import { CheckIcon } from "./icons";
import { QuoteForm } from "./QuoteForm";

const INCLUDED = ["Custom design", "Commercial-grade LED lights", "Installation", "Mid-season maintenance", "January takedown"];

function Choice<T extends string>({ legend, options, value, onChange }: { legend: string; options: { value: T; label: string; hint: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="heading-display text-lg text-[color:var(--ink-strong)]">{legend}</legend>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        {options.map((o) => {
          const on = o.value === value;
          return (
            <label key={o.value} className={`flex min-h-[44px] cursor-pointer flex-col rounded-xl border p-3.5 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[color:var(--brand-red)] ${on ? "border-[color:var(--brand-red)] bg-[color:var(--bg-cream)] ring-1 ring-[color:var(--brand-red)]" : "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--ink-soft)]"}`}>
              <input type="radio" name={legend} className="sr-only" checked={on} onChange={() => onChange(o.value)} />
              <span className="text-[15px] font-bold text-[color:var(--ink-strong)]">{o.label}</span>
              <span className="mt-0.5 text-[13px] leading-snug text-[color:var(--ink-soft)]">{o.hint}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Stepper({ label, hint, value, max, onChange }: { label: string; hint: string; value: number; max: number; onChange: (v: number) => void }) {
  const btn = "flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] text-xl font-bold text-[color:var(--ink-strong)] hover:border-[color:var(--ink-soft)] disabled:opacity-40";
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[15px] font-bold text-[color:var(--ink-strong)]">{label}</p>
        <p className="text-[13px] text-[color:var(--ink-soft)]">{hint}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button type="button" className={btn} aria-label={`Fewer: ${label}`} disabled={value <= 0} onClick={() => onChange(value - 1)}>−</button>
        <output className="w-8 text-center text-lg font-bold text-[color:var(--ink-strong)]" aria-live="polite">{value}</output>
        <button type="button" className={btn} aria-label={`More: ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}>+</button>
      </div>
    </div>
  );
}

export function PriceEstimator({ tierPhotos }: { tierPhotos: Record<string, Photo | undefined> }) {
  const [input, setInput] = useState<EstimateInput>({ home: "two", coverage: "sides", trees: 1, shrubs: 0, wreaths: 1 });
  const result = useMemo(() => estimate(input), [input]);
  const photo = tierPhotos[result.tier];
  const touched = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    if (touched.current) return;
    touched.current = true;
    (window as unknown as { umami?: { track: (n: string) => void } }).umami?.track("estimator-used");
  }, [input]);

  return (
    <>
      <section className="section">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:px-8">
          <div className="space-y-8">
            <Choice<HomeSize> legend="1. What kind of home is it?" options={HOME_OPTIONS} value={input.home} onChange={(home) => setInput({ ...input, home })} />
            <Choice<Coverage> legend="2. How much of the roofline?" options={COVERAGE_OPTIONS} value={input.coverage} onChange={(coverage) => setInput({ ...input, coverage })} />
            <div>
              <h2 className="heading-display text-lg text-[color:var(--ink-strong)]">3. Anything else to light?</h2>
              <div className="mt-2 divide-y divide-[color:var(--border)]">
                {COUNT_OPTIONS.map((c) => (
                  <Stepper key={c.key} label={c.label} hint={c.hint} max={c.max} value={input[c.key]} onChange={(v) => setInput({ ...input, [c.key]: v })} />
                ))}
              </div>
            </div>
          </div>

          <aside className="card overflow-hidden lg:sticky lg:top-24" aria-live="polite">
            {photo && (
              <div className="relative aspect-[16/9] bg-[color:var(--bg-soft)]">
                <Image key={photo.file} src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
              </div>
            )}
            <div className="p-6">
              <p className="eyebrow">Your estimate</p>
              <p className="heading-display mt-2 text-4xl text-[color:var(--ink-strong)]" data-estimate>{rangeLabel(result)}</p>
              <p className="mt-2 text-[15px] text-[color:var(--ink-soft)]">
                {result.custom ? `Most likely our ${result.tier} package, custom quoted for a display this size.` : `Most likely our ${result.tier} package, all-in for the season.`}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm text-[color:var(--ink-strong)]">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex items-start gap-2"><CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--accent)]" /> {t}</li>
                ))}
              </ul>
              <a href="#quote" className="btn btn-red mt-5 w-full min-h-[48px]">Get my exact price</a>
              <p className="mt-3 text-xs leading-relaxed text-[color:var(--ink-soft)]">
                This is an estimate, not a quote. Your firm price depends on roof pitch, access and exact footage, and we confirm it before anything is booked. Prefer to talk? Call <a className="font-semibold underline" href={site.phoneHref}>{site.phone}</a>.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-[color:var(--bg-cream)]" id="quote">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div>
            <p className="eyebrow">Free quote · 24-hour reply</p>
            <h2 className="heading-display mt-2 text-3xl sm:text-4xl">Turn {rangeLabel(result)} into a firm price</h2>
            <p className="mt-4 text-[17px] leading-relaxed text-[color:var(--ink-soft)]">Send your address and we will look at your actual roofline. Your choices above come through with the request, so you don&rsquo;t have to type them again.</p>
          </div>
          <QuoteForm variant="full" source="/estimator" tag="ESTIMATE" details={describe(input, result)} hideType messageLabel="Your address, plus anything we should know" />
        </div>
      </section>
    </>
  );
}
