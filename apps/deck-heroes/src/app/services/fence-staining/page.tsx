import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Fence Staining Services in Ontario | Deck Heroes",
  description:
    "Professional fence staining across Southwestern Ontario. Protect and beautify cedar, pine, and pressure-treated fences with premium wood stains. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Fence Staining Services in Ontario | Deck Heroes",
    description:
      "Give your fence a rich, lasting finish that boosts curb appeal and protects against Ontario weather. Professional fence staining from Deck Heroes.",
    url: "https://deckheroes.ca/services/fence-staining",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Fence Staining",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15192666796",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Professional fence staining services for cedar, pine, and pressure-treated wood fences. Enhancing curb appeal and wood protection across Southwestern Ontario.",
  serviceType: "Fence Staining",
};

const FAQS = [
  {
    question: "How long does fence staining take?",
    answer:
      "The timeline depends on the length of your fence, the number of sides being stained, and the condition of the wood. A typical residential fence of 100 to 200 linear feet takes two to four days, including cleaning, drying, and stain application. Longer or more complex fences with gates, lattice tops, or multiple sections may take additional time. We will provide a clear timeline in your quote.",
  },
  {
    question: "Should I stain both sides of my fence?",
    answer:
      "Staining both sides provides the most complete protection since moisture, UV, and weather affect all exposed surfaces. If the back of the fence faces a neighbour's property, it is courteous and beneficial to stain that side as well. However, if budget is a concern, staining just the weather-facing side still provides significant protection. We can quote both options so you can decide.",
  },
  {
    question: "How soon after installation should a new fence be stained?",
    answer:
      "New pressure-treated lumber should weather for four to eight weeks before staining to allow the treatment chemicals to dry and the wood pores to open. New cedar fences can generally be stained sooner, often within two to four weeks. We recommend scheduling a consultation shortly after installation so we can monitor the drying process and time the staining perfectly.",
  },
  {
    question: "What colours work best for fence staining?",
    answer:
      "The best colour depends on your home's exterior, landscaping, and personal preference. Natural wood tones like honey, cedar, and walnut are consistently popular because they complement most home styles. Darker stains like mahogany or espresso make a bold statement and offer more UV protection. We bring colour samples to every consultation so you can see options against your actual fence wood and home colours.",
  },
  {
    question: "Will staining prevent my fence from rotting?",
    answer:
      "Staining significantly slows the rotting process by repelling moisture and preventing water from saturating the wood grain. However, no stain can completely prevent rot if the wood is in constant contact with soil or standing water. We recommend ensuring fence posts have proper drainage and that the bottom rail is slightly above ground level. Combining staining with good installation practices gives your fence the longest possible lifespan.",
  },
];

