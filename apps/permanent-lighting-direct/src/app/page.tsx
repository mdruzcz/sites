import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Hero, TrustStrip, KitBand, WhatsInTheBox, Steps, Occasions, CompareBand, Specs, Reviews, GuidesPreview, FaqPreview, CtaBand, HOME_FAQ } from "@/components/sections/home-sections";
import { listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

export default async function HomePage() {
  const products = await listProducts();
  const parts = products.filter((p) => !p.slug.startsWith("led-housing-package"));
  const featuredSlugs = ["12v-led-puck-lights-10-pack", "aluminum-track-12v-led-lights-2-pack", "2-channel-12v-led-controller", "12v-150w-power-supply"];
  const bestSellers = featuredSlugs.map((s) => parts.find((p) => p.slug === s)).filter(Boolean) as typeof parts;
  const fill = parts.filter((p) => !bestSellers.includes(p)).slice(0, 4 - bestSellers.length);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero />
      <TrustStrip />
      <KitBand />
      <WhatsInTheBox />
      <Steps />
      <Occasions />
      <CompareBand />
      <Specs />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Parts & add-ons</p>
              <h2 className="font-display h2-fluid mt-5">Extend, repair or build your own.</h2>
            </div>
            <Link href="/shop" className="btn-secondary">Shop all parts</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[...bestSellers, ...fill].map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>
      <Reviews />
      <GuidesPreview />
      <FaqPreview />
      <CtaBand />
      <p className="sr-only">{`Permanent Lighting Direct sells DIY permanent LED roofline lighting kits and 12V parts across Canada from London, Ontario. Website: ${SITE_URL}`}</p>
    </>
  );
}
