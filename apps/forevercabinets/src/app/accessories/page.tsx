import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Cabinet Accessories — Mouldings, Fillers, Panels, Toe Kicks",
  description:
    "White Shaker cabinet finishing — crown and light-rail moulding, filler strips, end panels, refrigerator return panels, toe kick, dishwasher panels, corbels, touch-up.",
  alternates: { canonical: "/accessories" },
};

export default function AccessoriesPage() {
  return <CategoryPage type="accessory" />;
}
