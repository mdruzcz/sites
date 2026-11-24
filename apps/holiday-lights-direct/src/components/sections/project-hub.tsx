"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export interface HubItem {
  key: string;
  title: string;
  note: string;
  description: string;
  href: string;
  cta: string;
  image: { src: string; alt: string; blurDataURL: string };
}

/**
 * Planning hub: a short list of tools and guides on the left, a large preview
 * of the selected one on the right.
 */
export function ProjectHub({ items }: { items: HubItem[] }) {
  const [active, setActive] = useState(0);
  const item = items[active];
  if (!item) return null;

  return (
    <section className="bg-[var(--color-bg)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow-plain">Plan it properly</p>
            <h2 className="font-display h2-fluid mt-3">Tools and guides for your project.</h2>
          </div>
          <Link href="/resources" className="chip group gap-2">
            View all guides
            <svg className="arrow-ne" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
          <div className="flex flex-col gap-3">
            {items.map((it, i) => (
              <button
                key={it.key}
                type="button"
                aria-pressed={i === active}
                onClick={() => setActive(i)}
                className={`rounded-[14px] border bg-white px-5 py-4 text-left transition ${
                  i === active
                    ? "border-[var(--color-gold)] shadow-[inset_0_0_0_1px_var(--color-gold)]"
                    : "border-[var(--color-border)] hover:border-[var(--color-border-strong)]"
                }`}
              >
                <span className="block text-[0.9375rem] font-bold text-[var(--color-text)]">{it.title}</span>
                <span className="mt-1 block text-xs text-[var(--color-muted)]">{it.note}</span>
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-white shadow-[var(--shadow-md)]">
            <div className="relative aspect-[16/9] bg-[var(--color-ink-deep)]">
              <Image
                key={item.key}
                src={item.image.src}
                alt={item.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                placeholder="blur"
                blurDataURL={item.image.blurDataURL}
                className="hero-fade object-cover"
              />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-5 p-6 md:p-7">
              <div className="max-w-md">
                <h3 className="text-lg font-bold text-[var(--color-text)]">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-text-soft)]">{item.description}</p>
              </div>
              <Link href={item.href} className="btn-gold group">
                {item.cta}
                <svg className="btn-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
