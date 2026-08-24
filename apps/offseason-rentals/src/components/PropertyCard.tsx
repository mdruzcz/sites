import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Icon } from "@/components/Icon";
import { headlineRate, specLine, minStayLabel } from "@/lib/format";
import type { Property } from "@/lib/types";

/**
 * The listing card. Deliberately close to Airbnb's: a 4:3 photo with a 12px
 * radius, then three tight text lines — title, supporting grey, price — with
 * no card border or shadow. The photo does the work; chrome around it only
 * competes with the photograph.
 */
export function PropertyCard({
  property: p,
  priority = false,
  sizes = "(min-width: 1280px) 25vw, (min-width: 900px) 33vw, (min-width: 640px) 50vw, 100vw"
}: {
  property: Property;
  priority?: boolean;
  sizes?: string;
}) {
  const cover = p.photos[0];
  const rate = headlineRate(p);

  return (
    <Link href={`/rentals/${p.slug}`} className="group block no-tap-highlight">
      <div
        className="relative w-full overflow-hidden bg-[var(--surface-3)]"
        style={{ aspectRatio: "4 / 3", borderRadius: "var(--r-md)" }}
      >
        {cover ? (
          <Photo
            src={cover.url}
            alt={cover.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[var(--muted)]">
            <Icon name="home" size={28} />
          </div>
        )}

        {p.featured ? (
          <span
            className="absolute left-3 top-3 pill"
            style={{ background: "var(--surface)", color: "var(--ink)", boxShadow: "var(--shadow-sm)" }}
          >
            Owner favourite
          </span>
        ) : null}

        {p.photos.length > 1 ? (
          <span
            className="absolute right-3 bottom-3 pill"
            style={{ background: "rgba(0,0,0,0.55)", color: "#fff" }}
            aria-hidden="true"
          >
            {p.photos.length} photos
          </span>
        ) : null}
      </div>

      <div className="pt-3">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-[15px] font-semibold leading-snug truncate">{p.name}</h3>
          <span className="shrink-0 text-[13px] text-[var(--muted)]">{p.city}</span>
        </div>

        <p className="mt-1 text-[14px] text-[var(--muted)] truncate">{specLine(p)}</p>

        <p className="text-[14px] text-[var(--muted)] truncate">
          {p.property_type}
          {p.utilities_included ? " · Utilities included" : ""}
        </p>

        {rate ? (
          <p className="mt-1.5 text-[15px]">
            <span className="font-semibold">{rate.label.split(" / ")[0]}</span>
            <span className="text-[var(--muted)]"> / {rate.unit}</span>
            <span className="text-[var(--muted)]"> · {minStayLabel(p.min_stay_nights)}</span>
          </p>
        ) : (
          <p className="mt-1.5 text-[15px] font-semibold">Rate on request</p>
        )}
      </div>
    </Link>
  );
}

/** Loading placeholder matching the card's exact geometry. */
export function PropertyCardSkeleton() {
  return (
    <div>
      <div className="shimmer w-full" style={{ aspectRatio: "4 / 3", borderRadius: "var(--r-md)" }} />
      <div className="pt-3 space-y-2">
        <div className="shimmer h-4 w-3/4 rounded" />
        <div className="shimmer h-3.5 w-1/2 rounded" />
        <div className="shimmer h-3.5 w-2/5 rounded" />
      </div>
    </div>
  );
}
