import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("Strathroy", "ON", "strathroy-retaining-wall-contractor");

export default function StrathroyPage() {
  return (
    <CityPageTemplate
      city="Strathroy"
      region="ON"
      slug="strathroy-retaining-wall-contractor"
      intro="Retaining wall installation and repair in Strathroy and Middlesex County. All wall types. Ontario Building Code compliant. Free quotes."
      localDetail="Strathroy and the surrounding Middlesex County area features a mix of flat agricultural land and residential neighbourhoods with varied topography. Many homeowners in Strathroy-Caradoc face grade management challenges on newer subdivision lots and larger rural properties. We serve Strathroy and all surrounding Middlesex County communities, installing concrete, block, and timber retaining walls with proper drainage engineering to ensure long-term performance in Ontario's climate."
    />
  );
}
