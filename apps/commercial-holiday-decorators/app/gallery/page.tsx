import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getImages, getVideos, posterFor } from "@/lib/content";
import { JsonLd, breadcrumbSchema, webPageSchema } from "@/lib/jsonld";
import { Breadcrumbs } from "@/components/ui";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ClosingForm } from "@/components/sections";

export const revalidate = 3600;

const title = "Commercial Holiday Decor Gallery: Lobbies, Malls, Storefronts & Streets";
const description = "Photos and short clips of our commercial holiday decorating work: hotel and office lobby Christmas trees, mall Santa sets and villages, storefront lighting, courtyards and downtown street trees across Ontario.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/gallery" },
  openGraph: { title, description, url: `${site.url}/gallery` },
};

export default function GalleryPage() {
  const images = getImages();
  const videos = getVideos();
  const posters = Object.fromEntries(videos.map((v) => [v.key, posterFor(v).src]));
  return (
    <>
      <JsonLd data={[webPageSchema({ name: title, description, url: `${site.url}/gallery` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Gallery", url: `${site.url}/gallery` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Gallery" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Our work</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">Lobbies, malls, storefronts and streets we’ve decorated</h1>
            <p className="mt-5 text-lg text-body leading-relaxed">{images.length} photos and {videos.length} short clips of our own crews’ work. Filter by the kind of space you manage.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap"><GalleryGrid images={images} videos={videos} posters={posters} /></div>
      </section>
      <ClosingForm title="Want this on your property?" body="Send us a photo of your lobby or building and we’ll come back with a design, a seasonal price and the dates we can install." />
    </>
  );
}
