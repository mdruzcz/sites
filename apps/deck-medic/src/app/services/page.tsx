import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, services } from "@/lib/site";
import { NavBar } from "@/components/NavBar";
import { CtaBand } from "@/components/CtaBand";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Deck Services | Staining, Restoration & Power Washing in Toronto",
  description:
    "Professional deck staining, full-service restoration, power washing, and fence staining in Toronto, Mississauga, Oakville & Burlington. Free estimate from Deck Medic.",
  alternates: { canonical: "https://deckmedic.ca/services" },
  openGraph: {
    title: "Deck Services | Staining, Restoration & Power Washing",
    description: "Professional deck services for Southern Ontario homeowners. Expert preparation, premium finishes.",
    url: "https://deckmedic.ca/services",
    images: [{ url: "/images/Deck-Staining-Sealing-2-1024x1024.png", width: 1024, height: 1024, alt: "Professional deck staining service by Deck Medic in Toronto" }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Deck Medic Services",
  url: "https://deckmedic.ca/services",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: s.name,
      description: s.description,
      provider: { "@type": "LocalBusiness", name: site.name, url: site.url },
      url: `${site.url}/services/${s.slug}`,
      image: `${site.url}${s.image}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <main>
        <NavBar />

        <section className="pt-28 pb-16 lg:pt-36 lg:pb-20" style={{ background: "var(--off-white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: "var(--blue)" }}>What We Do</p>
              <h1 className="font-display text-5xl lg:text-6xl font-extrabold mb-6 leading-tight" style={{ color: "var(--slate)" }}>
                Professional Deck &amp;{" "}
                <span className="text-gradient-blue">Fence Services</span>
              </h1>
              <p className="text-xl leading-relaxed" style={{ color: "var(--slate-muted)" }}>
                Every service starts with the same commitment: deep preparation, premium products, and a finish built to withstand Southern Ontario&apos;s climate.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28" style={{ background: "var(--white)" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {services.map((s, i) => (
                <div
                  key={s.slug}
                  className={`rounded-2xl overflow-hidden border transition-shadow hover:shadow-xl ${i === 0 ? "lg:col-span-2" : ""}`}
                  style={{ borderColor: "var(--light-grey)" }}
                >
                  <div className={`grid ${i === 0 ? "md:grid-cols-2" : ""} gap-0`}>
                    <div className={`relative overflow-hidden ${i === 0 ? "aspect-video" : "aspect-square"}`}>
                      <Image
                        src={s.image}
                        alt={s.imageAlt}
                        fill
                        className="object-cover"
                        sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 50vw"}
                      />
                    </div>
                    <div className="p-8 lg:p-10">
                      <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--blue)" }}>Service</p>
                      <h2 className="font-display text-2xl lg:text-3xl font-extrabold mb-3 leading-tight" style={{ color: "var(--slate)" }}>
                        {s.name}
                      </h2>
                      <p className="text-base leading-relaxed mb-6" style={{ color: "var(--slate-muted)" }}>
                        {s.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {s.benefits.slice(0, 3).map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm" style={{ color: "var(--slate-light)" }}>
                            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "var(--blue)" }} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${s.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white transition-all hover:shadow-lg hover:scale-[1.02] min-h-11"
                        style={{ background: "var(--blue)" }}
                      >
                        Learn More
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CtaBand />
        <Footer />
        <CallNowFab />
      </main>
    </>
  );
}
