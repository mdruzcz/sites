"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type GalleryProject = {
  slug: string;
  title: string;
  city: string;
  image: string;
  description?: string;
  category?: string;
};

/**
 * Only two tabs, and they're honest ones.
 *
 * The photo library splits cleanly into permanent roofline systems on
 * houses and seasonal work on commercial/municipal properties (park
 * trees, hedging). Those are genuinely different offerings, so they get
 * separate tabs rather than being mixed into one grid where the
 * commercial shots read as bait-and-switch to a homeowner.
 *
 * Captions are always visible rather than hover-only — on touch there is
 * no hover, and the caption is doing real selling work here ("cold-rated
 * to −40°C", "no extension cords").
 */
const TABS = [
  { id: "all", label: "All Work" },
  { id: "residential", label: "Homes" },
  { id: "commercial", label: "Commercial & Municipal" },
] as const;

export function GalleryTabs({
  projects,
  showViewAll = true,
}: {
  projects: GalleryProject[];
  showViewAll?: boolean;
}) {
  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => (p.category ?? "residential") === active);

  // Only offer a tab that actually has photos behind it.
  const tabs = TABS.filter(
    (t) => t.id === "all" || projects.some((p) => (p.category ?? "residential") === t.id)
  );

  return (
    <>
      {tabs.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActive(tab.id)}
              className={`gallery-tab ${active === tab.id ? "active" : ""}`}
              aria-pressed={active === tab.id}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-center text-[var(--muted)] py-10">
          No projects in this category yet — check back soon.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <figure
              key={project.slug}
              /* First tile runs full width on large screens — with a small
                 photo set this reads as a deliberate lead image rather
                 than a grid that ran out of content. */
              className={`card overflow-hidden group ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className={`relative overflow-hidden ${i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                <Image
                  src={project.image}
                  alt={`${project.title} — permanent LED lighting by Celebrate Lighting in ${project.city}, Ontario`}
                  fill
                  sizes={i === 0 ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                />
              </div>
              <figcaption className="p-5">
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <h3 className="font-semibold text-[var(--foreground)] text-[0.9375rem] leading-snug">
                    {project.title}
                  </h3>
                  <span className="text-xs shrink-0 text-[var(--muted)]">{project.city}</span>
                </div>
                {project.description && (
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{project.description}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      {showViewAll && (
        <div className="text-center mt-10">
          <Link href="/gallery" className="btn btn-outline">
            View the full gallery
          </Link>
        </div>
      )}
    </>
  );
}
