import type { Metadata } from "next";
import Link from "next/link";
import ImageWithBlur from "@/components/ImageWithBlur";
import CtaBand from "@/components/CtaBand";
import TrustBar from "@/components/TrustBar";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Brantford Concrete Forming | Local Concrete Contractors",
  description:
    "Learn about Brantford Concrete Forming — a local team delivering 32 MPa steel-reinforced concrete driveways, patios, and more across Brantford and Brant County since 2019.",
  openGraph: {
    title: "About Brantford Concrete Forming | Local Concrete Contractors",
    description: "Brantford-based concrete forming experts with 5+ years experience and 56+ completed projects.",
    images: [{ url: "/images/man-working-on-smoothing-concrete-600nw-2413949341.png", alt: "Brantford Concrete Forming crew at work" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  const jsonLd = [
    localBusinessSchema(),
    breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "About", url: `${site.url}/about` },
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
            <span className="text-white">About</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">About Us</h1>
          <p className="text-slate-300 text-lg max-w-2xl">
            Brantford&apos;s concrete forming specialists — built on quality, honesty, and a commitment to lasting results.
          </p>
        </div>
      </section>

      <TrustBar />

      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a2332] mb-5">
                Brantford&apos;s Concrete Forming Experts
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-lg">
                Brantford Concrete Forming was founded with one goal: to deliver the highest quality concrete work in Brantford and Brant County at fair, honest prices. We specialize in residential and light commercial concrete — from driveways and patios to stamped decorative surfaces.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Every project we take on is poured with 32 MPa high-strength concrete and reinforced with steel wire mesh or rebar. We excavate deep, compact a proper gravel base, and finish to your exact specification — whether that&apos;s a classic broom finish, luxury stamped stone pattern, or smooth polished surface.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We&apos;re proud to serve the communities of Brantford, Paris, Burford, St. George, and Mount Pleasant. When you hire us, you&apos;re hiring a local team that knows the local soil conditions, frost depths, and what it takes to build concrete that lasts through Ontario winters.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <ImageWithBlur
                src="/images/man-working-on-smoothing-concrete-600nw-2413949341.png"
                alt="Brantford Concrete Forming crew member finishing a concrete driveway pour"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Values */}
          <div className="bg-[#f8fafc] rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Quality First", desc: "We never cut corners on materials or prep. Every pour starts with a proper base, steel reinforcement, and premium 32 MPa concrete." },
                { title: "Transparent Pricing", desc: "No surprises. We provide detailed written quotes upfront so you know exactly what you're getting and what it costs." },
                { title: "On-Time Delivery", desc: "We respect your time and schedule. Projects are completed on the timeline we commit to — no endless delays." },
              ].map((v) => (
                <div key={v.title} className="text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E8751A] flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-7 h-7" aria-hidden="true">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.498A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-[#1a2332] text-lg mb-2">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Service area */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1a2332] mb-4">Where We Work</h2>
            <p className="text-slate-600 mb-6">We serve all of Brant County, including:</p>
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {site.serviceAreas.map((area) => (
                <Link
                  key={area}
                  href={`/service-areas/${area.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "")}`}
                  className="bg-[#f8fafc] border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:border-[#E8751A] hover:text-[#E8751A] transition-colors"
                >
                  {area}, ON
                </Link>
              ))}
            </div>
            <Link href="/contact" className="btn btn-primary text-base">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
