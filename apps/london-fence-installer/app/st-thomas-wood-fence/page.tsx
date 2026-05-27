import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wood Fence Builder in St. Thomas | London Fence Installer",
  description: "Experienced wood fence contractors in St. Thomas. We can help with wood, chainlink, vinyl, dog fences, pool fences, and more! Free quotes within 48 hours.",
  openGraph: {
    title: "Wood Fence Builder in St. Thomas | London Fence Installer",
    description: "Expert fence installation in St. Thomas, ON. All fence types. Free quotes. 5-year warranty.",
    url: `${site.url}/st-thomas-wood-fence`,
  },
};

export default function StThomasPage() {
  const service = serviceSchema("Fence Installation in St. Thomas", "Professional fence installation serving St. Thomas, Ontario.", "/st-thomas-wood-fence");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "St. Thomas Fence Builder", url: `${site.url}/st-thomas-wood-fence` },
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
                <span>St. Thomas Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Wood Fence Builder in St. Thomas</h1>
              <p className="text-gray-200">Experienced wood fence contractors in St. Thomas. We can help with wood, chainlink, vinyl, dog fences, pool fences, and more!</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free St. Thomas Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in St. Thomas</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer is St. Thomas&apos; trusted fence contractor. Located just a short drive from London, we serve St. Thomas and the broader Elgin County area with the same quality and professionalism our London clients expect.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              We can help with wood fences, chainlink fences, vinyl fences, dog fences, pool fences, and more. Every job is backed by our five-year warranty and 20 years of combined experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine fences for St. Thomas homes." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Perfect dog fences and commercial chainlink solutions." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing for any St. Thomas property." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental and pool fencing — the best choice for pool enclosures." },
              { title: "Fence Repair", href: "/fence-repair", body: "Quick response fence repair throughout St. Thomas and Elgin County." },
              { title: "Fence Staining", href: "/fence-staining", body: "Protect your wood fence from Ontario weather with professional staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="St. Thomas Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
