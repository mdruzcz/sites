import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wood Fence Builder in Strathroy | London Fence Installer",
  description: "Transform your yard with expert wood fence installation in Strathroy. Quality, durability, and aesthetic appeal guaranteed. Get a free quote today!",
  openGraph: {
    title: "Wood Fence Builder in Strathroy | London Fence Installer",
    description: "Expert fence installation in Strathroy, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/strathroy-fence-builder`,
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
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Wood Fence Builder in Strathroy</h1>
              <p className="text-gray-200">Transform your yard with expert wood fence installation in Strathroy. Quality, durability, and aesthetic appeal guaranteed.</p>
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
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in Strathroy</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer provides professional fence installation in Strathroy and the Strathroy-Caradoc area. Our team installs all types of fencing — wood, vinyl, chainlink, and metal — for residential and commercial clients.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              Every installation is backed by our five-year limited warranty. We offer free quotes with a 48-hour response time, ensuring you get the information you need to make the right decision for your property.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
        </div>
      </section>

      <CtaBand heading="Strathroy Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
