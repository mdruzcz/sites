"use client";

import Image from "next/image";
import { useState } from "react";
import { imageSrc } from "@/lib/utils";

interface Img {
  id: string;
  public_url: string | null;
  alt_text: string;
}

export function ProductGallery({ images, name }: { images: Img[]; name: string }) {
  const list = images.filter((i) => i.public_url);
  const [active, setActive] = useState(0);
  const current = list[active] ?? list[0];

  return (
    <div>
      <div className="relative aspect-square overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <Image
          key={current?.id ?? "placeholder"}
          src={imageSrc(current?.public_url)}
          alt={current?.alt_text ?? name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-contain p-4"
        />
      </div>
      {list.length > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" aria-label="Product photos">
          {list.slice(0, 10).map((i, idx) => (
            <li key={i.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Show photo ${idx + 1}`}
                aria-pressed={idx === active}
                className={`relative size-20 overflow-hidden rounded-xl border bg-white transition ${
                  idx === active ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent-soft)]" : "border-[var(--color-border)] hover:border-[var(--color-brand)]"
                }`}
              >
                <Image src={imageSrc(i.public_url)} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
