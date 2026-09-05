import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Christmas Lighting Quote, Kitchener-Waterloo",
  description: "Get your free Christmas light installation quote from Classic Christmas Lighting. Call (226) 476-2038 or send a photo of your home through the form. We respond within one business day.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero photo={PICKS.heroContact} eyebrow="Free quote" title="Send us a photo. We'll send back a price." intro="Call, or use the form below. We reply within one business day, usually the same day." crumbs={[{ label: "Contact" }]} compact form={false} />
      <Contact />
    </>
  );
}
