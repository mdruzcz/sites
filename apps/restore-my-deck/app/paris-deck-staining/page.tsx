import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Paris", "ON", "paris-deck-staining");

export default function ParisPage() {
  return (
    <CityPageTemplate
      city="Paris"
      region="ON"
      slug="paris-deck-staining"
      intro="Professional deck staining and restoration in Paris, ON. Eco-friendly products, expert technique and free quotes from Restore My Deck."
      localDetail="Paris, Ontario — the cobblestone capital of Canada — has a wonderful mix of heritage character homes and newer builds. We serve Paris homeowners with professional deck and fence restoration services. Our eco-friendly cleaning solutions and premium brush-applied stains deliver beautiful, long-lasting results."
    />
  );
}
