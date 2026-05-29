import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "White Shaker Cabinet Installation London ON | K&M Kitchen Renovations",
  description:
    "Premium white shaker kitchen cabinet installation in London and Southwestern Ontario. ¾ plywood, solid birch construction. Expert installation by K&M.",
  openGraph: {
    title: "White Shaker Cabinet Installation | K&M",
    description: "Premium ¾ plywood solid birch white shaker cabinets expertly installed in Southwestern Ontario.",
    images: [{ url: "/images/kitchen-1.jpg" }],
  },
};

export default function WhiteShakerCabinetsPage() {
  return (
    <ServicePage
      slug="white-shaker-cabinets"
      title="White Shaker Cabinet Installation"
      tagline="Premium ¾ plywood, solid birch white shaker cabinets — the timeless kitchen upgrade that never goes out of style."
      heroImage="/images/kitchen-1.jpg"
      description="White shaker cabinet installation in London, Woodstock, St. Thomas, and surrounding Ontario communities. High-quality solid birch construction with precision installation."
      intro="White shaker cabinets are the gold standard of kitchen cabinetry — clean, versatile, and timeless. K&M Kitchen Renovations installs premium white shaker cabinets constructed from ¾ plywood with solid birch frames. These aren't the thin-walled cabinets you'll find at big-box stores. They're built to last decades and installed with the precision that makes all the difference."
      included={[
        "¾ plywood box construction (not particle board)",
        "Solid birch face frame and door fronts",
        "Soft-close hinges and drawer glides",
        "Complete old cabinet removal",
        "Professional installation and leveling",
        "Crown molding and trim options",
        "Hardware installation",
        "Full cleanup",
      ]}
      benefits={[
        { icon: "🏗️", title: "¾ Plywood Construction", desc: "Our white shaker cabinets use ¾ plywood boxes for superior strength and longevity versus cheaper particle board alternatives." },
        { icon: "🌳", title: "Solid Birch Quality", desc: "Solid birch face frames and door fronts provide a premium look and durability that mass-market cabinets can't match." },
        { icon: "✨", title: "Timeless Aesthetics", desc: "White shaker style complements virtually every kitchen design — from farmhouse to modern minimalist." },
        { icon: "💰", title: "Outstanding Value", desc: "Premium cabinet quality at a competitive price point. A white shaker kitchen adds significant resale value." },
        { icon: "⚡", title: "Fast Installation", desc: "Our experienced team installs efficiently. Most white shaker cabinet projects complete in 1–2 weeks." },
        { icon: "🎨", title: "Finish Options", desc: "Choose from a range of hardware, crown molding, and accent options to personalize your white shaker kitchen." },
      ]}
      faqs={[
        { question: "What makes your white shaker cabinets better than big-box store options?", answer: "Our cabinets use ¾ plywood box construction and solid birch face frames — far superior to the particle board found in most entry-level cabinet lines. They're heavier, stronger, and built to last decades." },
        { question: "Do white shaker cabinets work with any kitchen style?", answer: "Yes — white shaker is one of the most versatile cabinet styles available. It works beautifully with farmhouse, transitional, modern, traditional, and contemporary kitchen designs." },
        { question: "How long does white shaker cabinet installation take?", answer: "Typically 3–7 days for installation once the old cabinets are removed. Full project including demo and finishing usually takes 1–2 weeks." },
        { question: "What countertop materials pair well with white shaker cabinets?", answer: "White shaker cabinets pair beautifully with quartz, granite, butcher block, marble, and many other countertop materials. We can help you choose the best pairing for your kitchen during the consultation." },
        { question: "Can I add an island with white shaker cabinets?", answer: "Yes — white shaker kitchen islands are extremely popular and can be designed to match your perimeter cabinets perfectly." },
      ]}
      galleryImages={[
        { src: "/images/kitchen-1.jpg", alt: "White shaker cabinet kitchen installation by K&M" },
        { src: "/images/kitchen-2.jpg", alt: "Premium shaker cabinet kitchen in London ON" },
        { src: "/images/kitchen-5.jpg", alt: "White kitchen with shaker cabinet installation" },
      ]}
    />
  );
}
