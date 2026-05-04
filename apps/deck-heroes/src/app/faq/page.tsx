import type { Metadata } from "next";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import { PHONE, PHONE_HREF } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Frequently Asked Questions About Deck Staining & Maintenance",
  description:
    "Get answers to common questions about deck staining, sealing, refinishing, and maintenance in Ontario. Costs, timing, process, and more from Deck Heroes.",
  openGraph: {
    title: "Deck Staining FAQ | Deck Heroes",
    description:
      "Answers to your most common deck staining, sealing, and maintenance questions from Deck Heroes.",
    url: "https://deckheroes.ca/faq",
  },
};

const GENERAL_FAQ = [
  {
    question: "What services does Deck Heroes offer?",
    answer:
      "We specialize in four core services: deck staining, deck sealing, deck refinishing, and fence staining. Each service includes thorough preparation, premium products, and professional application to ensure a lasting, beautiful finish.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We proudly serve Southwestern Ontario including London, Woodstock, St Thomas, Strathroy, Brantford, Hamilton, and surrounding communities. If you are unsure whether we cover your area, give us a call and we will let you know.",
  },
  {
    question: "How do I get a free quote?",
    answer:
      "Getting a quote is easy. You can fill out our online contact form, call us directly, or email us. We will schedule a time to inspect your deck, discuss your preferences, and provide a detailed, no-obligation estimate — usually within 24 to 48 hours.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes, Deck Heroes is fully insured. We carry comprehensive general liability insurance to protect your property and our team throughout every project.",
  },
];

const STAINING_FAQ = [
  {
    question: "How long does deck staining take?",
    answer:
      "Most residential decks take 1 to 3 days depending on size, condition, and weather. This includes preparation (cleaning, sanding, repairs), stain application, and drying time. We will give you a specific timeline during your free estimate.",
  },
  {
    question: "How often should I re-stain my deck?",
    answer:
      "It depends on your stain type and sun exposure. Transparent stains typically last 1 to 2 years, semi-transparent stains last 2 to 3 years, and solid stains can last 3 to 5 years. We recommend the water test: if water soaks into the wood instead of beading up, it is time to re-stain.",
  },
  {
    question: "What is the best time of year to stain a deck in Ontario?",
    answer:
      "Late spring through early fall is ideal — typically May through October. You need at least 2 consecutive dry days with temperatures between 10°C and 30°C. We avoid staining in direct hot sun, high humidity, or when rain is in the forecast.",
  },
  {
    question: "What factors affect the cost of deck staining?",
    answer:
      "The main factors are deck size (square footage), current condition (how much prep is needed), stain type and brand, accessibility, and whether repairs are required. We provide transparent pricing with no hidden fees.",
  },
  {
    question: "Can you stain a brand new deck?",
    answer:
      "Yes, but new pressure-treated wood needs to dry out first — usually 3 to 6 months after installation. New cedar can often be stained sooner. We will assess your deck and recommend the right timing.",
  },
];

const SEALING_FAQ = [
  {
    question: "What is the difference between staining and sealing?",
    answer:
      "Sealing applies a clear protective barrier against moisture without adding colour. Staining adds pigment for colour and UV protection in addition to moisture resistance. Many modern deck stains include sealant properties, providing both colour and protection in one product.",
  },
  {
    question: "When does my deck need sealing vs staining?",
    answer:
      "If you want to preserve the natural look of your wood with minimal colour change, sealing is a good choice. If you want to add colour, enhance the grain, or protect against UV greying, staining is the better option. We can help you decide during your consultation.",
  },
];

const MAINTENANCE_FAQ = [
  {
    question: "How should I maintain my deck between staining?",
    answer:
      "Sweep regularly to remove debris, clean with a mild deck cleaner once or twice a year, and address any mould or mildew promptly. Avoid using a pressure washer on high settings as it can damage wood fibres. Keep planters on saucers and move furniture periodically to prevent uneven fading.",
  },
  {
    question: "How do I clean my deck without damaging the stain?",
    answer:
      "Use a garden hose and a soft-bristle brush with a diluted deck cleaner or oxygen bleach solution. Avoid chlorine bleach as it can discolour the wood. For stubborn spots, a low-pressure washer (under 1,500 PSI) with a wide fan tip works well.",
  },
];

