import Link from "next/link";
import Image from "next/image";

type Cat = { id: string; name: string; slug: string };

// One representative product photo per category (white-background studio shots → clean circular tiles).
const CATEGORY_IMAGE: Record<string, string> = {
  "new-products": "/images/11-LED-Candy-Cane-Red-WW-1.jpg",
  "mini-lights": "/images/ornament-ring.jpg",
  "large-strawberry-lights-c9":
    "/images/Commercial-Christmas-C9-Bulb-Multi-2023_ab96b6d0-d69c-437d-8768-a30e0a19ae9a-600x600.jpg",
  "super-bright-globe-lights-g20":
    "/images/Commercial-Christmas-G20-Multi-Bulb-Unlit-Close-Up-Thumbnail-1080-Alt-1.webp",
  "snowfall-lights":
    "/images/Commercial-Grade-LED-Christmas-Pure-White-C9-Base-Snow-Fall-Light-24-Inch-Wide-Box-Open-Closed.webp",
  trees: "/images/Picture7.jpg",
  "garlands-and-wreathes": "/images/building-front-wreaths-600x600.jpg",
  ornaments:
    "/images/Commercial-Christmas-White-Ornament-26-Inch-No-Lights-Collapsed-Wide-Thumbnail-1080_cdd1c9d8-9382-4212-be6a-2cd246405bfb-600x448.webp",
  "3d": "/images/10-3D-LED-Ornament-Icon-w-Silver-Garland-and-Warm-White-Lights-600x600.jpg",
  "2d": "/images/5.25-2D-LED-Snowman.jpg",
  animals: "/images/Picture21.jpg",
  "photo-op-displays": "/images/5.25-2D-LED-Snowman.jpg",
  "extension-cords-and-wire":
    "/images/Commercial-Christmas-Male-Female-Plug-Pair-Black-Front-With-Cap-600x600.jpg",
  accessories: "/images/Commercial-Christmas-C9-Base-Green-Socket-Replacement-Front.jpg",
  "last-chance": "/images/Commercial-Christmas-Lawn-Stake-5-Inch-Black.webp"
};

export function CategoryTiles({ categories }: { categories: Cat[] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 md:py-24">
        <div className="text-center">
          <p className="eyebrow text-[var(--color-accent)]">Shop by category</p>
          <h2 className="font-display mt-3 text-4xl md:text-5xl">Find your look</h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">
            From a single strand of C9 bulbs to a full municipal display &mdash; everything we carry is
            commercial-grade and in stock in Ontario.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((c) => {
            const img = CATEGORY_IMAGE[c.slug];
            return (
              <Link
                key={c.id}
                href={`/product-category/${c.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative aspect-square w-full max-w-[160px] overflow-hidden rounded-full border border-[var(--color-border)] bg-[var(--color-bg-warm)] transition group-hover:border-[var(--color-accent)] group-hover:shadow-lg">
                  {img ? (
                    <Image
                      src={img}
                      alt={`${c.name} — commercial-grade Christmas lighting at Holiday Light Supplies`}
                      fill
                      sizes="(max-width: 768px) 40vw, 160px"
                      className="object-contain p-5 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="font-display absolute inset-0 grid place-items-center text-3xl text-[var(--color-brand)]">
                      {c.name.charAt(0)}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-sm font-semibold leading-snug text-[var(--color-text)] group-hover:text-[var(--color-accent)]">
                  {c.name}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link href="/shop" className="btn-primary">
            Browse all products →
          </Link>
        </div>
      </div>
    </section>
  );
}
