import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in Ingersoll | London Fence Installer" },
  description: "Expert fence installation in Ingersoll & Oxford County. Wood, vinyl, chainlink & metal fences. Free quote in 48 hrs, 5-year warranty. Call today!",
  alternates: { canonical: "https://londonfenceinstaller.ca/ingersoll-wood-fence-builder" },
  openGraph: {
    title: "Fence Installation in Ingersoll | London Fence Installer",
    description: "Expert fence installation in Ingersoll, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/ingersoll-wood-fence-builder`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Fence installation in Ingersoll, Ontario" }],
  },
};

export default function IngersollPage() {
  const service = serviceSchema("Fence Installation in Ingersoll", "Professional fence installation serving Ingersoll, Ontario.", "/ingersoll-wood-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Ingersoll Fence Builder", url: `${site.url}/ingersoll-wood-fence-builder` },
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
                <span>Ingersoll Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in Ingersoll</h1>
              <p className="text-gray-200">Transform your yard with expert fence installation in Ingersoll. Quality, durability, and aesthetic appeal guaranteed.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free Ingersoll Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Ingersoll, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer proudly serves Ingersoll and the broader Oxford County area. Our experienced team installs wood, vinyl, chainlink, and metal fences for residential and commercial properties throughout the region. Ingersoll homeowners rely on us for the same quality and reliability that has made us one of London&apos;s most trusted fence contractors.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Transform your yard with a quality fence installation backed by our five-year limited warranty and 20 years of combined experience. We install posts a minimum of 42 inches below grade with 30 kg of quick-setting concrete per post — the right way to build a fence in Ontario&apos;s climate. We aim to provide free quotes within 48 hours of your request.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Oxford County municipalities generally require building permits for fences taller than 2 metres and for all pool enclosures. We will ensure your Ingersoll fence project complies with all local bylaws and guide you through any permit requirements before work begins.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine fences for Ingersoll properties." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing that looks great year after year." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Budget-friendly chainlink for residential and commercial use." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental and security metal fencing options." },
              { title: "Fence Repair", href: "/fence-repair", body: "Quick response fence repair throughout Oxford County." },
              { title: "Fence Staining", href: "/fence-staining", body: "Professional staining to protect and beautify your fence." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Why Ingersoll Homeowners Choose London Fence Installer</h3>
            <ul className="space-y-2">
              {[
                "Free quotes within 48 hours",
                "Five-year limited warranty on all installations",
                "20 years of combined experience in Southwestern Ontario",
                "Posts installed 42+ inches deep to handle Oxford County frost",
                "Fully insured and familiar with local permit requirements",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-[var(--green)]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand heading="Ingersoll Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
