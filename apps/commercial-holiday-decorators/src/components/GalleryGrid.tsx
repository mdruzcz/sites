"use client";

import { useState } from "react";
import Image from "next/image";
import type { MediaImage, MediaVideo } from "@/lib/content";
import { Icon } from "./Icons";
import { VideoLoop } from "./VideoLoop";

const LABELS: Record<string, string> = {
  lobbies: "Lobbies & Atriums",
  malls: "Malls & Displays",
  storefronts: "Storefronts & Plazas",
  exteriors: "Buildings & Courtyards",
  municipal: "Streets, Parks & Squares",
};

export function GalleryGrid({ images, videos, posters }: { images: MediaImage[]; videos: MediaVideo[]; posters: Record<string, string> }) {
  const [cat, setCat] = useState<string>("all");
  const [active, setActive] = useState<number | null>(null);
  const cats = ["all", ...Object.keys(LABELS), "video"];
  const list = cat === "all" ? images : images.filter((i) => i.category === cat);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {cats.map((c) => (
          <button key={c} type="button" onClick={() => { setCat(c); setActive(null); }} className={`chip ${cat === c ? "chip-active" : ""}`}>
            {c === "all" ? `All photos (${images.length})` : c === "video" ? `Video clips (${videos.length})` : LABELS[c]}
          </button>
        ))}
      </div>

      {cat === "video" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <figure key={v.key} className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-[var(--deep)]">
              <VideoLoop src={v.src} poster={posters[v.key]} label={v.alt} className="absolute inset-0 w-full h-full object-cover" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm text-white bg-gradient-to-t from-black/70 to-transparent">{v.alt}</figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [&>*]:mb-3">
          {list.map((p, i) => (
            <button key={p.key} type="button" onClick={() => setActive(i)} className="relative block w-full overflow-hidden rounded-2xl group break-inside-avoid" aria-label={`Open photo: ${p.alt}`}>
              <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(max-width: 768px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="w-full h-auto transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-left"><span className="pill pill-white !text-[0.62rem] !py-1">{LABELS[p.category] ?? p.category}</span></span>
            </button>
          ))}
        </div>
      )}

      {active !== null && list[active] && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label="Photo viewer">
          <button type="button" className="absolute inset-0 bg-black/90" aria-label="Close" onClick={() => setActive(null)} />
          <div className="relative w-full max-w-5xl">
            <div className="relative w-full aspect-[4/3] max-h-[78vh]">
              <Image src={list[active].src} alt={list[active].alt} fill sizes="100vw" className="object-contain" priority />
            </div>
            <p className="mt-3 text-center text-sm text-[#d6e0dc] px-10">{list[active].alt}</p>
            <button type="button" onClick={() => setActive(null)} className="absolute -top-2 right-0 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close photo"><Icon.X /></button>
            <button type="button" onClick={() => setActive((active - 1 + list.length) % list.length)} className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous photo"><Icon.Arrow className="rotate-180" /></button>
            <button type="button" onClick={() => setActive((active + 1) % list.length)} className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next photo"><Icon.Arrow /></button>
          </div>
        </div>
      )}
    </div>
  );
}
