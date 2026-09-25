"use client";

// Step 3 — Make it happen: checks, 2D plans, 3D image, parts list, add-ons, print, share, quote.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlanner } from "./planner-context";
import { FloorView } from "./floor-view";
import { WallView } from "./wall-view";
import { Scene3DLazy, type Scene3DApi } from "./scene-3d-lazy";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/ui-context";
import { getCabinetBySku } from "@/lib/planner-catalog";
import { reviewDesign, type Issue } from "@/lib/planner/review";
import { encodeDesign, shareUrlFor } from "@/lib/planner/encode";
import { surfacesWithUnits, buildAttachment, storeAttachment } from "@/lib/planner/attach";
import { formatFeet, formatInches } from "@/lib/planner/types";
import { formatCad } from "@/lib/planner-utils";

export function StepReview() {
  const { design, ui, setUi, toast, stock } = usePlanner();
  const { add, items: cartItems } = useCart();
  const router = useRouter();
  const [addedToQuote, setAddedToQuote] = useState(false);
  const review = useMemo(() => reviewDesign(design), [design]);
  const sceneApi = useRef<Scene3DApi | null>(null);
  const [captured, setCaptured] = useState(false);
  const [adding, setAdding] = useState(false);

  const addonOn = (sku: string, def: boolean) => ui.addons[sku] ?? def;
  const addonsTotal = review.addons.filter((a) => addonOn(a.sku, a.defaultOn)).reduce((s, a) => s + a.total, 0);
  const surfaces = useMemo(() => surfacesWithUnits(design), [design]);

  const onSceneReady = useCallback((api: Scene3DApi) => {
    sceneApi.current = api;
    // give the scene a moment to render, then grab a picture
    window.setTimeout(() => {
      const url = api.snapshot();
      if (url) {
        setUi({ snapshot: url });
        setCaptured(true);
      }
    }, 1400);
  }, [setUi]);

  const capture = () => {
    const url = sceneApi.current?.snapshot();
    if (url) {
      setUi({ snapshot: url });
      setCaptured(true);
      toast("3D image captured for your design sheet.");
    }
  };

  useEffect(() => {
    setCaptured(false);
  }, [design.updatedAt]);

  const addAllToRequest = async () => {
    if (!review.parts.length) {
      toast("Nothing to add yet.");
      return;
    }
    if (cartItems.length > 0 && !window.confirm("Your quote list already has items. Add this design on top of them?")) return;
    setAdding(true);
    try {
      const payload = await encodeDesign(design);
      const link = shareUrlFor(payload);
      storeAttachment(buildAttachment(design, review, link));
      let added = 0;
      let skipped = 0;
      const pushLine = (sku: string, qty: number) => {
        const cab = getCabinetBySku(sku);
        if (!cab || cab.coming_soon) {
          skipped += qty;
          return;
        }
        add({ slug: cab.slug, name: cab.name, price_cad: cab.quote_only ? null : cab.price_cad, image: cab.image_urls[0], kind: "cabinet", qty });
        added += qty;
      };
      for (const p of review.parts) pushLine(p.sku, p.qty);
      for (const a of review.addons) if (addonOn(a.sku, a.defaultOn)) pushLine(a.sku, a.qty);
      toast(`Added ${added} item${added === 1 ? "" : "s"} to your quote list${skipped ? ` (${skipped} coming-soon unit${skipped === 1 ? "" : "s"} noted on the design instead)` : ""}.`);
      setAddedToQuote(true);
    } finally {
      setAdding(false);
    }
  };

  const goToIssue = (issue: Issue) => {
    setUi({ step: 2, selectedId: issue.itemIds?.[0] ?? null, view: "floor", ...(issue.surface !== undefined ? { activeSurface: issue.surface } : {}) });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-accent-dark)]">Step 3 of 3</p>
          <h1 className="mt-1 font-display text-3xl text-[var(--color-ink)]">Make it happen</h1>
          <p className="mt-2 max-w-2xl text-sm text-[var(--color-ink-soft)]">We checked your layout, drew the plans, and priced every cabinet. Print it, share it, or send it to us for a firm quote.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-secondary h-10 px-4 py-0 text-xs" onClick={() => setUi({ step: 2 })}>
            ← Back to design
          </button>
          <button type="button" className="btn-secondary h-10 px-4 py-0 text-xs" onClick={() => window.print()}>
            🖨 Print / Save PDF
          </button>
          <button type="button" className="btn-secondary h-10 px-4 py-0 text-xs" onClick={() => setUi({ panel: "share" })}>
            Share link
          </button>
          <button type="button" className="btn-primary h-10 px-4 py-0 text-xs" onClick={addAllToRequest} disabled={adding}>
            {adding ? "Adding…" : "Add all to quote"}
          </button>
          {addedToQuote && (
            <button type="button" className="btn-primary h-10 px-4 py-0 text-xs" onClick={() => router.push("/request")}>
              Review quote →
            </button>
          )}
        </div>
      </header>

      {/* Summary strip */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Cabinets" value={String(review.stats.units)} />
        <Stat label="Room" value={`${formatFeet(design.room.width)} × ${formatFeet(design.room.depth)}`} />
        <Stat label="Counter run" value={formatInches(Math.round(review.stats.counterLinear))} />
        <Stat label="Estimated cabinets" value={formatCad(review.subtotal)} accent />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="space-y-10">
          {/* Checks */}
          <section>
            <h2 className="font-display text-2xl text-[var(--color-ink)]">Design check</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <IssueList title="Warnings" tone="warn" issues={review.warnings} empty="No warnings — nothing overlaps, blocks a door or covers a window." onGo={goToIssue} />
              <IssueList title="Recommendations" tone="rec" issues={review.recommendations} empty="No recommendations right now." onGo={goToIssue} />
            </div>
          </section>

          {/* Plans */}
          <section>
            <h2 className="font-display text-2xl text-[var(--color-ink)]">2D plans &amp; images</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <figure className="border border-[var(--color-border)] bg-white">
                <figcaption className="border-b border-[var(--color-border)] px-3 py-2 text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">Floor plan</figcaption>
                <FloorView design={design} readonly className="aspect-[4/3] w-full" />
              </figure>
              <figure className="border border-[var(--color-border)] bg-white">
                <figcaption className="flex items-center justify-between border-b border-[var(--color-border)] px-3 py-2 text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">
                  <span>3D view</span>
                  <button type="button" onClick={capture} className="text-[11px] normal-case tracking-normal underline underline-offset-2">
                    {captured ? "Re-capture image" : "Capture image"}
                  </button>
                </figcaption>
                <div className="relative aspect-[4/3] w-full">
                  <Scene3DLazy design={design} readonly onReady={onSceneReady} className="absolute inset-0 h-full w-full" />
                </div>
              </figure>
              {surfaces.map((s) => (
                <figure key={String(s)} className="border border-[var(--color-border)] bg-white md:col-span-2">
                  <WallView design={design} surface={s} readonly className="w-full" />
                </figure>
              ))}
            </div>
          </section>

          {/* Notes */}
          <section>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl text-[var(--color-ink)]">Design notes</h2>
              <button type="button" className="text-[12px] underline underline-offset-4" onClick={() => setUi({ panel: "notes" })}>
                Add or edit notes
              </button>
            </div>
            {design.notes.length === 0 ? (
              <p className="mt-2 text-sm text-[var(--color-ink-soft)]">No notes yet — jot down anything the installer or our team should know.</p>
            ) : (
              <ul className="mt-3 space-y-2">
                {design.notes.map((n) => (
                  <li key={n.id} className="border border-[var(--color-border)] bg-white p-3 text-sm">
                    {n.text}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        {/* Parts list */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="border border-[var(--color-border)] bg-white">
            <div className="border-b border-[var(--color-border)] px-4 py-3">
              <h2 className="font-display text-xl text-[var(--color-ink)]">Parts list</h2>
              <p className="text-[11px] text-[var(--color-ink-soft)]">Everything in your plan, priced from the catalog.</p>
            </div>
            <ul className="max-h-[50vh] divide-y divide-[var(--color-border)] overflow-y-auto scrollbar-thin">
              {review.parts.length === 0 && <li className="p-4 text-sm text-[var(--color-ink-soft)]">No cabinets placed yet.</li>}
              {review.parts.map((p) => (
                <li key={p.sku} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden border border-[var(--color-border)] bg-white">{p.image && <Image src={p.image} alt="" fill sizes="40px" className="object-contain p-0.5" />}</div>
                  <div className="min-w-0 flex-1">
                    {p.slug ? (
                      <Link href={`/cabinets/${p.slug}`} target="_blank" className="block truncate font-medium hover:underline">
                        {p.name}
                      </Link>
                    ) : (
                      <p className="truncate font-medium">{p.name}</p>
                    )}
                    <p className="text-[11px] text-[var(--color-ink-soft)]">
                      <span className="font-mono text-[var(--color-accent-dark)]">{p.sku}</span> · {p.qty} × {p.comingSoon ? "TBA" : formatCad(p.unit)}
                      {stock[p.sku] && !stock[p.sku].in_stock && <span className="ml-1 font-semibold text-red-700">· out of stock</span>}
                      {stock[p.sku] && stock[p.sku].in_stock && stock[p.sku].low_stock && <span className="ml-1 text-amber-700">· only {stock[p.sku].on_hand} left</span>}
                    </p>
                  </div>
                  <p className="font-medium">{p.comingSoon ? <span className="text-[11px] uppercase tracking-wider text-[var(--color-accent-dark)]">Coming soon</span> : formatCad(p.total)}</p>
                </li>
              ))}
            </ul>
            {review.appliances.length > 0 && (
              <div className="border-t border-[var(--color-border)] px-4 py-3 text-[12px]">
                <p className="text-[10px] uppercase tracking-widest text-[var(--color-ink-soft)]">Your appliances (not supplied)</p>
                <ul className="mt-1 space-y-0.5 text-[var(--color-ink-soft)]">
                  {review.appliances.map((a) => (
                    <li key={a.sku}>
                      {a.qty} × {a.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-baseline justify-between border-t border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3">
              <span className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">Cabinets</span>
              <span className="font-display text-xl text-[var(--color-ink)]">{formatCad(review.subtotal)}</span>
            </div>
          </div>

          {review.addons.length > 0 && (
            <div className="mt-4 border border-[var(--color-border)] bg-white">
              <div className="border-b border-[var(--color-border)] px-4 py-3">
                <h2 className="font-display text-xl text-[var(--color-ink)]">Finishing add-ons</h2>
                <p className="text-[11px] text-[var(--color-ink-soft)]">Suggested from your layout — tick what you want in the quote.</p>
              </div>
              <ul className="divide-y divide-[var(--color-border)]">
                {review.addons.map((a) => (
                  <li key={a.sku} className="flex items-start gap-3 px-4 py-2.5 text-[13px]">
                    <input id={`addon-${a.sku}`} type="checkbox" className="mt-1" checked={addonOn(a.sku, a.defaultOn)} onChange={(e) => setUi({ addons: { ...ui.addons, [a.sku]: e.target.checked } })} />
                    <label htmlFor={`addon-${a.sku}`} className="min-w-0 flex-1 cursor-pointer">
                      <span className="block font-medium">
                        {a.name} <span className="text-[var(--color-ink-soft)]">× {a.qty}</span>
                      </span>
                      <span className="block text-[11px] text-[var(--color-ink-soft)]">{a.reason}</span>
                    </label>
                    <span className="font-medium">{formatCad(a.total)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-baseline justify-between border-t border-[var(--color-border)] bg-[var(--color-cream)] px-4 py-3">
                <span className="text-[11px] uppercase tracking-widest text-[var(--color-ink-soft)]">With add-ons</span>
                <span className="font-display text-xl text-[var(--color-ink)]">{formatCad(review.subtotal + addonsTotal)}</span>
              </div>
            </div>
          )}

          <div className="mt-4 space-y-2">
            {review.parts.some((p) => stock[p.sku] && !stock[p.sku].in_stock) && (
              <p className="rounded-md border border-red-200 bg-red-50 p-3 text-[12px] text-red-800">
                Some cabinets in this plan are out of stock right now. You can still request the quote — we&rsquo;ll confirm lead times before anything is charged.
              </p>
            )}
            <button type="button" className="btn-primary w-full" onClick={addAllToRequest} disabled={adding}>
              {adding ? "Adding…" : "Add all to quote"}
            </button>
            {addedToQuote && (
              <button type="button" className="btn-secondary w-full" onClick={() => router.push("/request")}>
                Review your quote list →
              </button>
            )}
            <p className="text-center text-[11px] text-[var(--color-ink-soft)]">No payment now. We confirm stock, quote shipping to your postal code and send a written quote within one business day.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`border px-4 py-3 ${accent ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border)] bg-white"}`}>
      <p className={`text-[10px] uppercase tracking-[0.25em] ${accent ? "text-[var(--color-accent)]" : "text-[var(--color-accent-dark)]"}`}>{label}</p>
      <p className="mt-1 font-display text-2xl">{value}</p>
    </div>
  );
}

function IssueList({ title, tone, issues, empty, onGo }: { title: string; tone: "warn" | "rec"; issues: Issue[]; empty: string; onGo: (i: Issue) => void }) {
  const [open, setOpen] = useState(true);
  const color = tone === "warn" ? "text-red-700" : "text-[#1f5aa6]";
  const badge = tone === "warn" ? "bg-red-600" : "bg-[#1f5aa6]";
  return (
    <div className="border border-[var(--color-border)] bg-white">
      <button type="button" onClick={() => setOpen((v) => !v)} className="flex w-full items-center gap-2 px-4 py-3 text-left" aria-expanded={open}>
        <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold text-white ${issues.length ? badge : "bg-green-700"}`}>{issues.length}</span>
        <span className={`font-medium ${issues.length ? color : "text-green-800"}`}>{title}</span>
        <span className="ml-auto text-[var(--color-ink-soft)]">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <ul className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
          {issues.length === 0 && <li className="px-4 py-3 text-[13px] text-[var(--color-ink-soft)]">{empty}</li>}
          {issues.map((i) => (
            <li key={i.id} className="px-4 py-3">
              <p className="text-[13px] font-medium text-[var(--color-ink)]">{i.title}</p>
              <p className="mt-0.5 text-[12px] leading-snug text-[var(--color-ink-soft)]">{i.detail}</p>
              {(i.itemIds?.length || i.surface !== undefined) && (
                <button type="button" onClick={() => onGo(i)} className="mt-1 text-[11px] underline underline-offset-2">
                  Show me →
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
