import Image from "next/image";
import type { GalleryPhoto } from "@/lib/photos";

/** Labelled before/after pair. */
export function BeforeAfter({ before, after, title, city, finish }: { before: GalleryPhoto; after: GalleryPhoto; title: string; city: string; finish: string }) {
  return (
    <figure className="card overflow-hidden">
      <div className="grid grid-cols-2 gap-1 bg-[var(--line)]">
        <div className="relative aspect-[3/2]">
          <Image src={before.image} alt={before.alt} fill sizes="(max-width: 768px) 50vw, 290px" placeholder="blur" blurDataURL={before.blurDataURL} className="object-cover grayscale-[15%]" />
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">Before</span>
        </div>
        <div className="relative aspect-[3/2]">
          <Image src={after.image} alt={after.alt} fill sizes="(max-width: 768px) 50vw, 290px" placeholder="blur" blurDataURL={after.blurDataURL} className="object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-[var(--moss)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">After</span>
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4 text-sm">
        <span><span className="block font-bold text-[var(--ink)]">{title}</span><span className="text-[var(--muted)]">{city}, ON</span></span>
        <span className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--accent-deep)]">{finish}</span>
      </figcaption>
    </figure>
  );
}
