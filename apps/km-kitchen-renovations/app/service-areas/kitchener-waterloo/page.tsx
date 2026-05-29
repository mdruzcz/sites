import type { Metadata } from "next";
import CityLandingPage from "@/components/CityLandingPage";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Kitchen Renovations Kitchener-Waterloo ON | K&M Kitchen Renovations",
  description:
    "Expert kitchen renovations in Kitchener-Waterloo, Ontario. K&M delivers beautiful kitchens with a 2-week timeline. Free quotes for KW homeowners.",
  openGraph: {
    title: "Kitchen Renovations Kitchener-Waterloo ON | K&M",
    description: "Transform your Kitchener-Waterloo kitchen in 2 weeks. Free quotes by K&M.",
    images: [{ url: "/images/kitchen-1.jpg" }],
  },
};

export default function KitchenerWaterlooPage() {
  return (
    <CityLandingPage
      city="Kitchener-Waterloo"
      province="ON"
      slug="kitchener-waterloo"
      heroImage="/images/kitchen-1.jpg"
      secondaryImage="/images/kitchen-4.jpg"
      population="575,000"
      neighbourhoods={["Uptown Waterloo", "Forest Heights", "Stanley Park", "Beechwood", "Westmount", "Columbia Hills"]}
      description="K&M Kitchen Renovations serves the Tri-Cities with expert kitchen renovations — the same quality and 2-week timeline that Southwestern Ontario homeowners trust."
      intro="The Kitchener-Waterloo region is home to some of Ontario's most design-forward homeowners, and K&M Kitchen Renovations is ready to meet that standard. We bring our decade of proven craftsmanship to the Tri-Cities, delivering kitchen transformations that match the innovative spirit of the KW community."
      localContext="From tech-savvy Forest Heights homes where clients want sleek contemporary kitchens, to classic Uptown Waterloo properties that call for a more timeless design approach, we tailor every Kitchener-Waterloo project to the home and the homeowner. Our efficient 2-week process minimizes disruption to your busy KW lifestyle."
      whyUs={[
        { title: "Design-Forward Approach", desc: "KW homeowners have high design standards. We deliver contemporary kitchens that align with current trends and your personal vision." },
        { title: "Efficient 2-Week Process", desc: "Kitchener-Waterloo professionals are busy. Our streamlined renovation process respects your time and delivers on schedule." },
        { title: "Premium Craftsmanship", desc: "We use only high-quality materials and skilled installers — the same standard we apply to every project across the region." },
        { title: "Custom Cabinet Options", desc: "From white shaker to fully custom cabinetry, we offer a range of options to suit your KW kitchen vision and budget." },
        { title: "Full-Service Offering", desc: "Kitchen renovations, bathroom remodels, and basement finishing all available to Kitchener-Waterloo homeowners." },
        { title: "Financing Plans", desc: "Flexible 60-day financing available. Start your KW kitchen renovation now and spread the cost over time." },
      ]}
      faqs={[
        { question: "Does K&M serve Kitchener and Waterloo?", answer: "Yes — we serve both Kitchener and Waterloo, as well as Cambridge and the broader Tri-Cities region as part of our Southwestern Ontario service area." },
        { question: "How long does a kitchen renovation in Kitchener-Waterloo take?", answer: "Most KW kitchen renovations are completed in approximately 2 weeks from start to finish. Complex projects may take slightly longer — we'll give you a clear timeline in your free quote." },
        { question: "What does a kitchen renovation cost in Kitchener-Waterloo?", answer: "KW kitchen renovation pricing aligns with Ontario standards: $8,000 to $50,000+ depending on size, materials, and complexity. We provide free, itemized quotes." },
        { question: "Can I see examples of kitchens you've done in the Tri-Cities?", answer: "We'd be happy to share before-and-after examples and connect you with past clients. Ask us during your free consultation." },
        { question: "Do you do bathroom remodels in Kitchener-Waterloo?", answer: "Yes — full bathroom remodels are available alongside kitchen renovations for Kitchener-Waterloo homeowners." },
      ]}
    />
  );
}
