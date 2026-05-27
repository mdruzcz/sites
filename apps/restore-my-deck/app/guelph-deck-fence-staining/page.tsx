import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Guelph", "ON", "guelph-deck-fence-staining");

export default function GuelphPage() {
  return (
    <CityPageTemplate
      city="Guelph"
      region="ON"
      slug="guelph-deck-fence-staining"
      intro="Professional deck and fence staining and restoration in Guelph, ON. Premium eco-friendly products, expert application and free quotes."
      localDetail="Guelph's mix of older homes in the Stone Road and Gordon Street corridors and newer subdivisions in the south end all need regular deck and fence maintenance. We serve all Guelph neighbourhoods with professional restoration services — cleaning, repair, sanding and premium oil-based staining."
    />
  );
}