const PROCESS_FAQ = [
  {
    question: "What should I expect during the staining process?",
    answer:
      "First, we clear and clean the deck surface. Then we sand as needed, make any minor repairs, and apply painter's tape to protect adjacent surfaces. We apply the stain in even coats following the wood grain. Finally, we do a walkthrough with you to make sure everything meets your expectations.",
  },
  {
    question: "Do I need to move my furniture and plants off the deck?",
    answer:
      "Yes, we ask that the deck be cleared of all furniture, planters, grills, and accessories before we arrive. This gives us full access to every board and speeds up the process. We can help coordinate timing so it is convenient for you.",
  },
  {
    question: "What happens if it rains during the project?",
    answer:
      "We monitor the weather closely and only begin work when the forecast is clear. If unexpected rain occurs, we have tarps and cover systems to protect fresh stain. In some cases we may need to reschedule a day — we will communicate any changes immediately.",
  },
  {
    question: "How long before I can use my deck after staining?",
    answer:
      "Light foot traffic is usually fine after 24 to 48 hours. We recommend waiting 72 hours before replacing heavy furniture and 7 days before placing rugs or mats. Drying time varies based on stain type, temperature, and humidity.",
  },
];

export default function FAQPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-wood-dark py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl font-bold text-cream sm:text-4xl lg:text-5xl">
            Frequently Asked Questions About Deck Staining &amp; Maintenance
          </h1>
          <p className="mt-4 text-lg text-cream-dark max-w-2xl mx-auto">
            Find answers to the most common questions we hear from homeowners
            about deck care, staining, sealing, and our process.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* General */}
          <div>
            <h2 className="font-serif text-xl font-bold text-wood-dark sm:text-2xl mb-6">
              General Questions
            </h2>
            <FAQAccordion items={GENERAL_FAQ} />
          </div>

          {/* Staining */}
          <div>
            <h2 className="font-serif text-xl font-bold text-wood-dark sm:text-2xl mb-6">
              Deck Staining
            </h2>
            <FAQAccordion items={STAINING_FAQ} />
          </div>

          {/* Sealing */}
          <div>
            <h2 className="font-serif text-xl font-bold text-wood-dark sm:text-2xl mb-6">
              Deck Sealing
            </h2>
            <FAQAccordion items={SEALING_FAQ} />
          </div>

          {/* Maintenance */}
          <div>
            <h2 className="font-serif text-xl font-bold text-wood-dark sm:text-2xl mb-6">
              Maintenance &amp; Cleaning
            </h2>
            <FAQAccordion items={MAINTENANCE_FAQ} />
          </div>

          {/* Process */}
          <div>
            <h2 className="font-serif text-xl font-bold text-wood-dark sm:text-2xl mb-6">
              Our Process
            </h2>
            <FAQAccordion items={PROCESS_FAQ} />
          </div>

          {/* Still have questions */}
          <div className="rounded-2xl bg-white p-8 text-center shadow-md shadow-wood-dark/5 border border-cream-dark/50">
            <h3 className="font-serif text-xl font-bold text-wood-dark">
              Still Have Questions?
            </h3>
            <p className="mt-2 text-wood">
              We are happy to help. Give us a call or send us a message and we
              will get back to you promptly.
            </p>
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href={PHONE_HREF}
                className="rounded-lg bg-terracotta px-6 py-3 text-sm font-semibold text-white hover:bg-terra-dark transition-colors"
              >
                Call {PHONE}
              </a>
              <a
                href="/contact"
                className="rounded-lg border-2 border-terracotta px-6 py-3 text-sm font-semibold text-terracotta hover:bg-terracotta/5 transition-colors"
              >
                Contact Us Online
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
