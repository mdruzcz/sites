import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Aylmer", "ON", "aylmer-retaining-wall-contractor");

export default function AylmerPage() {
  return (
    <CityPageTemplate
      city="Aylmer"
      region="ON"
      slug="aylmer-retaining-wall-contractor"
      intro="Retaining wall installation and repair in Aylmer and Elgin County. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Aylmer homeowners and property owners in Malahide Township frequently need retaining walls for managing grade changes on residential lots and agricultural properties. Elgin County's varied terrain — from the flat lake plain to the rolling upland areas — creates a wide range of retaining wall applications. We bring our full range of wall types and drainage expertise to every Aylmer project, ensuring walls that perform well in all of Ontario's climate conditions."
    />
  );
}
