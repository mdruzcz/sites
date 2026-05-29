import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Concrete vs. Block vs. Wood: How to Choose Retaining Wall Material",
  description: "Not sure which retaining wall material is right for your property? We compare concrete, interlocking block and wood walls — pros, cons, costs and best applications.",
  openGraph: { title: "How to Choose the Right Retaining Wall Material", url: `${site.url}/how-to-choose-retaining-wall-material` },
};

export default function ChooseMaterialPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "How to Choose Retaining Wall Material", href: "/how-to-choose-retaining-wall-material" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="Concrete vs. Block vs. Wood: How to Choose the Right Retaining Wall Material"
        subtitle="February 2024 · By London Retaining Walls"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl prose prose-gray prose-lg">
          <p>One of the most common questions homeowners ask us is: &quot;What type of retaining wall should I get?&quot; The answer depends on several factors — wall height, soil conditions, load requirements, aesthetic goals, and budget. This guide breaks down the three main retaining wall materials to help you make the right choice for your property.</p>

          <h2>Concrete Retaining Walls</h2>
          <p>Concrete — whether poured in place or installed as precast panels — is the most durable retaining wall option available. For taller walls (over 4–5 feet), heavily loaded applications (like retaining a slope above a driveway), and commercial projects, concrete is often the best choice.</p>
          <h3>Pros</h3>
          <ul>
            <li>Extremely durable — 50–100 year lifespan</li>
            <li>Highest structural strength — handles heavy loads</li>
            <li>Monolithic structure with no joints to fail</li>
            <li>Best for tall walls and commercial applications</li>
            <li>Excellent freeze-thaw resistance when properly mixed</li>
          </ul>
          <h3>Cons</h3>
          <ul>
            <li>Higher upfront cost than block or wood</li>
            <li>Requires formwork and curing time</li>
            <li>Less aesthetic versatility than block</li>
            <li>Heavier equipment required for installation</li>
          </ul>
          <p><strong>Best for:</strong> Walls over 4–5 feet tall, heavy surcharge loads (vehicles, structures above the wall), commercial applications, and situations where maximum lifespan matters more than upfront cost.</p>

          <h2>Interlocking Block Retaining Walls</h2>
          <p>Interlocking concrete block systems like Permacon and Allan Block are the most popular choice for residential retaining walls in Ontario. They offer a good balance of performance, aesthetics, and cost — making them the right choice for most residential applications.</p>
          <h3>Pros</h3>
          <ul>
            <li>Wide range of colours, textures and styles</li>
            <li>Can be curved or angled to follow property contours</li>
            <li>Faster installation than concrete</li>
            <li>Ontario Building Code compliant with proper engineering</li>
            <li>Good freeze-thaw performance when properly installed</li>
            <li>40–50 year lifespan with minimal maintenance</li>
          </ul>
          <h3>Cons</h3>
          <ul>
            <li>For very tall walls (5+ feet), may require geogrid reinforcement</li>
            <li>More expensive than wood</li>
            <li>Individual blocks can shift if base preparation is inadequate</li>
          </ul>
          <p><strong>Best for:</strong> Most residential applications — walls up to 4–5 feet, garden terraces, yard grade changes, and anywhere aesthetic variety is important.</p>

          <h2>Wood and Timber Retaining Walls</h2>
          <p>Pressure-treated wood and hardwood timber walls offer a natural look that blends beautifully with landscaping. They&apos;re typically the most economical option but have a shorter lifespan than concrete or block.</p>
          <h3>Pros</h3>
          <ul>
            <li>Most economical upfront cost</li>
            <li>Natural aesthetic that complements landscaping</li>
            <li>Suitable for low-to-medium walls (up to 3–4 feet)</li>
            <li>Easier to install on sites with limited access</li>
            <li>Can be stained or sealed to match desired colour</li>
          </ul>
          <h3>Cons</h3>
          <ul>
            <li>Shorter lifespan (20–40 years) vs. concrete or block</li>
            <li>Requires periodic maintenance (staining/sealing)</li>
            <li>Not ideal for walls in constant wet conditions</li>
            <li>Not recommended for walls over 4 feet</li>
          </ul>
          <p><strong>Best for:</strong> Garden terraces, raised planting beds, low-to-medium height grade changes, and situations where natural aesthetics and lower upfront cost are the priorities.</p>

          <h2>How to Choose: Quick Decision Guide</h2>
          <ul>
            <li>Wall over 5 feet tall? → <strong>Concrete</strong></li>
            <li>Retaining a driveway or heavy structure above? → <strong>Concrete</strong></li>
            <li>Residential wall, 2–5 feet, want aesthetic variety? → <strong>Interlocking Block</strong></li>
            <li>Garden terrace or raised bed, under 3 feet? → <strong>Wood or Block</strong></li>
            <li>Most economical option? → <strong>Wood</strong></li>
            <li>Maximum lifespan? → <strong>Concrete</strong></li>
          </ul>

          <p>Still not sure? <Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact us for a free site assessment.</Link> We&apos;ll evaluate your specific property conditions and give you an honest recommendation before you make any commitments.</p>
        </div>
      </article>

      <CtaBand title="Get a Free Quote on Any Wall Type" />
    </>
  );
}
