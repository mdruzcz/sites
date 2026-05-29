import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations St. Thomas ON | K&M Kitchen Renovations",
  description:
    "Expert kitchen renovations in St. Thomas, Ontario. Custom kitchens and bathroom remodels by K&M Kitchen Renovations — completed in as little as 2 weeks. Free quotes.",
  openGraph: {
    title: "Kitchen Renovations in St. Thomas, ON | K&M",
    description: "Transform your St. Thomas kitchen in 2 weeks. Free quotes, expert craftsmanship.",
    images: [{ url: "/images/kitchen-3.jpg" }],
  },
};

export default function StThomasPage() {
  return (
    <CityLandingPage
      city="St. Thomas"
      province="ON"
      slug="st-thomas"
      heroImage="/images/kitchen-3.jpg"
      secondaryImage="/images/kitchen-5.jpg"
      population="40,000"
      neighbourhoods={["Downtown St. Thomas", "Lynhurst", "Centennial Area", "Valleyview"]}
      description="K&M Kitchen Renovations brings London-quality kitchen craftsmanship to St. Thomas homeowners — just 30 minutes south, with the same 2-week timeline."
      intro="St. Thomas homeowners deserve the same quality kitchen renovation experience as their London neighbours — and that's exactly what K&M delivers. We regularly serve the Elgin County area, bringing the same expert craftsmanship, efficient timelines, and transparent pricing that have made us London's go-to renovation team."
      localContext="St. Thomas homes range from beautiful century properties near downtown to newer builds in the Lynhurst area. Whether you're updating a classic kitchen in a Victorian-era home or installing a sleek modern layout in a newer property, we tailor every renovation to match your home's character and your lifestyle."
      whyUs={[
        { title: "Regular St. Thomas Service", desc: "We run scheduled project rotations in the Elgin County area. No extra travel fees, no wait time surprises." },
        { title: "Same London Quality", desc: "St. Thomas clients receive identical quality to our London projects — same materials, same team, same standards." },
        { title: "2-Week Kitchen Timeline", desc: "Fast, efficient renovations that let you get back to your St. Thomas routine with minimal disruption." },
        { title: "Victorian & Bungalow Expertise", desc: "We understand St. Thomas's heritage architecture and how to design kitchens that complement classic homes." },
        { title: "Free Quotes & Consultation", desc: "We visit St. Thomas homes for free assessments. No charge, no commitment, just an honest quote." },
        { title: "Financing Available", desc: "Flexible 60-day financing options for St. Thomas homeowners." },
      ]}
      faqs={[
        { question: "Do you travel to St. Thomas for kitchen renovations?", answer: "Yes, absolutely. We regularly serve St. Thomas and the entire Elgin County area as part of our standard service area. There are no extra travel charges for St. Thomas projects." },
        { question: "How long does a kitchen renovation in St. Thomas take?", answer: "Most St. Thomas kitchen renovations are completed in about two weeks. The exact timeline depends on the scope — we'll give you a realistic schedule with your free quote." },
        { question: "What's the cost of a kitchen renovation in St. Thomas?", answer: "Kitchen renovation costs in St. Thomas mirror London pricing: typically $8,000–$50,000+, depending on size, materials, and complexity. We provide free, detailed quotes." },
        { question: "Can you renovate century homes in St. Thomas?", answer: "Yes, we have extensive experience working with older St. Thomas homes that may have non-standard dimensions, older plumbing, or heritage considerations. We assess these factors in our site visit." },
        { question: "Do you offer bathroom remodels in St. Thomas too?", answer: "Yes — full bathroom remodels are available in St. Thomas alongside kitchen renovations." },
      ]}
    />
  );
}
