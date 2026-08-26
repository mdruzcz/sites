"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

const STORAGE_KEY = "cl-demo-bar-dismissed";

/* sessionStorage is external state, so it's read through
   useSyncExternalStore rather than a setState-in-effect (which triggers a
   cascading render and is flagged by react-hooks/set-state-in-effect).
   The server snapshot reports "dismissed" so the bar is absent from the
   SSR HTML and appears on mount — no hydration mismatch for a visitor who
   already dismissed it. */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    // Private mode / storage blocked — showing the bar is harmless.
    return false;
  }
}

function getServerSnapshot() {
  return true;
}

/**
 * Site-wide bar carrying the one differentiator: the free on-site demo.
 *
 * Rendered above <Header /> and deliberately NOT sticky — the header below
 * it is sticky, so this scrolls away and hands persistent CTA duty to the
 * header. Dismissal lasts the session.
 */
export function DemoPromiseBar() {
  const dismissed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (dismissed) return null;

  function dismiss() {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* no-op */
    }
    listeners.forEach((l) => l());
  }

  return (
    <div
      className="relative text-[#04121a]"
      style={{ background: "linear-gradient(90deg, #24c1b1 0%, #34d6c5 55%, #e8b600 160%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 py-2 pr-10 text-center">
          <svg className="w-4 h-4 shrink-0 hidden sm:block" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.95 2.05a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM6.343 5.757a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zM4 10a1 1 0 01-1 1H2a1 1 0 110-2h1a1 1 0 011 1zm6 4a4 4 0 100-8 4 4 0 000 8zm0 2a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" />
          </svg>
          <p className="text-xs sm:text-sm font-semibold leading-snug">
            <span className="hidden sm:inline">{site.demo.promise} </span>
            <span className="sm:hidden">Free on-site demo — see it on your home first. </span>
            <Link href="/contact" className="underline decoration-2 underline-offset-2 hover:no-underline">
              Book yours free
            </Link>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-11 w-11 flex items-center justify-center rounded-full text-[#04121a]/70 hover:text-[#04121a] hover:bg-black/10 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
