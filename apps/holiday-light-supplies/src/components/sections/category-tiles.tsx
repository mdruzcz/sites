import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";

type Cat = { id: string; name: string; slug: string };

/** Display name, image and blurb per category slug — the DB names are legacy WooCommerce labels. */
export const CATEGORY_META: Record<string, { title: string; image: string; blurb: string; big?: boolean }> = {
  "large-strawberry-lights-c9": { title: "C9 LED bulbs & spools", image: "/images/c9-warm-white-installed-home.jpg", blurb: "25-packs in 12 colours, socket spools at 12\" spacing.", big: true },
  "3d": { title: "3D light displays", image: "/images/products/cd-waterloo-reindeer-3d-2.webp", blurb: "Reindeer, stars, gift boxes and archways in aluminum + LED netting.", big: true },
  "photo-op-displays": { title: "Photo-op & walk-through", image: "/images/products/cd-otaki-archway-5.webp", blurb: "Frames, tunnels and oversized props that fill a feed." },
  "pole-mount-decor": { title: "Pole-mount décor", image: "/images/products/ccs-7-led-shooting-star-pole-mount-2.webp", blurb: "Snowflakes, stars and candy canes for street light poles." },
  "overhead-skyline-decor": { title: "Overhead & skyline", image: "/images/products/ccs-10-6-starburst-skyline-decor-3.webp", blurb: "Spans and skyline pieces that cross a street or atrium." },
  "garlands-and-wreathes": { title: "Wreaths & garland", image: "/images/products/ccs-classic-decorated-commercial-wreath-1.webp", blurb: "3 to 12 ft commercial wreaths, 10 ft garland sections." },
  "commercial-bows": { title: "Commercial bows", image: "/images/products/ccs-15-red-structural-bow-no-trim-with-20-tails-1.webp", blurb: "Structural bows 15 to 60 in, outdoor-rated." },
  trees: { title: "Commercial trees", image: "/images/products/ccs-premium-commercial-panel-trees-2.webp", blurb: "Lobby trees to 38 ft panel towers." },
  "mini-lights": { title: "Mini lights", image: "/images/Commercial-Christmas-Warm-White-Pure-Twinkle-Mini-Light-5mm-Green-Wire-Close-Up.webp", blurb: "5mm strands for tree wraps and shrubs." },
  ornaments: { title: "Giant ornaments & props", image: "/images/products/ccs-giant-glitter-ornament-1.webp", blurb: "Fiberglass ornaments, stacks and nutcrackers." },
  animals: { title: "Animals", image: "/images/Picture23.jpg", blurb: "Lit reindeer, bears, penguins and more." },
  "2d": { title: "2D motifs", image: "/images/5.25-2D-LED-Snowman.jpg", blurb: "Flat LED motifs for walls and poles." },
  "snowfall-lights": { title: "Snowfall tubes", image: "/images/Commercial-Grade-LED-Christmas-Pure-White-C9-Base-Snow-Fall-Lights-Close-Up-2-1.webp", blurb: "Cascading meteor tubes." },
  "super-bright-globe-lights-g20": { title: "G20 globe lights", image: "/images/Commercial-Christmas-G20-Multi-Bulb-Unlit-Close-Up-Thumbnail-1080-Alt-1.webp", blurb: "Patio and café globes." },
  "extension-cords-and-wire": { title: "Wire, spools & plugs", image: "/images/products/ccs-500-light-spools-c7-c9-12-bulb-spacing-3.webp", blurb: "SPT-1/2 wire, socket spools, vampire plugs." },
  accessories: { title: "Accessories", image: "/images/Commercial-Christmas-Lawn-Stake-5-Inch-Black.webp", blurb: "Timers, clips, stakes, floodlights." },
  "permanent-lighting-kits": { title: "Permanent lighting kits", image: "/images/kits/permanent-led-roofline-lights-warm-white-night.webp", blurb: "12V RGBW roofline kits, 50–250 ft." },
  "new-products": { title: "New this season", image: "/images/products/cd-the-toque-3.webp", blurb: "Fresh arrivals." },
  "last-chance": { title: "Last chance", image: "/images/Commercial-Christmas-5-Inch-Lawn-Stake-Black-Close-Up__02767.1598493399.1280.1280.webp", blurb: "While stock lasts." }
};

const HOME_ORDER = [
  "large-strawberry-lights-c9",
  "3d",
  "photo-op-displays",
  "pole-mount-decor",
  "overhead-skyline-decor",
  "garlands-and-wreathes",
  "commercial-bows",
  "trees",
  "mini-lights",
  "ornaments",
  "permanent-lighting-kits",
  "extension-cords-and-wire"
];

export function CategoryTiles({ categories }: { categories: Cat[] }) {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const tiles = HOME_ORDER.map((slug) => bySlug.get(slug)).filter((c): c is Cat => !!c);

  return (
    <section className="bg-white">
      <div className="shell section">
        <SectionHeading
          eyebrow="Shop by category"
          title="Everything a commercial display needs, in one order."
          sub="From a case of C9 bulbs to a 16 ft walk-through snowman. Commercial-grade, winter-rated and stocked in Ontario."
          action={{ href: "/shop", label: "Browse all products" }}
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {tiles.map((c, i) => {
            const meta = CATEGORY_META[c.slug];
            const big = meta?.big && i < 2;
            return (
              <Link
                key={c.id}
                href={`/product-category/${c.slug}`}
                className={`group relative isolate overflow-hidden rounded-2xl bg-[var(--color-night)] text-white ${big ? "col-span-2 row-span-2 min-h-[280px] md:min-h-[360px]" : "aspect-square"}`}
              >
                <Image
                  src={meta?.image ?? "/images/logo.png"}
                  alt={`${meta?.title ?? c.name} — commercial Christmas lighting from Holiday Light Supplies`}
                  fill
                  sizes={big ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  className="object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="scrim-strong absolute inset-0" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className={`font-display leading-tight ${big ? "text-2xl md:text-3xl" : "text-lg"}`}>{meta?.title ?? c.name}</h3>
                  {meta?.blurb && <p className={`mt-1 text-white/80 ${big ? "text-sm md:text-base" : "hidden text-xs md:block"}`}>{meta.blurb}</p>}
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-gold-bright)]">
                    Shop <Icon.arrow size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
