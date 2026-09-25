import type { Metadata } from "next";
import { PlannerClient } from "@/components/planner/planner-client";
import { SITE } from "@/lib/planner-utils";

export const metadata: Metadata = {
  title: "Kitchen Planner — Design Your Kitchen in 3D",
  description:
    "Free 3D kitchen planner: define your room, drag and drop White Shaker cabinets on two walls and an island, check the layout, then print or share the plans and request a quote.",
  alternates: { canonical: "/planner" },
  openGraph: {
    title: "Kitchen Planner — Design Your Kitchen in 3D | RTA Cabinets Canada",
    description: "Define your space, place cabinets in 2D and 3D, then print, share and price your kitchen. Free, no sign-up.",
    url: `${SITE.url}/planner`,
    type: "website",
  },
};

export default function PlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "RTA Cabinets Canada Kitchen Planner",
    url: `${SITE.url}/planner`,
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
    description: "Free 3D kitchen planner for White Shaker cabinets: define a room, place base, wall and island cabinets, review the layout, print plans and request a quote.",
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PlannerClient />
    </>
  );
}
