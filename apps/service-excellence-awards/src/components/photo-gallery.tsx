"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  photos: string[];
  name: string;
  /** e.g. "retaining walls project in Brantford, ON" — used to build alt text */
  context: string;
};

/**
 * Editorial photo mosaic: one lead image plus a strip of up to four, with a
 * "View all N photos" button that opens a keyboard-navigable lightbox.
 */
export function PhotoGallery({ photos, name, context }: Props) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  const alt = (i: number) => `${name} ${context} — photo ${i + 1}`;

  const close = useCallback(() => setOpenAt(null), []);
  const step = useCallback((d: number) => setOpenAt((i) => (i === null ? i : (i + d + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    if (openAt === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [openAt, close, step]);

  if (photos.length === 0) return null;
  const lead = photos[0];
  const side = photos.slice(1, 5);
  const extra = photos.length - 1 - side.length;

  const Tile = ({ src, i, className, sizes, priority }: { src: string; i: number; className: string; sizes: string; priority?: boolean }) => (
    <button
      type="button"
      onClick={() => setOpenAt(i)}
      className={`group relative overflow-hidden rounded-lg bg-stone-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] ${className}`}
      aria-label={`Open photo ${i + 1} of ${photos.length}`}
    >
      <Image src={src} alt={alt(i)} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
    </button>
  );

  return (
    <>
      <div className={`grid gap-2 sm:gap-3 ${side.length >= 2 ? "md:grid-cols-[3fr_2fr]" : side.length === 1 ? "md:grid-cols-2" : ""}`}>
        <Tile src={lead} i={0} className="aspect-[16/10] w-full md:aspect-auto md:min-h-[420px]" sizes="(min-width: 1024px) 690px, 100vw" priority />
        {side.length > 0 && (
          <div className={`grid gap-2 sm:gap-3 ${side.length >= 3 ? "grid-cols-2" : side.length === 2 ? "grid-cols-2 md:grid-cols-1" : "grid-cols-1"}`}>
            {side.map((src, k) => {
              const i = k + 1;
              const last = k === side.length - 1 && extra > 0;
              return (
                <div key={src} className="relative">
                  <Tile src={src} i={i} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 230px, 50vw" />
                  {last && (
                    <button
                      type="button"
                      onClick={() => setOpenAt(i)}
                      className="absolute inset-0 grid place-items-center rounded-lg bg-stone-900/55 text-white transition-colors hover:bg-stone-900/65"
                    >
                      <span className="text-sm font-medium">+{extra} more</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-stone-500">
        <span>{photos.length} {photos.length === 1 ? "photo" : "photos"} of {name}&apos;s work</span>
        <button type="button" onClick={() => setOpenAt(0)} className="font-medium text-stone-700 hover:text-[var(--gold)]">
          View all photos →
        </button>
      </div>

      {openAt !== null && (
        <div role="dialog" aria-modal="true" aria-label={`${name} photos`} className="fixed inset-0 z-[100] flex flex-col bg-stone-950/95 text-white" onClick={close}>
          <div className="flex items-center justify-between px-4 py-3 text-sm sm:px-6" onClick={(e) => e.stopPropagation()}>
            <span className="text-stone-300">{openAt + 1} / {photos.length} · {name}</span>
            <button type="button" onClick={close} className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /></svg>
            </button>
          </div>
          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image key={photos[openAt]} src={photos[openAt]} alt={alt(openAt)} fill sizes="100vw" className="object-contain" priority />
            {photos.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-black/60 sm:left-4" aria-label="Previous photo">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 6-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button type="button" onClick={() => step(1)} className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-black/40 hover:bg-black/60 sm:right-4" aria-label="Next photo">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
            {photos.map((src, i) => (
              <button key={src} type="button" onClick={() => setOpenAt(i)} className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 ${i === openAt ? "ring-[var(--gold)]" : "ring-transparent opacity-60 hover:opacity-100"}`} aria-label={`Photo ${i + 1}`}>
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
