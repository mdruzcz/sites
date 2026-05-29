import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Kitchener", "ON", "kitchener-deck-fence-staining");

export default function KitchenerPage() {
  return (
    <CityPageTemplate
      city="Kitchener"
      region="ON"
      slug="kitchener-deck-fence-staining"
      intro="Expert deck and fence restoration, staining, cleaning and repair in Kitchener, ON. Eco-friendly products, brush-applied stain and free quotes."
      localDetail="Kitchener homeowners deal with Ontario's full climate cycle — hot humid summers, freeze-thaw springs and cold winters — all of which accelerate wood weathering. Regular professional cleaning and staining protects your deck and fence investment. We serve all Kitchener neighbourhoods including Forest Heights, Pioneer Park, Stanley Park, Heritage Park, Doon, Idlewood and surrounding areas."
    />
  );
}
