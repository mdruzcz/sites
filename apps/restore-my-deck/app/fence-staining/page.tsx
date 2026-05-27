import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Fence Staining in Kitchener-Waterloo | Professional Oil-Based Stain",
  description: "Professional fence staining in Kitchener-Waterloo using premium oil-based stains. Brush-applied for deep penetration and long-lasting colour. Free quotes.",
  openGraph: { title: "Fence Staining | Restore My Deck", url: `${site.url}/fence-staining` },
};

export default function FenceStainingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Fence Staining", "Professional brush-applied oil-based fence staining in Kitchener-Waterloo.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Fence Staining", href: "/fence-staining" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Sealing Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Fence Staining</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">Restore and protect your fence with premium oil-based stain — brush-applied for deep penetration and a finish that lasts 2–4 years.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">Professional Fence Staining</h2>
            <p className="text-gray-600 leading-relaxed">A well-stained fence doesn&apos;t just look great — it&apos;s protected against moisture, UV damage and rot. We clean your fence thoroughly first, then brush-apply a premium oil-based stain for deep penetration and long-lasting colour.</p>
            <p className="text-gray-600 leading-relaxed">We stain wood and cedar fences. Our preferred products — Ready Seal and Penofin Verde — are VOC-compliant, eco-friendly and never peel. Typical fence staining projects cost $950–$1,350 depending on length and condition.</p>
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