export default function FenceStainingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-wood-dark via-wood to-wood-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            Professional Fence Staining in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-sand-light">
            Your fence is one of the first things people see when they look at your
            property. A professionally stained fence adds warmth, curb appeal, and
            years of protection against Ontario weather.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact" className="rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark">
              Get a Free Quote
            </Link>
            <a href={PHONE_HREF} className="rounded-lg border-2 border-sand px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Why Stain Your Fence */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Why Stain Your Fence?
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              A wood fence is a significant investment in your property. Whether it
              provides privacy, defines your yard, or keeps pets and children safe, it
              deserves the same care and protection as your deck. Staining your fence
              does three important things: it enhances the natural beauty of the wood,
              it creates a protective barrier against moisture and UV damage, and it
              dramatically boosts your property's curb appeal.
            </p>
            <p>
              Without staining, wood fences in Ontario typically begin to grey within
              the first year. Within two to three years, unprotected wood can develop
              cracks, mould, and the beginning stages of rot. The cost of staining is
              modest compared to the cost of replacing fence sections prematurely, and
              the visual difference is striking. A freshly stained fence can make your
              entire yard feel polished and well-maintained.
            </p>
            <p>
              Many homeowners stain their fence at the same time as their deck to
              create a cohesive look across their outdoor space. Matching or
              complementary stain colours on your deck and fence tie the whole backyard
              together and create a retreat-like atmosphere right at home.
            </p>
          </div>
        </div>
      </section>

      {/* Fence Types */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Fence Types We Work With
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-wood-light">
            We have experience staining every common fence wood used in Ontario
            construction.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              {
                type: "Western Red Cedar",
                desc: "Cedar is naturally rot-resistant and has a beautiful warm tone, making it the premium choice for Ontario fences. Staining enhances cedar's natural oils and extends its already impressive lifespan. We recommend semi-transparent stains that let the gorgeous cedar grain show through.",
              },
              {
                type: "Pine & Spruce",
                desc: "Pine and spruce fences are affordable and widely available. They accept stain beautifully but need protection sooner than cedar since they lack natural rot resistance. We recommend staining pine fences within the first season and using stains with added mildewcide for maximum protection.",
              },
              {
                type: "Pressure-Treated Lumber",
                desc: "Pressure-treated wood is the most common fence material in Ontario. While the treatment provides insect and rot resistance, it does not protect against UV greying or surface cracking. Staining pressure-treated fences after proper drying time adds the colour, beauty, and surface protection that the treatment alone does not provide.",
              },
            ].map((f) => (
              <div key={f.type} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <h3 className="font-serif text-xl font-semibold text-terracotta">
                  {f.type}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-wood-light">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Benefits of Fence Staining
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Curb Appeal",
                desc: "A richly stained fence frames your property beautifully. It is one of the most visible exterior features and makes an immediate impression on visitors, neighbours, and potential buyers.",
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
              {
                title: "Property Value",
                desc: "A well-maintained fence adds real value to your home. Appraisers and buyers both recognize the difference between a weathered, grey fence and one that has been professionally cared for.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
              },
              {
                title: "Wood Protection",
                desc: "Stain penetrates the wood and shields it from moisture, UV rays, mould, and mildew. Protected fence boards resist cracking, warping, and rotting far longer than unfinished wood.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
              },
              {
                title: "Cohesive Outdoor Design",
                desc: "Matching your fence stain to your deck creates a unified outdoor space. We help you select complementary colours so your entire backyard feels intentional and inviting.",
                icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
              },
            ].map((b) => (
              <div key={b.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <svg className="h-8 w-8 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                </svg>
                <h3 className="mt-4 font-serif text-xl font-semibold text-wood-dark">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-sand-light/40 py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Fence Staining Process
          </h2>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Inspection & Quote",
                desc: "We walk your fence line, assess the wood condition, measure the total area, and discuss colour options. You receive a detailed, no-obligation quote covering everything from cleaning to final coat.",
              },
              {
                step: "2",
                title: "Cleaning & Prep",
                desc: "We clean the fence with professional-grade solutions and controlled pressure washing to remove dirt, algae, mildew, and old finish. Plants and landscaping along the fence line are protected with tarps.",
              },
              {
                step: "3",
                title: "Drying Period",
                desc: "The fence must dry completely before staining, typically 48 to 72 hours. We schedule the project around the weather forecast to ensure ideal conditions for both cleaning and stain application.",
              },
              {
                step: "4",
                title: "Stain Application",
                desc: "Using professional sprayers for efficiency and back-brushing for even penetration, we apply the stain to every surface. Gates, caps, and trim pieces all receive the same careful treatment as the main fence panels.",
              },
              {
                step: "5",
                title: "Final Walkthrough",
                desc: "We inspect the finished fence with you, checking for even coverage and colour consistency. We share maintenance tips and let you know when you can expect to need a touch-up based on your stain type and exposure.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-cream">
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

      {/* Deck + Fence Combo */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Deck + Fence Combo Savings
          </h2>
          <p className="mt-4 text-wood-light leading-relaxed">
            Staining your deck and fence together is the most efficient way to get a
            cohesive outdoor look. Since our crew is already on site with equipment
            set up, combining both projects saves time and reduces the per-square-foot
            cost. Ask about our combo pricing when you request your free quote.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark"
          >
            Get Combo Quote
          </Link>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-sand-light/40 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">Explore Our Other Services</h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark shadow-sm transition hover:bg-terracotta hover:text-cream">Deck Staining</Link>
            <Link href="/services/deck-sealing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark shadow-sm transition hover:bg-terracotta hover:text-cream">Deck Sealing</Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark shadow-sm transition hover:bg-terracotta hover:text-cream">Deck Refinishing</Link>
            <Link href="/contact" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark shadow-sm transition hover:bg-terracotta hover:text-cream">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">Fence Staining FAQ</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">Common questions about our fence staining services.</p>
          <div className="mt-10">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
