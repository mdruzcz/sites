"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/** Lighter pixel density on small or touch-first screens. */
export function deviceQuality() {
  if (typeof window === "undefined") return 1;
  const small = window.matchMedia("(max-width: 640px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  return small ? 0.6 : coarse ? 0.75 : 1;
}
