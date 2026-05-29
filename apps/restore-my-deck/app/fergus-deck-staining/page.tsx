import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Fergus", "ON", "fergus-deck-staining");

export default function FergusPage() {
  return (
    <CityPageTemplate
      city="Fergus"
      region="ON"
      slug="fergus-deck-staining"
      intro="Professional deck staining and restoration in Fergus, ON. Premium oil-based staining, eco-friendly cleaning and free quotes."
      localDetail="Fergus and the Centre Wellington area have a growing community of homeowners who take pride in their outdoor living spaces. We serve Fergus and surrounding communities including Elora with complete deck and fence restoration services using premium eco-friendly products and proven brush-application techniques."
    />
  );
}
