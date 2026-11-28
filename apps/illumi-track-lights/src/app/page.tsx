import { Hero, KitShelf, PartsByType, Promises, DayNight, GuideList, FaqList, VisitUs, homeFaq } from "@/components/sections/home-sections";
import { BrandsTeaser } from "@/components/sections/brands-teaser";
import { listProducts } from "@/lib/catalog";
import { kitFromPrice, kitTopPrice, kitsWithLivePrices } from "@/lib/kits";

export const revalidate = 3600;

const HOME_GUIDES = [
  "gemstone-lights-vs-diy-track-lighting-kits",
  "govee-permanent-outdoor-lights-vs-track-lighting",
  "permanent-outdoor-lights-canada-guide",
  "how-to-install-permanent-soffit-lights",
  "track-lights-vs-string-lights-permanent-outdoor-lighting",
  "permanent-lights-cost-canada"
];

export default async function HomePage() {
  const products = await listProducts();
  const kits = kitsWithLivePrices(products);
  const low = kitFromPrice(kits);
  const high = kitTopPrice(kits);
  const faq = homeFaq(low, high);
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Hero fromPrice={low} />
      <KitShelf kits={kits} />
      <Promises />
      <PartsByType />
      <DayNight />
      <BrandsTeaser />
      <GuideList slugs={HOME_GUIDES} />
      <FaqList faq={faq} />
      <VisitUs />
    </>
  );
}
