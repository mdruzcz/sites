import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { getPhotos } from "@/lib/content";
import { JsonLd, breadcrumbSchema, imageGallerySchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { GalleryGrid } from "@/components/GalleryGrid";
import { BookCta } from "@/components/sections";
import xmasGallery from "@/content/xmas-gallery.json";

export const revalidate = 3600;

const title = "Gallery: Permanent Roofline Lighting Photos";
const description = "Real permanent LED roofline installations in warm white, cool white, red and green, purple, teal and full rainbow. Filter by colour to picture your own home, then get a free AI preview.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/gallery`, images: [{ url: "/images/gallery/rainbow-gradient-permanent-roofline-lights-dark-siding-bungalow.jpg", alt: "Rainbow permanent roofline lights on a bungalow" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function GalleryPage() {
  const photos = getPhotos();
  const seasonal = (xmasGallery as { image: string; alt: string; category: string; width: number; height: number; blurDataURL: string }[]).filter((x) => ["residential", "residential-exterior", "home"].some((k) => x.category.includes(k)) || /home|house|brick-home|eaves/.test(x.image)).slice(0, 8);
  return (
    <>
      <JsonLd data={[imageGallerySchema(photos.map((p) => ({ url: `${site.url}${p.src}`, caption: p.alt }))), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Gallery", url: `${site.url}/gallery` }])]} />
      <section className="section !pb-8" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Gallery" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">See the transformation</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">Project Gallery</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">Permanent roofline lighting on real homes and businesses. Filter by colour to see the look you’re picturing, then <Link href="/ai-preview" className="text-[var(--accent)] underline underline-offset-2">get a free AI preview of your own house</Link>.</p>
          </div>
        </div>
      </section>
      <section className="section !pt-8" style={{ background: "var(--bg)" }}>
        <div className="wrap"><GalleryGrid photos={photos} /></div>
      </section>
      {seasonal.length > 0 && (
        <section className="section" style={{ background: "var(--surface)" }}>
          <div className="wrap">
            <SectionHeading eyebrow="Seasonal C9 & holiday work" title="Christmas Lighting Installs" sub="Traditional holiday lighting from our seasonal service: rooflines, trees, wreaths and garland." gold align="left" />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {seasonal.map((x) => (
                <div key={x.image} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]"><Image src={x.image} alt={x.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" placeholder="blur" blurDataURL={x.blurDataURL} className="object-cover" /></div>
              ))}
            </div>
            <Link href="/seasonal-lighting" className="btn btn-gold btn-sm mt-6">About seasonal lighting <Icon.Arrow width={14} height={14} /></Link>
          </div>
        </section>
      )}
      <BookCta eyebrow="Your home next" title="Want to See Your House Here?" />
    </>
  );
}
