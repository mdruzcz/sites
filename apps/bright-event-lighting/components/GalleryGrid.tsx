"use client";

import { useState } from "react";
import Image from "next/image";
import { galleryCategories, type Project } from "@/lib/content";

type Meta = { alt: string; blurDataURL: string; width: number; height: number };

export function GalleryGrid({ projects, meta, initial = "all" }: { projects: Project[]; meta: Record<string, Meta>; initial?: string }) {
  const [active, setActive] = useState(initial);
  const visible = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Gallery categories">
        {galleryCategories.map((c) => (
          <button
            key={c.slug}
            role="tab"
            aria-selected={active === c.slug}
            onClick={() => setActive(c.slug)}
            className={`min-h-[44px] rounded-full border px-4 text-sm transition-colors ${
              active === c.slug
                ? "border-[var(--accent)] bg-[var(--accent)] text-[#0F0F10] font-semibold"
                : "border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--foreground)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {visible.map((p, i) => {
          const m = meta[p.image];
          return (
            <figure key={p.slug} className="card overflow-hidden break-inside-avoid group">
              <div className="relative bg-[var(--surface)]">
                <Image
                  src={p.image}
                  alt={m?.alt ?? `${p.title} by Bright Event Lighting in ${p.city}, Ontario`}
                  width={m?.width ?? 1600}
                  height={m?.height ?? 1067}
                  placeholder={m?.blurDataURL ? "blur" : "empty"}
                  blurDataURL={m?.blurDataURL}
                  className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={i < 3}
                />
              </div>
              <figcaption className="p-4">
                <h3 className="font-semibold text-[var(--foreground)] text-sm">{p.title}</h3>
                <p className="text-xs text-[var(--accent)] mt-0.5">{p.city}, ON</p>
                <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">{p.description}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
      {visible.length === 0 && <p className="text-center text-[var(--muted)]">More photos coming soon.</p>}
    </div>
  );
}
