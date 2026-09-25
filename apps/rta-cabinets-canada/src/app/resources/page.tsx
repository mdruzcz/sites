import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getGuides, getCities } from "@/lib/content";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "RTA Cabinet Guides & Resources",
  description:
    "Free guides from RTA Cabinets Canada: measuring your kitchen, assembling and installing RTA cabinets, cabinet sizes explained, White Shaker design ideas, shipping, financing and care.",
  alternates: { canonical: "/resources" },
  openGraph: { title: "RTA Cabinet Guides & Resources", description: "Measuring, assembly, installation, sizes, design ideas, shipping and financing guides." },
  twitter: { card: "summary_large_image", title: "RTA Cabinet Guides & Resources", description: "Measuring, assembly, installation, sizes, design ideas, shipping and financing guides." },
};

const GALLERY = ["/images/gallery/white-shaker-kitchen-1.webp", "/images/gallery/white-shaker-kitchen-2.webp", "/images/gallery/white-shaker-kitchen-3.webp", "/images/gallery/white-shaker-kitchen-4.webp", "/images/gallery/white-shaker-kitchen-5.webp", "/images/gallery/white-shaker-kitchen-6.webp", "/images/gallery/white-shaker-kitchen-8.webp", "/images/gallery/white-shaker-kitchen-9.webp", "/images/gallery/white-shaker-kitchen-10.webp"];

const QUICK = [
  { href: "/planner", t: "3D Kitchen Planner", d: "Design your kitchen, get a parts list and 8% off." },
  { href: "/how-to-measure", t: "How to Measure", d: "The quick checklist before you order." },
  { href: "/shipping-and-delivery", t: "Shipping & Free Delivery", d: `Free within ${site.freeDeliveryKm} km of London, Ontario.` },
  { href: "/financing", t: "0% APR Financing", d: "Spread a complete kitchen over monthly payments." },
  { href: "/lowest-price-guarantee", t: "Lowest Price Guarantee", d: "Find it cheaper in Canada and we match it." },
  { href: "/assembly-service", t: "Expert Assembly", d: `$${site.assemblyPerCabinet} per cabinet, delivered ready to hang.` },
  { href: "/warranty", t: "Warranty & Returns", d: "Limited lifetime warranty details." },
  { href: "/faq", t: "FAQ", d: "Quick answers about RTA cabinets and quotes." },
];

export default function ResourcesPage() {
  const guides = getGuides();
  const cities = getCities();
  const categories = [...new Set(guides.map((g) => g.category))];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "RTA Cabinet Guides & Resources",
    url: `${site.url}/resources`,
    hasPart: guides.map((g) => ({ "@type": "Article", headline: g.title, url: `${site.url}/resources/${g.slug}` })),
  };
  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-2">Guides &amp; Resources</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        Everything we&rsquo;ve learned helping Southwestern Ontario homeowners and contractors plan, order, assemble and install White Shaker RTA kitchens — free, no signup needed.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
        {QUICK.map((q) => (
          <Link key={q.href} href={q.href} className="rounded-lg border border-border bg-white p-4 hover:shadow-md transition-shadow">
            <p className="font-semibold">{q.t}</p>
            <p className="text-sm text-ink-soft mt-1">{q.d}</p>
          </Link>
        ))}
      </div>

      {categories.map((cat) => (
        <section key={cat} className="mb-12">
          <h2 className="text-2xl font-bold mb-5">{cat}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides
              .filter((g) => g.category === cat)
              .map((g, i) => (
                <Link key={g.slug} href={`/resources/${g.slug}`} className="group block bg-white border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative aspect-[16/9] bg-sand">
                    <Image src={GALLERY[(guides.indexOf(g) + i) % GALLERY.length]} alt={`${g.title} - White Shaker kitchen by ${site.name}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-accent font-medium mb-1">
                      {g.category} · {g.readMinutes} min read
                    </p>
                    <h3 className="font-semibold leading-snug group-hover:text-accent">{g.title}</h3>
                    <p className="text-sm text-ink-soft mt-2 line-clamp-2">{g.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </section>
      ))}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-2">Free delivery near you</h2>
        <p className="text-ink-soft mb-5 max-w-2xl">We deliver free within {site.freeDeliveryKm} km of London, Ontario. Local pages for the areas we serve most:</p>
        <div className="flex flex-wrap gap-2">
          {cities.map((c) => (
            <Link key={c.slug} href={`/kitchen-cabinets/${c.slug}`} className="rounded-full border border-border bg-white px-4 py-2 text-sm font-medium hover:border-accent hover:text-accent">
              Kitchen cabinets {c.city}
            </Link>
          ))}
        </div>
      </section>

      <TrustStrip />
    </div>
  );
}
