import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Dorchester", "ON", "dorchester-retaining-wall-contractor");

export default function DorchesterPage() {
  return (
    <CityPageTemplate
      city="Dorchester"
      region="ON"
      slug="dorchester-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in Dorchester, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Dorchester and South-West Oxford area homeowners frequently deal with grade changes on larger residential lots where managing elevation differences between living areas, driveways, and rear yards is important. Located just east of London in Thames Centre municipality, Dorchester is one of our most active service areas. We regularly install interlocking block and pressure-treated wood retaining walls for residential properties throughout Dorchester, as well as the surrounding communities of Belmont, Thorndale and Mossley."
    />
  );
}
