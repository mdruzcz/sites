import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fence Builder in Tilsonburg | London Fence Installer",
  description: "Expert fence installation in Tilsonburg, Ontario. Wood, vinyl, chainlink & metal fences. Quality, durability, and aesthetic appeal guaranteed. Free quote today!",
  openGraph: {
    title: "Fence Builder in Tilsonburg | London Fence Installer",
    description: "Professional fence installation in Tilsonburg, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/tilsonburg-fence-builder`,
  },
};

export default function TilsonburgPage() {
  const service = serviceSchema("Fence Installation in Tilsonburg", "Professional fence installation serving Tilsonburg, Ontario.", "/tilsonburg-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Tilsonburg Fence Builder", url: `${site.url}/tilsonburg-fence-builder` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-14 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <nav className="text-sm text-gray-300 mb-4">
                <Link href="/" className="hover:text-white">Home</Link>
                <span className="mx-2">›</span>
                <span>Tilsonburg Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Builder in Tilsonburg</h1>
              <p className="text-gray-200">Expert fence installation in Tilsonburg, Ontario. Quality, durability, and aesthetic appeal guaranteed with a free quote today!</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free Tilsonburg Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Tilsonburg</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer provides quality fence installation throughout Tilsonburg and the surrounding Oxford/Norfolk County region. Our experienced team installs wood, vinyl, chainlink, and metal fences for residential and commercial properties.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Every fence we install comes backed by our five-year limited warranty and is built with high-quality materials designed to withstand Ontario&apos;s climate.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
            {[
              { title: "Free Quotes", body: "We respond to all quote requests within 48 hours." },
              { title: "5-Year Warranty", body: "Every installation backed by our limited warranty." },
              { title: "20 Years Experience", body: "Two decades of fencing expertise in Southwestern Ontario." },
              { title: "All Fence Types", body: "Wood, vinyl, chainlink, metal — we do it all." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="Tilsonburg Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
