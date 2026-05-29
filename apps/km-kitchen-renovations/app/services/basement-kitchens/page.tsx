import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Basement Kitchen Installation London ON | Secondary Kitchen | K&M",
  description:
    "Install a secondary kitchen in your London or Southwestern Ontario basement. K&M creates functional basement kitchens for in-law suites, entertainment spaces, and rental units.",
  openGraph: {
    title: "Basement Kitchens | K&M Kitchen Renovations",
    description: "Add a secondary kitchen to your basement for in-law suites, entertaining, or rental income.",
    images: [{ url: "/images/kitchen-2.jpg" }],
  },
};

export default function BasementKitchensPage() {
  return (
    <ServicePage
      slug="basement-kitchens"
      title="Basement Kitchens"
      tagline="A fully functional secondary kitchen in your basement — perfect for in-law suites, entertainers, and rental income."
      heroImage="/images/kitchen-2.jpg"
      description="Basement kitchen installation in London, St. Thomas, Woodstock and surrounding Ontario communities. Complete secondary kitchen solutions for multi-family homes and suites."
      intro="A basement kitchen opens up a world of options for your home. It's the heart of a legal in-law suite, the centrepiece of an entertainment space, or the key upgrade that turns your basement into a legal rental unit. K&M Kitchen Renovations installs complete basement kitchens with the same quality materials and craftsmanship as our main-floor work."
      included={[
        "Basement kitchen layout and design",
        "Cabinet installation (standard or custom options)",
        "Countertop installation",
        "Sink and faucet installation",
        "Appliance placement and coordination",
        "Backsplash installation",
        "Plumbing rough-in coordination",
        "Electrical coordination",
      ]}
      benefits={[
        { icon: "👨‍👩‍👦", title: "Perfect for In-Law Suites", desc: "Give family members full independence with their own functional kitchen space." },
        { icon: "🏠", title: "Rental Income Potential", desc: "A basement with a kitchen, bathroom, and separate entrance can generate significant monthly rental income." },
        { icon: "🎉", title: "Entertainment Ready", desc: "Basement kitchens are ideal for dedicated entertainment spaces — no more running upstairs during parties." },
        { icon: "💰", title: "Adds Real Value", desc: "A basement kitchen significantly increases your home's value and rental income potential." },
        { icon: "🍳", title: "Full Functionality", desc: "We install complete kitchens — not kitchenettes. Full-size cabinets, countertops, and proper appliance placement." },
        { icon: "📋", title: "Permit Guidance", desc: "We can advise on permit and zoning requirements for legal basement suites in your municipality." },
      ]}
      faqs={[
        { question: "Can I add a kitchen to my existing finished basement?", answer: "Yes — if plumbing rough-ins are already in place, adding a kitchen is relatively straightforward. If not, we coordinate with licensed plumbers for the rough-in work." },
        { question: "Do basement kitchens require special permits?", answer: "In most Ontario municipalities, adding a kitchen to a basement (especially as part of a secondary suite) requires permits. We guide you through this process during the consultation." },
        { question: "What's the cost of a basement kitchen?", answer: "Basement kitchen installation typically runs $10,000–$30,000+ depending on size, cabinet selection, and whether plumbing rough-ins are already in place." },
        { question: "Can you combine a basement kitchen with basement finishing and a bathroom?", answer: "Yes — and many clients do exactly that for a complete basement suite. We manage all three services together for a seamless experience." },
        { question: "What cabinet options are available for basement kitchens?", answer: "All our standard and custom cabinet options are available for basement kitchens. White shaker is a popular choice for basement spaces." },
      ]}
    />
  );
}
