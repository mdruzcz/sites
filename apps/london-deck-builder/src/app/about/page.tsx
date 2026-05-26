import type { Metadata } from "next";
import { Footer, RelatedTrades } from "../_components/sections";
import { NavBar, Contact } from "../_components/sections-interactive";

export const metadata: Metadata = {
  title: "About London Deck Builder",
  description:
    "Meet the team behind London Deck Builder — Kyle's family-run deck building company serving London, Ontario and Southwestern Ontario with PT, cedar, composite and PVC decks.",
  alternates: { canonical: "/about" },
  openGraph: {
    url: "/about",
    title: "About London Deck Builder",
    description:
      "Family-run deck builder serving London, Ontario — PT, cedar, composite and PVC decks with a 5-year workmanship warranty.",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "About London Deck Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export const revalidate = 3600;

export default function AboutPage() {
  return (
    <main>
      <NavBar homeHref="/" />

      <section className="pt-32 pb-12" style={{ backgroundColor: "var(--wood-dark)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--terracotta)" }}>
            Our Story
          </p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4">
            Building Decks Londoners Love — Since Day One
          </h1>
          <p className="text-lg text-white/70">
            We&rsquo;re a family-run deck builder based in Belmont, Ontario — building outdoor spaces across London, St. Thomas, Woodstock and the rest of Southwestern Ontario.
          </p>
        </div>
      </section>

      <article className="py-12 lg:py-16" style={{ backgroundColor: "var(--cream)" }}>
        <div
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:lg:text-3xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:text-base [&_p]:lg:text-lg [&_p]:leading-relaxed [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_li]:text-base [&_li]:lg:text-lg [&_li]:leading-relaxed [&_a]:underline [&_a]:font-semibold"
          style={{ color: "var(--wood)" }}
        >
          <h2 style={{ color: "var(--wood-dark)" }}>How we started</h2>
          <p>
            London Deck Builder was founded by Kyle on a simple belief: every homeowner deserves a backyard they&rsquo;re excited to spend time in. After years on the tools across Southwestern Ontario, Kyle launched the company to deliver the kind of deck building most contractors had stopped offering — transparent pricing, honest material recommendations, and an actual warranty backed by the person who swung the hammer.
          </p>
          <p>
            Today, our crew has completed 500+ deck builds and repairs across London, Woodstock, St. Thomas, Strathroy, Tillsonburg, Dorchester, and every smaller community in between. We&rsquo;re still small enough that Kyle (or one of our long-time site leads like Cameron) is on-site for every project — and big enough to schedule your build inside our 4&ndash;8 day target window.
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>The materials we work with</h2>
          <p>
            We&rsquo;re material-agnostic. We&rsquo;ll give you the honest pros and cons of every option for your specific yard, budget and lifestyle, then build with whichever option you choose. Our four core decking materials:
          </p>
          <ul>
            <li><strong>Pressure-treated (PT) lumber</strong> — the affordable workhorse. ACQ-treated, rot- and pest-resistant, and a solid choice if you don&rsquo;t mind sealing it every 2&ndash;3 years.</li>
            <li><strong>Western Red Cedar</strong> — naturally beautiful, naturally rot-resistant, and a premium look. Best for clients who want real wood without the chemical treatment.</li>
            <li><strong>Composite decking</strong> (Trex, TimberTech and others) — capped composite boards with 25-year fade-and-stain warranties. Nearly maintenance-free; just rinse it in spring and you&rsquo;re done.</li>
            <li><strong>PVC decking</strong> — the maximum-durability option. 100% waterproof, scratch- and fade-resistant, and the longest lifespan we offer.</li>
          </ul>

          <h2 style={{ color: "var(--wood-dark)" }}>Our 5-year workmanship warranty</h2>
          <p>
            Every deck we build is backed by our 5-year workmanship warranty — and we mean it. If a fastener pops, a stair tread loosens, or a railing sags because of an installation defect within those five years, we fix it. Materials carry their own manufacturer warranties on top (typically 10&ndash;25 years for composite and PVC). Read the full warranty terms on our <a href="/terms">Terms of Service</a> page.
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>The Master Decker family</h2>
          <p>
            London Deck Builder is part of a small family of Southwestern Ontario trade businesses that share the same crew leadership and the same standards. If your project needs more than a deck, we can hand it off to a sister company you can trust:
          </p>
          <ul>
            <li><a href="https://masterdecker.com" target="_blank" rel="noopener">Master Decker</a> &mdash; professional deck staining, sealing and refinishing for existing wood decks.</li>
            <li><a href="https://londonconcreteforming.ca" target="_blank" rel="noopener">London Concrete Forming</a> &mdash; concrete pads, footings, walkways and decorative concrete.</li>
            <li><a href="https://londonretainingwalls.ca" target="_blank" rel="noopener">London Retaining Walls</a> &mdash; engineered retaining walls and hardscaping for sloped lots.</li>
          </ul>
          <p>
            We coordinate scheduling across the family of companies so your concrete, retaining work and deck all land in the right order — without you chasing four different contractors.
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>Where we work</h2>
          <p>
            Our service area covers everything within roughly an hour of our Belmont, Ontario shop:
          </p>
          <ul>
            <li>London &mdash; Byron, Old North, Westmount, Masonville, every neighbourhood.</li>
            <li>St. Thomas, Belmont &amp; Central Elgin.</li>
            <li>Woodstock, Ingersoll, Tillsonburg &amp; the rest of Oxford County.</li>
            <li>Strathroy, Mount Brydges, Komoka, Kilworth &amp; Middlesex Centre.</li>
            <li>Dorchester &amp; Thames Centre.</li>
            <li>Aylmer &amp; Elgin County.</li>
          </ul>
          <p>
            Not sure if we serve your address? Give us a call at <a href="tel:5199141663">(519) 914-1663</a> — we travel to neighbouring areas when the project makes sense.
          </p>

          <h2 style={{ color: "var(--wood-dark)" }}>Ready to start?</h2>
          <p>
            The fastest way to get a free, no-obligation written quote is the form on our homepage — most quotes go out within 48 hours of the on-site visit. <a href="/#contact">Request a quote →</a>
          </p>
        </div>
      </article>

      <RelatedTrades />
      <Contact />
      <Footer />
    </main>
  );
}
