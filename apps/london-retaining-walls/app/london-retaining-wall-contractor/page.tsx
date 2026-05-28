import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("London", "ON", "london-retaining-wall-contractor");

export default function LondonPage() {
  return (
    <CityPageTemplate
      city="London"
      region="ON"
      slug="london-retaining-wall-contractor"
      intro="Expert retaining wall installation and repair in London, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="London homeowners frequently deal with sloped and rolling terrain across neighbourhoods like Byron, Westmount, Lambeth, Masonville and Springbank. Retaining walls are essential for managing grade changes in backyards, along driveways, and on side yards — particularly in older established neighbourhoods where lot grading has shifted over decades. Kyle and his team have extensive experience navigating London's clay-heavy soils, which require particular attention to drainage engineering to prevent frost heave and water pressure issues. We serve all London neighbourhoods including Byron, Lambeth, Westmount, Argyle, White Oaks, Pond Mills, Masonville, Oakridge, Westminster and surrounding areas."
    />
  );
}
