import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Wall Cabinets — White Shaker Above-Counter Cabinetry",
  description:
    "Wall-mounted kitchen cabinets in White Shaker. Standard 12″ depth, heights 18″/30″/36″. Includes glass-door, corner, microwave, wine-rack and over-fridge styles.",
  alternates: { canonical: "/wall-cabinets" },
};

export default function WallCabinetsPage() {
  return <CategoryPage type="wall" />;
}
