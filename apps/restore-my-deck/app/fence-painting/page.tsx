import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import CtaBand from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Fence Painting in Kitchener-Waterloo | Professional Solid Colour Finish",
  description: "Professional fence painting in Kitchener-Waterloo for a solid colour finish. Ideal for fences with significant weathering. Free quotes from Restore My Deck.",
  openGraph: { title: "Fence Painting | Restore My Deck", url: `${site.url}/fence-painting` },
};

export default function FencePaintingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema("Fence Painting", "Professional fence painting for a solid colour finish in Kitchener-Waterloo.")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: "Fence Painting", href: "/fence-painting" }])) }} />

      <div className="bg-[var(--dark)] py-16 px-4 text-white">
        <div className="container mx-auto max-w-4xl">
          <p className="text-[var(--accent)] font-semibold text-sm uppercase tracking-widest mb-2">Sealing Services</p>
          <h1 className="text-4xl md:text-5xl font-extrabold font-[var(--font-montserrat)]">Fence Painting</h1>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl">Professional fence painting for a clean, solid colour finish. Ideal for fences with significant weathering or blemishes that stain can&apos;t fully cover.</p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Link href="/contact-us" className="btn btn-accent">Get a Free Quote</Link>
            <a href={site.phoneHref} className="btn btn-white text-[var(--dark)]">Call {site.phone}</a>
          </div>
        </div>
      </div>

      <section className="section bg-gray-50">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-[var(--dark)]">When to Paint vs. Stain a Fence</h2>
            <p className="text-gray-600 leading-relaxed">Stain is usually the better long-term option — it penetrates the wood and fades gracefully. But for fences with significant blemishes, previous paint application or when a specific solid colour is required, professional painting is the right choice.</p>
            <p className="text-gray-600 leading-relaxed">We clean and prep the fence thoroughly before painting, ensuring proper adhesion and a smooth, even finish. We use quality exterior paints designed for wood.</p>
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
