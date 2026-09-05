import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ProductCard } from "@/components/product-card";
import { getCategories, listProducts } from "@/lib/catalog";
import type { PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

const CATEGORY_META: Record<string, { photo: PhotoKey; title: string; description: string; intro: string }> = {
  "diy-kits": { photo: "home-blue-night", title: "Permanent Lighting Kits", description: "Complete 12V permanent lighting kits from 50 to 250 ft with track, pucks, controller, power and connectors. From $1,265, free shipping over $500.", intro: "Six complete kits. Everything for your footage in one box, with app control included." },
  lights: { photo: "detail-pucks-closeup", title: "12V LED Lights", description: "12V RGBW puck light strands, soffit light kits and outdoor string lights for permanent roofline, deck and pergola lighting. Ships from London, Ontario.", intro: "RGBW pucks for the track, soffit downlights and string lights for decks and pergolas. All 12V." },
  controllers: { photo: "home-blue-app-control", title: "WiFi Controllers & Amplifiers", description: "12V WLED WiFi controllers, 4-channel boards and data amplifiers for permanent LED lighting. App control with scenes, schedules and zones.", intro: "WLED-based WiFi controllers, multi-channel boards and data amplifiers for long runs." },
  connectors: { photo: "soffit-lights-installed", title: "Connectors & Cables", description: "Waterproof 12V extension connectors in 1, 5, 10 and 20 ft, T-connectors and power injection cables for permanent LED lighting runs.", intro: "Sealed extension connectors, T-splitters and power-injection cables. Bridge gaps, branch runs, keep the far end bright." },
  "power-supplies": { photo: "soffit-lights-day", title: "12V Power Supplies", description: "Waterproof 12V constant-voltage LED power supplies in 60 W, 150 W, 200 W and 300 W for permanent lighting controllers and power injection.", intro: "Waterproof constant-voltage drivers for the controller and for power injection on long runs." },
  hardware: { photo: "detail-tracks", title: "Aluminum Track & Hardware", description: "42-inch 5-hole aluminum lighting track in black, white, wicker and brown, plus colour-matched 5/8-inch soffit screws.", intro: "Track that hides the wire and screws that hide in the track." }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  const meta = CATEGORY_META[slug];
  return {
    title: meta?.title ?? cat.name,
    description: meta?.description ?? cat.description ?? undefined,
    alternates: { canonical: `${SITE_URL}/product-category/${slug}` },
    openGraph: { title: `${meta?.title ?? cat.name} | Illumi Track Lights`, description: meta?.description ?? undefined, url: `${SITE_URL}/product-category/${slug}` }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await listProducts({ categorySlug: slug });
  const meta = CATEGORY_META[slug] ?? { photo: "home-blue-night" as PhotoKey, title: cat.name, description: cat.description ?? "", intro: cat.description ?? "" };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: meta.title,
    url: `${SITE_URL}/product-category/${slug}`,
    mainEntity: { "@type": "ItemList", itemListElement: products.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name, url: `${SITE_URL}/product/${p.slug}` })) }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo={meta.photo} eyebrow="Catalogue" title={meta.title} intro={meta.intro} crumbs={[{ label: "Shop", href: "/shop" }, { label: cat.name }]} compact />
      <div className="shell section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted)]">{products.length} products</p>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <Link key={c.slug} href={`/product-category/${c.slug}`} className={`btn-sm rounded-full border px-3.5 text-sm transition ${c.slug === slug ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-white" : "border-[var(--color-border-strong)] bg-white hover:border-[var(--color-ink)]"}`}>
                {c.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
        {products.length === 0 && <p className="mt-8 text-[var(--color-muted)]">Nothing here yet. <Link href="/shop" className="link-underline">Browse the full catalogue</Link>.</p>}
      </div>
    </>
  );
}
