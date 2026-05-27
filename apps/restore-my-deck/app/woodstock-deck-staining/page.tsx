import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Woodstock", "ON", "woodstock-deck-staining");

export default function WoodstockPage() {
  return (
    <CityPageTemplate
      city="Woodstock"
      region="ON"
      slug="woodstock-deck-staining"
      intro="Expert deck staining, cleaning and restoration in Woodstock, ON. Eco-friendly products, brush-applied stain and free quotes."
      localDetail="Woodstock homeowners in Oxford County trust Restore My Deck for professional wood restoration services. Whether your deck needs a simple clean and re-stain or a full restoration with board replacement and sanding, we deliver quality results using premium oil-based products."
    />
  );
}
