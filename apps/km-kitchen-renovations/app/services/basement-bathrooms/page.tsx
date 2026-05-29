import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Basement Bathroom Installation London ON | K&M Kitchen Renovations",
  description:
    "Add a bathroom to your London or Southwestern Ontario basement. K&M installs full basement bathrooms for in-law suites, rental units, and added home value.",
  openGraph: {
    title: "Basement Bathrooms | K&M Kitchen Renovations",
    description: "Professional basement bathroom installation. Adds value and convenience to your home.",
    images: [{ url: "/images/kitchen-3.jpg" }],
  },
};

export default function BasementBathroomsPage() {
  return (
    <ServicePage
      slug="basement-bathrooms"
      title="Basement Bathrooms"
      tagline="Add a full bathroom to your basement — the upgrade that adds convenience, value, and rental potential."
      heroImage="/images/kitchen-3.jpg"
      description="Basement bathroom installation in London, St. Thomas, Woodstock and surrounding Ontario communities. Complete basement bathrooms for suites, rental units, and home value."
      intro="A basement bathroom is one of the highest-value additions you can make to your home. It makes your basement genuinely livable as an in-law suite, enables legal rental income, and adds a level of convenience that guests and family members will appreciate daily. K&M Kitchen Renovations installs complete, high-quality basement bathrooms with the same attention to detail as our main-floor bathroom remodels."
      included={[
        "Full bathroom layout planning",
        "Below-grade rough-in plumbing coordination",
        "Tile installation (floor and walls)",
        "Toilet, vanity, and sink installation",
        "Shower or tub installation",
        "Exhaust fan and lighting",
        "Moisture barriers and waterproofing",
        "Final fixtures and cleanup",
      ]}
      benefits={[
        { icon: "🚿", title: "Complete Suite Ready", desc: "A basement bathroom completes an in-law suite or rental unit. Together with a bedroom, living space, and kitchen, it's a fully independent living space." },
        { icon: "💰", title: "High Value Addition", desc: "A basement bathroom can add $15,000–$30,000+ to your home's resale value — often more than it costs to install." },
        { icon: "🏠", title: "Rental Income", desc: "Basement suites with bathrooms command higher rental rates and attract quality tenants in Ontario's rental market." },
        { icon: "🎨", title: "Quality Finishes", desc: "We install basement bathrooms with the same premium tile, fixtures, and craftsmanship as our upstairs remodels." },
        { icon: "💧", title: "Proper Waterproofing", desc: "Basement bathrooms require careful moisture management. We use proper moisture barriers and waterproofing throughout." },
        { icon: "📋", title: "Permit & Rough-In Guidance", desc: "We advise on rough-in requirements, permit needs, and zoning regulations for your municipality." },
      ]}
      faqs={[
        { question: "Does my basement need existing plumbing rough-ins for a bathroom?", answer: "It's much easier and less expensive if rough-ins are already in place. If not, we coordinate with licensed plumbers to add them — but this adds cost. We assess this in the site visit." },
        { question: "What's the cost of a basement bathroom?", answer: "Basement bathroom installation typically runs $8,000–$20,000+ depending on whether rough-ins exist, the size, and the finishes chosen." },
        { question: "Can I get a full bathroom with a tub in my basement?", answer: "Yes — space permitting. Many clients opt for a shower-only configuration in basements to maximize floor space, but a full tub is possible if the layout allows." },
        { question: "Do basement bathrooms require permits?", answer: "Yes, in most Ontario municipalities, adding a bathroom requires a building permit. Plumbing work requires a licensed plumber with permit. We guide you through this process." },
        { question: "Can I combine a basement bathroom with a kitchen and finishing?", answer: "Absolutely — and that's the most efficient way to create a complete basement suite. We offer all three services and can schedule them as one coordinated project." },
      ]}
    />
  );
}
