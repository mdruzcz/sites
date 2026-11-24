"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export interface HeroScene {
  key: string;
  /** Short label on the scene pill. */
  label: string;
  /** Completes the sentence "Shown: …" under the headline. */
  caption: string;
  /** CSS background for the pill's colour dot. */
  swatch: string;
  src: string;
  alt: string;
  blurDataURL: string;
  /** object-position for the photo, so the roofline stays in frame. */
  position?: string;
}

const PROOF = ["Kits from $1,455", "5-year warranty", "CSA approved", "Tested to −40°C"];

/**
 * Full-bleed hero. One photograph fills the first screen, the header floats on
 * top of it, and the headline sits bottom-left. The scene pills swap the photo
 * so visitors can see the same kind of system in other colours — a scene's
 * image is only requested once it has been chosen, so the first paint loads a
 * single photo.
 */
export function HeroStage({ scenes }: { scenes: HeroScene[] }) {
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]);

  function choose(i: number) {
    setSeen((s) => (s.includes(i) ? s : [...s, i]));
    setActive(i);
  }

  return (
    <section className="relative isolate flex min-h-[max(100svh,680px)] flex-col justify-end overflow-hidden bg-[var(--color-ink-deep)] text-white lg:min-h-[max(100svh,760px)]">
      {scenes.map((s, i) =>
        seen.includes(i) ? (
          <Image
            key={s.key}
            src={s.src}
            alt={i === active ? s.alt : ""}
            aria-hidden={i === active ? undefined : true}
            fill
            priority={i === 0}
            sizes="100vw"
            placeholder="blur"
            blurDataURL={s.blurDataURL}
            className={`object-cover ${i === active ? "hero-fade z-[-1]" : "z-[-2]"}`}
            style={{ objectPosition: s.position ?? "center" }}
          />
        ) : null
      )}
      <div aria-hidden className="hero-shade-top -z-[1]" />
      <div aria-hidden className="hero-shade-bottom -z-[1]" />

      <div className="shell grid grid-cols-[minmax(0,1fr)] items-end gap-8 pb-9 pt-48 md:pb-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-12">
        <div className="max-w-3xl">
          <h1 className="hero-title">Permanent LED lighting, shipped to your door.</h1>
          <p className="mt-3 text-sm text-white/85 md:text-base" aria-live="polite">
            Shown: {scenes[active].caption}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/permanent-lights" className="btn-hero group sm:min-w-[21rem]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M3 11.5 12 4l9 7.5M5.5 10v9.5h13V10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Build your system
              <svg className="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/shop" className="btn-ghost-light min-h-[54px]">
              Shop the catalog
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-white/85">
            {PROOF.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#ffd24a]" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 lg:text-center">
          <p className="text-sm font-medium text-white/90">Change the scene</p>
          <div className="-mx-5 mt-2.5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] lg:mx-0 lg:max-w-[26rem] lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0">
            {scenes.map((s, i) => (
              <button
                key={s.key}
                type="button"
                className="scene-pill"
                aria-pressed={i === active}
                onClick={() => choose(i)}
              >
                <span aria-hidden className="scene-dot" style={{ background: s.swatch }} />
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
