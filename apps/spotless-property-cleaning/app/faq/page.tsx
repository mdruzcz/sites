import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqSchema, breadcrumbSchema } from "@/lib/jsonld";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "FAQ | Pressure Washing Questions Answered",
  description: `Frequently asked questions about pressure washing, power washing, and exterior cleaning services from ${site.name}. Serving London, St. Thomas, Woodstock, Brantford, and Cambridge.`,
};

const faqs = [
  {
    category: "General",
    questions: [
      {
        question: "What is the difference between pressure washing and power washing?",
        answer: "Pressure washing uses high-pressure water to clean surfaces, while power washing uses heated water under high pressure. We offer both — hot water is more effective on grease, oil, and heavy biological growth, while cold water pressure washing works well for general dirt and mildew on most residential surfaces.",
      },
      {
        question: "What is soft washing?",
        answer: "Soft washing uses low pressure combined with specialized biodegradable cleaning solutions to safely clean delicate surfaces like vinyl siding, roof shingles, and painted wood. It kills mould, algae, and bacteria at the root without the risk of damage from high-pressure spray.",
      },
      {
        question: "Is pressure washing safe for my property?",
        answer: "Yes — when done by trained professionals. We match our pressure, temperature, nozzle, and cleaning agents to each surface type. Vinyl siding gets soft-washed at low pressure, while concrete can handle higher pressure. We never use excessive force that could damage surfaces.",
      },
      {
        question: "How often should I have my property pressure washed?",
        answer: "Most homes benefit from an annual exterior wash. Driveways and walkways may need cleaning every 1-2 years depending on traffic and shade (shaded areas grow mould faster). Commercial properties often benefit from quarterly or semi-annual cleaning schedules.",
      },
      {
        question: "Do you offer free estimates?",
        answer: "Yes! We provide free on-site estimates for all our services. We'll assess your property, discuss your needs, and provide a clear, no-obligation quote — usually within 24 hours.",
      },
    ],
  },
  {
    category: "Residential Services",
    questions: [
      {
        question: "Will pressure washing damage my siding or paint?",
        answer: "No. We use a soft wash technique for siding that operates at low pressure — similar to a garden hose — combined with cleaning solutions that do the heavy lifting. This is safe for vinyl, aluminum, brick, stucco, and painted wood surfaces.",
      },
      {
        question: "Can you remove oil stains from my driveway?",
        answer: "Yes. Our hot water pressure washing system combined with industrial degreasers is highly effective on oil and grease stains in concrete and asphalt driveways. Fresh stains come up almost completely; older, deeply penetrated stains can be significantly lightened.",
      },
      {
        question: "Do you clean decks and fences?",
        answer: "Absolutely. We clean wood (pressure-treated, cedar, redwood), composite (Trex, TimberTech), and vinyl decks and fences. We use calibrated pressure and wood-brightening agents to restore the natural colour without splintering the wood fibres.",
      },
      {
        question: "Can you clean my roof without damaging the shingles?",
        answer: "Yes. We use a soft wash method specifically designed for roofs — low pressure with specialized cleaning solutions that kill algae, moss, and lichen without lifting shingles or stripping granules. This follows manufacturer recommendations and protects your warranty.",
      },
    ],
  },
  {
    category: "Commercial Services",
    questions: [
      {
        question: "Do you work with property management companies?",
        answer: "Yes. We provide ongoing maintenance contracts for property managers, offering scheduled exterior cleaning for multi-unit residential, retail, office, and industrial properties. We can customize schedules to match your budget and building needs.",
      },
      {
        question: "Can you clean our fleet vehicles on-site?",
        answer: "Yes. We bring our commercial hot water pressure washing equipment to your yard or depot. We handle box trucks, flatbeds, dump trucks, excavators, trailers, and service vans — no need to take vehicles off-site.",
      },
      {
        question: "Do you carry commercial insurance?",
        answer: "Yes. We carry full commercial general liability insurance and are WSIB compliant. We can provide certificates of insurance for property managers and commercial clients upon request.",
      },
    ],
  },
  {
    category: "Graffiti Removal",
    questions: [
      {
        question: "Can you remove graffiti from any surface?",
        answer: "We remove graffiti from brick, concrete, stone, stucco, metal, wood, and painted surfaces. Different surfaces require different techniques — we match our chemical strippers and pressure to each material to remove the graffiti without damaging the underlying surface.",
      },
      {
        question: "What is an anti-graffiti coating?",
        answer: "An anti-graffiti coating is a protective layer applied to surfaces after graffiti removal (or proactively before vandalism occurs). It makes future graffiti much easier to remove — often with just a pressure wash or simple wipe-down — saving time and money if the same spot gets targeted again.",
      },
      {
        question: "How quickly can you respond to graffiti vandalism?",
        answer: "We offer rapid-response graffiti removal, typically within 24-48 hours of notification. For property managers and municipalities, we provide standing agreements for priority-response service.",
      },
    ],
  },
  {
    category: "Pricing & Scheduling",
    questions: [
      {
        question: "How much does pressure washing cost?",
        answer: "Pricing depends on the surface type, area size, condition, and accessibility. A typical house wash ranges from $250-$600, driveway cleaning $150-$400, and deck cleaning $200-$500. We provide exact quotes after a free on-site assessment — no hidden fees or surprises.",
      },
      {
        question: "What areas do you serve?",
        answer: "We serve London, St. Thomas, Woodstock, Brantford, Cambridge, and surrounding communities across Southwestern Ontario. Contact us to confirm service availability in your area.",
      },
      {
        question: "Do you work in the rain?",
        answer: "Light rain doesn't affect our work — we're adding water anyway! However, we'll reschedule in heavy rain, thunderstorms, or high winds for safety reasons. We'll communicate any weather-related schedule changes promptly.",
      },
      {
        question: "What is your cancellation policy?",
        answer: "We understand plans change. We ask for 24 hours notice for cancellations or rescheduling. There's no charge for rescheduling — we'll find a new time that works for you.",
      },
    ],
  },
];

const allFaqs = faqs.flatMap((cat) => cat.questions);

export default function FAQPage() {
  const schema = faqSchema(allFaqs);
  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "FAQ", url: `${site.url}/faq` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="h-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl">
            Everything you need to know about our pressure washing and exterior cleaning services.
            Can&apos;t find your answer? <Link href="/contact" className="text-[var(--accent-light)] hover:underline">Contact us</Link>.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {faqs.map((category) => (
            <div key={category.category} className="mb-12 last:mb-0">
              <h2 className="font-bold text-2xl text-slate-900 mb-6 pb-2 border-b border-[var(--border)]">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq) => (
                  <div key={faq.question} className="card p-6">
                    <h3 className="font-bold text-lg text-slate-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 p-8 bg-[var(--surface)] rounded-xl text-center">
            <h2 className="font-bold text-xl mb-3">Still Have Questions?</h2>
            <p className="text-slate-600 mb-6">
              We&apos;re happy to answer any questions about our services. Reach out for a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <a href={site.phoneHref} className="btn btn-outline">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
