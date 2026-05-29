import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Delaware", "ON", "delaware-retaining-wall-contractor");

export default function DelawarePage() {
  return (
    <CityPageTemplate
      city="Delaware"
      region="ON"
      slug="delaware-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in Delaware, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Delaware in Middlesex Centre is a quiet community just west of London where many properties feature spacious lots with natural grade variation. We serve Delaware and surrounding West Middlesex communities, building retaining walls for residential properties that require grade management solutions both for aesthetic and functional purposes. From garden terrace walls to larger structural retaining systems along driveways and property boundaries, we handle projects of all sizes with the same attention to drainage and long-term performance."
    />
  );
}
