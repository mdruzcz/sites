import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Custom Kitchen Cabinet Installation London ON | K&M Renovations",
  description:
    "Custom kitchen cabinet installation in London and Southwestern Ontario. Tailored storage solutions built to maximize every inch of your kitchen. Free quotes by K&M.",
  openGraph: {
    title: "Custom Kitchen Cabinets | K&M Kitchen Renovations",
    description: "Tailor-made cabinet solutions designed around your kitchen's unique dimensions and your lifestyle.",
    images: [{ url: "/images/kitchen-4.jpg" }],
  },
};

export default function CustomCabinetsPage() {
  return (
    <ServicePage
      slug="custom-kitchen-cabinets"
      title="Custom Kitchen Cabinet Installation"
      tagline="Every inch optimized. Cabinet solutions designed specifically for your kitchen."
      heroImage="/images/kitchen-4.jpg"
      description="Custom kitchen cabinet installation in London, St. Thomas, Woodstock, and Southwestern Ontario. Tailor-made storage that maximizes every inch of your space."
      intro="Custom cabinets are the ultimate kitchen storage solution. Unlike stock cabinets, custom kitchen cabinets are designed specifically for your kitchen's exact dimensions — meaning no awkward gaps, wasted corners, or compromises. K&M Kitchen Renovations works with trusted suppliers to design and install custom cabinet solutions that make your kitchen work exactly the way you live."
      included={[
        "Custom cabinet design and planning",
        "Full measurement and 3D layout planning",
        "Custom cabinet manufacturing coordination",
        "Complete old cabinet removal",
        "Precision installation and leveling",
        "Built-in organizational inserts (pull-outs, lazy Susans, etc.)",
        "Hardware installation",
        "Crown molding and trim",
        "Full cleanup",
      ]}
      benefits={[
        { icon: "📐", title: "Perfect Fit", desc: "Custom cabinets are built to your exact dimensions. No filler strips, no gaps, no compromises." },
        { icon: "🎨", title: "Unlimited Style Options", desc: "Choose your door profile, finish, wood species, hardware, and interior fittings from a vast range of options." },
        { icon: "📦", title: "Maximized Storage", desc: "Every corner, every awkward space, every wall is optimized for storage. Custom means zero wasted space." },
        { icon: "💰", title: "Best ROI on Resale", desc: "Custom cabinetry is one of the highest-return kitchen investments. It signals quality to every buyer." },
        { icon: "🏗️", title: "Premium Construction", desc: "Our custom cabinets are built with dovetail drawers, solid wood frames, and premium hardware throughout." },
        { icon: "⏱️", title: "Worth the Investment", desc: "Custom cabinets take slightly longer to manufacture but deliver results that stock cabinets simply cannot match." },
      ]}
      faqs={[
        { question: "What's the difference between custom and semi-custom cabinets?", answer: "Custom cabinets are built to your exact dimensions and specifications — any size, any configuration. Semi-custom uses standard sizes but offers more finish options. We can advise which is best for your kitchen." },
        { question: "How long does custom cabinet installation take?", answer: "Custom cabinets require manufacturing lead time (typically 4–8 weeks). Once they arrive, installation takes 1–2 weeks. We factor this into your project timeline." },
        { question: "What do custom kitchen cabinets cost?", answer: "Custom cabinets typically run $15,000–$50,000+ for a full kitchen, depending on materials, size, and complexity. We provide free detailed quotes." },
        { question: "Can you add custom organizational features?", answer: "Absolutely — pull-out trays, drawer organizers, spice pullouts, corner lazy Susans, and many other organizational features can be incorporated into your custom cabinet design." },
        { question: "Do you offer semi-custom cabinets as well?", answer: "Yes. If full custom is beyond your budget, we can help you find the best semi-custom option that still achieves a high-quality result for your kitchen." },
      ]}
    />
  );
}
