"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { BLUR } from "./ui";

// Interactive draggable before/after for the Work page.
export function Reveal({ before, after, beforeAlt, afterAlt }: { before: string; after: string; beforeAlt: string; afterAlt: string }) {
  const [pos, setPos] = useState(55);
  const [drag, setDrag] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  const move = useCallback((x: number) => {
    if (!box.current) return;
    const r = box.current.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((x - r.left) / r.width) * 100)));
  }, []);

  useEffect(() => {
    if (!drag) return;
    const m = (e: MouseEvent) => move(e.clientX);
    const t = (e: TouchEvent) => e.touches[0] && move(e.touches[0].clientX);
    const up = () => setDrag(false);
    window.addEventListener("mousemove", m); window.addEventListener("touchmove", t, { passive: true });
    window.addEventListener("mouseup", up); window.addEventListener("touchend", up);
    return () => { window.removeEventListener("mousemove", m); window.removeEventListener("touchmove", t); window.removeEventListener("mouseup", up); window.removeEventListener("touchend", up); };
  }, [drag, move]);

  return (
    <div ref={box} className="relative w-full aspect-[4/3] md:aspect-[16/10] rounded-[var(--r-lg)] overflow-hidden select-none cursor-ew-resize shadow-[var(--shadow-lg)]"
      onMouseDown={(e) => { setDrag(true); move(e.clientX); }} onTouchStart={(e) => { setDrag(true); e.touches[0] && move(e.touches[0].clientX); }}>
      <Image src={after} alt={afterAlt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:1024px) 100vw, 60vw" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div className="absolute inset-y-0 left-0 w-screen max-w-none">
          <Image src={before} alt={beforeAlt} fill className="object-cover" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:1024px) 100vw, 60vw" />
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-black/55 backdrop-blur text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full pointer-events-none">Before</span>
      <span className="absolute top-4 right-4 bg-[var(--green)] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full pointer-events-none">After</span>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-[var(--ink)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3M16 9l4 3-4 3" /></svg>
        </div>
      </div>
    </div>
  );
}
