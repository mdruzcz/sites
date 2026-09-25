import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import TrustStrip from "@/components/TrustStrip";
import { FaqList, faqJsonLd } from "@/components/ArticleBody";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Expert Cabinet Assembly Service",
  description:
    "Skip the cam locks: RTA Cabinets Canada assembles your White Shaker cabinets for $75 each before delivery. Squared, glued and ready to hang. Select “Assemble my cabinets” in your quote list.",
  alternates: { canonical: "/assembly-service" },
  openGraph: { title: "Expert Cabinet Assembly Service | RTA Cabinets Canada", description: "We assemble your RTA cabinets for $75 each before delivery, ready to hang." },
  twitter: { card: "summary_large_image", title: "Expert Cabinet Assembly Service", description: "We assemble your RTA cabinets for $75 each before delivery, ready to hang." },
};

const FAQS = [
  { q: "What does assembly include?", a: "Every cabinet box is assembled, glued and squared in our shop, doors and drawer fronts are hung and aligned, and soft-close hardware is adjusted. Fillers, panels, mouldings and toe kick are trim pieces and are not assembled (there is nothing to assemble) — they are not charged." },
  { q: "Does it change the delivery time?", a: "Add roughly 3–5 business days for a full kitchen. In-stock cabinets are normally assembled and delivered within two weeks of confirmation inside our free-delivery zone." },
  { q: "Can I assemble some and have you do the rest?", a: "Yes. Tell us in the message box which cabinets to assemble — for example just the tall pantry and corner units — and we'll charge only those." },
  { q: "Is delivery still free?", a: `Yes, within ${site.freeDeliveryKm} km of London, Ontario. Assembled cabinets take more truck space, so outside the free zone freight is quoted on the assembled volume.` },
];

export default function AssemblyPage() {
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">${site.assemblyPerCabinet} per cabinet</p>
      <h1 className="text-4xl font-bold mb-4">Expert Cabinet Assembly Service</h1>
      <p className="text-lg text-ink-soft mb-8">
        Ready-to-assemble pricing without the assembling. Tick <strong>“Assemble my cabinets”</strong> in your quote list and every cabinet arrives built, squared and ready to hang — for a flat ${site.assemblyPerCabinet} each.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { t: "Built by people who do it daily", d: "Glued, clamped and squared — tighter than a first-timer with an Allen key." },
          { t: "Doors aligned", d: "Hinges and drawer fronts adjusted so reveals are even out of the box." },
          { t: "Install-day savings", d: "Installers charge by the hour. Assembled cabinets go up in a fraction of the time." },
        ].map((v) => (
          <div key={v.t} className="rounded-lg border border-border bg-white p-5">
            <p className="font-semibold mb-1">{v.t}</p>
            <p className="text-sm text-ink-soft">{v.d}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">How to add it</h2>
      <ol className="list-decimal pl-5 space-y-2 text-ink-soft mb-10">
        <li>Build your list in the <Link href="/shop" className="text-accent underline">shop</Link>, the <Link href="/planner" className="text-accent underline">3D planner</Link> or from a <Link href="/kitchen-packages" className="text-accent underline">kitchen package</Link>.</li>
        <li>On the <Link href="/request" className="text-accent underline">Request a Quote</Link> page, tick “Assemble my cabinets”. The cabinet count and assembly total update instantly.</li>
        <li>Your written quote itemizes assembly separately, so you can drop it later if you change your mind.</li>
      </ol>

      <FaqList faqs={FAQS} />
      <TrustStrip compact className="mt-10" />
    </div>
  );
}
