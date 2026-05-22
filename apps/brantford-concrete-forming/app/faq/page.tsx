import type { Metadata } from "next";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBand from "@/components/CtaBand";
import { breadcrumbSchema, faqSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "FAQ — Concrete Forming Questions Answered | Brantford, ON",
  description:
    "Common questions about concrete driveways, patios, stamped concrete & forming costs in Brantford, ON. Answered by the experts at Brantford Concrete Forming.",
  openGraph: {
    title: "FAQ — Concrete Forming Questions | Brantford Concrete Forming",
    description: "Answers to common concrete driveway, patio, and forming questions for Brantford homeowners.",
    images: [{ url: "/images/Concrete-Driveway-Installation-1.png", alt: "Frequently asked questions about concrete forming in Brantford" }],
  },
  twitter: { card: "summary_large_image" },
};

const faqCategories = [
  {
    category: "Pricing",
    items: [
      { question: "How much does a concrete driveway cost in Brantford?", answer: "$8–$14 per square foot depending on finish type and site conditions. This includes materials, labour, and 32 MPa concrete. Stamped finishes are on the higher end; broom finish is the most affordable." },
      { question: "How much does concrete forming cost in Brantford?", answer: "$8–$14/sq.ft. including materials, labour, and 32 MPa concrete. The final price depends on the size, finish, and complexity of the project." },
      { question: "Do you charge for estimates?", answer: "No, all estimates are completely free. We&apos;ll assess your site and provide a detailed written quote with no obligation." },
    ],
  },
  {
    category: "Installation & Timeline",
    items: [
      { question: "How long does concrete forming and pouring take?", answer: "Typically 2–4 days. Day 1: excavation and forming. Day 2: gravel base, reinforcement, and pour. Days 3–4: finishing and curing starts. The concrete then cures for 7 days before you can drive on it." },
      { question: "How long do I wait before driving on my new driveway?", answer: "7 days minimum for light passenger vehicles. Full 32 MPa compressive strength is reached at 28 days, after which there are no traffic restrictions." },
      { question: "Do you handle permits and excavation?", answer: "Yes. We manage the complete project lifecycle: site assessment, excavation, base preparation, forming, pouring, and finishing. Permits, if required by your municipality, are handled on your behalf." },
    ],
  },
  {
    category: "Concrete Specifics",
    items: [
      { question: "What strength concrete do you use?", answer: "We use 32 MPa ready-mix concrete, which is significantly stronger than the standard residential spec. This ensures your driveway or patio handles heavy loads and Ontario freeze-thaw cycles without cracking." },
      { question: "Do you use steel reinforcement?", answer: "Yes. All our projects include either steel wire mesh or rebar reinforcement depending on the application. This distributes loads and prevents cracking over time." },
      { question: "Will my concrete driveway crack?", answer: "We install control joints at regular intervals to direct any natural cracking below the surface. Properly installed driveways rarely show visible surface cracks." },
    ],
  },
  {
    category: "Stamped & Decorative Concrete",
    items: [
      { question: "How durable is stamped concrete?", answer: "Very durable when properly sealed. We apply a professional sealer immediately after finishing and recommend resealing every 2–3 years to maintain colour and protection." },
      { question: "Can stamped concrete get slippery?", answer: "We add a non-slip additive to the sealer, especially for pool decks and entry stairs. This maintains safety in wet conditions without affecting appearance." },
      { question: "What patterns are available for stamped concrete?", answer: "We offer a wide selection including slate, cobblestone, brick, flagstone, wood plank, and more. Color options range from natural grays to warm reds and browns to complement your home exterior." },
    ],
  },
  {
    category: "Driveway Replacement",
    items: [
      { question: "Should I repair or replace my driveway?", answer: "If more than 25% of your driveway is cracked, heaving, or deteriorating, replacement is more cost-effective than repeated patching. Concrete lasts 2–3× longer than asphalt and requires no yearly sealing." },
      { question: "Do you remove and dispose of the old driveway?", answer: "Yes. Full demolition, concrete or asphalt removal, and disposal of the existing surface is included in our driveway replacement service. Soil regrading is done before the new installation." },
    ],
  },
];

const allFaqItems = faqCategories.flatMap((c) => c.items);

export default function FaqPage() {
  const jsonLd = [
    localBusinessSchema(),
    faqSchema(allFaqItems),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "FAQ", url: `${site.url}/faq` },
    ]),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="bg-[#1a2332] py-16">
        <div className="container-custom">
          <nav className="text-slate-400 text-sm mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">FAQ</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Everything you need to know about concrete forming, driveways, patios, and our process in Brantford, ON.
          </p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="space-y-12">
            {faqCategories.map((category) => (
              <div key={category.category}>
                <h2 className="text-xl font-extrabold text-[#1a2332] mb-5 flex items-center gap-2">
                  <span className="w-2 h-6 bg-[#E8751A] rounded-full inline-block" aria-hidden="true" />
                  {category.category}
                </h2>
                <FaqAccordion items={category.items} />
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#f8fafc] rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold text-[#1a2332] mb-3">Still Have Questions?</h2>
            <p className="text-slate-600 mb-5">Give us a call or send us a message and we&apos;ll answer within {site.responseTime}.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={site.phoneHref} className="btn btn-primary">Call {site.phone}</a>
              <Link href="/contact" className="btn btn-outline">Send a Message</Link>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
