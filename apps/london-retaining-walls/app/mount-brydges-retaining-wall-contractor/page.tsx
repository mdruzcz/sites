import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Mount Brydges", "ON", "mount-brydges-retaining-wall-contractor");

export default function MountBrydgesPage() {
  return (
    <CityPageTemplate
      city="Mount Brydges"
      region="ON"
      slug="mount-brydges-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in Mount Brydges, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Mount Brydges in Strathroy-Caradoc is a growing community where many residential properties feature larger lots with grade changes requiring retaining wall solutions. Whether you're managing a slope in a rear yard, creating terraced garden areas, or stabilizing a driveway cut, we bring 8+ years of retaining wall expertise to every project in Mount Brydges and surrounding areas. We work with all wall types and ensure proper drainage engineering for Ontario's challenging climate."
    />
  );
}
