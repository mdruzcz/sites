import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { localBusinessSchema, breadcrumbSchema } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Celebrate Lighting is Ontario's trusted permanent outdoor LED lighting installer — licensed, insured, lifetime warranty, serving SW Ontario since 2020.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Celebrate Lighting | Permanent LED Lighting Experts in Ontario",
    description: "Licensed & insured permanent lighting specialists serving Southwestern Ontario. Lifetime warranty on all installations.",
    url: "https://celebratelighting.ca/about",
    images: [{ url: "/images/hero-main.jpg", alt: "About Celebrate Lighting — permanent LED lighting experts in Ontario" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: "Home", url: site.url },
        { name: "About Us", url: `${site.url}/about` },
      ])) }} />

      {/* Hero */}
      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-[var(--muted)] mb-8">
            <Link href="/" className="hover:text-[var(--accent)]">Home</Link>
            <span className="mx-2">/</span>
            <span>About Us</span>
          </nav>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-eyebrow mb-3">Our Story</p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight mb-6">
                Permanent Outdoor Lighting Across Ontario
              </h1>
              <p className="text-lg text-[var(--muted)] leading-relaxed mb-4">
                For years, homeowners and businesses across Ontario struggled with the same problem — spending hours every season hanging temporary holiday lights, untangling wires, climbing ladders, and then taking everything down just weeks later.
              </p>
              <p className="text-[var(--muted)] leading-relaxed mb-6">
                We started Celebrate Lighting to make that frustration a thing of the past. By combining advanced LED outdoor lighting technology with professional permanent lighting installation in Ontario, we make it possible to enjoy stunning, year-round lighting without the hassle or risk.
              </p>
              <Link href="/contact" className="btn btn-primary">Get Your Free Quote</Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden aspect-square">
                <Image src="/images/project-brantford.jpg" alt="Permanent LED lighting installation on a home in Brantford, Ontario by Celebrate Lighting" fill className="object-cover" />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square mt-8">
                <Image src="/images/project-tillsonburg.jpg" alt="Permanent LED lighting installation on a home in Tillsonburg, Ontario by Celebrate Lighting" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">What Guides Us</p>
            <h2 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">Our Mission & Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Customer First", body: "Every decision we make starts with one question: 'How does this benefit our customers?' Your satisfaction and happiness are our top priorities.", icon: "❤️" },
              { title: "Innovation", body: "We continuously invest in the latest LED technology and installation techniques to provide you with the most advanced lighting solutions available.", icon: "💡" },
              { title: "Excellence", body: "From the initial consultation to the final installation, we maintain the highest standards of quality and professionalism in everything we do.", icon: "⭐" },
            ].map((v) => (
              <div key={v.title} className="text-center p-6">
                <div className="text-4xl mb-4" aria-hidden="true">{v.icon}</div>
                <h3 className="font-bold text-[var(--foreground)] mb-3">{v.title}</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust points */}
      <section style={{ background: "var(--surface)" }} className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">Why Homeowners Trust Us</p>
            <h2 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">Our Commitment to Quality</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Licensed & Insured", body: "Fully licensed electrical contractors with comprehensive insurance coverage for your complete peace of mind." },
              { title: "Lifetime Warranty", body: "We stand behind our work with a comprehensive lifetime warranty on all installations — parts and labour." },
              { title: "Local Experts", body: "We understand local weather conditions and building requirements across Southwestern Ontario." },
              { title: "Transparent Pricing", body: "No hidden fees or surprise charges. You'll know exactly what you're paying before we start." },
              { title: "Premium Materials", body: "We use only the highest quality LED lights and installation materials rated for Canadian winters." },
              { title: "Professional Install", body: "Certified technicians ensure every installation meets the highest safety and quality standards." },
              { title: "Ongoing Support", body: "24/7 customer support and maintenance services to keep your lights looking perfect year-round." },
              { title: "Satisfaction Guarantee", body: "If you're not completely satisfied with our work, we'll make it right at no additional cost." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--foreground)] mb-2 text-sm">{item.title}</h3>
                <p className="text-xs text-[var(--muted)] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-eyebrow mb-3">How We Work</p>
            <h2 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight">Our Installation Process</h2>
            <p className="mt-4 text-[var(--muted)] max-w-xl mx-auto">From consultation to completion, we make permanent lighting installation simple and stress-free.</p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 gap-6">
            {[
              { num: 1, title: "Free Consultation", body: "We visit your property to assess your needs and provide a detailed quote with no obligation." },
              { num: 2, title: "Custom Design", body: "Our team creates a lighting design tailored to your home's architecture and your personal preferences." },
              { num: 3, title: "Professional Installation", body: "Certified technicians install your system with minimal disruption to your daily routine." },
              { num: 4, title: "System Setup & Training", body: "We configure your app, test all features, and train you on operating your new lighting system." },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-white font-bold" style={{ background: "var(--accent)" }} aria-hidden="true">{step.num}</div>
                <div>
                  <h3 className="font-bold text-[var(--foreground)] mb-1">{step.title}</h3>
                  <p className="text-sm text-[var(--muted)] leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas CTA */}
      <section style={{ background: "var(--foreground)" }} className="py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Serving All of Southwestern Ontario</h2>
          <p className="text-gray-300 mb-8">
            We proudly serve {site.serviceAreas.join(", ")}, and surrounding communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn btn-primary px-8">Get Your Free Quote</Link>
            <Link href="/service-areas" className="btn btn-ghost-white px-8">View Service Areas</Link>
          </div>
        </div>
      </section>
    </>
  );
}
