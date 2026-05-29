import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Fence Cleaning in Kitchener-Waterloo | Professional Wood Fence Wash",
  description: "Professional fence cleaning in Kitchener-Waterloo. We remove mold, algae and weathered wood fibres from wood and vinyl fences using eco-friendly solutions. Free quotes.",
  openGraph: { title: "Fence Cleaning | Restore My Deck", url: `${site.url}/fence-cleaning` },
};

export default function FenceCleaningPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Fence Cleaning", "Professional fence cleaning to remove mold, algae and weathered wood fibres.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Fence Cleaning", href: "/fence-cleaning" }])) }} />

      <PageHero
        eyebrow="Pressure Washing Services"
        title="Fence Cleaning"
        subtitle="Eco-friendly fence cleaning that removes mold, algae, dirt and grey wood fibres. Ideal prep before fence staining or painting."
      >
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
          <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
        </div>
      </PageHero>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Professional Fence Cleaning</h2>
            <p className="text-gray-600 leading-relaxed">Your fence takes the same weathering punishment as your deck — UV exposure, moisture and freeze-thaw cycles all take their toll. Regular professional cleaning prevents wood decay, removes unsightly mold and prepares the surface for a new coat of stain or paint.</p>
            <p className="text-gray-600 leading-relaxed">We clean wood, cedar and vinyl fences using eco-friendly solutions and calibrated pressure washing. From $800–$1,200 depending on length and condition.</p>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link href="/fence-staining" className="btn btn-accent">Also: Fence Staining →</Link>
              <Link href="/fence-painting" className="btn btn-outline">Also: Fence Painting →</Link>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="bg-[var(--accent)] -mx-6 -mt-6 px-6 py-4 rounded-t-2xl mb-6">
                <h3 className="text-lg font-bold text-white text-center">Get a Free Quote</h3>
              </div>
              <QuoteForm />
            </div>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
