import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations Woodstock ON | K&M Kitchen Renovations",
  description:
    "Expert kitchen renovations in Woodstock, Ontario. K&M Kitchen Renovations transforms Woodstock kitchens with expert craftsmanship. Free quotes. Completed in 2 weeks.",
  openGraph: {
    title: "Kitchen Renovations in Woodstock, ON | K&M",
    description: "Transform your Woodstock kitchen in 2 weeks. Free quotes, quality craftsmanship by K&M.",
    images: [{ url: "/images/kitchen-4.jpg" }],
  },
};

export default function WoodstockPage() {
  return (
    <CityLandingPage
      city="Woodstock"
      province="ON"
      slug="woodstock"
      heroImage="/images/kitchen-4.jpg"
      secondaryImage="/images/kitchen-1.jpg"
      population="43,000"
      neighbourhoods={["Downtown Woodstock", "Pittock", "College Avenue", "Southwood Park", "West Woodstock"]}
      description="K&M Kitchen Renovations serves Woodstock and Oxford County homeowners with the same quality craftsmanship that London families have trusted for over a decade."
      intro="Woodstock's growth has brought with it a wave of homeowners looking to modernize their kitchens without moving. K&M Kitchen Renovations is the Oxford County choice for quality kitchen renovations — from the Pittock area's newer homes to the classic properties near downtown Woodstock."
      localContext="We understand the Oxford County market. Woodstock homeowners want high-quality results at fair prices, and they want a contractor who shows up on time and finishes on schedule. That's exactly what we deliver. Our team has completed numerous projects across the Woodstock area, and we're proud to be a trusted renovation partner for Oxford County families."
      whyUs={[
        { title: "Oxford County Experience", desc: "We know Woodstock's housing market and building styles. Our team has completed projects throughout the region." },
        { title: "Same-Quality as London", desc: "Woodstock clients get identical quality and service to our London projects. No compromise because of location." },
        { title: "Fair, Transparent Quotes", desc: "No hidden travel fees. Our Woodstock quotes include everything — labour, materials, and cleanup." },
        { title: "2-Week Completion", desc: "We work efficiently so your Woodstock kitchen is transformed with minimal disruption to your family." },
        { title: "Full Service Offering", desc: "Kitchen renovations, bathroom remodels, basement finishing — all available to Woodstock homeowners." },
        { title: "Financing Available", desc: "60-day financing makes your Woodstock kitchen renovation achievable without the full upfront cost." },
      ]}
      faqs={[
        { question: "Does K&M serve Woodstock and Oxford County?", answer: "Yes — Woodstock and the surrounding Oxford County area is one of our core service regions. We regularly work in Woodstock, and there are no extra travel charges." },
        { question: "What types of kitchen renovations do you do in Woodstock?", answer: "We handle full kitchen renovations, kitchen remodels, cabinet installations (white shaker and custom), and bathroom remodels for Woodstock homeowners. No job is too big or too small." },
        { question: "How long will my Woodstock kitchen renovation take?", answer: "Most projects in Woodstock are completed in approximately two weeks. We'll give you a clear timeline as part of your free quote." },
        { question: "Can you help me choose cabinets and countertops for my Woodstock kitchen?", answer: "Absolutely. We work with you to select from a wide range of cabinet styles, countertop materials, and finishes that match your home's character and your personal taste." },
        { question: "What does a kitchen renovation cost in Woodstock?", answer: "Kitchen renovation costs in Woodstock are similar to London: $8,000 to $50,000+ depending on size and scope. We provide free detailed quotes." },
      ]}
    />
  );
}
