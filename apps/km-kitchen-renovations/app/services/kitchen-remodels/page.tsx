import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Remodels London ON | Modern Kitchen Design | K&M",
  description:
    "Transform your kitchen layout with a professional remodel. K&M Kitchen Renovations creates modern, functional kitchen spaces in London, Woodstock, and St. Thomas.",
  openGraph: {
    title: "Kitchen Remodels | K&M Kitchen Renovations",
    description: "Transform your kitchen layout into a modern, efficient, and stylish space.",
    images: [{ url: "/images/kitchen-3.jpg" }],
  },
};

export default function KitchenRemodelsPage() {
  return (
    <ServicePage
      slug="kitchen-remodels"
      title="Kitchen Remodels"
      tagline="Reimagine your kitchen's layout, flow, and design — from the ground up."
      heroImage="/images/kitchen-3.jpg"
      description="Kitchen remodeling services in London, St. Thomas, Woodstock and surrounding Ontario communities. Transform your layout, upgrade your style, improve functionality."
      intro="A kitchen remodel goes beyond a renovation — it's about rethinking how your kitchen works and flows. Whether you want to open up a wall, reconfigure the layout, or completely transform the space from what it was before, K&M Kitchen Renovations brings the expertise to make it happen beautifully and efficiently."
      included={[
        "Kitchen layout assessment and redesign",
        "Cabinet removal and new installation",
        "Island addition or reconfiguration",
        "Wall removal and open-concept conversion",
        "New countertops and backsplash",
        "Appliance placement optimization",
        "New flooring and lighting coordination",
        "Full cleanup and finishing",
      ]}
      benefits={[
        { icon: "🏗️", title: "Layout Expertise", desc: "We redesign kitchens for better flow, functionality, and aesthetics — not just new cabinets." },
        { icon: "⚡", title: "Fast Turnaround", desc: "Kitchen remodels completed in as little as 2 weeks depending on scope." },
        { icon: "🎨", title: "Modern Design Focus", desc: "We stay current with kitchen design trends while creating spaces that will stand the test of time." },
        { icon: "💰", title: "Value-Driven Approach", desc: "Every remodel decision is weighed against the ROI. We help you invest where it matters most." },
        { icon: "🤝", title: "Collaborative Process", desc: "We work closely with you to ensure the remodel reflects your vision and lifestyle needs." },
        { icon: "💳", title: "Financing Available", desc: "Flexible payment options available for kitchen remodeling projects." },
      ]}
      faqs={[
        { question: "What's the difference between a renovation and a remodel?", answer: "A renovation updates or refreshes an existing space (new cabinets, countertops, finishes). A remodel involves structural or layout changes — removing walls, reconfiguring the floorplan, adding an island, etc. We do both." },
        { question: "Can you open up my kitchen wall to create an open-concept layout?", answer: "Yes — though wall removal requires careful planning to determine if it's load-bearing. We assess this in our site visit and coordinate with structural requirements as needed." },
        { question: "How long does a kitchen remodel take?", answer: "Depending on complexity, kitchen remodels typically take 2–4 weeks. We'll give you a clear timeline in your free quote." },
        { question: "What does a kitchen remodel cost in Ontario?", answer: "Kitchen remodels range from $15,000 to $80,000+ depending on the extent of the changes, materials, and size. We provide free, detailed quotes." },
      ]}
      galleryImages={[
        { src: "/images/kitchen-3.jpg", alt: "Open-concept kitchen remodel by K&M" },
        { src: "/images/kitchen-5.jpg", alt: "Modern kitchen remodel with quartz countertops" },
        { src: "/images/kitchen-9.jpg", alt: "Contemporary kitchen remodel with island" },
        { src: "/images/kitchen-1.jpg", alt: "Full kitchen remodel with custom layout" },
      ]}
    />
  );
}
