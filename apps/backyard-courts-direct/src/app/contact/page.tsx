import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { kitName, kits, money, sports } from "@/lib/content";
import { JsonLd } from "@/lib/jsonld";
import { pageMeta } from "@/lib/seo";
import { fill, phoneHref, site } from "@/lib/site";

export const revalidate = 3600;

const p = site.pages.contact;

export const metadata: Metadata = pageMeta({ title: p.title, description: p.description, path: "/contact" });

export default function ContactPage() {
  const points = [
    { title: "A delivered price", text: "The kit and the freight to your postal code, quoted together." },
    { title: "A layout drawing", text: "Your court with every line and colour in place before anything is made." },
    { title: "Straight answers", text: "If your space or base will not work, we will tell you." },
  ];
  return (
    <>
      <PageHero photo={site.photos.contact} position={p.heroPosition} photoAlt={p.heroAlt} eyebrow="Quotes" title={p.h1} intro={fill(p.intro, { responseTime: site.responseTime })} crumb="Contact" path="/contact" />
      <section id="quote" className="shell section grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="h2">What you get back</h2>
          <ul className="mt-6 space-y-5">
            {points.map((pt) => (
              <li key={pt.title} className="flex gap-4">
                <span aria-hidden className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-black text-white">
                  ✓
                </span>
                <div>
                  <h3 className="h3">{pt.title}</h3>
                  <p className="text-[var(--muted)]">{pt.text}</p>
                </div>
              </li>
            ))}
          </ul>
          {site.phone && phoneHref && (
            <p className="mt-8">
              Prefer to talk? Call{" "}
              <a href={phoneHref} className="font-black text-[var(--accent-ink)]">
                {site.phone}
              </a>
              .
            </p>
          )}
        </div>
        <QuoteForm kitOptions={kits.map((k) => `${kitName(k)} (${k.code}) ${money(k.price)}`)} sportOptions={sports.map((s) => s.name)} responseTime={site.responseTime} phone={site.phone} phoneHref={phoneHref} />
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: p.title, url: `${site.url}/contact`, about: { "@id": `${site.url}/#organization` } }} />
    </>
  );
}
