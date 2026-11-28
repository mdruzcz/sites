'use client';
// Product gallery for a kit page: one large image with a row of thumbnails.
// The first image is the lit-home photo for that kit size; the component shots
// follow. Only the selected image is rendered large, so the others cost a
// thumbnail each until someone asks for them.
import { useState } from 'react';
import Image from 'next/image';

export interface GalleryImage {
  src: string;
  alt: string;
  blurDataURL: string;
  /** Photos fill the frame; product shots on white are shown whole. */
  fit: 'cover' | 'contain';
  /** Short label for the thumbnail button and the caption under the image. */
  label: string;
}

export function KitGallery({ images, note }: { images: GalleryImage[]; note?: string }) {
  const [index, setIndex] = useState(0);
  const active = images[index] ?? images[0];
  if (!active) return null;

  return (
    <div>
      <figure>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-white">
          <Image
            key={active.src}
            src={active.src}
            alt={active.alt}
            fill
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 58vw"
            placeholder="blur"
            blurDataURL={active.blurDataURL}
            className={active.fit === 'cover' ? 'object-cover' : 'object-contain p-6 md:p-10'}
          />
        </div>
        <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-xs text-muted">
          <span className="font-semibold text-ink-soft">{active.label}</span>
          {index === 0 && note && <span>{note}</span>}
        </figcaption>
      </figure>

      {images.length > 1 && (
        <ul className="mt-3 grid grid-cols-5 gap-2" aria-label="More photos of this kit">
          {images.map((img, i) => {
            const on = i === index;
            return (
              <li key={img.src}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show photo ${i + 1} of ${images.length}: ${img.label}`}
                  aria-pressed={on}
                  className={`relative block aspect-square w-full min-h-[44px] overflow-hidden rounded-xl border-2 bg-white transition-colors ${on ? 'border-ink' : 'border-line hover:border-muted'}`}
                >
                  <Image
                    src={img.src}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 20vw, 128px"
                    placeholder="blur"
                    blurDataURL={img.blurDataURL}
                    className={img.fit === 'cover' ? 'object-cover' : 'object-contain p-1.5'}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
