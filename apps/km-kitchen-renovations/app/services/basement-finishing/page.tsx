import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Basement Finishing London ON | Convert Your Basement | K&M",
  description:
    "Professional basement finishing in London, Woodstock, and St. Thomas. K&M converts unfinished basements into beautiful, functional living spaces. Free quotes.",
  openGraph: {
    title: "Basement Finishing | K&M Kitchen Renovations",
    description: "Transform your unfinished basement into a functional, beautiful living space.",
    images: [{ url: "/images/kitchen-9.jpg" }],
  },
};

export default function BasementFinishingPage() {
  return (
    <ServicePage
      slug="basement-finishing"
      title="Basement Finishing"
      tagline="Transform your unfinished basement into valuable, functional living space."
      heroImage="/images/kitchen-9.jpg"
      description="Professional basement finishing in London, St. Thomas, Woodstock, and surrounding Ontario communities. Add value and usable space to your home."
      intro="Your unfinished basement is one of the most underutilized spaces in your home — and one of the highest-ROI renovation opportunities you have. K&M Kitchen Renovations transforms raw, unfinished basements into comfortable, functional living areas: family rooms, home offices, playrooms, in-law suites, and more. We bring the same craftsmanship to your basement as we do to your kitchen."
      included={[
        "Full basement layout planning",
        "Framing and insulation",
        "Drywall installation and finishing",
        "Pot lighting and electrical coordination",
        "Flooring installation",
        "Trim and interior doors",
        "Egress window assessment",
        "Kitchen and bathroom rough-in coordination",
      ]}
      benefits={[
        { icon: "🏠", title: "Double Your Living Space", desc: "A finished basement can add 600–2,000+ sq ft of usable living space to your home without adding square footage to the footprint." },
        { icon: "💰", title: "High ROI", desc: "Basement finishing returns 70–75% of cost at resale in Ontario, making it one of the best home improvement investments." },
        { icon: "🏡", title: "Multiple Use Options", desc: "Family room, in-law suite, home office, gym, playroom, rental unit — we design for your intended use." },
        { icon: "⚡", title: "Efficient Process", desc: "We manage the entire basement finishing process so you don't have to coordinate multiple trades." },
        { icon: "🎨", title: "Design Input", desc: "We help you plan the layout and finishes to get maximum functionality and value from your basement space." },
        { icon: "🍳", title: "Add Kitchen & Bathroom", desc: "Combine basement finishing with our basement kitchen and bathroom services for a complete in-law suite." },
      ]}
      faqs={[
        { question: "How long does basement finishing take?", answer: "A typical basement finishing project takes 3–6 weeks depending on size and complexity. Adding a kitchen or bathroom extends the timeline. We'll give you a clear schedule in your quote." },
        { question: "What does basement finishing cost in Ontario?", answer: "Basement finishing typically costs $25–$75 per square foot in Ontario, or $15,000–$50,000+ for a full basement depending on size and finishes selected." },
        { question: "Do you handle plumbing and electrical for the basement?", answer: "We coordinate with licensed plumbers and electricians where required. We manage the scheduling and oversight so you don't have to deal with multiple contractors." },
        { question: "Can I add a kitchen and bathroom to my finished basement?", answer: "Yes — see our Basement Kitchens and Basement Bathrooms services. We can plan and execute all three services together for a complete basement suite." },
        { question: "Does a finished basement require a permit in Ontario?", answer: "In most municipalities, finishing a basement (especially with bedrooms, kitchens, or bathrooms) requires a building permit. We advise on permit requirements during the consultation." },
      ]}
    />
  );
}
