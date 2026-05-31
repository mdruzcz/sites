import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in St. Marys | London Fence Installer" },
  description: "Expert fence installation in St. Marys & Perth County. Wood, vinyl, chainlink & metal fences. Free quote in 48 hrs, 5-year warranty. Fully insured. Call today!",
  alternates: { canonical: "https://londonfenceinstaller.ca/st-marys-fence-builder" },
  openGraph: {
    title: "Fence Installation in St. Marys | London Fence Installer",
    description: "Professional fence installation in St. Marys, ON. Free quotes within 48 hrs. 5-year warranty.",
    url: `${site.url}/st-marys-fence-builder`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Fence installation in St. Marys, Ontario" }],
  },
};

export default function StMarysPage() {
  const service = serviceSchema("Fence Installation in St. Marys", "Professional fence installation serving St. Marys, Ontario.", "/st-marys-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "St. Marys Fence Builder", url: `${site.url}/st-marys-fence-builder` },
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
                <span>St. Marys Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in St. Marys</h1>
              <p className="text-gray-200">Expert fence installation in St. Marys, Ontario. Quality craftsmanship with a free quote and 5-year warranty.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Free St. Marys Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in St. Marys, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer serves St. Marys and the surrounding Perth County area. Our team delivers quality fence installations for residential and commercial properties, using only high-quality materials designed to stand up to Ontario weather. St. Marys&apos; mix of historic properties and newer developments requires fence solutions that complement both traditional and contemporary architecture — we have the expertise for both.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              Whether you need a wood privacy fence, vinyl fence, chainlink dog run, or ornamental metal fence, we have the expertise to get the job done right — backed by our five-year limited warranty. All posts are installed a minimum of 42 inches deep with concrete footings to ensure structural integrity through Ontario&apos;s freeze-thaw cycles.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              St. Marys, like most Ontario municipalities, requires building permits for fences over 2 metres in height and all pool enclosures. We are familiar with Perth County permit requirements and can help guide you through the application process, making your project hassle-free from start to finish.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mb-10">
            {[
              { title: "Quick Quotes", body: "Free quotes delivered within 48 hours of your request." },
              { title: "5-Year Warranty", body: "All installations backed by our comprehensive warranty." },
              { title: "All Fence Types", body: "Wood, vinyl, chainlink, metal — we install them all." },
              { title: "Local Expertise", body: "Serving Southwestern Ontario for over 20 years." },
            ].map((item) => (
              <div key={item.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pine privacy fences for St. Marys properties." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing in a variety of styles." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Affordable chainlink for dog runs and commercial use." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental and pool fencing options." },
              { title: "Fence Repair", href: "/fence-repair", body: "Quick fence repair throughout Perth County." },
              { title: "Fence Staining", href: "/fence-staining", body: "Protect your wood fence with professional staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand heading="St. Marys Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
