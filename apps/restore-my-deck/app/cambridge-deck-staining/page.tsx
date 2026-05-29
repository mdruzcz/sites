import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Cambridge", "ON", "cambridge-deck-staining");

export default function CambridgePage() {
  return (
    <CityPageTemplate
      city="Cambridge"
      region="ON"
      slug="cambridge-deck-staining"
      intro="Expert deck staining and restoration in Cambridge, ON. Brush-applied oil-based stain that lasts 2–4 years. Free no-obligation quotes."
      localDetail="Cambridge homeowners across Galt, Preston and Hespeler trust Restore My Deck for professional deck and fence restoration. Whether your deck is weathered grey from years of exposure or just needs a fresh coat of stain, we have the products and expertise to restore it without costly replacement."
    />
  );
}
