import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in Strathroy | London Fence Installer" },
  description: "Expert fence installation in Strathroy, ON. Wood, vinyl, chainlink & metal fences. Quality and durability guaranteed with a free quote and 5-year warranty.",
  alternates: { canonical: "https://londonfenceinstaller.ca/strathroy-fence-builder" },
  openGraph: {
    title: "Fence Installation in Strathroy | London Fence Installer",
    description: "Expert fence installation in Strathroy, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/strathroy-fence-builder`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Fence installation in Strathroy, Ontario" }],
  },
};

export default function StrathroyPage() {
  const service = serviceSchema("Fence Installation in Strathroy", "Professional fence installation serving Strathroy, Ontario.", "/strathroy-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Strathroy Fence Builder", url: `${site.url}/strathroy-fence-builder` },
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
                <span>Strathroy Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in Strathroy</h1>
              <p className="text-gray-200">Transform your yard with expert fence installation in Strathroy, Ontario. Quality, durability, and aesthetic appeal guaranteed.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free Strathroy Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Strathroy, ON</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer provides professional fence installation in Strathroy and the Strathroy-Caradoc area. Our team installs all types of fencing — wood, vinyl, chainlink, and metal — for residential and commercial clients throughout Middlesex County. We bring the same level of craftsmanship to Strathroy that has earned us a strong reputation in London.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Every installation is backed by our five-year limited warranty. We offer free quotes with a 48-hour response time, ensuring you get the information you need to make the right decision for your property. Our posts are installed a minimum of 42 inches deep with 30 kg of quick-setting concrete per post, giving your fence the stability it needs to handle Ontario winters.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Strathroy-Caradoc has specific zoning bylaws governing fence heights, setbacks from property lines, and materials. Fences over 2 metres (6.5 feet) typically require a building permit. We&apos;ll advise you on local requirements and help ensure your project complies with all municipal rules before we break ground.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine fences for Strathroy properties." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing in a variety of styles." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Durable, budget-friendly chainlink solutions." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental metal fencing for pools and decorative use." },
              { title: "Fence Repair", href: "/fence-repair", body: "Fast, professional repair service in Strathroy." },
              { title: "Fence Staining", href: "/fence-staining", body: "Protect your investment with expert staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Why Strathroy Homeowners Trust London Fence Installer</h3>
            <ul className="space-y-2">
              {[
                "Free quotes within 48 hours of your request",
                "Five-year limited warranty on every installation",
                "20 years of combined experience in Southwestern Ontario",
                "Deep concrete post footings designed for freeze-thaw conditions",
                "Fully insured with knowledge of Strathroy-Caradoc bylaws",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-[var(--green)]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand heading="Strathroy Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
