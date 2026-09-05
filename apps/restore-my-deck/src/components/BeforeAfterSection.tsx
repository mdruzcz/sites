import Image from "next/image";
import Link from "next/link";
import { BEFORE_AFTER, photo, type GalleryPhoto } from "@/lib/photos";

export function BeforeAfterPair({ before, after, title, city }: { before: GalleryPhoto; after: GalleryPhoto; title: string; city: string }) {
  return (
    <figure className="card overflow-hidden">
      <div className="grid grid-cols-2 gap-1 bg-[var(--line)]">
        <div className="relative aspect-[4/3]">
          <Image src={before.image} alt={before.alt} fill sizes="(max-width: 768px) 50vw, 290px" placeholder="blur" blurDataURL={before.blurDataURL} className="object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">Before</span>
        </div>
        <div className="relative aspect-[4/3]">
          <Image src={after.image} alt={after.alt} fill sizes="(max-width: 768px) 50vw, 290px" placeholder="blur" blurDataURL={after.blurDataURL} className="object-cover" />
          <span className="absolute left-2 top-2 rounded-full bg-[var(--moss)] px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white">After</span>
        </div>
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-5 py-4 text-sm">
        <span><span className="block font-bold text-[var(--ink)]">{title}</span><span className="text-[var(--muted)]">{city}, ON</span></span>
      </figcaption>
    </figure>
  );
}

export function BeforeAfterSection({ limit = 2, showLink = true }: { limit?: number; showLink?: boolean }) {
  const pairs = BEFORE_AFTER.slice(0, limit);
  return (
    <section className="bg-[var(--paper)]">
      <div className="shell section">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow-pill moss">Before &amp; after</p>
            <h2 className="font-display h2-fluid mt-4">Same boards, two days later.</h2>
          </div>
          {showLink && <Link href="/projects" className="btn-outline btn-sm">See all projects</Link>}
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {pairs.map((p) => <BeforeAfterPair key={p.before} before={photo(p.before)} after={photo(p.after)} title={p.title} city={p.city} />)}
        </div>
      </div>
    </section>
  );
}
