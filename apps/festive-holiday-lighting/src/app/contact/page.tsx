import type { Metadata } from "next";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { CallNowFab } from "@/components/CallNowFab";
import { Contact } from "@/components/Contact";
import { PageHero } from "@/components/PageHero";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Free Holiday Lighting Quote, Southern Ontario",
  description: "Get your free holiday lighting quote from Festive. Call (289) 426-5764 or send a photo of your home through the form. We respond within 24 hours across Hamilton, Burlington, Oakville and Southern Ontario.",
  alternates: { canonical: "https://festiveholidaylighting.ca/contact" },
};

export default function ContactPage() {
  return (
    <>
      <NavBar />
      <PageHero photo={PICKS.heroContact} eyebrow="Free quote" title="Send us a photo. We'll send back a price." intro="Call, or use the form below. Cameron replies within 24 hours, usually the same day." crumbs={[{ label: "Contact" }]} compact form={false} />
      <Contact />
      <Footer />
      <CallNowFab />
    </>
  );
}
