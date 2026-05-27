import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/jsonld";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Choosing the Perfect Fence Style: A Guide to Enhancing Your Property's Aesthetics",
  description: "How do you choose the right fence style for your property? Our expert guide covers wood, vinyl, metal, and chainlink fence styles to help you find the perfect match.",
  openGraph: {
    title: "Choosing the Perfect Fence Style | London Fence Installer",
    description: "Expert guide to choosing the right fence style for your London, Ontario property.",
    url: `${site.url}/choosing-the-perfect-fence-style-a-guide-to-enhancing-your-propertys-aesthetics`,
  },
};

export default function BlogFenceStylePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: site.url },
    { name: "Choosing the Perfect Fence Style", url: `${site.url}/choosing-the-perfect-fence-style-a-guide-to-enhancing-your-propertys-aesthetics` },
  ]);

  const fenceStyles = [
    { title: "Privacy Fence", best: "Backyards, pool areas", description: "A tall, solid fence that completely blocks visibility from the street and neighbours. Wood and vinyl are the most common materials for privacy fences in Ontario." },
    { title: "Picket Fence", best: "Front yards, gardens", description: "The classic white picket fence defines property boundaries while maintaining an open, welcoming appearance. Available in wood, vinyl, and aluminum." },
    { title: "Split Rail Fence", best: "Rural properties, acreages", description: "A rustic, budget-friendly option that marks boundaries without blocking views. Ideal for larger properties and rural settings." },
    { title: "Ornamental Metal", best: "Pool enclosures, decorative", description: "Black aluminum or wrought iron fencing adds elegance and sophistication. Perfect for pool enclosures, driveways, and front yard boundaries." },
    { title: "Chain Link", best: "Pet enclosures, commercial", description: "A practical, durable option that offers security while maintaining visibility. The most economical choice for large areas or commercial properties." },
    { title: "Horizontal Board", best: "Modern homes, privacy", description: "A contemporary take on the traditional board fence. Horizontal planks create a sleek, modern aesthetic that complements newer architectural styles." },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-green py-12 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">›</span>
            <span>Blog</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-3">Choosing the Perfect Fence Style: A Guide to Enhancing Your Property&apos;s Aesthetics</h1>
          <p className="text-gray-300 text-sm">By London Fence Installer | Expert Fencing Advice</p>
        </div>
      </section>

      <article className="section">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[var(--muted)] mb-8 leading-relaxed text-lg">
            Choosing the right fence style is one of the most important decisions you&apos;ll make for your property. The right fence not only provides privacy and security but also enhances your home&apos;s curb appeal and increases its value.
          </p>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-6">Popular Fence Styles for London Ontario Properties</h2>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {fenceStyles.map((style) => (
              <div key={style.title} className="card p-5">
                <h3 className="font-bold text-[var(--green)] mb-1">{style.title}</h3>
                <p className="text-xs text-[var(--accent)] font-semibold mb-2">Best for: {style.best}</p>
                <p className="text-sm text-[var(--muted)]">{style.description}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-[var(--green)] mb-4">Key Factors to Consider</h2>
          <ul className="space-y-4 mb-8">
            {[
              { factor: "Purpose", detail: "Is your primary goal privacy, security, containment for pets/children, or aesthetics? Different goals point to different styles." },
              { factor: "Neighbourhood Character", detail: "Look at what your neighbours have. A fence that complements the surrounding homes will look more natural and may be required by HOA rules." },
              { factor: "Maintenance Tolerance", detail: "Wood fences require regular staining or painting. Vinyl, aluminum, and chain-link need very little maintenance." },
              { factor: "Budget", detail: "Chain-link is the most affordable, followed by pressure-treated wood. Cedar, vinyl, and ornamental metal cost more upfront but have lower long-term maintenance costs." },
              { factor: "Local Bylaws", detail: "London and surrounding municipalities have specific rules about fence height, setbacks from property lines, and materials. Always check before building." },
            ].map((item) => (
              <li key={item.factor} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[var(--green)] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                <div>
                  <strong className="text-[var(--foreground)]">{item.factor}:</strong>{" "}
                  <span className="text-[var(--muted)] text-sm">{item.detail}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-[var(--green)] text-white rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2">Not Sure Which Style Is Right for You?</h3>
            <p className="text-gray-200 text-sm mb-4">
              Our team at London Fence Installer is happy to walk you through your options during a free on-site consultation. We&apos;ll help you find the perfect fence style for your property, budget, and needs.
            </p>
            <Link href="/contact-us" className="btn btn-primary">Get a Free Consultation</Link>
          </div>
        </div>
      </article>

      <CtaBand />
    </>
  );
}
