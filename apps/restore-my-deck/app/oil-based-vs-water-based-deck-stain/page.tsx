import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Oil-Based vs. Water-Based Deck Stain | Restore My Deck",
  description: "Choosing the right deck stain matters. Learn the key differences between oil-based and water-based stains and why Restore My Deck recommends oil for Ontario decks.",
  openGraph: { title: "Oil-Based vs. Water-Based Deck Stain", url: `${site.url}/oil-based-vs-water-based-deck-stain` },
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "Oil-Based vs. Water-Based Deck Stain", href: "/oil-based-vs-water-based-deck-stain" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="Oil-Based vs. Water-Based Deck Stain: Which Is Right for Your Deck?"
        subtitle="March 2024 · By Restore My Deck"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>Walk into any home improvement store and you'll find dozens of deck stains on the shelf, split roughly into two categories: oil-based and water-based. The difference matters more than most homeowners realize — especially in Ontario's climate, where decks face harsh freeze-thaw cycles, high summer UV and significant moisture year-round.</p>
          <p>At Restore My Deck, we've applied hundreds of stain jobs and almost exclusively use oil-based products. Here's why — and when water-based stains might be the better choice.</p>

          <h2>How Oil-Based Deck Stain Works</h2>
          <p>Oil-based stains use a penetrating carrier (linseed oil, modified oil or tung oil) to drive the pigment and protective compounds deep into the wood fibres rather than forming a film on top. This is the key advantage: when the stain is inside the wood, it can't peel.</p>
          <p>The oils also condition the wood, keeping it flexible against the seasonal expansion and contraction that Ontario's temperature swings cause. This flexibility prevents cracking and checking — the small surface splits you see on neglected decks.</p>
          <p>Our preferred products, <strong>Ready Seal</strong> and <strong>Penofin Verde</strong>, are both premium penetrating oil-based stains. They're VOC-compliant, eco-friendly and formulated specifically for exterior wood in North American climates.</p>

          <h2>How Water-Based Deck Stain Works</h2>
          <p>Water-based (latex) stains use water as the carrier and form a film on the wood surface as they dry. Modern water-based stains have improved significantly and some now offer decent penetration. Their advantages include:</p>
          <ul>
            <li>Faster drying time (2–4 hours vs. 24–48 hours for oil)</li>
            <li>Easier cleanup with soap and water</li>
            <li>Lower VOC content in older formulations (though this gap has narrowed as oil-based products have improved)</li>
            <li>Better performance on composite or modified wood decking</li>
          </ul>

          <h2>Key Differences at a Glance</h2>

          <div className="not-prose overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-[var(--dark)] text-white">
                  <th className="p-3 text-left">Feature</th>
                  <th className="p-3 text-left">Oil-Based</th>
                  <th className="p-3 text-left">Water-Based</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Penetration", "Deep (into wood fibres)", "Surface to moderate"],
                  ["Peeling risk", "Very low — fades gracefully", "Higher if surface film breaks"],
                  ["Durability", "3–5 years (full restoration)", "2–4 years"],
                  ["Drying time", "24–48 hours", "2–6 hours"],
                  ["Wood conditioning", "Excellent — prevents drying/cracking", "Limited"],
                  ["Recoat prep", "Light clean and sand", "Full strip may be needed"],
                  ["Eco/VOC", "Modern formulas now low-VOC", "Generally low-VOC"],
                ].map(([feature, oil, water]) => (
                  <tr key={feature} className="border-b border-gray-200 even:bg-gray-50">
                    <td className="p-3 font-medium text-[var(--dark)]">{feature}</td>
                    <td className="p-3 text-gray-700">{oil}</td>
                    <td className="p-3 text-gray-700">{water}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2>Why We Recommend Oil-Based for Ontario Decks</h2>
          <p>Ontario's climate is the decisive factor. Our freeze-thaw cycles (some areas see 40+ freeze-thaw cycles per year) are brutal on film-forming finishes. Water gets under the film, freezes, expands and lifts the coating. With a penetrating oil stain, there's no film to lift.</p>
          <p>The other issue is the natural aging of oil-based stains: they fade evenly and gracefully. When it's time to recoat, you clean, lightly sand and apply a fresh coat — no stripping required. Water-based stains that have started to peel require stripping back to bare wood before recoating, which is significantly more labour-intensive (and expensive).</p>

          <h2>When to Consider Water-Based Stain</h2>
          <p>There are situations where water-based stains are the better choice:</p>
          <ul>
            <li><strong>Composite decking</strong> — composite manufacturers typically recommend water-based products, as oils can leave residue that doesn't absorb</li>
            <li><strong>Previously water-based stained decks</strong> — if the deck has been water-based stained and is in reasonable shape, switching to oil can cause adhesion issues without a full strip first</li>
            <li><strong>IPE or dense tropical hardwoods</strong> — the tight grain doesn't absorb oils well; specific water-based hardwood finishes are formulated for these species</li>
          </ul>

          <h2>The Bottom Line</h2>
          <p>For standard pressure-treated, cedar or pine decking in Ontario — which covers the vast majority of residential decks — an oil-based penetrating stain applied by brush is the professional standard for a reason. It lasts longer, protects better and is easier to maintain over time.</p>
          <p>Not sure which product or type is right for your deck? <Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free quote and assessment</Link> — we inspect every deck before recommending a finish.</p>
        </div>
      </article>

      <CtaBand title="Get Expert Staining Advice — Free Quote" />
    </>
  );
}
