import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { photo, type PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery: Soffit Track Lighting on Real Homes",
  description:
    "Photos of Illumi soffit track lighting on real homes: warm white evenings, holiday colours, security white, and daytime shots that show how the colour-matched track disappears into the soffit.",
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: { title: "Gallery | Illumi Track Lights", description: "Real installs, day and night.", url: `${SITE_URL}/gallery`, images: ["/images/photos/hero-home-twilight.webp"] }
};

const GROUPS: { title: string; blurb: string; keys: PhotoKey[] }[] = [
  { title: "Day: the track disappears", blurb: "Colour-matched aluminum channel flush under the soffit. This is the part strip kits cannot do.", keys: ["home-day-hidden", "track-day", "soffit-lights-installed", "soffit-lights-day", "home-street", "install-home-day"] },
  { title: "Warm white evenings", blurb: "A dedicated white diode gives a true warm white that reads as architectural lighting, not a Christmas display.", keys: ["hero-home-twilight", "scene-warm-white", "home-cottage", "home-warm-white-christmas", "detail-pucks", "soffit-lights-perm2"] },
  { title: "Holiday and game day", blurb: "Saved scenes for every occasion, one tap in the app.", keys: ["scene-red", "scene-green", "scene-pink", "scene-rainbow", "home-purple", "home-craftsman-multicolour", "track-night", "home-side-elevation", "home-roofline-garage"] },
  { title: "Blue and security white", blurb: "Cool tones for winter, and a bright white security mode on a sunset schedule.", keys: ["home-night-lit", "home-elevation-blue", "scene-blue", "scene-security", "home-teal-hot-tub", "home-residential"] },
  { title: "Installation days", blurb: "Our crew in Southwestern Ontario, and DIYers across Canada.", keys: ["home-install", "banner-install", "install-wide", "detail-track-install", "install-track-mounting", "install-eder"] }
];

export default function GalleryPage() {
  const all = GROUPS.flatMap((g) => g.keys);
  const jsonLd = { "@context": "https://schema.org", "@type": "ImageGallery", name: "Illumi Track Lights gallery", url: `${SITE_URL}/gallery`, image: all.map((k) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${photo(k).src}`, description: photo(k).alt })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="hero-home-twilight" eyebrow="Gallery" title="Real homes, day and night." intro="Every photo uses the 12V track-and-puck hardware that ships in our kits and goes up on our installs." crumbs={[{ label: "Gallery" }]} />
      {GROUPS.map((g, gi) => (
        <section key={g.title} className={gi % 2 ? "bg-[var(--color-bg-warm)]" : "bg-[var(--color-bg)]"}>
          <div className="shell section">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-gold-text)]">{g.title}</p>
              <p className="mt-5 text-[var(--color-text-soft)]">{g.blurb}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {g.keys.map((k, i) => (
                <figure key={k} className={`group overflow-hidden rounded-2xl ${i === 0 ? "col-span-2" : ""}`}>
                  <Photo name={k} ratio={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"} sizes="(max-width: 768px) 100vw, 600px" className="transition duration-500 group-hover:scale-[1.03]" />
                  <figcaption className="sr-only">{photo(k).alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}
      <section className="bg-[var(--color-ink)] text-white">
        <div className="shell section-lg text-center">
          <p className="eyebrow text-[var(--color-gold)]">Your house next</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Send us a photo and we will tell you the kit size.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us" className="btn-primary">Send a photo</Link>
            <Link href="/diy-kits" className="btn-ghost-light">Shop kits</Link>
          </div>
        </div>
      </section>
    </>
  );
}
