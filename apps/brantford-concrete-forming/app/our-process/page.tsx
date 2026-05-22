import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import ImageWithBlur from "@/components/ImageWithBlur";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Concrete Forming Process — 5 Steps to a Perfect Pour",
  description:
    "Learn how Brantford Concrete Forming delivers quality concrete projects in 5 structured steps: site prep, form work, pouring, finishing, and inspection. No shortcuts.",
  openGraph: {
    title: "Our Process | Brantford Concrete Forming",
    description: "5-step concrete forming process: site prep, form work, pouring, finishing, and final inspection.",
    images: [{ url: "/images/man-working-on-smoothing-concrete-600nw-2413949341.png", alt: "Concrete forming process in Brantford, ON" }],
  },
  twitter: { card: "summary_large_image" },
};

const steps = [
  {
    step: "Step 1",
    title: "Site Preparation",
    desc: "Before any concrete is poured, we ensure the site is properly prepared. This includes excavation to the required depth (typically 6–8 inches for a driveway), removal of existing material, and grading for positive drainage away from your home or structure. A solid, level base is the foundation of a durable concrete installation.",
    image: "/images/man-working-on-smoothing-concrete-600nw-2413949341.png",
    imageAlt: "Concrete site preparation and excavation by Brantford Concrete Forming",
  },
  {
    step: "Step 2",
    title: "Form Work",
    desc: "Forming is where the shape of your project is defined. We use precision steel forms to establish the exact grade, slope, and dimensions of your concrete. Forms are staked and levelled to ensure the finished surface drains correctly and meets your design specifications. This step is critical for curbs, decorative edges, and multi-level structures.",
    image: "/images/Concrete-Driveway-Installation-1.png",
    imageAlt: "Steel form work set up for concrete driveway installation in Brantford",
  },
  {
    step: "Step 3",
    title: "Base & Reinforcement",
    desc: "A compacted 6-inch gravel base is installed to promote drainage and prevent frost heave. We then install steel wire mesh or rebar throughout the project area, depending on the load requirements. This reinforcement is what gives our concrete its structural integrity — distributing weight and preventing cracking over time.",
    image: "/images/Broom-Finish-Concrete.png",
    imageAlt: "Gravel base and steel reinforcement preparation for concrete pour",
  },
  {
    step: "Step 4",
    title: "Pouring & Finishing",
    desc: "We order and pour high-strength 32 MPa concrete, ensuring it is distributed evenly across the formed area. Once poured, the surface is screeded, floated, and finished to your chosen texture — broom finish for maximum traction, stamp pattern for a decorative look, or smooth for garage floors. Control joints are cut at regular intervals to manage natural expansion and contraction.",
    image: "/images/Stamped-Concrete-1.jpg",
    imageAlt: "Stamped concrete pour and finishing process in Brantford, ON",
  },
  {
    step: "Step 5",
    title: "Curing & Final Inspection",
    desc: "Proper curing is essential for reaching full concrete strength. We apply a professional curing compound to slow moisture evaporation, allowing the concrete to cure evenly. After the initial 7-day cure, we conduct a final walkthrough with you to inspect the finished surface. Concrete reaches full 32 MPa strength at 28 days, after which it is ready for unrestricted use.",
    image: "/images/Concrete-Patio-Installation.jpg",
    imageAlt: "Final inspection of completed concrete patio installation in Brantford, ON",
  },
];

export default function OurProcessPage() {
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Our Process", url: `${site.url}/our-process` },
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
            <span className="text-white">Our Process</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Our Concrete Forming Process</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Five structured steps from site assessment to final inspection. No shortcuts, no surprises.
          </p>
        </div>
      </section>

      {/* Step-by-step */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <div
                key={step.step}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "" : ""}`}
              >
                <div className={`relative h-80 rounded-2xl overflow-hidden ${idx % 2 === 1 ? "md:order-2" : ""}`}>
                  <ImageWithBlur
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[#E8751A] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {step.step}
                  </div>
                </div>
                <div className={idx % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8751A] text-white font-bold flex items-center justify-center text-lg">
                      {idx + 1}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332]">{step.title}</h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline summary */}
          <div className="mt-16 bg-[#f8fafc] rounded-2xl p-8">
            <h2 className="text-2xl font-extrabold text-[#1a2332] mb-6 text-center">Typical Project Timeline</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { label: "Day 1", desc: "Excavation, forming & base prep" },
                { label: "Day 2", desc: "Reinforcement, pour & finishing" },
                { label: "Days 3–7", desc: "Curing period — no traffic" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="text-2xl font-extrabold text-[#E8751A] mb-2">{item.label}</div>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Full 32 MPa strength is reached at 28 days</p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
