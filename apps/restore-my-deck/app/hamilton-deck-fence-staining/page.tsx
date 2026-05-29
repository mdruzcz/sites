import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Hamilton", "ON", "hamilton-deck-fence-staining");

export default function HamiltonPage() {
  return (
    <CityPageTemplate
      city="Hamilton"
      region="ON"
      slug="hamilton-deck-fence-staining"
      intro="Professional deck and fence restoration in Hamilton, ON. Eco-friendly staining and cleaning using premium oil-based products. Free quotes."
      localDetail="Hamilton homeowners on the Mountain, in Ancaster, Dundas, Stoney Creek and throughout the lower city rely on professional wood restoration to combat the region&apos;s humid climate near Lake Ontario. We provide complete deck and fence restoration services throughout the Hamilton area including cleaning, repair, sanding and premium brush-applied staining."
    />
  );
}
