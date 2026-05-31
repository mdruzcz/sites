import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in Tillsonburg | London Fence Installer" },
  description: "Expert fence installation in Tillsonburg, ON. Wood, vinyl, chainlink & metal fences. Quality guaranteed. Free quote within 48 hrs, 5-year warranty.",
  alternates: { canonical: "https://londonfenceinstaller.ca/tilsonburg-fence-builder" },
  openGraph: {
    title: "Fence Installation in Tillsonburg | London Fence Installer",
    description: "Professional fence installation in Tillsonburg, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/tilsonburg-fence-builder`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Fence installation in Tillsonburg, Ontario" }],
  },
};

export default function TilsonburgPage() {
  const service = serviceSchema("Fence Installation in Tillsonburg", "Professional fence installation serving Tillsonburg, Ontario.", "/tilsonburg-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Tillsonburg Fence Builder", url: `${site.url}/tilsonburg-fence-builder` },
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
                <span>Tillsonburg Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in Tillsonburg</h1>
              <p className="text-gray-200">Expert fence installation in Tillsonburg, Ontario. Quality, durability, and aesthetic appeal guaranteed with a free quote and 5-year warranty.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free Tillsonburg Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Tillsonburg, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer provides quality fence installation throughout Tillsonburg and the surrounding Oxford/Norfolk County region. Whether you&apos;re a homeowner looking for a wood privacy fence or a business owner who needs commercial chainlink fencing, our experienced team delivers results backed by a five-year warranty.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              We install wood, vinyl, chainlink, and metal fences for residential and commercial properties. Every fence is built with high-quality materials designed to withstand Ontario&apos;s climate, with posts set a minimum of 42 inches deep and secured with concrete footings to prevent frost heave. We aim to provide free quotes within 48 hours of your request.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Tillsonburg has local fence bylaws that govern height, setbacks, and pool enclosure requirements. Generally, permits are required for fences exceeding 2 metres (about 6.5 feet) in height. We will advise you on what permits are needed for your specific project and ensure your installation meets all local requirements.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine privacy, picket & horizontal fences." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing for a clean, modern look." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Durable, affordable chainlink for residential and commercial properties." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental aluminum and wrought iron for pools and decorative use." },
              { title: "Fence Repair", href: "/fence-repair", body: "Fast, professional fence repair in Tillsonburg and area." },
              { title: "Fence Staining", href: "/fence-staining", body: "Extend the life of your wood fence with professional staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
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

      <CtaBand heading="Tillsonburg Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
