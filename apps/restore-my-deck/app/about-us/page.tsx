import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "About Us | Expert Deck & Fence Restoration",
  description: "Learn about Restore My Deck — founded by Cameron with over a decade of experience in professional wood restoration, eco-friendly products and brush-applied staining in Kitchener-Waterloo.",
  openGraph: { title: "About Us | Restore My Deck", description: "Over a decade of deck and fence restoration expertise in Kitchener-Waterloo and surrounding areas.", url: `${site.url}/about-us` },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "About Us", href: "/about-us" }])) }} />

      <PageHero
        eyebrow="Our Story"
        title="About Restore My Deck"
        subtitle="Over a decade of combined experience in deck and fence restoration, built on better products and better techniques."
        center
      />

      {/* Story */}
      <section className="section bg-white">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
            <Image src="/images/deck-staining-pro.jpg" alt="Professional deck staining in Kitchener-Waterloo" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-[var(--dark)] font-[var(--font-montserrat)]">Started From Scratch, Built on Quality</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">Restore My Deck was founded by Cameron, who started pressure washing in his early 20s. After working at another wood restoration company, he identified better detergents, better techniques and a better way to serve customers. That&apos;s what led him to start Restore My Deck.</p>
            <p className="mt-4 text-gray-600 leading-relaxed">We collaborate with other leading wood restoration companies to stay at the forefront of the industry. Our mission is to deliver top-tier services with eco-friendly practices, transparent pricing and a commitment to customer satisfaction.</p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { stat: "10+", label: "Years Experience" },
                { stat: "2 Days", label: "Avg. Completion Time" },
                { stat: "100%", label: "Eco-Friendly Products" },
                { stat: "Free", label: "No-Obligation Quotes" },
              ].map((s) => (
                <div key={s.label} className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-extrabold text-[var(--accent)]">{s.stat}</div>
                  <div className="text-sm text-gray-600 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
            <Link href="/contact-us" className="btn btn-accent mt-8">Get a Free Quote</Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center text-[var(--dark)] font-[var(--font-montserrat)] mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "🌿", title: "Eco-Friendly", desc: "VOC-compliant products including Ready Seal and Penofin Verde. Safe for your family, pets and the environment." },
              { icon: "🖌️", title: "Expert Technique", desc: "Brush-applied stain with 80-grit sanding. No shortcuts — just results that last 2–4 years." },
              { icon: "🤝", title: "Honest Pricing", desc: "No hidden fees, no upsells. You get a clear quote before any work begins." },
            ].map((v) => (
              <div key={v.title} className="card p-6 text-center">
                <div className="text-4xl mb-3">{v.icon}</div>
                <h3 className="text-lg font-bold text-[var(--dark)] mb-2">{v.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Restore Your Deck Without Replacement" />
    </>
  );
}
