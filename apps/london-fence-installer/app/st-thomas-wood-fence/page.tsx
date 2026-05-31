import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in St. Thomas | London Fence Installer" },
  description: "Trusted fence contractors in St. Thomas, ON. Wood, vinyl, chainlink & metal fences. 5-year warranty, free quotes in 48 hrs. Serving Elgin County. Call today!",
  alternates: { canonical: "https://londonfenceinstaller.ca/st-thomas-wood-fence" },
  openGraph: {
    title: "Fence Installation in St. Thomas | London Fence Installer",
    description: "Expert fence installation in St. Thomas, ON. All fence types. Free quotes. 5-year warranty.",
    url: `${site.url}/st-thomas-wood-fence`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Wood fence installation in St. Thomas, Ontario" }],
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
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in St. Thomas</h1>
              <p className="text-gray-200">Experienced fence contractors serving St. Thomas and Elgin County. Wood, vinyl, chainlink, metal and more — backed by a 5-year warranty.</p>
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
            <h2 className="text-3xl font-extrabold mb-4">Fence Installation in St. Thomas, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer is St. Thomas&apos; trusted fence contractor. Located just a short drive from London, we serve St. Thomas and the broader Elgin County area with the same quality and professionalism our London clients expect. Whether you need a cedar privacy fence for a backyard in the Ferndale neighbourhood or a chainlink enclosure for a commercial property on Talbot Street, our team delivers results that last.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              We can help with wood fences, chainlink fences, vinyl fences, dog fences, pool fences, and more. Every job is backed by our five-year warranty and 20 years of combined experience. We install posts a minimum of 42 inches deep with concrete footings to ensure your fence withstands Ontario&apos;s harsh freeze-thaw cycles.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              St. Thomas homeowners typically require a building permit for fences over 2 metres (approximately 6.5 feet) in height. Pool enclosures require permits regardless of height under the Ontario Building Code. Our team is familiar with local requirements and can advise you on what&apos;s needed before we begin.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine fences for St. Thomas homes. Privacy, picket, and horizontal styles." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Budget-friendly chainlink for dog runs, commercial enclosures, and property boundaries." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing that stands up to Elgin County weather year after year." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental aluminum and wrought iron — the best choice for pool enclosures." },
              { title: "Fence Repair", href: "/fence-repair", body: "Quick response fence repair throughout St. Thomas and Elgin County." },
              { title: "Fence Staining", href: "/fence-staining", body: "Protect your wood fence from Ontario weather with professional staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6 mb-8">
            <h3 className="font-bold text-lg mb-3">Why St. Thomas Homeowners Choose London Fence Installer</h3>
            <ul className="space-y-2">
              {[
                "Free quotes delivered within 48 hours",
                "Five-year limited warranty on all installations",
                "20 years of combined fencing experience in Southwestern Ontario",
                "Posts installed 42+ inches deep with concrete — no frost heave",
                "Fully insured, locally operated, and familiar with Elgin County permit requirements",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-[var(--green)]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 border-l-4 border-[var(--green)]">
            <p className="text-[var(--muted)] italic mb-3">&ldquo;From quote to cleanup, Kyle and his team were quick, organized, and focused. Our new cedar privacy fence looks amazing. 5/5&rdquo;</p>
            <p className="text-sm font-semibold text-[var(--foreground)]">Jose Hernandez — London, ON</p>
          </div>
        </div>
      </section>

      <CtaBand heading="St. Thomas Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
