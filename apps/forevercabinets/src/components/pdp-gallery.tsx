"use client";

import { useState } from "react";
import Image from "next/image";
import { DimensionDiagram } from "./dimension-diagram";
import { AnnotatedPhoto } from "./annotated-photo";
import type { Cabinet } from "@/lib/catalog";

type Props = {
  cabinet: Cabinet;
};

type Slot =
  | { kind: "diagram"; label: string }
  | { kind: "annotated"; src: string; label: string }
  | { kind: "photo"; src: string; label: string };

export function PdpGallery({ cabinet }: Props) {
  const photos = cabinet.image_urls ?? [];
  const slots: Slot[] = [
    { kind: "diagram", label: "Dimension drawing" },
    ...(photos[0]
      ? [{ kind: "annotated" as const, src: photos[0], label: "Measurements" }]
      : []),
    ...photos.map((src, i) => ({
      kind: "photo" as const,
      src,
      label: i === 0 ? "Front view" : i === 1 ? "In a kitchen" : `View ${i + 1}`,
    })),
  ];
  const [active, setActive] = useState(0);
  const a = slots[active];

  return (
    <div>
      <div className="aspect-square overflow-hidden border border-[var(--color-line)] bg-[var(--color-sandstone-soft)]">
        {a.kind === "diagram" ? (
          <DimensionDiagram
            width={cabinet.width_in}
            height={cabinet.height_in}
            depth={cabinet.depth_in}
            type={cabinet.type}
            className="h-full w-full"
          />
        ) : a.kind === "annotated" ? (
          <AnnotatedPhoto
            src={a.src}
            alt={`${cabinet.name} — annotated with width and height`}
            width={cabinet.width_in}
            height={cabinet.height_in}
            depth={cabinet.depth_in}
            className="relative h-full w-full bg-white"
          />
        ) : (
          <div className="relative h-full w-full bg-white">
            <Image
              src={a.src}
              alt={`${cabinet.name} — ${a.label}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority={active === 0}
            />
          </div>
        )}
      </div>

      {slots.length > 1 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {slots.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 overflow-hidden border bg-white transition-colors ${
                i === active
                  ? "border-[var(--color-navy)] ring-1 ring-[var(--color-navy)]"
                  : "border-[var(--color-line)] hover:border-[var(--color-navy)]"
              }`}
              aria-label={s.label}
              aria-pressed={i === active}
              title={s.label}
            >
              {s.kind === "diagram" ? (
                <div className="h-full w-full bg-[var(--color-sandstone-soft)] p-1">
                  <DimensionDiagram
                    width={cabinet.width_in}
                    height={cabinet.height_in}
                    depth={cabinet.depth_in}
                    type={cabinet.type}
                    className="h-full w-full"
                  />
                </div>
              ) : s.kind === "annotated" ? (
                <div className="relative h-full w-full bg-white">
                  <Image
                    src={s.src}
                    alt=""
                    width={120}
                    height={120}
                    className="h-full w-full object-contain"
                  />
                  <span className="absolute right-1 top-1 rounded-sm bg-red-600 px-1 text-[8px] font-semibold uppercase tracking-wide text-white">
                    W×H
                  </span>
                </div>
              ) : (
                <Image
                  src={s.src}
                  alt=""
                  width={120}
                  height={120}
                  className="h-full w-full object-contain"
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
