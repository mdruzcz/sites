import type { Metadata } from "next";
import { CategoryPage } from "@/components/category-page";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Drawer Base Cabinets — Three-Drawer Stacks in White Shaker",
  description:
    "Three-drawer base cabinet stacks in widths from 12″ to 30″. Soft-close drawer slides, dovetail boxes. Replace a missing drawer stack in your White Shaker kitchen.",
  alternates: { canonical: "/drawer-cabinets" },
};

export default function DrawerCabinetsPage() {
  return <CategoryPage type="drawer" />;
}
