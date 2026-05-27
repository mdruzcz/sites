import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wood Fence Builder in Aylmer | London Fence Installer",
  description: "Transform your yard with expert wood fence installation in Aylmer. Quality, durability, and aesthetic appeal guaranteed. Get a free quote today!",
  openGraph: {
    title: "Wood Fence Builder in Aylmer | London Fence Installer",
    description: "Expert fence installation in Aylmer, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/wood-fence-alymer`,
  },
};

export default function AylmerPage() {
  const service = serviceSchema("Fence Installation in Aylmer", "Professional fence installation serving Aylmer, Ontario.", "/wood-fence-alymer");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Aylmer Fence Builder", url: `${site.url}/wood-fence-alymer` },
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
                <span>Aylmer Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Wood Fence Builder in Aylmer</h1>
              <p className="text-gray-200">Transform your yard with expert wood fence installation in Aylmer. Quality, durability, and aesthetic appeal guaranteed.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free Aylmer Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Aylmer, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer is proud to serve Aylmer and the surrounding Elgin County area. Our team provides high-quality fence installations that combine craftsmanship, durable materials, and a commitment to customer satisfaction.
            </p>
            <p className="text-[var(--muted)] mb-8 leading-relaxed">
              Whether you need a wood privacy fence, chainlink enclosure, vinyl panel fence, or metal gate, we deliver exceptional results backed by our five-year limited warranty and 20 years of combined experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor" },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation" },
              { title: "Chainlink Fences", href: "/chainlink-fencing" },
              { title: "Metal Fences", href: "/metal-fence-installation" },
              { title: "Fence Repair", href: "/fence-repair" },
              { title: "Fence Staining", href: "/fence-staining" },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group text-center">
                <h3 className="font-bold text-[var(--green)] group-hover:text-[var(--green-light)]">{s.title}</h3>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6">
            <h3 className="font-bold text-lg text-[var(--green)] mb-3">Serving Aylmer & Elgin County</h3>
            <p className="text-sm text-[var(--muted)]">
              Our team regularly installs fences in Aylmer, Port Stanley, Dutton, and throughout Elgin County. Contact us today for a free quote — we aim to respond within 48 hours.
            </p>
          </div>
        </div>
      </section>

      <CtaBand heading="Aylmer Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
