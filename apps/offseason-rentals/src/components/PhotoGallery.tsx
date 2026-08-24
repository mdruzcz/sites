"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import type { PropertyPhoto } from "@/lib/types";

/**
 * Airbnb's hero grid: one tall photo on the left, a 2×2 block on the right,
 * rounded only on the outer corners, with a "Show all photos" control. Below
 * the lg breakpoint it collapses to a swipeable full-bleed carousel, which is
 * how the mobile app presents it.
 */
export function PhotoGallery({ photos, title }: { photos: PropertyPhoto[]; title: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const close = useCallback(() => setLightbox(null), []);
  const step = useCallback(
    (delta: number) =>
      setLightbox((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, step]);

  if (!photos.length) {
    return (
      <div
        className="w-full grid place-items-center bg-[var(--surface-2)] text-[var(--muted)]"
        style={{ aspectRatio: "2 / 1", borderRadius: "var(--r-md)" }}
      >
        <div className="text-center">
          <Icon name="home" size={32} />
          <p className="mt-2 text-[14px]">Photographs coming shortly</p>
        </div>
      </div>
    );
  }

  const grid = photos.slice(0, 5);

  return (
    <>
      {/* ---- Mobile: full-bleed swipe carousel ---- */}
      <div className="lg:hidden -mx-6 md:-mx-10">
        <div className="scroll-x flex snap-x snap-mandatory">
          {photos.map((ph, i) => (
            <button
              key={ph.id}
              type="button"
              onClick={() => setLightbox(i)}
              className="relative shrink-0 snap-center"
              style={{ width: "100%", aspectRatio: "4 / 3" }}
              aria-label={`View photo ${i + 1} of ${photos.length}`}
            >
              <Photo
                src={ph.url}
                alt={ph.alt}
                fill
                sizes="100vw"
                priority={i === 0}
                className="object-cover"
              />
              <span
                className="absolute right-3 bottom-3 pill"
                style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
              >
                {i + 1} / {photos.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ---- Desktop: 1 + 2×2 mosaic ---- */}
      <div
        className="hidden lg:grid relative overflow-hidden"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          borderRadius: "var(--r-md)",
          aspectRatio: "2 / 1"
        }}
      >
        <button
          type="button"
          onClick={() => setLightbox(0)}
          className="relative group"
          aria-label={`View photo 1 of ${photos.length}`}
        >
          <Photo
            src={grid[0].url}
            alt={grid[0].alt}
            fill
            sizes="(min-width: 1128px) 50vw, 100vw"
            priority
            className="object-cover transition-opacity group-hover:opacity-90"
          />
        </button>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[1, 2, 3, 4].map((i) => {
            const ph = grid[i];
            if (!ph) {
              return <div key={i} className="bg-[var(--surface-2)]" />;
            }
            return (
              <button
                key={ph.id}
                type="button"
                onClick={() => setLightbox(i)}
                className="relative group"
                aria-label={`View photo ${i + 1} of ${photos.length}`}
              >
                <Photo
                  src={ph.url}
                  alt={ph.alt}
                  fill
                  sizes="25vw"
                  className="object-cover transition-opacity group-hover:opacity-90"
                />
              </button>
            );
          })}
        </div>

        {photos.length > 1 ? (
          <button
            type="button"
            onClick={() => setLightbox(0)}
            className="absolute bottom-5 right-5 btn btn-quiet btn-sm"
            style={{ boxShadow: "var(--shadow-md)" }}
          >
            <Icon name="filter" size={15} strokeWidth={2} />
            Show all {photos.length} photos
          </button>
        ) : null}
      </div>

      {/* ---- Lightbox, portalled clear of any positioned ancestor ---- */}
      {mounted && lightbox !== null
        ? createPortal(
            <div
              className="fixed inset-0 z-[110] bg-black"
              role="dialog"
              aria-modal="true"
              aria-label={`${title} — photo ${lightbox + 1} of ${photos.length}`}
            >
              <div className="flex items-center justify-between px-4 py-3 text-white">
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close photos"
                  className="grid place-items-center rounded-full hover:bg-white/15"
                  style={{ width: 44, height: 44 }}
                >
                  <Icon name="close" size={20} strokeWidth={2} />
                </button>
                <span className="text-[14px] tabular-nums">
                  {lightbox + 1} / {photos.length}
                </span>
                <span style={{ width: 44 }} aria-hidden="true" />
              </div>

              <div className="relative" style={{ height: "calc(100dvh - 68px)" }}>
                <Photo
                  key={photos[lightbox].id}
                  src={photos[lightbox].url}
                  alt={photos[lightbox].alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />

                {photos.length > 1 ? (
                  <>
                    <button
                      type="button"
                      onClick={() => step(-1)}
                      aria-label="Previous photo"
                      className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                      style={{ width: 44, height: 44 }}
                    >
                      <Icon name="chevronLeft" size={20} strokeWidth={2.2} />
                    </button>
                    <button
                      type="button"
                      onClick={() => step(1)}
                      aria-label="Next photo"
                      className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center rounded-full bg-white text-black hover:scale-105 transition-transform"
                      style={{ width: 44, height: 44 }}
                    >
                      <Icon name="chevronRight" size={20} strokeWidth={2.2} />
                    </button>
                  </>
                ) : null}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
