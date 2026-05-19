import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Professional Deck Cleaning Services in Ontario | Deck Heroes",
  description:
    "Professional deck cleaning and power washing across Southwestern Ontario. Remove dirt, mould, mildew, and grey weathering. Restore your deck's natural beauty. Free estimates from Deck Heroes.",
  openGraph: {
    title: "Professional Deck Cleaning Services in Ontario | Deck Heroes",
    description:
      "Restore your deck's natural beauty with professional cleaning from Deck Heroes. Power washing, mould removal, and deep cleaning across Southwestern Ontario.",
    url: "https://deckheroes.ca/services/deck-cleaning",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Deck Cleaning",
  provider: {
    "@type": "LocalBusiness",
    name: "Deck Heroes",
    url: "https://deckheroes.ca",
    telephone: "+15198786735",
  },
  areaServed: { "@type": "State", name: "Ontario" },
  description:
    "Professional deck cleaning and power washing services. Remove dirt, mould, mildew, and weathering to restore your deck across Southwestern Ontario.",
  serviceType: "Deck Cleaning",
};

const FAQS = [
  {
    question: "How often should I have my deck professionally cleaned?",
    answer:
      "We recommend a professional deep clean at least once a year, ideally in spring before you start using the deck for the season. Decks in heavily shaded areas or near trees may benefit from a second cleaning in late fall to remove leaf stains and organic buildup before winter. Regular cleaning extends the life of your stain or sealer and prevents mould from taking hold.",
  },
  {
    question: "Will power washing damage my deck?",
    answer:
      "Not when done correctly. The key is using the right pressure, nozzle, and technique for your specific wood type. Consumer-grade pressure washers set too high can gouge soft wood and raise the grain. Our team uses commercial equipment with adjustable pressure and fan tips sized for deck work. We clean thoroughly without damaging the wood surface. Composite decking gets a gentler treatment with lower pressure and appropriate cleaners.",
  },
  {
    question: "Can deck cleaning remove black mould and mildew stains?",
    answer:
      "Yes. Our cleaning process combines a professional-grade mould and mildew treatment with controlled pressure washing. The cleaning solution kills mould at the root, not just on the surface, so it does not grow back immediately. For severe mould that has penetrated deep into the wood, we may recommend a brightener treatment after cleaning to fully restore the wood colour.",
  },
  {
    question: "Do I need to seal or stain after cleaning?",
    answer:
      "It depends on the current condition of your existing finish. If your stain or sealer is still performing well (water beads on the surface), cleaning alone may be sufficient. If the finish has worn thin and water soaks into the wood, cleaning is the perfect time to apply a fresh coat of stain or sealer — the clean, open-pored wood will absorb the new finish beautifully. We will advise you during the cleaning on whether re-coating is needed.",
  },
  {
    question: "How long does professional deck cleaning take?",
    answer:
      "Most residential decks take two to four hours to clean, including setup, treatment application, dwell time, pressure washing, and cleanup. Larger decks or heavily soiled surfaces may take longer. The deck should dry for twenty-four to forty-eight hours before foot traffic or furniture is placed back. If staining follows the cleaning, we will schedule that for after the drying period.",
  },
];

