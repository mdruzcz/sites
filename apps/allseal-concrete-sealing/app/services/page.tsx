import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesRail } from "@/components/ServicesRail";
import { SheenSection } from "@/components/SheenSection";
import { Process } from "@/components/Process";
import { QuoteDock } from "@/components/QuoteDock";
import { CtaBand } from "@/components/CtaBand";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Concrete Sealing Services: Driveways, Patios, Garage, Pool",
  description: "Driveway, patio, stamped, decorative, walkway, pool deck and garage floor sealing across Woodstock and Southwestern Ontario. Premium sealers in high gloss, semi-gloss or matte. Free inspection.",
  alternates: { canonical: `${site.url}/services` },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero photo={PICKS.heroServices} kicker="All services" title={<>Seven surfaces. <span className="text-[var(--orange)]">One standard.</span></>} intro="Every job gets the same inspection, the same prep and the same premium sealer. The only decision left is the sheen." crumbs={[{ label: "Services" }]} />
      <ServicesRail />
      <SheenSection />
      <Process />
      <QuoteDock />
      <CtaBand />
    </>
  );
}
