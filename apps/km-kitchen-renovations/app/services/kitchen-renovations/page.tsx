import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations London ON | Complete Remodeling Service | K&M",
  description:
    "Full kitchen renovations in London, St. Thomas, and Woodstock. K&M Kitchen Renovations transforms outdated kitchens with expert craftsmanship. Free quotes. 2-week timeline.",
  openGraph: {
    title: "Kitchen Renovations | K&M Kitchen Renovations",
    description: "Complete kitchen renovations in Southwestern Ontario. Free quotes, 2-week timeline.",
    images: [{ url: "/images/kitchen-2.jpg" }],
  },
};

export default function KitchenRenovationsPage() {
  return (
    <ServicePage
      slug="kitchen-renovations"
      title="Kitchen Renovations"
      tagline="A complete kitchen renovation from concept to completion — delivered in as little as 2 weeks."
      heroImage="/images/kitchen-2.jpg"
      description="Full kitchen renovations in London, St. Thomas, Woodstock, and surrounding Ontario communities. Expert installation, premium materials, and a 2-week typical completion."
      intro="A kitchen renovation is one of the most impactful upgrades you can make to your home. It adds value, improves daily life, and transforms the most-used room in your house into something you genuinely love. K&M Kitchen Renovations handles the entire process — from initial design consultation through demo, installation, and final reveal."
      included={[
        "Free design consultation and quote",
        "Complete removal of existing kitchen",
        "Cabinet installation (standard or custom)",
        "Countertop selection and installation",
        "Backsplash installation",
        "New hardware and fixtures",
        "Painting and finishing",
        "Full cleanup and waste removal",
      ]}
      benefits={[
        { icon: "⚡", title: "2-Week Completion", desc: "Most kitchen renovations finished in just two weeks. We work efficiently without cutting corners." },
        { icon: "🏆", title: "Decade of Experience", desc: "10+ years of kitchen renovations across London and Southwestern Ontario. We've seen every challenge and solved them." },
        { icon: "💰", title: "Honest Pricing", desc: "Itemized quotes with no hidden fees. You know exactly what you're paying before we start." },
        { icon: "🎨", title: "Custom Design Options", desc: "Wide selection of cabinet styles, countertop materials, hardware, and finishes to match your vision." },
        { icon: "🧹", title: "Full-Service Process", desc: "We handle everything from demolition to final cleanup. No coordinating multiple contractors." },
        { icon: "💳", title: "Flexible Financing", desc: "60-day financing available. Start your renovation without waiting to save the full amount." },
      ]}
      faqs={[
        { question: "How long does a complete kitchen renovation take?", answer: "Most of our kitchen renovations are completed in approximately 2 weeks. The timeline varies based on the scope, but we give you a realistic schedule in your free quote." },
        { question: "Do I need to vacate my home during the renovation?", answer: "No. We take every precaution to keep the disruption minimal, contain the work area, and maintain access to other parts of your home. Pets and family members can safely remain during the renovation." },
        { question: "What's the cost of a kitchen renovation?", answer: "Kitchen renovations typically run $100–$250 per square foot, or $8,000–$80,000+ depending on size and scope. We provide free, itemized quotes specific to your project." },
        { question: "Can you help me choose materials and finishes?", answer: "Absolutely. We work with trusted suppliers and guide you through cabinet styles, countertop materials, backsplash options, and hardware choices that suit your taste and budget." },
        { question: "Do you offer financing for kitchen renovations?", answer: "Yes — we offer flexible 60-day financing at competitive rates. Ask us for details during your free consultation." },
      ]}
      galleryImages={[
        { src: "/images/kitchen-1.jpg", alt: "Kitchen renovation before and after – London ON" },
        { src: "/images/kitchen-2.jpg", alt: "Custom kitchen renovation with white shaker cabinets" },
        { src: "/images/kitchen-3.jpg", alt: "Open-concept kitchen renovation by K&M" },
        { src: "/images/kitchen-4.jpg", alt: "Navy kitchen renovation with brass hardware" },
      ]}
    />
  );
}
