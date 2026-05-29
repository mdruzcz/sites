import type { Metadata } from "next";
import CityPageTemplate, { generateCityMetadata } from "@/components/CityPage";

export const revalidate = 3600;
export const metadata: Metadata = generateCityMetadata("St. Thomas", "ON", "st-thomas-retaining-wall-contractor");

export default function StThomasPage() {
  return (
    <CityPageTemplate
      city="St. Thomas"
      region="ON"
      slug="st-thomas-retaining-wall-contractor"
      intro="Professional retaining wall installation and repair in St. Thomas, Ontario. Concrete, block and wood walls. Ontario Building Code compliant. Free quotes."
      localDetail="St. Thomas and Elgin County homeowners often require retaining walls to manage the rolling terrain that characterizes much of this region. From backyard terraces in established St. Thomas neighbourhoods to larger grade management projects on rural properties, our team brings 8+ years of experience to every installation. We work with concrete, interlocking block (Permacon, Allan Block), and pressure-treated wood to find the right solution for your property and budget."
    />
  );
}
