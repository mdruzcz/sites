"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/content";
import { Icon } from "./Icons";

const CATEGORY_LABELS: Record<string, string> = { residential: "Homes", commercial: "Commercial", detail: "Close-ups" };

/** Filterable photo grid with a lightbox. Filters by colour and category. */
export function GalleryGrid({ photos, showFilters = true, limit }: { photos: Photo[]; showFilters?: boolean; limit?: number }) {
  const [cat, setCat] = useState("all");
  const [colour, setColour] = useState("all");
  const [active, setActive] = useState<number | null>(null);

  const colours = useMemo(() => Array.from(new Set(photos.map((p) => p.colour))), [photos]);
  const cats = useMemo(() => Array.from(new Set(photos.map((p) => p.category))), [photos]);

  const list = useMemo(() => {
    const l = photos.filter((p) => (cat === "all" || p.category === cat) && (colour === "all" || p.colour === colour));
    return limit ? l.slice(0, limit) : l;
  }, [photos, cat, colour, limit]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => (i === null ? null : (i + 1) % list.length));
      if (e.key === "ArrowLeft") setActive((i) => (i === null ? null : (i - 1 + list.length) % list.length));
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [active, list.length]);

  return (
    <div>
      {showFilters && (
        <div className="flex flex-col gap-3 mb-8">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by type">
            <button type="button" onClick={() => setCat("all")} className={`chip ${cat === "all" ? "chip-active" : ""}`}>All</button>
            {cats.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`chip ${cat === c ? "chip-active" : ""}`}>{CATEGORY_LABELS[c] ?? c}</button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by colour">
            <button type="button" onClick={() => setColour("all")} className={`chip ${colour === "all" ? "chip-active" : ""}`}>Every colour</button>
            {colours.map((c) => (
              <button key={c} type="button" onClick={() => setColour(c)} className={`chip ${colour === c ? "chip-active" : ""}`}>{c}</button>
            ))}
          </div>
        </div>
      )}

      {list.length === 0 ? (
        <p className="text-[var(--muted)]">No photos match that filter yet.</p>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {list.map((p, i) => (
            <button
              key={p.src}
              type="button"
              onClick={() => setActive(i)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--panel)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
              aria-label={`Open photo: ${p.alt}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                placeholder="blur"
                blurDataURL={p.blurDataURL}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                <span className="pill pill-white !text-[0.62rem] !py-1">{p.colour}</span>
              </div>
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
            <p className="mt-3 text-center text-sm text-[#d6deea] px-10">{list[active].alt}</p>
            <button type="button" onClick={() => setActive(null)} className="absolute -top-2 right-0 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close photo">
              <Icon.X />
            </button>
            <button type="button" onClick={() => setActive((active - 1 + list.length) % list.length)} className="absolute left-0 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Previous photo">
              <Icon.Arrow className="rotate-180" />
            </button>
            <button type="button" onClick={() => setActive((active + 1) % list.length)} className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Next photo">
              <Icon.Arrow />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
