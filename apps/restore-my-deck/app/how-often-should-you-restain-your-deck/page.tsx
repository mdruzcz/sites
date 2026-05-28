import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "How Often Should You Restain Your Deck? | Restore My Deck",
  description: "Not sure when to restain your deck? Learn the warning signs that tell you it's time, and how Ontario's climate affects how long deck stain lasts.",
  openGraph: { title: "How Often Should You Restain Your Deck?", url: `${site.url}/how-often-should-you-restain-your-deck` },
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "How Often Should You Restain Your Deck?", href: "/how-often-should-you-restain-your-deck" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="How Often Should You Restain Your Deck? A Practical Guide"
        subtitle="April 2024 · By Restore My Deck"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>One of the most common questions we hear: <em>"How do I know when my deck needs to be restained?"</em> The answer depends on several factors — the product used, the prep work done, sun and rain exposure, and Ontario's climate in particular. Here's a practical breakdown.</p>

          <h2>General Timelines by Product Type</h2>
          <p>As a starting point, here are typical maintenance timelines for well-applied stain on a properly prepped deck in Ontario:</p>
          <ul>
            <li><strong>Premium penetrating oil-based stain (Ready Seal, Penofin Verde)</strong> — full restoration every 5–7 years; maintenance re-staining every 2–4 years</li>
            <li><strong>Standard oil-based stain</strong> — re-staining every 2–3 years</li>
            <li><strong>Water-based / latex stain</strong> — 1–3 years depending on product quality and prep</li>
            <li><strong>Clear sealant only (no pigment)</strong> — every 1–2 years; less UV protection means faster breakdown</li>
          </ul>
          <p>These are rough guides. The actual condition of your deck matters more than the calendar.</p>

          <h2>Warning Signs It's Time to Restain</h2>
          <p>Don't wait for the wood to visibly deteriorate. These signs mean it's time to book a restoration:</p>

          <h3>1. Water No Longer Beads on the Surface</h3>
          <p>Splash a cup of water on your deck. If it beads up and sits on the surface, the stain is still working. If it soaks in immediately and darkens the wood, the protective barrier has broken down. Unprotected wood absorbs water, which leads to mold, swelling and eventually rot.</p>

          <h3>2. The Wood Has Turned Grey or Silver</h3>
          <p>That grey colouration isn't just cosmetic — it's the UV degrading the surface wood fibres (called "lignin breakdown"). The greying means the wood is aging and drying out without protection. The good news: grey decks are almost always restorable with professional cleaning and a fresh stain coat before structural damage sets in.</p>

          <h3>3. The Stain Is Fading Unevenly</h3>
          <p>Patchy, uneven fading means some areas have lost their protection while others haven't. South-facing boards, deck areas under intense afternoon sun and high-traffic pathways typically fade fastest. When large sections look noticeably lighter or more weathered than others, it's time for a full refresh.</p>

          <h3>4. Mold or Algae Appearing</h3>
          <p>Black staining, green patches or fuzzy growth on the deck surface means moisture is staying on or in the wood. Mold on a stained deck means the stain's biocide protection has expired. Left untreated, mold accelerates wood decay significantly — some species of mold produce enzymes that actively break down wood fibres.</p>

          <h3>5. Peeling, Flaking or Bubbling</h3>
          <p>This is the most serious sign and typically indicates a film-forming finish (paint or solid stain) that has failed. Bubbling often means moisture got trapped under the film before it cured. Peeling means the bond has broken. In either case, the existing finish must be fully stripped before any new product is applied — you cannot stain over a peeling deck.</p>

          <h2>How Ontario's Climate Shortens Stain Life</h2>
          <p>Compared to milder climates, Ontario decks face:</p>
          <ul>
            <li><strong>40+ freeze-thaw cycles per year</strong> — water expands when it freezes, stressing wood fibres and any film-forming finish on top</li>
            <li><strong>High UV index in summer</strong> — UV breaks down both the pigment (causing fading) and the protective compounds in stain</li>
            <li><strong>Spring rain and humidity</strong> — promotes mold and algae growth, especially on shaded north-facing decks</li>
            <li><strong>Heavy snow loading</strong> — snow sitting on the deck for months keeps moisture in contact with the wood continuously</li>
          </ul>
          <p>This is why we always recommend <em>premium penetrating oil-based stains for Ontario decks</em> — they move with the wood through seasonal changes rather than forming a brittle film that cracks under stress.</p>

          <h2>The Cost of Waiting Too Long</h2>
          <p>The longer you wait past the ideal maintenance window, the more work (and cost) the restoration requires:</p>
          <ul>
            <li><strong>On-time maintenance</strong> — clean, light sand, restain. Most projects: $800–$1,500</li>
            <li><strong>Overdue (graying, some peeling)</strong> — deep clean, repairs to some boards, full sand, restain. Most projects: $1,200–$2,000</li>
            <li><strong>Neglected (significant rot, extensive peeling)</strong> — board replacement plus full restoration. $2,000–$3,500+</li>
            <li><strong>Structurally compromised</strong> — partial or full rebuild required. $8,000–$40,000+</li>
          </ul>
          <p>Staying on a regular 2–4 year maintenance cycle with a quality product is always the most cost-effective approach over a deck's lifetime.</p>

          <h2>Our Recommendation</h2>
          <p>Inspect your deck every spring. Do the water bead test. If water soaks in, book your restoration before the summer season. A stained deck protected going into winter holds up far better than one that faces freeze-thaw cycles with bare, unprotected wood.</p>
          <p><Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact Restore My Deck for a free spring assessment and quote.</Link> We can tell you exactly what your deck needs and provide a transparent, no-obligation estimate.</p>
        </div>
      </article>

      <CtaBand title="Book Your Spring Deck Assessment" />
    </>
  );
}
