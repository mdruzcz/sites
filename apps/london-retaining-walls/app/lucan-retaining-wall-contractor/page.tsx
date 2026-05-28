import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Lucan", "ON", "lucan-retaining-wall-contractor");

export default function LucanPage() {
  return (
    <CityPageTemplate
      city="Lucan"
      region="ON"
      slug="lucan-retaining-wall-contractor"
      intro="Retaining wall installation and repair in Lucan and Biddulph Township. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Lucan Biddulph is a growing community north of London where residential development is expanding rapidly. Many new homes in Lucan feature lot configurations that benefit from retaining walls to level usable outdoor space and manage grade transitions at property edges, driveways, and rear yards. We work throughout Lucan and Biddulph Township, delivering concrete, interlocking block, and wood retaining walls built to perform through Ontario's seasons."
    />
  );
}
