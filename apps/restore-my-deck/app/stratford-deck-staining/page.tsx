import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Stratford", "ON", "stratford-deck-staining");

export default function StratfordPage() {
  return (
    <CityPageTemplate
      city="Stratford"
      region="ON"
      slug="stratford-deck-staining"
      intro="Professional deck staining and restoration in Stratford, ON. Brush-applied premium oil-based stain. Free no-obligation quotes."
      localDetail="Stratford's heritage homes and newer residential areas all benefit from regular professional deck maintenance. We serve Stratford homeowners with complete deck and fence restoration — from deep cleaning and repair through to premium oil-based staining. Most projects completed in 2 days."
    />
  );
}
