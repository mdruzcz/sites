import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "5 Signs Your Deck Needs Professional Restoration | Restore My Deck",
  description: "Graying wood, peeling stain and soft boards are your deck asking for help. Spot these 5 warning signs early and avoid a costly rebuild. From Restore My Deck, Kitchener-Waterloo.",
  openGraph: { title: "5 Signs Your Deck Needs Professional Restoration", url: `${site.url}/5-signs-your-deck-needs-restoration` },
};

const signs = [
  {
    number: "01",
    title: "The Wood Has Turned Grey or Silver",
    body: "Natural wood doesn't go grey from age alone — it goes grey because UV radiation is breaking down the lignin, the structural protein that binds wood fibres together. Once the surface fibres degrade, the wood becomes rough, porous and highly susceptible to moisture absorption and mold. A light grey, freshly weathered deck can usually be restored with a deep clean and quality stain. A deeply weathered, silver-grey deck may need more aggressive cleaning and some surface sanding to restore the grain. Either way, both are restorable — but only if you act before the degradation reaches the structural level.",
  },
  {
    number: "02",
    title: "Water Soaks In Instead of Beading",
    body: "This is the fastest and most reliable test for whether your deck still has protective stain working. Toss a cup of water on the deck surface. If water beads up and sits on the wood for several seconds before absorbing, your stain has life left in it. If it soaks straight in and darkens the wood within seconds, the stain's water-repelling protection is gone. An unprotected deck is actively absorbing moisture every time it rains — and that moisture is what drives mold growth, freeze-thaw damage and eventually rot. Catching this early means a simple restain. Catching it late means repairs or replacement.",
  },
  {
    number: "03",
    title: "Mold, Algae or Black Staining on the Surface",
    body: "Black streaks, green patches or fuzzy growth on your deck boards signal that moisture is consistently sitting in or on the wood. This isn't just a visual problem — mold and algae produce enzymes and acids that actively break down wood fibres over time. A professionally cleaned deck with fresh stain will eliminate the mold and inhibit regrowth. But if left untreated, you're watching the decay clock tick. Mold also creates a slip hazard on wet days, especially on stairs and railing areas. Pro tip: north-facing or heavily shaded decks are most vulnerable to mold — check these areas more frequently.",
  },
  {
    number: "04",
    title: "Boards Are Soft, Spongy or Have Visible Rot",
    body: "Walk every board on your deck and pay attention to flex. Boards with minor flex at midspan are usually fine — that's normal for longer spans. Boards that feel distinctly spongy underfoot or that flex dramatically with your weight may have compromised their structural capacity. Probe suspected areas with a flathead screwdriver: if it sinks into the wood easily, that board is rotted and needs replacement. Rot spreads — a rotted board against a solid one will infect the healthy wood over time through moisture transfer. Replace rotted boards promptly, treat the surrounding boards and seal everything before the rot spreads further.",
  },
  {
    number: "05",
    title: "The Stain Is Peeling, Cracking or Bubbling",
    body: "This is the most urgent warning sign and requires immediate attention. Peeling or bubbling stain means the protective coating has completely failed and moisture has gotten between the stain and the wood surface. This often happens with film-forming stains (solid stains, paints and some deck paints) that weren't applied to properly dried wood, or that have aged past their service life. The critical point: you cannot simply stain over a peeling deck. Any new product applied on top of failing stain will fail at the same rate. The existing coating must be fully stripped or sanded back to bare wood before recoating — otherwise you're throwing money at a problem that won't be solved.",
  },
];

export default function BlogPostPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Helpful Tips", href: "/blog" }, { name: "5 Signs Your Deck Needs Professional Restoration", href: "/5-signs-your-deck-needs-restoration" }])) }} />

      <PageHero
        eyebrow="Helpful Tips"
        title="5 Warning Signs Your Deck Needs Professional Restoration"
        subtitle="May 2024 · By Restore My Deck"
      />

      <article className="section bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="prose prose-gray prose-lg mb-10">
            <p>Most homeowners don't think about their deck until something is visibly wrong — a soft board, peeling stain or a railing that wobbles. By then, the problem has often been developing for a season or two. Catching these signs early is the difference between a $1,200 restoration and a $15,000 rebuild. Here are the five warning signs to check for every spring.</p>
          </div>

          <div className="space-y-8">
            {signs.map((sign) => (
              <div key={sign.number} className="flex gap-5 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="text-3xl font-extrabold text-[var(--accent)] opacity-50 flex-shrink-0 w-12 leading-none">{sign.number}</div>
                <div>
                  <h2 className="text-xl font-bold text-[var(--dark)] mb-3">{sign.title}</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{sign.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="prose prose-gray prose-lg mt-10">
            <h2>When in Doubt, Get a Professional Assessment</h2>
            <p>If you're unsure about the condition of your deck, don't guess. A professional inspection takes 20–30 minutes and tells you exactly what needs to be done and what can wait. We provide free, no-obligation assessments and transparent quotes — no surprises.</p>
            <p>The best time to restore your deck is before you need to. Spring, after the last freeze-thaw cycle and before summer use, is ideal. <Link href="/contact-us" className="text-[var(--accent)] hover:underline">Contact Restore My Deck today for your free spring assessment.</Link></p>
          </div>
        </div>
      </article>

      <CtaBand title="Get Your Deck Inspected — Free Quote" />
    </>
  );
}
