import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Bathroom Remodels London ON | Expert Bathroom Renovation | K&M",
  description:
    "Professional bathroom remodels in London, St. Thomas, and Woodstock. K&M Kitchen Renovations creates spa-like bathrooms with custom tile, vanities, and modern fixtures.",
  openGraph: {
    title: "Bathroom Remodels | K&M Kitchen Renovations",
    description: "Custom bathroom remodels with premium finishes in Southwestern Ontario.",
    images: [{ url: "/images/kitchen-5.jpg" }],
  },
};

export default function BathroomRemodelsPage() {
  return (
    <ServicePage
      slug="bathroom-remodels"
      title="Bathroom Remodels"
      tagline="Transform your bathroom into a beautiful, spa-like retreat with expert craftsmanship."
      heroImage="/images/kitchen-5.jpg"
      description="Professional bathroom remodeling in London, St. Thomas, Woodstock, and surrounding Ontario communities. Custom tile, vanities, fixtures, and premium finishes."
      intro="Your bathroom should be a space where you start and end each day feeling great. K&M's bathroom remodeling service transforms dated, cramped, or purely functional bathrooms into beautiful, efficient spaces that add real value to your home — and real enjoyment to your daily routine. We apply the same craftsmanship and efficient timeline to bathrooms that we bring to every kitchen project."
      included={[
        "Full bathroom demolition and removal",
        "Tile installation (floor and walls)",
        "Vanity and sink installation",
        "Shower/tub surround installation",
        "New fixtures and hardware",
        "Mirror and storage solutions",
        "Painting and finishing",
        "Full cleanup",
      ]}
      benefits={[
        { icon: "🛁", title: "Spa-Quality Results", desc: "We create bathrooms that feel luxurious and functional, using premium tiles, fixtures, and finishes." },
        { icon: "⚡", title: "Efficient Timeline", desc: "Bathroom remodels typically completed in 1–2 weeks. We minimize disruption to your household." },
        { icon: "🎨", title: "Design Expertise", desc: "We help you choose tile patterns, vanity styles, and fixtures that work beautifully together." },
        { icon: "🏆", title: "Expert Tiling", desc: "Clean, precise tile installation is one of our strongest skills. Every grout line is perfect." },
        { icon: "💰", title: "Strong ROI", desc: "A quality bathroom remodel returns 60–80% of its cost at resale, while improving daily life." },
        { icon: "🤝", title: "Bundle & Save", desc: "Doing a kitchen and bathroom together? We can often schedule them consecutively for a smoother process." },
      ]}
      faqs={[
        { question: "How long does a bathroom remodel take?", answer: "Most bathroom remodels are completed in 1–2 weeks, depending on the size and complexity. We provide a clear timeline in your free quote." },
        { question: "Can you add a bathroom to my basement?", answer: "Yes — we specialize in basement bathroom additions. See our Basement Bathrooms service for details. Basement bathrooms often require rough-in plumbing work which we can coordinate." },
        { question: "What does a bathroom remodel cost in Ontario?", answer: "Bathroom remodels typically range from $8,000 for a basic refresh to $25,000+ for a full primary en suite renovation. We provide free detailed quotes." },
        { question: "Do you install walk-in showers?", answer: "Yes — walk-in showers with custom tile surrounds are one of our most popular bathroom remodel requests. We can design and install a variety of shower configurations." },
        { question: "Can we bundle a kitchen renovation with a bathroom remodel?", answer: "Absolutely, and many of our clients do exactly that. We can schedule them back-to-back or simultaneously where possible, often for better overall value." },
      ]}
    />
  );
}
