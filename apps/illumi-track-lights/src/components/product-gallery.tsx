"use client";

import Image from "next/image";
import { useState } from "react";

interface Img {
  id: string;
  url: string;
  alt: string;
}

/** Main product photo with a strip of thumbnails that swap it. */
export function ProductGallery({ images, cover = false }: { images: Img[]; cover?: boolean }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];
  if (!main) {
    return <div className="grid aspect-square place-items-center border border-[var(--color-border)] bg-[var(--color-bg-warm)] text-sm text-[var(--color-muted)]">Photo coming soon</div>;
  }
  return (
    <div className="grid items-start gap-3 self-start md:grid-cols-[72px_1fr]">
      {images.length > 1 && (
        <ul className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
          {images.slice(0, 8).map((img, i) => (
            <li key={img.id} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === active}
                className={`block size-[72px] overflow-hidden border bg-white ${i === active ? "border-[var(--color-ink)] outline outline-1 outline-[var(--color-ink)]" : "border-[var(--color-border)] hover:border-[var(--color-accent)]"}`}
              >
                <Image src={img.url} alt="" width={72} height={72} className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className={`order-1 border border-[var(--color-border)] bg-white md:order-2 ${images.length > 1 ? "" : "md:col-span-2"}`}>
        <Image src={main.url} alt={main.alt} width={1200} height={1200} priority sizes="(max-width: 1024px) 100vw, 560px" className={`aspect-square w-full ${cover ? "object-cover" : "object-contain p-4"}`} />
      </div>
    </div>
  );
}
