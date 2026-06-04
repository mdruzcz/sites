import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "How to Measure Your Kitchen for Cabinets",
  description:
    "Step-by-step guide to measuring your kitchen for White Shaker RTA cabinets. Map your walls, doors and windows, then build your cabinet list and request a quote.",
  alternates: { canonical: "/how-to-measure" },
  openGraph: {
    title: "How to Measure Your Kitchen for Cabinets",
    description:
      "Step-by-step guide to measuring your kitchen for White Shaker RTA cabinets.",
  },
};

const steps = [
  { t: "Clear and sketch the room", d: "Draw a rough overhead sketch of your kitchen. Mark every wall, doorway, window, and any obstructions like radiators or vents." },
  { t: "Measure wall lengths", d: "Measure each wall corner-to-corner at the height where base cabinets sit (about 34 inches). Record measurements in inches." },
  { t: "Mark openings", d: "Measure the width of doors and windows and their distance from the nearest corner. Note ceiling height for wall and pantry cabinets." },
  { t: "Locate utilities", d: "Mark the position of your sink, stove, fridge, dishwasher, and any electrical or plumbing so cabinets fit around them." },
  { t: "Plan your run", d: "Standard base cabinets are 24 inches deep and 34.5 inches tall; wall cabinets are 12 inches deep and 36 inches tall. Combine widths to fill each wall." },
  { t: "Build your quote list", d: "Add the cabinets you need to your quote cart, or start from a kitchen package. Our team reviews your list before you commit." },
];

export default function HowToMeasurePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Measure Your Kitchen for RTA Cabinets",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.t,
      text: s.d,
    })),
  };
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-4xl font-bold mb-3">How to Measure Your Kitchen</h1>
      <p className="text-ink-soft mb-10">
        A few careful measurements make choosing the right White Shaker cabinets
        simple. Follow these steps, then build your quote — we&apos;ll double-check
        everything before you order.
      </p>
      <ol className="space-y-6">
        {steps.map((s, i) => (
          <li key={s.t} className="flex gap-4">
            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-semibold">
              {i + 1}
            </span>
            <div>
              <h2 className="font-semibold mb-1">{s.t}</h2>
              <p className="text-ink-soft text-sm">{s.d}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-12 bg-sand border border-border rounded-lg p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">Ready to build your kitchen?</h2>
        <p className="text-ink-soft mb-4">
          Browse cabinets or start from a complete package.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/shop" className="bg-accent hover:bg-accent-dark text-white px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center">
            Shop Cabinets
          </Link>
          <Link href="/kitchen-packages" className="border border-accent text-accent px-6 py-3 rounded-md font-medium min-h-[48px] inline-flex items-center hover:bg-cream">
            Kitchen Packages
          </Link>
        </div>
      </div>
    </div>
  );
}
