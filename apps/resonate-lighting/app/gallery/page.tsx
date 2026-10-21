import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { getGallery } from "@/lib/content";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Gallery — Mega Trees, Rooflines & Singing Trees",
  description:
    "Photos of Resonate Lighting music-reactive pixel installations: mega trees, roofline runs, singing trees and the Pi 5 controller box. Commercial, BIA and municipal projects in Ontario.",
  alternates: { canonical: `${site.url}/gallery` },
};

export default function GalleryPage() {
  const items = getGallery();
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Gallery", url: `${site.url}/gallery` }])} />
      <section className="bg-ink-800 border-b border-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="eyebrow">Gallery</p>
          <h1 className="h-display text-4xl sm:text-5xl text-white mb-4">Installations.</h1>
          <p className="text-muted-strong text-lg max-w-3xl leading-relaxed">
            Mega trees, rooflines and singing trees across Ontario. Photos of recent installations are being added — in the meantime, the live demo on the home page shows how the pixels behave.
          </p>
        </div>
      </section>
      <section className="py-16 sm:py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((g) => (
            <figure key={g.slug} className="card overflow-hidden">
              <div className="relative aspect-[4/3] placeholder-slot">
                <Image src={g.image} alt={`${g.title} — ${site.name} pixel lighting installation placeholder`} fill className="object-cover" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </div>
              <figcaption className="p-5">
                <span className="spec-chip mb-2">{g.tag}</span>
                <h2 className="font-bold text-white">{g.title}</h2>
                <p className="text-muted text-sm mt-1">{g.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
