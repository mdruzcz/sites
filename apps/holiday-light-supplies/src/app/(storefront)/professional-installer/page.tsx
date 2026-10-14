import type { Metadata } from "next";
import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { PageHero } from "@/components/page-hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { ProductCard } from "@/components/product-card";
import { breadcrumbLd, CheckList, FaqList, faqLd, IconTile, SectionHeading } from "@/components/ui";
import { Icon } from "@/components/icons";
import { getCategories, listAllProducts, productCategorySlugs } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

const TITLE = "Professional Installer Program — Wholesale Christmas Lights";
const DESC = "Wholesale C9 bulbs, socket spools, SPT wire, plugs, clips and timers for professional Christmas light installers in Canada. Case pricing, priority fulfilment, shipped from Ontario.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/professional-installer` },
  openGraph: { title: `${TITLE} | Holiday Light Supplies`, description: DESC, url: `${SITE_URL}/professional-installer` }
};

const FAQ = [
  { q: "Who qualifies for the installer program?", a: "Christmas light installation companies, event and wedding lighting companies, and landscaping or property-maintenance crews that install lighting for clients." },
  { q: "What does installer pricing look like?", a: "Case pricing on C9 bulbs, socket spools, wire, plugs, clips and timers, with tiers that improve with annual volume. We confirm your tier on approval." },
  { q: "How fast do restocks ship?", a: "In-stock bulbs, spools and accessories ship within one to two business days from London, Ontario, with installer orders prioritized in October and November." },
  { q: "Do you supply permanent lighting for installers?", a: "Yes. The 12V RGBW kits from Forever Lights are available with installer pricing; a dealer program with territory protection is available through foreverlights.ca." }
];

export default async function ProfessionalInstallerPage() {
  const [all, categories] = await Promise.all([listAllProducts(), getCategories()]);
  const gear = all
    .filter((p) => productCategorySlugs(p, categories).some((c) => ["large-strawberry-lights-c9", "extension-cords-and-wire", "accessories", "mini-lights"].includes(c)))
    .sort((a, b) => Number(b.featured) - Number(a.featured))
    .slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ href: "/commercial", label: "Commercial" }, { label: "Installer program" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }} />
      <PageHero
        photo="estate-fountain"
        eyebrow="Professional installers"
        title="The gear you install, priced by the case, shipped before your season starts."
        intro="C9 bulbs, 12-inch socket spools, SPT-1 and SPT-2 wire, vampire plugs, clips, stakes and timers. Installer tiers, priority fulfilment in October and November, and one contact for restocks."
        crumbs={[{ href: "/commercial", label: "Commercial" }, { label: "Installer program" }]}
        cta={{ href: "#apply", label: "Apply for installer pricing" }}
        secondary={{ href: "/product-category/large-strawberry-lights-c9", label: "Shop C9" }}
      />
      <TrustStrip compact />

      <section className="bg-white">
        <div className="shell section">
          <SectionHeading eyebrow="Program benefits" title="Built around how installers actually buy." />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <IconTile icon="tag" title="Case pricing" body="Tiered pricing on C9, spools, wire, plugs, clips and timers that improves with annual volume." />
            <IconTile icon="bolt" title="Priority fulfilment" body="Installer orders ship first in October and November, when a missed day costs you a job." />
            <IconTile icon="truck" title="Ontario stock" body="No exchange, duty or three-week transit. Courier from London, Ontario in one to two days." />
            <IconTile icon="user" title="A direct contact" body="One person who knows your account, your colours and what you ran short of last year." />
          </div>
        </div>
      </section>

      {gear.length > 0 && (
        <section className="bg-warm">
          <div className="shell section">
            <SectionHeading eyebrow="Installer staples" title="What crews reorder every October." action={{ href: "/product-category/large-strawberry-lights-c9", label: "All C9 & wire" }} />
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
              {gear.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-[var(--color-night)] text-white">
        <div className="shell section grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-gold-bright)]">Add a permanent line</p>
            <h2 className="font-display h2-fluid mt-4">Sell permanent lighting without building a product line.</h2>
            <p className="mt-5 text-white/80">The 12V RGBW roofline kits from our sister brand Forever Lights give your crew a year-round product with installer pricing, training and a dealer program with protected territory.</p>
            <CheckList tone="dark" className="mt-6" items={["Six kit sizes from 50 to 250 ft, all parts in the box", "Two-day training, quoting software and co-marketing through the dealer program", "No electrician required: plugs into a GFCI outlet"]} />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/product-category/permanent-lighting-kits" className="btn-gold">
                See the kits <Icon.arrow size={16} />
              </Link>
              <a href="https://foreverlights.ca/become-a-dealer" target="_blank" rel="noopener" className="btn-ghost-light">
                Forever Lights dealer program
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {["commercial-roofline", "mansion-roofline", "estate-roofline", "luxury-venue"].map((k) => (
              <div key={k} className="overflow-hidden rounded-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/images/hero/${k}.jpg`} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-24 bg-white">
        <div className="shell section grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Apply</p>
            <h2 className="font-display h2-fluid mt-4">Get installer pricing.</h2>
            <p className="mt-4 text-[var(--color-muted)]">Tell us about the company and your volume. We confirm your tier within one business day.</p>
            <div className="mt-8">
              <FaqList items={FAQ} />
            </div>
          </div>
          <InstallerApplicationForm tierSlug="installer" />
        </div>
      </section>
    </>
  );
}
