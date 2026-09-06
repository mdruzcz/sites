import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import QuoteForm from "@/components/QuoteForm";
import FaqAccordion from "@/components/FaqAccordion";
import { site } from "@/lib/site";
import { Expansion } from "@/components/Expansion";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: { canonical: "https://londonconcreteforming.ca/concrete-stamps" },
  title: "Concrete Stamp Rental London Ontario | 50+ Patterns",
  description: "Rent professional concrete stamps from London Concrete Forming, or have us install for you. 50+ patterns, guidance on rental vs hiring a pro. Call 519-914-1901.",
  openGraph: {
    title: "Concrete Stamp Rental London Ontario | 50+ Patterns",
    description: "Rent professional concrete stamps from London Concrete Forming, or have us install for you. 50+ patterns, guidance on rental vs hiring a pro. Call 519-914-1901.",
    images: [{ url: "/images/drive.jpg", alt: "Stamped concrete patterns by London Concrete Forming" }],
  },
};

const patterns = [
  {
    name: "Cobblestone",
    description: "One of the most requested stamped patterns. Cobblestone creates the look of old-world European street paving. Individual rounded stones are impressed into the concrete for a rich, dimensional texture. Works beautifully for driveways, walkways, and patio borders.",
    ideal: "Driveways, front walkways, patio borders",
    image: "/images/stampedfinish.jpg",
    imageAlt: "Cobblestone stamped concrete driveway pattern installed in London, Ontario",
    colours: ["Charcoal", "Sandstone", "Terracotta", "Slate Grey"],
  },
  {
    name: "Ashlar Slate",
    description: "Irregular slate-shaped stones arranged in a random pattern. Ashlar slate provides a sophisticated, natural look that resembles high-end flagstone patios. The random cut lines add visual interest while maintaining the even surface of concrete.",
    ideal: "Patios, pool decks, backyard entertainment areas",
    image: "/images/PXL_20230718_125644595.jpg",
    imageAlt: "Ashlar slate stamped concrete patio pattern in London, Ontario",
    colours: ["Slate Grey", "Flagstone", "Buff", "Charcoal"],
  },
  {
    name: "Running Bond Brick",
    description: "Classic brick pattern with offset horizontal rows — the same layout used in traditional brick construction. Running bond gives any surface a familiar, timeless appeal that complements brick or stone homes. Popular for driveway aprons, walkways, and patio edges.",
    ideal: "Driveways, walkways, patio edging",
    image: "/images/IMG-20231218-WA0005.jpg",
    imageAlt: "Running bond brick stamped concrete walkway pattern in London, Ontario",
    colours: ["Red Brick", "Adobe", "Charcoal", "Sandstone"],
  },
  {
    name: "Herringbone Brick",
    description: "Bricks arranged in a V-shaped zigzag pattern — one of the most visually striking designs available. Herringbone brick creates a sense of movement and energy underfoot. A favourite for feature driveways and large patio spaces where the pattern can really be appreciated.",
    ideal: "Feature driveways, large patios",
    image: "/images/IMG-20231218-WA0003.jpg",
    imageAlt: "Herringbone brick stamped concrete driveway pattern in London, Ontario",
    colours: ["Red Brick", "Adobe", "Buff", "Slate"],
  },
  {
    name: "Wood Plank",
    description: "Long, straight plank lines mimic the look of deck boards or reclaimed wood. Wood plank stamped concrete is especially popular for covered patios and pool surrounds where homeowners want the aesthetic of wood without the maintenance issues. Highly realistic with the right colour and release combination.",
    ideal: "Covered patios, pool surrounds, walkways",
    image: "/images/drive.jpg",
    imageAlt: "Wood plank stamped concrete patio pattern in London, Ontario",
    colours: ["Cedar", "Redwood", "Driftwood Grey", "Walnut"],
  },
  {
    name: "Flagstone",
    description: "Large irregular shapes resembling natural flat stone — similar to traditional flagstone patio installation, but without the unevenness or weed-growth issues. Flagstone stamp pairs beautifully with garden beds and natural landscaping. Available in several sizes from small stepping-stone to large slab.",
    ideal: "Patios, garden paths, entry walks",
    image: "/images/Concrete-Contractor-in-St.-Thomas.png",
    imageAlt: "Flagstone stamped concrete patio pattern with grey tones in London, Ontario",
    colours: ["Flagstone", "Buff", "Slate Grey", "Natural Stone"],
  },
];

const faqItems = [
  { question: "How much does stamped concrete cost compared to real stone?", answer: "Stamped concrete typically costs $15–$25 per square foot installed, while real natural stone or brick can run $30–$60+ per square foot. Stamped concrete provides a nearly identical look at roughly half the cost, and it eliminates weed growth between joints." },
  { question: "How long does stamped concrete last?", answer: "Properly installed stamped concrete lasts 25–30+ years. The key to longevity is proper sealing — we recommend resealing every 2–3 years to maintain the colour and protect the surface from Ontario freeze-thaw cycles." },
  { question: "Can stamped concrete be slippery when wet?", answer: "Standard stamped concrete can be slippery when wet. We always apply a non-slip additive to the sealer on driveways and pool decks. The texture of the stamp pattern also helps provide grip compared to a smooth trowelled surface." },
  { question: "What colours are available for stamped concrete?", answer: "We offer dozens of colour combinations using integral colour (mixed into the concrete), colour hardeners (broadcast on top), and release agents (applied before stamping to create the colour variation in the pattern joints). We bring sample boards to every consultation." },
  { question: "Can I see samples before I commit to a pattern?", answer: "Absolutely. We bring physical sample boards to your free on-site consultation so you can see and feel the patterns and colours in natural light next to your home's exterior." },
];

