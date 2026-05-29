import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations London ON | Expert Contractor | K&M Kitchen Renovations",
  description:
    "London's trusted kitchen renovation contractor. Custom kitchens and bathroom remodels completed in as little as 2 weeks. Free quotes. Serving all of London, Ontario.",
  openGraph: {
    title: "Kitchen Renovations London ON | K&M Kitchen Renovations",
    description: "Transform your London kitchen in as little as 2 weeks. Free quotes, expert craftsmanship, flexible financing.",
    images: [{ url: "/images/kitchen-2.jpg" }],
  },
};

export default function LondonPage() {
  return (
    <CityLandingPage
      city="London"
      province="ON"
      slug="london"
      heroImage="/images/kitchen-2.jpg"
      secondaryImage="/images/kitchen-3.jpg"
      population="422,000"
      neighbourhoods={["North London", "Byron", "Old South", "Wortley Village", "Westmount", "Masonville"]}
      description="London's most trusted kitchen renovation contractor. Over a decade of transforming London homes into spaces families love."
      intro="London is our home base — and we've spent over a decade transforming kitchens in every corner of the city, from charming Old South bungalows to contemporary North London new builds. When you choose K&M, you're choosing a local team that understands London's architecture, London's neighbourhoods, and London homeowners."
      localContext="Whether you're in Byron updating a 1980s kitchen, in Wortley Village refreshing a century home, or in Masonville looking for a sleek contemporary remodel, we bring the same craftsmanship to every London project. Our efficient 2-week timeline means minimal disruption to your London routine."
      whyUs={[
        { title: "London-Based Team", desc: "We live and work in London. You'll see us at the same local suppliers, and we understand the specific tastes of London homeowners." },
        { title: "Fastest Turnaround in the City", desc: "Most London kitchen renovations completed in just 2 weeks. We respect your time and your home." },
        { title: "Transparent Pricing", desc: "Itemized quotes with no hidden fees. You know exactly what you're paying for before we start." },
        { title: "Full-Service Renovation", desc: "From cabinet removal to final hardware installation, we handle every aspect of your London kitchen reno." },
        { title: "Quality Materials Only", desc: "We source from trusted London suppliers and use only high-grade cabinetry, hardware, and countertop materials." },
        { title: "Free Financing Options", desc: "Flexible 60-day financing available for London homeowners. Get the kitchen you want without the wait." },
      ]}
      faqs={[
        { question: "Do you serve all areas of London, ON?", answer: "Yes — we serve the entire City of London, including North London, South London, East London, Byron, Old South, Wortley Village, Westmount, Masonville, and all surrounding areas." },
        { question: "How quickly can you start a kitchen renovation in London?", answer: "We typically begin new London projects within 1–2 weeks of the quote approval, depending on our current schedule. Kitchen projects are usually complete within 2 weeks of starting." },
        { question: "What's the average cost of a kitchen renovation in London, Ontario?", answer: "Kitchen renovations in London typically run $8,000–$50,000+, depending on the size, scope, and materials chosen. We provide free, itemized quotes so you know exactly what your project will cost." },
        { question: "Can you help me design my new London kitchen?", answer: "Absolutely. We work with you to select cabinet styles, countertop materials, hardware, and finishes that suit your London home's architecture and your personal taste." },
        { question: "Do you do bathroom remodels in London too?", answer: "Yes. We offer full bathroom remodels alongside kitchen renovations. Many London clients bundle both projects for a seamless experience and better value." },
      ]}
    />
  );
}
