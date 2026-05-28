import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Woodstock", "ON", "woodstock-retaining-wall-contractor");

export default function WoodstockPage() {
  return (
    <CityPageTemplate
      city="Woodstock"
      region="ON"
      slug="woodstock-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in Woodstock and Oxford County. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Woodstock and Oxford County homeowners frequently need retaining walls to manage sloped rear yards, terraced gardens, and grade changes along driveways and property edges. The area's mix of sandy loam and clay soils requires proper drainage design to ensure long-term wall performance. We serve residential and commercial clients throughout Woodstock, Ingersoll, Tillsonburg and all of Oxford County, building concrete, interlocking block, and wood retaining walls that are engineered for Ontario's freeze-thaw climate."
    />
  );
}
