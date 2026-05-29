import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "How to Prepare Your Deck for Staining | Restore My Deck",
  description: "Learn the exact steps professionals use to prepare a deck for staining — cleaning, sanding and repairs done right. Tips from Restore My Deck in Kitchener-Waterloo.",
  openGraph: { title: "How to Prepare Your Deck for Staining", url: `${site.url}/how-to-prepare-your-deck-for-staining` },
};

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "How to Prepare Your Deck for Staining", href: "/how-to-prepare-your-deck-for-staining" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="How to Prepare Your Deck for Staining: A Step-by-Step Guide"
        subtitle="February 2024 · By Restore My Deck"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>The number one reason deck stains fail prematurely isn't the product — it's poor preparation. No matter how premium your stain is, if the surface isn't properly cleaned and prepped, you'll be re-doing the job in a year or two instead of four. Here's exactly what professional deck restoration crews do before any stain touches the wood.</p>

          <h2>Step 1: Clear the Deck Completely</h2>
          <p>Remove all furniture, planters, rugs and any accessories. You want the entire deck surface exposed. Check under furniture feet for soft spots or moisture damage — those areas often need the most attention.</p>
          <p>While the deck is clear, inspect every board for rot, splitting, raised nails and loose fasteners. Note any boards that flex significantly when walked on — those may need replacement before you stain.</p>

          <h2>Step 2: Make All Repairs First</h2>
          <p>Stain doesn't fix structural problems — it just covers them temporarily. Before any cleaning or staining happens, address:</p>
          <ul>
            <li><strong>Loose or popped nails and screws</strong> — re-drive or replace them flush with the surface</li>
            <li><strong>Cracked or split boards</strong> — minor cracks can be left; boards split more than halfway should be replaced</li>
            <li><strong>Soft, spongy wood</strong> — probe with a screwdriver. If it sinks in, the board is rotted and needs replacement</li>
            <li><strong>Unstable railings or posts</strong> — tighten hardware or add blocking to stabilize</li>
          </ul>
          <p>Completing repairs before cleaning is important because new wood patches need the same cleaning treatment as the rest of the deck.</p>

          <h2>Step 3: Deep Clean the Entire Surface</h2>
          <p>This is the most critical prep step. Ontario's climate — the freeze-thaw cycles, spring moisture, hot summers — creates ideal conditions for mold, algae and tannin bleed to accumulate on deck wood. A garden hose rinse won't cut it.</p>
          <p>Professional deck cleaning uses an eco-friendly wood cleaner (we use sodium percarbonate-based products) applied to the wet deck surface. This solution:</p>
          <ul>
            <li>Breaks down mold and algae colonies</li>
            <li>Lifts out tannin stains and graying</li>
            <li>Opens the wood grain for better stain penetration</li>
            <li>Removes any remnants of old, failing stain</li>
          </ul>
          <p>After the cleaner dwells for 10–15 minutes, it's rinsed thoroughly with a pressure washer at controlled PSI (800–1,200 PSI for most wood types — higher risks raising the grain or damaging softer woods).</p>

          <h2>Step 4: Allow Proper Drying Time</h2>
          <p>This step is non-negotiable and frequently skipped by DIYers in a hurry. Wet wood will not accept stain properly. The stain will sit on the surface instead of penetrating — leading to peeling, bubbling or uneven colour within months.</p>
          <p>Minimum drying time after cleaning: <strong>48 hours</strong> in warm, dry weather. In Ontario's cooler spring conditions, allow 72 hours or more. The wood should feel completely dry to the touch and show no darker wet patches when you check in the morning before the sun hits it.</p>

          <h2>Step 5: Sand the Surface</h2>
          <p>Once dry, buff-sand the entire deck with 80-grit sandpaper. This step:</p>
          <ul>
            <li>Removes raised wood grain left by pressure washing</li>
            <li>Smooths splinters and rough spots</li>
            <li>Opens wood pores further for maximum stain absorption</li>
          </ul>
          <p>Use a random orbital sander for flat boards and a sanding block for tight areas and railings. Sand with the grain, not across it. Blow or sweep off all dust before staining.</p>

          <h2>Step 6: Check the Weather Before You Stain</h2>
          <p>Even with a perfectly prepped deck, applying stain in the wrong conditions wastes all your hard work:</p>
          <ul>
            <li>Temperature: apply between 10°C and 32°C</li>
            <li>Humidity: below 85%</li>
            <li>No rain in the forecast for at least 24–48 hours after application</li>
            <li>Avoid direct hot sun on the staining surface — it dries stain too fast, preventing penetration</li>
          </ul>
          <p>Early morning on a mild overcast day is ideal. Evening works too as long as temperatures won't drop below 10°C overnight.</p>

          <h2>The Bottom Line</h2>
          <p>Thorough prep is what separates a stain job that lasts 3–4 years from one that starts failing in 12 months. If you're not confident doing all these steps yourself, or if your deck has significant repairs needed, professional restoration is almost always the smarter investment.</p>

          <p><Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact Restore My Deck for a free quote</Link> — we handle the full process, from inspection to final stain, so you don't have to.</p>
        </div>
      </article>

      <CtaBand title="Ready to Restore Your Deck?" />
    </>
  );
}
