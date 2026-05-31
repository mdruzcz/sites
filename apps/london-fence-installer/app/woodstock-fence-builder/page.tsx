import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/QuoteForm";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { serviceSchema, breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Fence Installation in Woodstock, ON | London Fence Installer" },
  description: "Your go-to fence company in Woodstock, ON. Wood, vinyl, chainlink & metal fences for homes and businesses. Free quotes in 48 hrs. 5-year warranty.",
  alternates: { canonical: "https://londonfenceinstaller.ca/woodstock-fence-builder" },
  openGraph: {
    title: "Fence Installation in Woodstock, ON | London Fence Installer",
    description: "Expert fence installation in Woodstock, ON. Wood, vinyl, chainlink and more. Free quotes.",
    url: `${site.url}/woodstock-fence-builder`,
    images: [{ url: "/images/wood-fence.jpg", width: 1200, height: 630, alt: "Wood fence installation in Woodstock, Ontario" }],
  },
};

export default function WoodstockPage() {
  const service = serviceSchema("Fence Installation in Woodstock", "Professional fence installation serving Woodstock, Ontario.", "/woodstock-fence-builder");
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Woodstock Fence Builder", url: `${site.url}/woodstock-fence-builder` },
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
                <span>Woodstock Fence Builder</span>
              </nav>
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Fence Installation in Woodstock</h1>
              <p className="text-gray-200">Expert fencing for residential and commercial spaces in Woodstock, Ontario. Your trusted fence company in Oxford County.</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <QuoteForm title="Get a Woodstock Quote" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <h2 className="text-3xl font-extrabold mb-4">Fencing Services in Woodstock, Ontario</h2>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              London Fence Installer proudly serves Woodstock and the surrounding Oxford County area. Whether you&apos;re looking for a traditional wood fence for your home off Dundas Street, a low-maintenance vinyl option for a newer build, or a budget-friendly chain-link solution for a commercial property, our team delivers quality results with a five-year warranty.
            </p>
            <p className="text-[var(--muted)] mb-4 leading-relaxed">
              We offer various fencing options for both residential and commercial spaces. Our skilled craftsmen use only the highest quality materials and install fence posts deep enough to withstand Oxford County&apos;s freeze-thaw cycles. With 20 years of combined experience, we know how to build fences that last in Ontario&apos;s climate.
            </p>
            <p className="text-[var(--muted)] leading-relaxed">
              In Woodstock and Oxford County, building permits are generally required for fences over 2 metres (6.5 feet) and for all pool enclosures. We can advise you on local permit requirements and handle the application process as part of your project.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { title: "Wood Fences", href: "/wood-fencing-contractor", body: "Cedar and pressure-treated pine fences for Woodstock homes and businesses." },
              { title: "Vinyl Fences", href: "/vinyl-fence-installation", body: "Low-maintenance vinyl fencing in a variety of styles and colours." },
              { title: "Chainlink Fences", href: "/chainlink-fencing", body: "Durable, budget-friendly chainlink fencing for all property types." },
              { title: "Metal Fences", href: "/metal-fence-installation", body: "Ornamental metal fencing for pool enclosures and decorative applications." },
              { title: "Fence Repair", href: "/fence-repair", body: "Fast, professional fence repair service throughout Woodstock and area." },
              { title: "Fence Staining", href: "/fence-staining", body: "Protect and beautify your wood fence with expert staining." },
            ].map((s) => (
              <Link key={s.title} href={s.href} className="card p-5 hover:shadow-md transition-shadow group">
                <h3 className="font-bold text-[var(--green)] mb-2 group-hover:text-[var(--green-light)]">{s.title}</h3>
                <p className="text-sm text-[var(--muted)]">{s.body}</p>
              </Link>
            ))}
          </div>

          <div className="bg-[var(--surface)] rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Why Choose London Fence Installer in Woodstock?</h3>
            <ul className="space-y-2">
              {[
                "Free quotes delivered within 48 hours",
                "Five-year limited warranty on all installations",
                "20 years of combined fencing experience",
                "Posts installed deep to beat Ontario frost heave",
                "Fully insured and locally operated",
                "Familiar with Oxford County permit requirements",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-[var(--muted)]">
                  <span className="text-[var(--green)]">✓</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand heading="Woodstock Fence Installation" sub="Get your free quote within 48 hours!" />
    </>
  );
}
