import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { QuoteForm } from "@/components/quote-form";
import { kitName, kits, sports } from "@/lib/content";
import { JsonLd } from "@/lib/jsonld";
import { ogBase, twitterImages } from "@/lib/seo";
import { phoneHref, site } from "@/lib/site";

export const revalidate = 3600;

const title = "Request a Court Kit Freight Quote";
const description = "Request a court kit quote with freight to your Canadian postal code. Send your sport, pad size and colours and receive a delivered price and a court drawing.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { ...ogBase, title: `${title} | ${site.name}`, description, url: "/contact" },
  twitter: { card: "summary_large_image", title, description, images: twitterImages },
};

export default function ContactPage() {
  const points = [
    { title: "A delivered price", text: "The kit and the freight to your postal code, quoted together." },
    { title: "A layout drawing", text: "Your court with every line and colour in place before anything is made." },
    { title: "Straight answers", text: "If your space or base will not work, we will tell you." },
  ];
  return (
    <>
      <PageHero
        photo={site.photos.contact}
        position="center 70%"
        photoAlt="Backyard court with pickleball lines and a basketball hoop beside a garden"
        eyebrow="Quotes"
        title="Request a kit quote"
        intro={`Send the sport, the pad size and your postal code. A delivered price comes back within ${site.responseTime}.`}
        crumb="Contact"
        path="/contact"
      />
      <section id="quote" className="shell section grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <h2 className="h2">What you get back</h2>
          <ul className="mt-6 space-y-5">
            {points.map((p) => (
              <li key={p.title} className="flex gap-4">
                <span aria-hidden className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-xs font-black text-white">
                  ✓
                </span>
                <div>
                  <h3 className="h3">{p.title}</h3>
                  <p className="text-[var(--muted)]">{p.text}</p>
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
        <QuoteForm
          kitOptions={kits.map((k) => `${kitName(k)} (${k.code})`)}
          sportOptions={sports.map((s) => s.name)}
          responseTime={site.responseTime}
          phone={site.phone}
          phoneHref={phoneHref}
        />
      </section>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", name: title, url: `${site.url}/contact`, about: { "@id": `${site.url}/#organization` } }} />
    </>
  );
}
