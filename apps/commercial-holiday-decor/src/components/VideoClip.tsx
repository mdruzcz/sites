"use client";

import { useRef, useState } from "react";

/**
 * Poster-first video clip. Nothing downloads until the visitor taps play, then
 * it loads and loops with native controls. Audio is intentionally absent, so it
 * stays muted. Keeps the gallery light on mobile data.
 */
export function VideoClip({
  src,
  poster,
  label
}: {
  src: string;
  poster: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function start() {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play?.().catch(() => {}));
  }

  return (
    <figure className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-ink-deep)] shadow-[var(--shadow-md)]">
      <video
        ref={ref}
        src={playing ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        controls={playing}
        preload="none"
        className="h-full w-full object-cover"
      />
      {!playing && (
        <button
          type="button"
          onClick={start}
          aria-label={`Play video: ${label}`}
          className="absolute inset-0 grid place-items-center bg-gradient-to-t from-[rgba(9,13,10,0.55)] to-[rgba(9,13,10,0.12)] transition hover:from-[rgba(9,13,10,0.4)]"
        >
          <span className="grid size-16 place-items-center rounded-full bg-white/95 shadow-[var(--shadow-lg)] transition group-hover:scale-105">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="ml-1 text-[var(--color-green)]">
              <path d="M6 4l14 8-14 8V4z" fill="currentColor" />
            </svg>
          </span>
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-left text-sm font-semibold text-white">
            {label}
          </figcaption>
        </button>
      )}
    </figure>
  );
}
