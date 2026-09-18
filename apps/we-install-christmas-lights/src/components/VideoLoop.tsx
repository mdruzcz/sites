"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muted, looping showcase video that only downloads once it scrolls near the
 * viewport (preload="none" + IntersectionObserver). It plays while visible and
 * pauses when it leaves — so a heavier hero reel never costs anything on initial
 * load and never runs off-screen. Audio is intentionally absent.
 */
export function VideoLoop({
  src,
  poster,
  className = ""
}: {
  src: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          el.play?.().catch(() => {});
        } else {
          el.pause?.();
        }
      },
      { rootMargin: "250px 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) ref.current?.play?.().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      className={className}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label="We Install Christmas Lights installation highlight reel"
    />
  );
}
