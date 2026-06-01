import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/data";
import { SITE } from "@/lib/site";
import { PageHead } from "@/components/PageHead";
import { CtaBand } from "@/components/CtaBand";
import { Arrow, BLUR } from "@/components/ui";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck & Fence Staining Services in Ontario",
  description: "Deck staining, cleaning, sealing, restoration, refinishing, and fence staining across Southwestern Ontario — all with READY Seal® oil-based stains. Free photo quotes in 2 business days.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHead eyebrow="Services" title="Complete deck & fence care, one expert crew."
        intro={`Every service uses ${SITE.stainBrand} premium oil-based stain and starts with proper prep. Here's everything we do.`}
        image="/images/hero-services.jpg"
        crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]} />
      <section className="sec bg-white">
        <div className="wrap space-y-5">
          {SERVICES.map((s, i) => (
            <div key={s.slug} className={`card overflow-hidden grid md:grid-cols-2 ${i % 2 ? "md:[&>a]:order-2" : ""}`}>
              <Link href={`/services/${s.slug}`} className="relative aspect-[16/11] md:aspect-auto md:min-h-[260px] block group overflow-hidden">
                <Image src={s.image} alt={`${s.name} by DeckStain.ca in Ontario`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR} sizes="(max-width:768px) 100vw, 50vw" />
              </Link>
              <div className="p-7 md:p-9 flex flex-col justify-center">
                <p className="eyebrow mb-1.5">{s.tagline}</p>
                <h2 className="h text-2xl text-[var(--ink)] mb-2">{s.name}</h2>
                <p className="muted leading-relaxed mb-4">{s.blurb}</p>
                <Arrow href={`/services/${s.slug}`}>Learn about {s.name.toLowerCase()}</Arrow>
              </div>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
