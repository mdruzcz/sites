import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Deck Refinishing & Restoration Services in Ontario | Deck Heroes",
  description:
    "Full deck refinishing and restoration in Southwestern Ontario. Sanding, repair, and refinishing to bring weathered decks back to life. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Deck Refinishing & Restoration Services in Ontario | Deck Heroes",
    description:
      "Restore your weathered, grey deck to its original beauty with professional refinishing from Deck Heroes. Complete sanding, repair, and finish.",
    url: "https://deckheroes.ca/services/deck-refinishing",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Refinishing",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15198786735",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Professional deck refinishing and restoration services. Complete sanding, board repair, and premium refinishing for weathered decks across Southwestern Ontario.",
  serviceType: "Deck Refinishing",
};

const FAQS = [
  {
    question: "What is the difference between refinishing and just re-staining?",
    answer:
      "Re-staining involves applying a fresh coat of stain over existing wood, which works well when the previous finish is still in reasonable condition. Refinishing is a more comprehensive process that includes stripping old finish, sanding the wood down to a fresh surface, making repairs, and then applying new stain or sealant. Refinishing is the right choice when the deck has significant wear, peeling finish, grey weathering, or surface damage that simple re-staining cannot address.",
  },
  {
    question: "How do I know if my deck needs refinishing versus replacement?",
    answer:
      "Refinishing is ideal when the structural framing, joists, and ledger board are still sound but the deck surface has deteriorated cosmetically. Signs that refinishing is appropriate include greying, surface roughness, minor cracking, and peeling stain. Signs that replacement may be needed include soft or spongy boards, deep structural rot, significant sagging, or wobbly railings. During our free inspection we will honestly assess which approach makes sense and never recommend more work than necessary.",
  },
  {
    question: "How long does a full deck refinishing project take?",
    answer:
      "Most residential deck refinishing projects take three to five days, depending on the size of the deck, the extent of repairs needed, and weather conditions. This includes stripping the old finish, drying time, sanding, any board replacements, and applying the new finish. Larger or more heavily damaged decks may take a bit longer. We will provide a clear timeline in your quote.",
  },
  {
    question: "Will refinishing fix my warped or cupped deck boards?",
    answer:
      "Sanding can significantly improve minor cupping and surface roughness. However, severely warped or twisted boards typically need to be replaced rather than sanded flat, as aggressive sanding would make them too thin and weak. During our inspection we will identify which boards can be saved through sanding and which should be replaced for the best overall result.",
  },
  {
    question: "What finish options do I have after refinishing?",
    answer:
      "After sanding your deck down to fresh wood, you have the full range of finish options available. You can go with a transparent stain to showcase the restored grain, a semi-transparent stain for colour with grain visibility, a solid stain for full coverage, or a clear sealer for invisible protection. This is actually one of the best things about refinishing. You get a clean slate to choose exactly the look you want.",
  },
];

