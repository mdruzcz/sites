import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Brantford", "ON", "brantford-retaining-wall-contractor");

export default function BrantfordPage() {
  return (
    <CityPageTemplate
      city="Brantford"
      region="ON"
      slug="brantford-retaining-wall-contractor"
      intro="Retaining wall installation and repair in Brantford, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="Brantford sits along the Grand River and features significant topographical variation — making retaining walls a common requirement for managing sloped lots and erosion control near waterways and ravines. We work throughout Brantford and Brant County, building retaining walls for residential properties, commercial sites, and municipal applications. Whether you need a small garden terrace wall or a large structural retaining system, we bring the same level of engineering care and quality construction to every project."
    />
  );
}
