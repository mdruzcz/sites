import type { Metadata } from "next";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Concrete Sealing Quote, London & SW Ontario",
  description: "Request a free concrete sealing site assessment from TriCity. Call (519) 902-0000 or send photos of your driveway or patio through the form. We reply within 4 business hours.",
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <>
      <PageHero photo={PICKS.heroContact} eyebrow="Free quote" title="Send us a photo. We'll send back a plan and a price." intro="Call, email, or use the form below. We reply within 4 business hours and book a free site assessment with finish samples in hand." crumbs={[{ label: "Contact" }]} compact form={false} />
      <Contact />
    </>
  );
}
