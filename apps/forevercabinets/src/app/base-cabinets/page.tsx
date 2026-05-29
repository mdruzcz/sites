import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Base Cabinets — White Shaker, 34½″ Tall, 24″ Deep",
  description:
    "Standard kitchen base cabinets in White Shaker. Widths from 9″ to 36″ plus sink, corner and waste-basket bases. Priced in CAD, shipped Canada-wide.",
  alternates: { canonical: "/base-cabinets" },
};

export default function BaseCabinetsPage() {
  return <CategoryPage type="base" />;
}
