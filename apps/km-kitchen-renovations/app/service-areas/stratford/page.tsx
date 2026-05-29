import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations Stratford ON | K&M Kitchen Renovations",
  description:
    "Expert kitchen renovations in Stratford, Ontario. K&M Kitchen Renovations serves Perth County with quality kitchen and bathroom remodels. Free quotes.",
  openGraph: {
    title: "Kitchen Renovations in Stratford, ON | K&M",
    description: "Transform your Stratford kitchen. Free quotes, expert craftsmanship by K&M.",
    images: [{ url: "/images/kitchen-9.jpg" }],
  },
};

export default function StratfordPage() {
  return (
    <CityLandingPage
      city="Stratford"
      province="ON"
      slug="stratford"
      heroImage="/images/kitchen-9.jpg"
      secondaryImage="/images/kitchen-2.jpg"
      population="32,000"
      neighbourhoods={["Downtown Stratford", "Avon Ward", "Falstaff Area", "Stratford North", "Perth East"]}
      description="K&M Kitchen Renovations serves Stratford and Perth County with expert kitchen renovations that complement the city's elegant heritage architecture."
      intro="Stratford is one of Ontario's most charming cities — and its homes reflect that. From stately Victorian properties near the Avon River to more modern builds on the edges of town, Stratford kitchens deserve the same quality craftsmanship that K&M brings to every project. We're proud to serve Perth County homeowners with the same standards we've built our reputation on."
      localContext="Stratford homeowners often seek kitchen designs that honour their home's heritage character while integrating modern functionality. We have experience with both restoration-minded renovations and contemporary kitchen installations, and we always take the time to understand your home's unique character before we begin designing."
      whyUs={[
        { title: "Heritage Home Experience", desc: "Stratford's beautiful older homes require careful planning. We have the experience to work sensitively with heritage properties." },
        { title: "Perth County Service", desc: "We regularly serve Stratford and the Perth County area as part of our core service region." },
        { title: "Timeless Design Expertise", desc: "Whether you want to complement your Victorian home or introduce a contemporary kitchen, we design for lasting beauty." },
        { title: "2-Week Timeline", desc: "We work efficiently to minimize disruption to your Stratford home and daily routine." },
        { title: "Free Quotes", desc: "We visit Stratford homes for free consultations. Honest assessment, transparent pricing, no commitment required." },
        { title: "Financing Available", desc: "60-day financing available for Stratford homeowners — start your renovation today." },
      ]}
      faqs={[
        { question: "Does K&M serve Stratford and Perth County?", answer: "Yes — we serve Stratford and the surrounding Perth County area. There are no extra travel charges for Stratford projects." },
        { question: "Can you work on older heritage homes in Stratford?", answer: "Absolutely. Many Stratford homes are older and may have non-standard dimensions or heritage considerations. We assess these factors carefully in our site visit to ensure the renovation complements your home." },
        { question: "What's the cost of a kitchen renovation in Stratford?", answer: "Kitchen renovation costs in Stratford align with Ontario standards: $8,000 to $50,000+ depending on size and materials. We provide detailed free quotes." },
        { question: "How long does a kitchen renovation in Stratford take?", answer: "Most Stratford kitchen renovations are completed in approximately 2 weeks. We'll confirm your timeline in the free quote process." },
        { question: "Do you do bathroom remodels in Stratford as well?", answer: "Yes — full bathroom remodels and basement finishing are available alongside kitchen renovations for Stratford and Perth County homeowners." },
      ]}
    />
  );
}
