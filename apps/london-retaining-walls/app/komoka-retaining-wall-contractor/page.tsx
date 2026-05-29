import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Komoka", "ON", "komoka-retaining-wall-contractor");

export default function KomokaPage() {
  return (
    <CityPageTemplate
      city="Komoka"
      region="ON"
      slug="komoka-retaining-wall-contractor"
      intro="Retaining wall installation and repair in Komoka and Middlesex Centre. All wall types. Ontario Building Code compliant. Free quotes."
      localDetail="Komoka and Kilworth in Middlesex Centre have seen substantial residential growth in recent years, with many new properties featuring sloped lots that require retaining walls for functional yard use and proper drainage management. We serve homeowners throughout Komoka, Kilworth, and surrounding Middlesex Centre communities, building retaining walls that complement new home landscaping while providing the structural performance needed for long-term reliability in Ontario's climate."
    />
  );
}
