"use client";

import { useState } from "react";
import Image from "next/image";
import type { Photo } from "@/lib/content";

/** Drag handle reveals the lit photo. The range input keeps it keyboard and touch friendly. */
export function BeforeAfter({ before, after, beforeLabel, afterLabel }: { before: Photo; after: Photo; beforeLabel: string; afterLabel: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[5/3] select-none overflow-hidden rounded-2xl bg-stone-900 shadow-xl">
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 800px, 100vw" placeholder="blur" blurDataURL={after.blurDataURL} className="object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 800px, 100vw" placeholder="blur" blurDataURL={before.blurDataURL} className="object-cover" />
      </div>
      <span className="absolute left-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">{beforeLabel}</span>
      <span className="absolute right-3 top-3 rounded-full bg-black/65 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#FFD27A]">{afterLabel}</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-sm font-black text-[#06140E] shadow-lg" aria-hidden>‹ ›</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Slide to compare the home with its Christmas lights off and on"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
