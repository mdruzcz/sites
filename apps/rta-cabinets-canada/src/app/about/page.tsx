import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About RTA Cabinets Canada",
  description:
    "RTA Cabinets Canada supplies premium White Shaker ready-to-assemble kitchen cabinets shipped across Canada — solid wood, soft-close, and priced to save you money.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RTA Cabinets Canada",
    description:
      "Premium White Shaker ready-to-assemble cabinets shipped across Canada.",
  },
};

export default function AboutPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6">About {site.name}</h1>
      <div className="space-y-5 text-ink-soft leading-relaxed">
        <p>
          {site.name} makes a beautiful, durable kitchen affordable for every
          Canadian home. We specialize in premium <strong>White Shaker</strong>{" "}
          ready-to-assemble (RTA) cabinets — the timeless look that suits modern,
          transitional, and classic kitchens alike.
        </p>
        <p>
          Our cabinets feature solid hardwood face frames and doors, grade-A
          plywood boxes, and soft-close hinges and drawer glides. Because they ship
          flat-packed, you skip the cost of pre-assembled cabinets and the long lead
          times — without sacrificing quality.
        </p>
        <p>
          Browse individual cabinets to build a custom layout, or start from one of
          our preset 10x10, 10x12, or 12x12 kitchen packages. Add what you need to
          your quote, and our team confirms pricing and shipping to your door
          anywhere in Canada — usually within one business day.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-6 mt-10">
        {[
          { t: "Solid Construction", d: "Hardwood doors & frames, plywood boxes." },
          { t: "Ships Canada-Wide", d: "Delivered to every province." },
          { t: "Quote-Based", d: "Transparent written pricing, no pressure." },
        ].map((v) => (
          <div key={v.t} className="bg-white border border-border rounded-lg p-5">
            <h2 className="font-semibold mb-1">{v.t}</h2>
            <p className="text-sm text-ink-soft">{v.d}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/shop" className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center">
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
