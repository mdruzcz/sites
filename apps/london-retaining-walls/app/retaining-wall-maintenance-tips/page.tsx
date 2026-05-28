import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "How to Maintain Your Retaining Wall and Make It Last Longer",
  description: "Simple retaining wall maintenance steps that protect your investment and extend wall life. Expert advice from London Retaining Walls in London, Ontario.",
  openGraph: { title: "How to Maintain Your Retaining Wall", url: `${site.url}/retaining-wall-maintenance-tips` },
};

export default function MaintenanceTipsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "Retaining Wall Maintenance Tips", href: "/retaining-wall-maintenance-tips" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="How to Maintain Your Retaining Wall and Make It Last Longer"
        subtitle="April 2024 · By London Retaining Walls"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>A retaining wall is a significant investment. With proper maintenance, most well-built retaining walls will last decades — even an entire lifetime. The good news: most retaining wall maintenance is simple, inexpensive, and takes only a few hours per year.</p>
          <p>Here&apos;s what you should be doing to protect your retaining wall investment.</p>

          <h2>1. Keep Drainage Outlets Clear</h2>
          <p>This is the single most important maintenance task for any retaining wall. Drainage pipes and weep holes installed during construction allow water to escape from behind the wall — if they get blocked, hydrostatic pressure builds up and is the leading cause of retaining wall failure.</p>
          <p>Twice a year (spring and fall), inspect all drainage outlets and weep holes. Remove any debris, sediment, or vegetation blocking them. If you&apos;re not sure where your drainage outlets are, look for small pipes or open gaps between blocks at the base of the wall.</p>

          <h2>2. Inspect for Movement or Shifting</h2>
          <p>Walk along your retaining wall at least once a year and look for:</p>
          <ul>
            <li>Any portion of the wall that appears to be leaning or bowing outward</li>
            <li>Blocks or sections that have shifted out of alignment</li>
            <li>Gaps opening up between blocks or in mortar joints</li>
            <li>Settlement at the base or corners of the wall</li>
          </ul>
          <p>Minor movements caught early can often be repaired at low cost. The same problem left for a few years can require major reconstruction. Early intervention is always less expensive than waiting.</p>

          <h2>3. Manage Vegetation Behind and At the Base</h2>
          <p>Tree roots are one of the most destructive forces a retaining wall faces. Large trees planted near a retaining wall can have roots that grow under or behind the wall, causing movement and structural damage.</p>
          <ul>
            <li>Avoid planting large trees within 3–5 metres of a retaining wall</li>
            <li>Keep grass and groundcover trimmed at the base of the wall</li>
            <li>Remove woody vegetation growing in wall joints before it becomes established</li>
            <li>Be cautious with climbing plants on retaining walls — roots can work into cracks over time</li>
          </ul>

          <h2>4. Watch for Erosion Behind the Wall</h2>
          <p>If you notice soil eroding out from behind the wall, through block joints, or at the base, this indicates a drainage issue that needs attention. Soil loss behind the wall undermines the structural fill that the wall depends on for support.</p>
          <p>Address erosion early by having the drainage system inspected and repaired before more serious structural problems develop.</p>

          <h2>5. Concrete and Block Wall Maintenance</h2>
          <p>Concrete and block retaining walls require minimal maintenance beyond the drainage and inspection tasks above. However, watch for:</p>
          <ul>
            <li><strong>Efflorescence:</strong> White mineral deposits on concrete or block surfaces indicate water moving through the wall. It&apos;s usually harmless aesthetically but signals a drainage issue worth monitoring.</li>
            <li><strong>Cracks:</strong> Hairline cracks are generally normal in concrete. Wide cracks (over 6mm), horizontal cracks, or cracks that are growing should be assessed by a professional.</li>
            <li><strong>Block face spalling:</strong> Freeze-thaw cycling can cause concrete block faces to chip or spall. This is primarily aesthetic but severely spalled blocks may need replacement.</li>
          </ul>

          <h2>6. Wood Wall Maintenance</h2>
          <p>Wood retaining walls need more active maintenance than concrete or block because wood is a living material that degrades over time.</p>
          <ul>
            <li><strong>Stain and seal every 2–4 years:</strong> A penetrating oil-based stain protects against moisture and UV degradation. When water no longer beads on the surface, it&apos;s time for a fresh application.</li>
            <li><strong>Check hardware:</strong> Inspect screws, bolts, and any metal hardware annually. Replace any fasteners showing significant rust.</li>
            <li><strong>Test for rot:</strong> Use a screwdriver to probe suspect areas. Soft spots indicate rot that should be replaced before it spreads to structural members.</li>
            <li><strong>Reapply end-grain sealer:</strong> Cut ends of boards are the most vulnerable to moisture entry. Keep these sealed.</li>
          </ul>

          <h2>7. After Heavy Rain Events</h2>
          <p>Ontario can get heavy rainfall events, especially in spring. After any significant rain event, check your retaining wall for:</p>
          <ul>
            <li>Signs of soil movement or slumping behind or at the base of the wall</li>
            <li>Drainage outlets running properly (they should drain freely during and after rain)</li>
            <li>Any new cracking or movement</li>
          </ul>

          <h2>When to Call a Professional</h2>
          <p>Some warning signs require professional assessment rather than DIY maintenance:</p>
          <ul>
            <li>Any visible bowing or leaning of the wall</li>
            <li>Horizontal cracks in concrete or mortar</li>
            <li>Significant soil erosion behind or beneath the wall</li>
            <li>Multiple blocks that have shifted out of alignment</li>
            <li>Drainage that was working before but has stopped</li>
          </ul>

          <p><Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free assessment</Link> if you&apos;re concerned about your retaining wall&apos;s condition. Catching problems early almost always saves money compared to waiting until failure occurs.</p>
        </div>
      </article>

      <CtaBand title="Concerned About Your Retaining Wall?" />
    </>
  );
}
