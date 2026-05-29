import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations Hamilton ON | K&M Kitchen Renovations",
  description:
    "Expert kitchen renovations in Hamilton, Ontario. K&M Kitchen Renovations transforms Hamilton kitchens with quality craftsmanship and a 2-week completion timeline. Free quotes.",
  openGraph: {
    title: "Kitchen Renovations in Hamilton, ON | K&M",
    description: "Transform your Hamilton kitchen. Free quotes, 2-week timeline, expert craftsmanship by K&M.",
    images: [{ url: "/images/kitchen-5.jpg" }],
  },
};

export default function HamiltonPage() {
  return (
    <CityLandingPage
      city="Hamilton"
      province="ON"
      slug="hamilton"
      heroImage="/images/kitchen-5.jpg"
      secondaryImage="/images/kitchen-9.jpg"
      population="569,000"
      neighbourhoods={["Dundas", "Ancaster", "Stoney Creek", "Waterdown", "Flamborough", "Westdale"]}
      description="K&M Kitchen Renovations brings Southwestern Ontario's finest kitchen craftsmanship to Hamilton homeowners — the same quality, the same 2-week timeline."
      intro="Hamilton's booming real estate market means more homeowners than ever are investing in kitchen renovations to add value and enjoy their homes more fully. K&M Kitchen Renovations brings our decade of experience to Hamilton, delivering the same exceptional results that have made us a trusted name in Southwestern Ontario."
      localContext="From Ancaster's executive homes to the character properties of Westdale, Hamilton's diverse housing stock calls for a renovation team with versatility and skill. We've designed and installed kitchens that honour century homes and those that push contemporary design boundaries. Whatever your Hamilton kitchen needs, we can deliver it."
      whyUs={[
        { title: "Hamilton Market Experience", desc: "We understand Hamilton's diverse housing stock — from century homes to modern builds — and design accordingly." },
        { title: "2-Week Kitchen Timeline", desc: "Our efficient process gets your Hamilton kitchen done fast. Most projects complete in just two weeks." },
        { title: "Premium Results", desc: "We use only high-grade materials and skilled craftsmen, ensuring your Hamilton kitchen looks stunning and lasts for decades." },
        { title: "Full Renovation Services", desc: "Kitchen renovations, bathroom remodels, custom cabinets, and basement finishing all available to Hamilton clients." },
        { title: "Transparent Pricing", desc: "Detailed, itemized quotes with no surprises. Hamilton homeowners always know exactly what they're paying." },
        { title: "Flexible Financing", desc: "60-day financing options make your Hamilton kitchen renovation accessible. Ask about our financing plans." },
      ]}
      faqs={[
        { question: "Does K&M serve Hamilton, Ontario?", answer: "Yes — we extend our services to Hamilton and the surrounding communities including Dundas, Ancaster, Stoney Creek, Waterdown, and Flamborough." },
        { question: "How far is K&M from Hamilton?", answer: "We travel from the London area to serve Hamilton clients. Travel costs are built into your project quote — no surprise fees." },
        { question: "How long does a kitchen renovation in Hamilton take?", answer: "Most Hamilton kitchen renovations are completed in approximately 2 weeks from start to finish, depending on the complexity of the project." },
        { question: "What's the cost of a kitchen renovation in Hamilton?", answer: "Kitchen renovation pricing in Hamilton aligns with Ontario averages: $8,000 to $50,000+ depending on size, materials, and scope. We provide free, no-obligation quotes." },
        { question: "Do you renovate older Hamilton homes?", answer: "Yes — we have experience working with Hamilton's older housing stock, including homes with non-standard dimensions, older infrastructure, and heritage considerations." },
      ]}
    />
  );
}
