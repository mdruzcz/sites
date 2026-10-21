"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "./demo/useReducedMotion";

/**
 * Muted, looping background video (the walk from the fountain to the show).
 * The poster shows first; reduced-motion visitors only ever see the poster,
 * and a pause button is always available.
 */
export function HeroVideo({ src, poster, alt }: { src: string; poster: string; alt: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced || paused) v.pause();
    else void v.play().catch(() => setPaused(true));
  }, [reduced, paused]);

  return (
    <>
      <Image src={poster} alt={alt} fill priority sizes="100vw" className="object-cover" />
      {!reduced && (
        <video
          ref={ref}
          className="absolute inset-0 w-full h-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden="true"
        />
      )}
      {!reduced && (
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          className="absolute bottom-4 right-4 z-20 w-11 h-11 rounded-full bg-black/45 border border-white/20 text-white flex items-center justify-center hover:bg-black/65"
          aria-label={paused ? "Play background video" : "Pause background video"}
        >
          {paused ? (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          )}
        </button>
      )}
    </>
  );
}
