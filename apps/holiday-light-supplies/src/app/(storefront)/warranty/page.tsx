import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "5-Year LED Warranty",
  description: "Holiday Light Supplies warrants commercial LED lighting product against manufacturing defects for five years. What is covered, what is not, and how to make a claim.",
  alternates: { canonical: `${SITE_URL}/warranty` }
};

export default function WarrantyPage() {
  return (
    <LegalPage
      title="Warranty"
      updated="2026-10-14"
      intro="Commercial product should outlast the project it was bought for. LED lighting product from Holiday Light Supplies is warranted against manufacturing defects for five years from delivery."
      sections={[
        { h: "What is covered", p: ["LED bulbs, light strands, socket spools, LED netting and transformers that fail because of a manufacturing defect within five years of delivery. We repair or replace the defective component at no cost."] },
        { h: "What is not covered", p: ["Damage from improper installation, electrical surges, water ingress caused by unsealed connections, physical damage, vandalism, or normal wear such as fading of foliage, ribbon and bows. Structural décor (frames, fiberglass props, wreaths and garland) carries a one-year defect warranty."] },
        { h: "How to claim", p: ["Email info@holidaylightsupplies.ca with your order or quote number, a description of the fault and photos. We confirm next steps within one business day. Replacement parts ship from London, Ontario; in some cases we ask for the defective part back."] },
        { h: "Replacement parts beyond warranty", p: ["LED netting, transformers, bulbs and connectors remain available for the displays we sell, so a piece can be refreshed rather than replaced in later seasons."] }
      ]}
    />
  );
}