export default function DeckCleaningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-forest-dark via-forest to-forest-light py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-serif text-4xl font-bold text-cream sm:text-5xl">
            Professional Deck Cleaning in Ontario
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-cream">
            Dirt, mould, mildew, and grey weathering rob your deck of its beauty
            and shorten its lifespan. Our professional cleaning service strips it
            all away, revealing the clean, healthy wood underneath and preparing
            your deck for years of enjoyment.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-lg bg-terracotta px-8 py-4 text-lg font-semibold text-cream shadow-lg transition hover:bg-terra-dark"
            >
              Get a Free Quote
            </Link>
            <a
              href={PHONE_HREF}
              className="rounded-lg border-2 border-cream/40 px-8 py-4 text-lg font-semibold text-cream transition hover:bg-white/10"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-xl">
          <Image
            src="/images/deep-cleaning.png"
            alt="Professional deep cleaning and brightening of a wood deck"
            width={683}
            height={1024}
            className="h-auto w-full max-h-[500px] object-cover"
            priority
          />
        </div>
      </section>

      {/* Why Professional Cleaning */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-wood-dark">
            Why Professional Deck Cleaning Matters
          </h2>
          <div className="mt-6 space-y-4 text-wood-light leading-relaxed">
            <p>
              Your deck sits outdoors year-round, exposed to everything Ontario
              throws at it: rain, snow, ice, UV rays, pollen, tree sap, leaf
              stains, and airborne dirt. Over time, this buildup creates the
              perfect environment for mould and mildew to take root, turning your
              once-beautiful deck into a grey, slippery, uninviting surface.
            </p>
            <p>
              Regular cleaning is not just cosmetic. Mould and mildew actually
              break down wood fibres, accelerating rot and shortening your deck's
              lifespan. Dirt and debris trap moisture against the wood surface,
              which leads to premature finish failure and increased vulnerability
              to freeze-thaw damage. A clean deck is a deck that lasts longer.
            </p>
            <p>
              Professional cleaning goes far beyond what a garden hose or rented
              pressure washer can achieve. We use commercial-grade equipment and
              deck-specific cleaning solutions that kill mould at the root,
              dissolve embedded grime, and restore the wood's natural colour —
              all without damaging the surface. The result is a deck that looks
              refreshed, feels safe underfoot, and is ready for staining, sealing,
              or simply enjoying.
            </p>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-bg-alt py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Our Deck Cleaning Process
          </h2>
          <div className="mt-12 space-y-8">
            {[
              {
                step: "1",
                title: "Pre-Clean Inspection",
                desc: "We assess the deck surface, identify the type of soiling (mould, algae, tannin stains, grey weathering), check the wood type, and note any areas that need special attention. This helps us choose the right cleaning solution and pressure settings.",
              },
              {
                step: "2",
                title: "Area Preparation",
                desc: "We move or cover patio furniture, protect adjacent plants and landscaping with drop cloths, and clear debris from between the deck boards. Downspouts and gutters near the deck are checked to ensure they are not contributing to excess moisture.",
              },
              {
                step: "3",
                title: "Cleaning Solution Application",
                desc: "A professional-grade deck cleaner is applied to the entire surface. For mould and mildew, we use an oxygen-based cleaner that kills growth at the root without harsh bleach that can damage wood fibres. The solution is left to dwell for the recommended time to break down embedded grime.",
              },
              {
                step: "4",
                title: "Controlled Pressure Washing",
                desc: "Using commercial equipment with adjustable pressure and the correct fan tip for your wood type, we wash every board, railing, and stair tread. We work methodically with the grain to avoid lap marks and ensure even cleaning. The result is a uniformly clean surface with no streaks or missed spots.",
              },
              {
                step: "5",
                title: "Brightening & Final Rinse",
                desc: "For wood decks, we apply a wood brightener that restores the natural pH balance and brings back the warm tones that cleaning alone may not fully recover. A final low-pressure rinse removes any remaining solution. We clean up the work area and advise on next steps — whether that is staining, sealing, or simply enjoying your refreshed deck.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-terracotta text-xl font-bold text-cream">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-serif text-xl font-semibold text-wood-dark">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-wood-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Clean */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            What We Remove
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Mould & Mildew", desc: "Black and green growth that thrives in damp, shaded areas. We kill it at the root so it does not grow back immediately after cleaning." },
              { title: "Grey Weathering", desc: "The silvery-grey layer caused by UV breakdown of wood fibres. Our process strips it away to reveal the warm, natural wood colour underneath." },
              { title: "Algae & Moss", desc: "Green, slippery growth that makes your deck a safety hazard. We remove it thoroughly and treat the surface to inhibit regrowth." },
              { title: "Dirt & Grime", desc: "Embedded soil, dust, and foot traffic buildup that dulls your deck's appearance and traps moisture against the wood." },
              { title: "Leaf & Tannin Stains", desc: "Dark discolouration left by wet leaves, acorns, and tree sap. Particularly common on decks near maple, oak, and cedar trees." },
              { title: "Old Finish Residue", desc: "Peeling or flaking stain and sealer that needs to come off before a fresh coat can be applied. Cleaning is the essential first step before re-finishing." },
            ].map((s) => (
              <div key={s.title} className="rounded-xl bg-white p-6 shadow-sm border border-sand/30">
                <h3 className="font-serif text-lg font-semibold text-wood-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-wood-light">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="bg-bg-alt py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-serif text-2xl font-bold text-wood-dark">
            Explore Our Other Services
          </h2>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/services/deck-staining" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Staining</Link>
            <Link href="/services/deck-refinishing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Refinishing</Link>
            <Link href="/services/deck-resurfacing" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Resurfacing</Link>
            <Link href="/services/deck-building" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Deck Building</Link>
            <Link href="/contact" className="rounded-lg bg-white px-5 py-3 text-sm font-semibold text-wood-dark transition hover:bg-terracotta hover:text-cream">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Additional Photo */}
      <section className="bg-bg py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-lg">
          <Image src="/images/poolside-deck.jpeg" alt="Clean pool deck after professional deck cleaning service" width={1200} height={800} className="h-auto w-full object-cover" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bg py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center font-serif text-3xl font-bold text-wood-dark">
            Deck Cleaning FAQ
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-wood-light">
            Common questions about our professional deck cleaning services.
          </p>
          <div className="mt-10">
            <FAQAccordion items={FAQS} />
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