export default function ConcreteStampsPage() {
  const jsonLd = [
    serviceSchema({ name: "Concrete Stamp Patterns", description: "Full collection of stamped concrete patterns — cobblestone, slate, brick, wood, flagstone — in London, Ontario.", url: site.url + "/concrete-stamps" }),
    breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Concrete Stamps", url: site.url + "/concrete-stamps" }]),
    faqSchema(faqItems),
  ];

  return (
    <>
      {jsonLd.map((s, i) => <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />)}

      {/* Hero */}
      <section className="bg-[#333333] relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/drive.jpg"
            alt="Stamped concrete patterns by London Concrete Forming in London, Ontario"
            fill className="object-cover opacity-20" priority
          />
        </div>
        <div className="relative container-custom text-center max-w-4xl mx-auto">
          <span className="inline-block bg-[#F7931E] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">Stamped Concrete</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Beautiful Stamped Concrete Patterns for London Homes</h1>
          <p className="text-slate-300 text-xl mb-6">Cobblestone, slate, brick, wood plank, flagstone — over 50 patterns to choose from. Custom colours included.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="btn btn-primary text-base">Get a Free Pattern Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-base text-[#333333]">Call {site.phone}</a>
          </div>
        </div>
      </section>

      {/* Intro Stats */}
      <section className="bg-[#F7931E] py-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
            {[
              { value: "50+", label: "Stamp Patterns" },
              { value: "30+", label: "Colour Options" },
              { value: "20+", label: "Years Experience" },
              { value: "$15–$25", label: "Per Sq.Ft. Installed" },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-extrabold mb-1">{s.value}</p>
                <p className="text-sm font-medium opacity-90">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Stamped Concrete Works */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-[#333333] mb-5">How Stamped Concrete Works</h2>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Colour Selection", desc: "Choose your base colour (integral pigment mixed into the concrete) and accent colour (colour hardener broadcast on top before stamping)." },
                  { step: "2", title: "Pattern Selection", desc: "Pick your stamp pattern from our full sample library. We bring physical samples to your consultation so you can see exactly what the finished product looks like." },
                  { step: "3", title: "Pour & Stamp", desc: "Concrete is poured, levelled, and allowed to reach the right consistency. Rubber stamps are pressed into the surface in your chosen pattern before it fully hardens." },
                  { step: "4", title: "Release & Seal", desc: "A release agent applied before stamping creates the realistic colour variation in the joints. After curing, a penetrating sealer is applied to protect the surface and enhance the colours." },
                ].map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-9 h-9 rounded-full bg-[#F7931E] text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">{step.step}</div>
                    <div>
                      <h3 className="font-bold text-[#333333] mb-1">{step.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image src="/images/drive.jpg" alt="Stamped concrete installation process — pattern being pressed into fresh concrete in London, Ontario" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Pattern Gallery */}
      <section className="bg-[#f8fafc] py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Our Most Popular Stamp Patterns</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Every pattern is available across the full range of colours. We bring sample boards to your free on-site consultation.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {patterns.map((pattern) => (
              <div key={pattern.name} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                <div className="relative h-52">
                  <Image src={pattern.image} alt={pattern.imageAlt} fill className="object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-[#333333] mb-2">{pattern.name}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">{pattern.description}</p>
                  <p className="text-xs text-slate-500 mb-2"><span className="font-semibold text-[#333333]">Ideal for:</span> {pattern.ideal}</p>
                  <div className="flex flex-wrap gap-1">
                    {pattern.colours.map((c) => (
                      <span key={c} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Section */}
      <section className="section bg-white">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="bg-[#333333] rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-white mb-4">Stamped Concrete Cost Guide</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Single colour, simple pattern</span><span className="text-[#F7931E] font-bold">$15–$18/sqft</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Dual colour, detailed pattern</span><span className="text-[#F7931E] font-bold">$18–$22/sqft</span>
                  </div>
                  <div className="flex justify-between text-slate-300 border-b border-slate-600 pb-2">
                    <span>Custom design with borders</span><span className="text-[#F7931E] font-bold">$22–$25/sqft</span>
                  </div>
                </div>
                <p className="text-slate-400 text-xs mt-4">All prices include excavation, grading, rebar, forming, pour, stamping, and sealing. Based on standard residential projects.</p>
              </div>
              <div className="text-center">
                <p className="text-slate-300 mb-4">Get your exact project cost with a free on-site estimate from London Concrete Forming.</p>
                <Link href="/contact-us" className="btn btn-primary text-base">Book a Free Estimate</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section bg-[#f8fafc]">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-3xl font-extrabold text-[#333333] mb-3">Stamped Concrete Questions</h2></div>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* Form */}
      <Expansion slug="concrete-stamps" />
      <section className="section bg-white">
        <div className="container-custom max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-[#333333] mb-3">Get a Free Stamped Concrete Quote</h2>
            <p className="text-slate-600">Tell us about your project and we will schedule a free consultation with sample boards.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8"><QuoteForm /></div>
        </div>
      </section>
    </>
  );
}
