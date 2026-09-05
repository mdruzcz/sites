import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Deck & Fence Quote, Kitchener-Waterloo",
  description: "Get a free, no-obligation quote from Restore My Deck. Call 226.476.2055 or send photos of your deck or fence through the form. We reply within 24 hours across Kitchener-Waterloo and area.",
  alternates: { canonical: `${site.url}/contact-us` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero photo={PICKS.heroContact} eyebrow="Free quote" title="Send us a few photos. We'll send back a price." intro="Call, email or use the form. We reply within 24 hours, and most decks can be quoted from photos without a site visit." crumbs={[{ label: "Contact" }]} compact form={false} />
      <Contact />
    </>
  );
}
