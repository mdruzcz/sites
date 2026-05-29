import Image from "next/image";
import { gallery } from "@/lib/site";

export function Gallery() {
  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[var(--greige-soft)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3 text-[var(--terracotta)]">
            Project Gallery
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Recent decks &amp; fences
          </h2>
          <p className="text-lg text-[var(--driftwood)]/75 leading-relaxed">
            Real homes across Kitchener, Waterloo, Cambridge and Guelph &mdash;
            stained, sealed and ready for another season.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {gallery.map((g, i) => (
            <div
              key={g.src}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-warm group"
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={i < 3}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
