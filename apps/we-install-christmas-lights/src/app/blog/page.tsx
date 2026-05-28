import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog | We Install Christmas Lights",
  description:
    "Tips, guides, and inspiration for professional Christmas light installation, holiday décor, and permanent outdoor lighting.",
  alternates: { canonical: `${site.url}/blog` },
};

const POSTS = [
  { slug: "from-homes-to-businesses-professional-christmas-decorating-services-that-shine-bright-all-season", title: "From Homes to Businesses: Professional Christmas Decorating Services That Shine Bright All Season" },
  { slug: "how-much-does-it-really-cost-to-install-christmas-lights-in-ontario", title: "How Much Does It Really Cost To Install Christmas Lights in Ontario?" },
  { slug: "enhancing-your-outdoor-space-with-lighting-on-a-new-deck-or-concrete-patio", title: "Enhancing Your Outdoor Space With Lighting on a New Deck or Concrete Patio" },
  { slug: "professional-christmas-light-installation-how-much-does-it-cost", title: "Professional Christmas Light Installation: How Much Does It Cost?" },
  { slug: "professional-christmas-lighting-services-what-additional-services-are-included", title: "Professional Christmas Lighting Services: What Additional Services Are Included?" },
  { slug: "professional-lighting-companies-are-able-to-handle-large-or-complex-lighting-setups", title: "Professional Lighting Companies Handle Large and Complex Setups" },
  { slug: "how-long-does-it-take-for-professionals-to-install-christmas-lights", title: "How Long Does It Take for Professionals to Install Christmas Lights?" },
  { slug: "holiday-lighting-warranties-offered-by-professional-christmas-light-installations", title: "Holiday Lighting Warranties Offered by Professional Installers" },
  { slug: "the-benefits-of-permanent-lighting-vs-traditional-christmas-lighting", title: "The Benefits of Permanent Lighting vs Traditional Christmas Lighting" },
  { slug: "top-3-best-light-installers-in-london-ontario", title: "Top 3 Best Light Installers in London Ontario" },
  { slug: "christmas-light-hanging-prep-is-everything", title: "Christmas Light Hanging — Prep Is Everything" },
  { slug: "christmas-light-takedown-the-when-and-the-how", title: "Christmas Light Takedown: The When and the How" },
  { slug: "do-professional-installations-include-maintenance-and-repair-services-throughout-the-holiday-season", title: "Do Professional Installations Include Maintenance Throughout the Season?" },
];

export default function BlogIndex() {
  return (
    <>
      <section className="bg-[color:var(--bg-soft)] border-b border-[color:var(--border)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-center">
          <p className="eyebrow">Blog</p>
          <h1 className="heading-display text-3xl sm:text-5xl mt-3">Holiday Lighting Tips & Guides</h1>
        </div>
      </section>
      <section className="section">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-3">
          {POSTS.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}`} className="card p-5 block hover:shadow-md">
              <h2 className="heading-display text-base text-[color:var(--brand-green)]">{p.title}</h2>
              <span className="mt-2 inline-block text-xs uppercase tracking-widest text-[color:var(--brand-red)] font-bold">
                Read article →
              </span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
