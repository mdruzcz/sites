import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { photo, type PhotoKey } from "@/lib/photos";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Permanent Lighting Gallery: Real Homes, Real Colours",
  description:
    "Photos of permanent LED roofline lighting on Canadian homes: warm white, red and white, green, blue, magenta and rainbow scenes, plus daytime shots showing how the aluminum track disappears.",
  alternates: { canonical: `${SITE_URL}/gallery` },
  openGraph: { title: "Permanent Lighting Gallery | Permanent Lighting Direct", description: "Real installs using the same 12V track-and-puck hardware in every kit.", url: `${SITE_URL}/gallery`, images: ["/images/photos/hero-multicolour-wide.webp"] }
};

const GROUPS: { title: string; blurb: string; keys: PhotoKey[] }[] = [
  { title: "Warm white, every evening", blurb: "The dedicated white diode gives a true warm white, not a pinkish mix. This is what most homes run 300 nights a year.", keys: ["home-warm-white-twilight", "home-warm-white-christmas", "home-example-warm-white", "home-cottage-evening", "detail-pucks-closeup", "soffit-lights-perm2"] },
  { title: "Holiday colours", blurb: "Saved scenes for Christmas, Canada Day, Halloween, Valentine's and game day. One tap in the app.", keys: ["home-red-canada-day", "home-green-roofline", "home-pink-magenta", "home-rainbow", "home-purple", "home-craftsman-multicolour", "home-side-elevation", "track-night-glow", "track-residential"] },
  { title: "Blue and cool tones", blurb: "Popular for winter, Hanukkah and modern exteriors.", keys: ["home-blue-night", "hero-blue-porch", "home-blue-app-control", "home-teal-hot-tub", "home-example-multicolour", "track-security-white"] },
  { title: "By day, it disappears", blurb: "Colour-matched aluminum track sits flush in the soffit. Neighbours only notice at night.", keys: ["home-daytime-hidden", "track-day-discreet", "soffit-lights-day", "soffit-lights-installed", "install-home-day", "soffit-lights-more"] },
  { title: "On the ladder", blurb: "Track, pucks and connectors going up. A comfortable DIYer does a bungalow front in an afternoon.", keys: ["install-track-mounting", "install-eder", "soffit-lights-perm", "detail-tracks", "track-four-seasons", "hero-multicolour-wide"] }
];

export default function GalleryPage() {
  const all = GROUPS.flatMap((g) => g.keys);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Permanent Lighting Direct gallery",
    url: `${SITE_URL}/gallery`,
    image: all.map((k) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${photo(k).src}`, description: photo(k).alt }))
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero photo="hero-multicolour-wide" eyebrow="Gallery" title="Real homes. Real colours. Same hardware as your kit." intro="Every photo here uses the 12V track-and-puck system we ship. Use them to pick a track colour, a spacing look, and a scene for your own roofline." crumbs={[{ label: "Gallery" }]} />
      {GROUPS.map((g, gi) => (
        <section key={g.title} className={gi % 2 ? "bg-[var(--color-bg-warm)]" : "bg-[var(--color-bg)]"}>
          <div className="shell section">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">{g.title}</p>
              <p className="mt-5 text-[var(--color-text-soft)]">{g.blurb}</p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {g.keys.map((k, i) => (
                <figure key={k} className={`group overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 md:col-span-2" : ""}`}>
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
          <p className="eyebrow text-[var(--color-gold)]">Your turn</p>
          <h2 className="font-display h2-fluid mx-auto mt-5 max-w-2xl">Pick a kit and see your own home in the gallery.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/diy-kits" className="btn-primary">Pick your kit</Link>
            <Link href="/resources/permanent-lighting-colour-ideas-for-every-holiday" className="btn-ghost-light">Colour ideas by holiday</Link>
          </div>
        </div>
      </section>
    </>
  );
}