export default function DeckRefinishingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero — image-based */}
      <section className="relative min-h-[400px] lg:min-h-[500px] flex items-center">
        <Image
          src="/images/stripping-sanding.png"
          alt="Professional deck stripping and sanding during refinishing service"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/90 via-forest-dark/70 to-forest-dark/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-semibold uppercase tracking-widest text-terracotta mb-4">
              Our Services
            </span>
            <h1 className="font-serif text-4xl font-bold text-white sm:text-5xl">
              Deck Refinishing &amp; Restoration in Ontario
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/85">
              Has your deck lost its lustre? Our complete refinishing service strips
              away years of wear and weather, restoring your outdoor space to like-new
              condition.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
              <Link href="/contact" className="rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-terra-dark">
                Get a Free Quote
              </Link>
              <a href={PHONE_HREF} className="rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-white transition hover:bg-white/20">
                Call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Bringing Weathered Decks Back to Life
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Deck refinishing is the most transformative service we offer. Over the
              years, Ontario weather takes a heavy toll on outdoor wood. Sun bleaches
              the colour, rain and snow drive moisture deep into the grain, and
              freeze-thaw cycles crack and roughen the surface. Eventually, even a
              well-built deck can look grey, worn, and uninviting.
            </p>
            <p>
              Refinishing reverses that damage. We strip away the old, failed finish
              and sand down to fresh, healthy wood underneath. Loose or damaged boards
              are repaired or replaced. Then we apply a premium stain or sealer of your
              choice, giving your deck a finish that looks and performs like new.
            </p>
            <p>
              The transformation can be dramatic. Homeowners are often amazed at the
              difference between the grey, splintered surface they started with and the
              rich, smooth deck they get back. It is one of the highest-impact home
              improvement projects you can do, and it costs a fraction of what a full
              deck replacement would.
            </p>
          </div>
        </div>
      </section>

      {/* When to Refinish vs Replace */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark text-center">
            Refinish or Replace? How to Decide
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="rounded-xl bg-white p-6 shadow-sm border border-forest/20">
              <h3 className="font-serif text-xl font-semibold text-forest">
                Signs You Can Refinish
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-wood-light">
                {[
                  "Surface has turned grey but wood is still hard and solid when probed",
                  "Old stain is peeling, flaking, or wearing away unevenly",
                  "Minor surface cracks and roughness from weathering",
                  "A few boards are damaged but the majority and the frame are sound",
                  "Deck feels structurally stable with no wobble or sag",
                  "Wood passes the screwdriver test: a screwdriver cannot easily push into the grain",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm border border-terracotta/20">
              <h3 className="font-serif text-xl font-semibold text-terracotta">
                Signs You May Need Replacement
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-wood-light">
                {[
                  "Multiple boards are soft, spongy, or crumble when probed",
                  "Structural posts or joists show signs of rot or insect damage",
                  "Deck sways, bounces, or feels unstable when walked on",
                  "Railings are loose and cannot be tightened securely",
                  "Ledger board connection to the house is compromised",
                  "More than thirty percent of the deck boards need individual replacement",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 text-center text-wood-light">
            Not sure which category your deck falls into?{" "}
            <Link href="/contact" className="font-semibold text-terracotta hover:text-terra-dark transition-colors">
              Book a free inspection
            </Link>{" "}
            and we will give you an honest assessment.
          </p>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Refinishing Process
          </h2>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Comprehensive Inspection",
                desc: "We examine every board, railing, and structural component. We check for rot, loose fasteners, mould, and insect damage. You receive a detailed report with photos and our recommendations before any work begins.",
              },
              {
                step: "2",
                title: "Stripping & Cleaning",
                desc: "The old finish is chemically stripped and power-washed away. We use professional-grade strippers that break down old stain and sealant without damaging the underlying wood. This reveals the true condition of every board.",
              },
              {
                step: "3",
                title: "Repairs & Board Replacement",
                desc: "Damaged boards are replaced with matching lumber. Popped nails are pulled and replaced with corrosion-resistant deck screws. Loose railings are secured. Any minor structural issues are addressed at this stage.",
              },
              {
                step: "4",
                title: "Sanding",
                desc: "We sand the entire deck surface using commercial-grade equipment, progressing through grits to achieve a smooth, splinter-free surface. Sanding removes the grey, weathered layer and exposes fresh wood that will accept the new finish beautifully.",
              },
              {
                step: "5",
                title: "Finish Application",
                desc: "With a perfectly prepped surface, we apply your chosen stain or sealer. The fresh wood absorbs the finish deeply and evenly, resulting in rich, consistent colour and maximum protection. We finish with a thorough walkthrough to ensure your complete satisfaction.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark">{item.title}</h3>
                  <p className="mt-2 text-wood-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation Benefits */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            The Refinishing Transformation
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Restored Beauty", desc: "Grey, weathered wood becomes rich and warm again. The natural grain pattern is revealed and enhanced with your chosen finish colour." },
              { title: "Smooth, Safe Surface", desc: "Sanding eliminates splinters, rough spots, and raised grain. Your deck becomes comfortable for bare feet and safe for children and pets." },
              { title: "Extended Lifespan", desc: "By removing damaged surface material and applying fresh protection, refinishing can add five to ten years to your deck's functional life." },
              { title: "Cost-Effective", desc: "Refinishing typically costs thirty to fifty percent less than a full deck replacement while delivering a result that looks nearly identical to a brand-new build." },
              { title: "Boosted Property Value", desc: "A freshly refinished deck significantly improves your home's curb appeal and outdoor living space, a key selling point for potential buyers." },
              { title: "Fresh Start on Colour", desc: "Sanding back to bare wood means you can choose any stain colour. Update the look to match new siding, landscaping, or just your evolving taste." },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <h3 className="font-serif text-lg font-semibold text-wood-dark">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">Explore Our Other Services</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-bg-alt px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-white">Deck Staining</Link>
            <Link href="/services/deck-resurfacing" className="rounded-lg bg-bg-alt px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-white">Deck Resurfacing</Link>
            <Link href="/services/deck-building" className="rounded-lg bg-bg-alt px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-white">Deck Building</Link>
            <Link href="/services/deck-cleaning" className="rounded-lg bg-bg-alt px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-white">Deck Cleaning</Link>
            <Link href="/contact" className="rounded-lg bg-bg-alt px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-white">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Additional Photo */}
      <section className="bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <Image src="/images/deck-painting.jpeg" alt="Deck refinishing in progress showing professional stain application" width={1200} height={800} className="h-auto w-full object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">Deck Refinishing FAQ</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">Common questions about our refinishing and restoration services.</p>
          <div className="mt-10">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
