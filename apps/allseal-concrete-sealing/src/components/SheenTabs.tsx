"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { GalleryPhoto } from "@/lib/photos";
import { CheckIcon } from "./icons";

export interface SheenTab { key: string; short: string; blurb: string; bestFor: readonly string[]; photo: GalleryPhoto }

export function SheenTabs({ tabs }: { tabs: SheenTab[] }) {
  const [active, setActive] = useState(1);
  const t = tabs[active];
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
      <div>
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-[var(--line-dark)] bg-white/5 p-1" role="tablist">
          {tabs.map((tab, i) => (
            <button key={tab.key} role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`font-display min-h-12 rounded px-2 text-sm font-bold uppercase tracking-wider transition sm:text-base ${i === active ? "bg-[var(--orange)] text-white" : "text-white/70 hover:text-white"}`}>{tab.key}</button>
          ))}
        </div>
        <h3 className="font-display mt-6 text-4xl text-white">{t.key}<span className="block text-xl font-semibold normal-case tracking-normal text-[var(--orange)]">{t.short}</span></h3>
        <p className="mt-4 leading-relaxed text-white/75">{t.blurb}</p>
        <ul className="mt-5 space-y-2 text-sm text-white/80">{t.bestFor.map((b) => <li key={b} className="flex items-start gap-2"><CheckIcon className="mt-0.5 w-4 h-4 shrink-0 text-[var(--orange)]" />{b}</li>)}</ul>
        <div className="mt-6 flex flex-wrap gap-3"><Link href="/finishes" className="btn-ghost btn-sm">Compare all three</Link><a href="#quote" className="btn-orange btn-sm">Get a quote</a></div>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image key={t.photo.image} src={t.photo.image} alt={t.photo.alt} fill sizes="(max-width: 1024px) 100vw, 640px" placeholder="blur" blurDataURL={t.photo.blurDataURL} className="object-cover" />
        <span className="font-display absolute bottom-3 left-3 rounded bg-[var(--graphite)]/85 px-3 py-1 text-sm font-bold uppercase tracking-wider text-white">{t.key} finish</span>
      </div>
    </div>
  );
}
