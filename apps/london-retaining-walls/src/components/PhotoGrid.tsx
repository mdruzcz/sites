import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";

export function PhotoGrid({ photos, cols = 3, caption = true }: { photos: Photo[]; cols?: 2 | 3 | 4; caption?: boolean }) {
  const colCls = cols === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className={`grid gap-4 ${colCls}`}>
      {photos.map((p) => (
        <figure key={p.image} className="group relative overflow-hidden border border-[var(--line)] bg-paper-2">
          <div className="relative aspect-[4/3]">
            <Image src={p.image} alt={p.alt} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover transition duration-500 group-hover:scale-[1.03]" />
          </div>
          {caption && <figcaption className="border-t border-[var(--line)] bg-white px-3 py-2 text-[13px] leading-snug text-ink-2">{p.alt}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function PhotoStrip({ photos, title, text, href = "/gallery", linkLabel = "See the full gallery" }: { photos: Photo[]; title: string; text?: string; href?: string; linkLabel?: string }) {
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="kicker">Our work</p>
            <h2 className="display mt-3 text-3xl md:text-4xl">{title}</h2>
            {text && <p className="mt-3 text-[17px] text-ink-2">{text}</p>}
          </div>
          <Link href={href} className="btn btn-outline shrink-0">{linkLabel}</Link>
        </div>
        <div className="mt-10"><PhotoGrid photos={photos} /></div>
      </div>
    </section>
  );
}
