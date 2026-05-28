import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Ilderton", "ON", "ilderton-retaining-wall-contractor");

export default function IldertonPage() {
  return (
    <CityPageTemplate
      city="Ilderton"
      region="ON"
      slug="ilderton-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in Ilderton and Middlesex Centre. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Ilderton is one of the fastest-growing communities in Middlesex Centre, just north of London. New subdivision development in the area often features significant lot grading that requires retaining walls to manage elevation changes between neighbouring lots, along rear lot lines, and around deck and patio areas. We regularly work in Ilderton's newer subdivisions as well as on established properties throughout Middlesex Centre, delivering quality retaining wall installations built to last."
    />
  );
}
