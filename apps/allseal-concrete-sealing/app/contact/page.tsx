import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteDock } from "@/components/QuoteDock";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Concrete Sealing Inspection & Quote, Woodstock ON",
  description: "Request a free on-site concrete sealing inspection from All-Seal. Call 519-266-6796 or use the form. Woodstock, St. Thomas, Brantford, Hamilton, Kitchener-Waterloo and Cambridge.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero photo={PICKS.contact} kicker="Contact" title={<>Free inspection. <span className="text-[var(--orange)]">Written quote.</span></>} intro="Call, or send the surface and a rough size through the form. We reply within one business day and book the inspection around your schedule." crumbs={[{ label: "Contact" }]} />
      <QuoteDock />
    </>
  );
}
