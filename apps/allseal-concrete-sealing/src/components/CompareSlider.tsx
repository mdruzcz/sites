"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import type { GalleryPhoto } from "@/lib/photos";

/** Pointer-driven before/after compare. Works with aligned pairs only. */
export function CompareSlider({ before, after, title, city, sheen, priority = false, tall = false }: { before: GalleryPhoto; after: GalleryPhoto; title?: string; city?: string; sheen?: string; priority?: boolean; tall?: boolean }) {
  const [pos, setPos] = useState(55);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  function move(clientX: number) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(3, Math.min(97, ((clientX - r.left) / r.width) * 100)));
  }

  return (
    <figure className="group">
      <div
        ref={ref}
        className={`relative select-none overflow-hidden rounded-lg ${tall ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[3/2]"}`}
        onPointerDown={(e) => { dragging.current = true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); move(e.clientX); }}
        onPointerMove={(e) => { if (dragging.current) move(e.clientX); }}
        onPointerUp={() => { dragging.current = false; }}
        onPointerCancel={() => { dragging.current = false; }}
        style={{ touchAction: "pan-y" }}
      >
        <Image src={after.image} alt={after.alt} fill sizes="(max-width: 768px) 100vw, 640px" priority={priority} placeholder="blur" blurDataURL={after.blurDataURL} className="object-cover" draggable={false} />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <div className="relative h-full" style={{ width: `${10000 / pos}%` }}>
            <Image src={before.image} alt={before.alt} fill sizes="(max-width: 768px) 100vw, 640px" priority={priority} placeholder="blur" blurDataURL={before.blurDataURL} className="object-cover" draggable={false} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }} aria-hidden>
          <div className="h-full w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.25)]" />
          <div className="absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--orange)] text-white shadow-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l-4 3 4 3m8-6l4 3-4 3" /></svg>
          </div>
        </div>
        <span className="font-display pointer-events-none absolute left-3 top-3 rounded bg-black/70 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">Before</span>
        <span className="font-display pointer-events-none absolute right-3 top-3 rounded bg-[var(--orange)] px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white">After</span>
        <input type="range" min={3} max={97} value={pos} onChange={(e) => setPos(Number(e.target.value))} aria-label={`Compare before and after${title ? `: ${title}` : ""}`} className="sr-only" />
      </div>
      {(title || sheen) && (
        <figcaption className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span><span className="font-display block text-base font-bold uppercase tracking-wide">{title}</span>{city && <span className="text-[var(--muted)]">{city}</span>}</span>
          {sheen && <span className="font-display rounded bg-[var(--orange-soft)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--orange-deep)]">{sheen}</span>}
        </figcaption>
      )}
    </figure>
  );
}
