import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms for using the ${site.name} website and requesting quotes.`,
  alternates: { canonical: `${site.url}/terms-of-service` },
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <section className="py-16 sm:py-24 bg-ink">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose-rl">
        <p className="eyebrow">Legal</p>
        <h1 className="h-display text-4xl text-white mb-8">Terms of Service</h1>
        <p>Last updated: October 2026.</p>
        <h2>Quotes</h2>
        <p>Information on this website describes our kits and services in general terms. Every project is quoted individually in Canadian dollars after a site assessment. A quote request is not an order and creates no obligation on either side until a written agreement is signed.</p>
        <h2>Software</h2>
        <p>Kits include access to the Resonate Light Show software for the life of the kit, with updates included. The software is licensed, not sold, for use with the hardware supplied by {site.name}.</p>
        <h2>Website content</h2>
        <p>The home-page demonstration synthesises a public-domain composition (Beethoven, Für Elise) in your browser; no recordings are distributed. Brand assets on this site belong to {site.name}.</p>
        <h2>Contact</h2>
        <p>Questions? Email <a href={site.emailHref}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
