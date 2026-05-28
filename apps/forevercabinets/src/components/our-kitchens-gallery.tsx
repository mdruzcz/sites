import Image from "next/image";
import Link from "next/link";
import { getOurKitchens } from "@/lib/our-kitchens";

type Props = {
  variant?: "homepage" | "full" | "strip";
  heading?: string;
  blurb?: string;
};

export function OurKitchensGallery({
  variant = "homepage",
  heading = "Kitchens we've built",
  blurb = "Real installs with Forever Cabinets — White Shaker, plywood box, 36″ wall cabinets as standard.",
}: Props) {
  const photos = getOurKitchens();
  if (photos.length === 0) {
    // Hide the section entirely until photos exist
    return null;
  }

  if (variant === "strip") {
    return (
      <div className="flex gap-4 overflow-x-auto scrollbar-thin">
        {photos.map((p) => (
          <figure
            key={p.filename}
            className="relative w-72 flex-shrink-0 overflow-hidden border border-[var(--color-line)] bg-white"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={p.url} alt={p.caption} fill className="object-cover" sizes="288px" />
            </div>
            <figcaption className="border-t border-[var(--color-line)] p-3 text-sm text-[var(--color-ink-soft)]">
              {p.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const showAll = variant === "full";
  const visible = showAll ? photos : photos.slice(0, 6);

  return (
    <section className={variant === "homepage" ? "mx-auto max-w-6xl px-4 py-20" : ""}>
      <p className="text-[11px] uppercase tracking-[0.3em] text-[var(--color-brass-dark)]">
        Real installs
      </p>
      <h2 className="mt-2 font-display text-3xl text-[var(--color-navy)] sm:text-4xl">
        {heading}
      </h2>
      {blurb && (
        <p className="mt-3 max-w-2xl text-[var(--color-ink-soft)]">{blurb}</p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <figure
            key={p.filename}
            className="group overflow-hidden border border-[var(--color-line)] bg-white"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={p.url}
                alt={`Forever Cabinets White Shaker kitchen install — ${p.caption}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={i < 3 ? "eager" : "lazy"}
              />
            </div>
            <figcaption className="border-t border-[var(--color-line)] p-4">
              <p className="text-[11px] uppercase tracking-widest text-[var(--color-brass-dark)]">
                Forever Cabinets install
              </p>
              <p className="mt-1 font-display text-lg text-[var(--color-navy)]">{p.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      {!showAll && photos.length > 6 && (
        <div className="mt-8">
          <Link href="/our-kitchens" className="btn-secondary">
            See all kitchens →
          </Link>
        </div>
      )}
    </section>
  );
}
