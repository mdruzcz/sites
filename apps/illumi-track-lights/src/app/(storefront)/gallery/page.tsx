import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { photo, type PhotoKey } from "@/lib/photos";
import { BRAND, SITE_URL } from "@/lib/utils";

const PAGE_URL = `${SITE_URL}/gallery`;
const TITLE = "Track Lighting Photos, Day and Night";
const DESCRIPTION =
  "Photos of permanent track lighting on houses: the track by day, warm white evenings, holiday colours, security white and the hardware going up under the soffit.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { type: "website", title: `${TITLE} | ${BRAND.name}`, description: DESCRIPTION, url: PAGE_URL, images: [photo("hero-home-twilight").src] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION }
};

const GROUPS: { title: string; blurb: string; keys: PhotoKey[] }[] = [
  {
    title: "By day, the track",
    blurb: "Start here, because this is how the house looks most of the time. The channel sits flat under the soffit in a matching colour, and the wire is inside it.",
    keys: ["home-day-hidden", "track-day", "soffit-lights-installed", "soffit-lights-day", "home-street", "install-home-day"]
  },
  {
    title: "Warm white evenings",
    blurb: "Every light has its own warm white LED beside the colour ones. This is the setting most people leave on a sunset schedule.",
    keys: ["hero-home-twilight", "scene-warm-white", "home-cottage", "home-warm-white-christmas", "detail-pucks", "soffit-lights-perm2"]
  },
  {
    title: "Holidays and game day",
    blurb: "Scenes are saved on the controller and picked from the app. Red and white for Canada Day, team colours, a slow rainbow, whatever the night calls for.",
    keys: ["scene-red", "scene-green", "scene-pink", "scene-rainbow", "home-purple", "home-craftsman-multicolour", "track-night", "home-side-elevation", "home-roofline-garage"]
  },
  {
    title: "Blue and security white",
    blurb: "Cool colours for winter, and a bright white you can put on a schedule to light the walls after dark.",
    keys: ["home-night-lit", "home-elevation-blue", "scene-blue", "scene-security", "home-teal-hot-tub", "home-residential"]
  },
  {
    title: "Going up",
    blurb: "Track being screwed to the soffit and lights being pressed in. It is the same job whether our crew does it or you do.",
    keys: ["home-install", "banner-install", "install-wide", "detail-track-install", "install-track-mounting", "install-eder"]
  }
];

const slug = (t: string) => t.toLowerCase().replace(/[^a-z]+/g, "-");

export default function GalleryPage() {
  const all = GROUPS.flatMap((g) => g.keys);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `${BRAND.name} photo gallery`,
    description: DESCRIPTION,
    url: PAGE_URL,
    image: all.map((k) => ({ "@type": "ImageObject", contentUrl: `${SITE_URL}${photo(k).src}`, description: photo(k).alt }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        compact
        photo="hero-home-twilight"
        eyebrow="Gallery"
        title="Track lighting on houses, by day and after dark."
        intro="Every photo shows 12V lights in aluminum track, the same hardware that ships in our kits and goes up on our installs."
        crumbs={[{ label: "Gallery" }]}
      />

      <nav aria-label="Gallery sections" className="border-b border-[var(--color-border)]">
        <ul className="shell flex flex-wrap gap-x-6 py-1">
          {GROUPS.map((g) => (
            <li key={g.title}>
              <a href={`#${slug(g.title)}`} className="nav-caps inline-flex min-h-[44px] items-center">{g.title}</a>
            </li>
          ))}
        </ul>
      </nav>

      {GROUPS.map((g, gi) => (
        <section key={g.title} id={slug(g.title)} className={`scroll-mt-28 ${gi > 0 ? "border-t border-[var(--color-border)]" : ""}`}>
          <div className="shell section">
            <h2 className="font-display h2-fluid">{g.title}</h2>
            <p className="mt-3 max-w-2xl text-[var(--color-text-soft)]">{g.blurb}</p>
            <div className="mt-7 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3">
              {g.keys.map((k, i) => (
                <figure key={k} className={i === 0 ? "col-span-2" : ""}>
                  <Photo
                    name={k}
                    ratio={i === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 50vw, 380px"}
                    priority={gi === 0 && i === 0}
                  />
                  <figcaption className="mt-2 text-sm leading-snug text-[var(--color-text-soft)]">{photo(k).alt}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-y border-[var(--color-border)] bg-[var(--color-bg-warm)]">
        <div className="shell section">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display h2-fluid">Send us a photo of yours and we will size the kit.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">
              A straight-on shot of each side you want lit is enough. We reply within one business day with the kit that fits.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/contact-us" className="btn-primary">Send a photo</Link>
              <Link href="/diy-kits" className="btn-secondary">Shop the kits</Link>
            </div>
            <p className="mt-4 text-sm">
              <Link href="/brands" className="text-link inline-flex min-h-[44px] items-center">How track compares with strings and dealer brands</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
