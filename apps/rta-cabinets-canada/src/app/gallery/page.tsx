import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "White Shaker Kitchen Gallery",
  description:
    "Kitchen inspiration from RTA Cabinets Canada: real White Shaker kitchens with islands, pantries, glass doors and two-tone layouts. Design yours free in the 3D planner and save 8%.",
  alternates: { canonical: "/gallery" },
  openGraph: { title: "White Shaker Kitchen Gallery | RTA Cabinets Canada", description: "Real White Shaker kitchens for inspiration.", images: ["/images/gallery/white-shaker-kitchen-1.webp"] },
  twitter: { card: "summary_large_image", title: "White Shaker Kitchen Gallery", description: "Real White Shaker kitchens for inspiration." },
};

const PHOTOS: { src: string; alt: string; caption: string }[] = [
  { src: "/images/gallery/white-shaker-kitchen-1.webp", alt: "White Shaker kitchen with island and pendant lights - RTA cabinets by RTA Cabinets Canada", caption: "L-shaped kitchen with a working island" },
  { src: "/images/gallery/white-shaker-kitchen-2.webp", alt: "White Shaker wall and base cabinets with quartz counters - RTA Cabinets Canada", caption: "Full-height uppers with crown moulding" },
  { src: "/images/gallery/white-shaker-kitchen-3.webp", alt: "White Shaker galley kitchen with stainless appliances - RTA Cabinets Canada", caption: "Galley layout, 30″ range and hood" },
  { src: "/images/gallery/white-shaker-kitchen-4.webp", alt: "White Shaker kitchen with pantry cabinets and open shelving - RTA Cabinets Canada", caption: "Tall pantry run beside the fridge" },
  { src: "/images/gallery/white-shaker-kitchen-5.webp", alt: "White Shaker cabinets with black hardware and wood floors - RTA Cabinets Canada", caption: "Matte black pulls on painted white doors" },
  { src: "/images/gallery/white-shaker-kitchen-6.webp", alt: "White Shaker kitchen island with seating - RTA Cabinets Canada", caption: "Island with a seating overhang" },
  { src: "/images/gallery/white-shaker-kitchen-8.webp", alt: "White Shaker sink base under a window - RTA Cabinets Canada", caption: "Sink base under the window, dishwasher beside it" },
  { src: "/images/gallery/white-shaker-kitchen-9.webp", alt: "White Shaker drawer base cabinets and corner lazy susan - RTA Cabinets Canada", caption: "Drawer bases and a lazy susan corner" },
  { src: "/images/gallery/white-shaker-kitchen-10.webp", alt: "White Shaker kitchen with glass door wall cabinets - RTA Cabinets Canada", caption: "Glass-door uppers for display" },
  { src: "/images/gallery/white-shaker-kitchen-11.webp", alt: "Bright White Shaker kitchen with two-tone island - RTA Cabinets Canada", caption: "Two-tone island, white perimeter" },
  { src: "/images/DSC09482-Front-Closed-New-scaled-1-1536x1024-1.webp", alt: "Assembled White Shaker base cabinet front view - RTA Cabinets Canada", caption: "Our White Shaker door up close" },
  { src: "/images/13-A1-1536x1024-1.jpg", alt: "White Shaker cabinet interior with plywood box and soft-close drawer - RTA Cabinets Canada", caption: "Plywood box, undermount soft-close glides" },
];

export default function GalleryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "White Shaker Kitchen Gallery",
    url: `${site.url}/gallery`,
    image: PHOTOS.map((p) => `${site.url}${p.src}`),
  };
  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-2">Kitchen Gallery</h1>
      <p className="text-ink-soft mb-10 max-w-2xl">
        White Shaker is the most-installed kitchen in Canada for a reason: it looks right in a century home in London and in a new build in Kitchener. Borrow an idea below, then build it in the free 3D planner.
      </p>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [&>figure]:mb-5">
        {PHOTOS.map((p, i) => (
          <figure key={p.src} className="break-inside-avoid rounded-lg overflow-hidden border border-border bg-white">
            <div className="relative aspect-[4/3]">
              <Image src={p.src} alt={p.alt} fill priority={i < 3} className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            </div>
            <figcaption className="px-4 py-3 text-sm text-ink-soft">{p.caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link href="/planner" className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center">
          Design your kitchen — 8% off
        </Link>
      </div>
      <TrustStrip className="mt-14" />
    </div>
  );
}
