import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Waterloo", "ON", "waterloo-deck-fence-staining");

export default function WaterlooPage() {
  return (
    <CityPageTemplate
      city="Waterloo"
      region="ON"
      slug="waterloo-deck-fence-staining"
      intro="Professional deck and fence staining and restoration in Waterloo, ON. Premium oil-based stains, eco-friendly cleaning and free quotes."
      localDetail="Waterloo's residential neighbourhoods — from Lakeshore to Eastbridge, Beechwood and Columbia Hills — have a wide variety of cedar and pressure-treated wood decks that benefit from regular professional maintenance. We offer complete deck and fence restoration services throughout Waterloo, including cleaning, sanding, staining and repair."
    />
  );
}
