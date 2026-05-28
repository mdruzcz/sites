"use client";

import Image from "next/image";
import Link from "next/link";
import { useUI } from "./ui-context";
import { DimensionDiagram } from "./dimension-diagram";
import type { Cabinet } from "@/lib/catalog";
import { formatCad, formatDim } from "@/lib/utils";

export function CabinetCard({ cabinet }: { cabinet: Cabinet }) {
  const { addItem } = useUI();
  const dims = [
    cabinet.width_in != null ? `W ${formatDim(cabinet.width_in)}` : null,
    cabinet.height_in != null ? `H ${formatDim(cabinet.height_in)}` : null,
    cabinet.depth_in != null ? `D ${formatDim(cabinet.depth_in)}` : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <article className="group flex flex-col overflow-hidden border border-[var(--color-line)] bg-white transition-shadow hover:shadow-[0_4px_24px_rgba(13,27,42,0.08)]">
      <Link
        href={`/cabinets/${cabinet.slug}`}
        className="relative block aspect-square overflow-hidden bg-[var(--color-sandstone-soft)]"
        aria-label={`View ${cabinet.name}`}
      >
        {/* Primary view: dimension diagram. Hover swaps to real photo when available. */}
        <DimensionDiagram
          width={cabinet.width_in}
          height={cabinet.height_in}
          depth={cabinet.depth_in}
          type={cabinet.type}
          className="h-full w-full transition-opacity duration-200 group-hover:opacity-0"
        />
        {cabinet.image_urls.length > 0 && (
          <div className="pointer-events-none absolute inset-0 bg-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <Image
              src={cabinet.image_urls[0]}
              alt={`${cabinet.name} — White Shaker cabinet, front view`}
              fill
              className="object-contain"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        )}
        {cabinet.image_urls.length > 0 && (
          <span className="absolute bottom-2 right-2 rounded-sm bg-[var(--color-navy)]/85 px-2 py-0.5 text-[10px] uppercase tracking-widest text-white opacity-100 transition-opacity group-hover:opacity-0">
            Hover for photo
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
          {cabinet.sku}
        </p>
        <h3 className="text-[15px] font-medium leading-snug">
          <Link href={`/cabinets/${cabinet.slug}`} className="hover:underline underline-offset-4 decoration-[var(--color-brass)]">
            {cabinet.name}
          </Link>
        </h3>
        {dims && (
          <p className="text-xs text-[var(--color-ink-soft)]">{dims}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-display text-xl text-[var(--color-navy)]">
            {formatCad(cabinet.price_cad)}
          </p>
          <button
            type="button"
            onClick={() => addItem(cabinet.sku, 1)}
            className="inline-flex h-9 items-center justify-center border border-[var(--color-navy)] px-3 text-xs font-medium uppercase tracking-wider text-[var(--color-navy)] hover:bg-[var(--color-navy)] hover:text-[var(--color-cream)] transition-colors"
            aria-label={`Add ${cabinet.name} to request list`}
          >
            Add to Quote
          </button>
        </div>
      </div>
    </article>
  );
}
