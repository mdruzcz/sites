"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Item = { id: string; name: string; size: string; price: number; blurb: string; image: string };
type Theme = { key: string; date: string; title: string; blurb: string; items: Item[] };
export type JestrCatalog = {
  client: string;
  season: string;
  contact: { name: string; email: string; phone: string };
  terms: string[];
  confirmed: { title: string; blurb: string; items: Item[] };
  themes: Theme[];
};

const TRAVEL = 1000;
const money = (n: number) => new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(n);

function Card({ item, picked, onToggle, tag }: { item: Item; picked: boolean; onToggle: () => void; tag?: string }) {
  return (
    <label
      className={`group flex flex-col overflow-hidden rounded-md border-2 bg-white transition cursor-pointer ${picked ? "border-[var(--accent)] shadow-lg" : "border-[var(--border)] hover:border-[var(--accent)]/60"}`}
    >
      <div className="relative aspect-[4/3] bg-[#0b1026]">
        <Image src={item.image} alt={item.name} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px" className="object-cover transition duration-300 group-hover:scale-[1.03]" />
        {tag && <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">{tag}</span>}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-bold leading-snug text-[var(--ink)]">{item.name}</h3>
          <span className="shrink-0 text-right leading-tight">
            <span className="block font-extrabold text-[var(--accent)] tabular-nums">{money(item.price)}</span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--ink-mute)]">Season rental</span>
          </span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--ink-mute)]">{item.size}</p>
        <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{item.blurb}</p>
        <span className={`mt-auto inline-flex items-center gap-2 pt-3 text-sm font-bold ${picked ? "text-[var(--accent)]" : "text-[var(--ink-soft)]"}`}>
          <input type="checkbox" checked={picked} onChange={onToggle} className="h-4 w-4 accent-[var(--accent)]" />
          {picked ? "Added to my list" : "Add to my list"}
        </span>
      </div>
    </label>
  );
}

export function DisplayPicker({ catalog }: { catalog: JestrCatalog }) {
  const all = useMemo(() => [...catalog.confirmed.items, ...catalog.themes.flatMap((t) => t.items)], [catalog]);
  const byId = useMemo(() => new Map(all.map((i) => [i.id, i])), [all]);
  const [picked, setPicked] = useState<string[]>(catalog.confirmed.items.map((i) => i.id));
  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const items = picked.map((id) => byId.get(id)).filter((i): i is Item => !!i);
  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const total = items.length ? subtotal + TRAVEL : 0;

  const mailto = useMemo(() => {
    const lines = items.map((i) => `- ${i.name}: ${money(i.price)} season rental`);
    const body = [
      `Hi ${catalog.contact.name},`,
      "",
      `Here are the displays we would like for ${catalog.season}:`,
      "",
      ...lines,
      `- Travel (install and takedown): ${money(TRAVEL)}`,
      "",
      `Total before HST: ${money(total)}`,
      "",
      "Please send us a quote to approve.",
      "",
      "Thanks,",
      `${catalog.client}`,
    ].join("\n");
    return `mailto:${catalog.contact.email}?subject=${encodeURIComponent(`${catalog.client}: holiday displays`)}&body=${encodeURIComponent(body)}`;
  }, [items, total, catalog]);

  return (
    <>
      <section className="section-tight">
        <div className="container">
          <p className="eyebrow">{catalog.confirmed.title}</p>
          <p className="mb-6 max-w-2xl text-[var(--ink-soft)]">{catalog.confirmed.blurb} All prices on this page are season rentals for {catalog.season}, including setup, care and takedown.</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {catalog.confirmed.items.map((i) => (
              <Card key={i.id} item={i} picked={picked.includes(i.id)} onToggle={() => toggle(i.id)} tag="Requested" />
            ))}
          </div>
        </div>
      </section>

      {catalog.themes.map((t) => (
        <section key={t.key} id={t.key} className="section-tight border-t border-[var(--border)] odd:bg-white">
          <div className="container">
            <p className="eyebrow">{t.date}</p>
            <h2 className="mb-2 text-2xl font-extrabold text-[var(--ink)] md:text-3xl">{t.title}</h2>
            <p className="mb-6 max-w-2xl text-[var(--ink-soft)]">{t.blurb}</p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.items.map((i) => (
                <Card key={i.id} item={i} picked={picked.includes(i.id)} onToggle={() => toggle(i.id)} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-tight border-t border-[var(--border)] bg-white">
        <div className="container max-w-3xl">
          <h2 className="mb-4 text-2xl font-extrabold text-[var(--ink)]">How the rental works</h2>
          <ul className="list-disc space-y-2 pl-5 text-[var(--ink-soft)]">
            {catalog.terms.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* Running total, pinned to the bottom of the screen. */}
      <div className="sticky bottom-0 z-30 border-t border-[var(--border)] bg-white/95 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] backdrop-blur">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="text-sm text-[var(--ink-soft)]">
            {items.length ? (
              <>
                <strong className="text-[var(--ink)]">{items.length} display{items.length === 1 ? "" : "s"}</strong>
                {" · "}{money(subtotal)} season rental + {money(TRAVEL)} travel ={" "}
                <strong className="text-[var(--ink)] tabular-nums">{money(total)}</strong>
                <span className="text-[var(--ink-mute)]"> + HST</span>
              </>
            ) : (
              "Tick the displays you would like and we will quote them together."
            )}
          </div>
          <a href={items.length ? mailto : undefined} aria-disabled={!items.length}
            className={`btn-primary ${items.length ? "" : "pointer-events-none opacity-50"}`}>
            Email my list to {catalog.contact.name}
          </a>
        </div>
      </div>
    </>
  );
}
