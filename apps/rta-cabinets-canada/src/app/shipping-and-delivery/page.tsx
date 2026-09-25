import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getCities } from "@/lib/content";
import TrustStrip from "@/components/TrustStrip";
import { FaqList, faqJsonLd } from "@/components/ArticleBody";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Fast Cabinet Shipping & Free Local Delivery",
  description:
    "In-stock White Shaker RTA cabinets ship in about a week. Free delivery within 300 km of London, Ontario (London, Kitchener-Waterloo, Hamilton, Woodstock, St. Thomas and more), shipped across Canada beyond that.",
  alternates: { canonical: "/shipping-and-delivery" },
  openGraph: { title: "Fast Cabinet Shipping & Free Local Delivery | RTA Cabinets Canada", description: "Free delivery within 300 km of London, Ontario; fast shipping across Canada." },
  twitter: { card: "summary_large_image", title: "Fast Cabinet Shipping & Free Local Delivery", description: "Free delivery within 300 km of London, Ontario; fast shipping across Canada." },
};

const FREE_ZONE = ["London", "St. Thomas", "Woodstock", "Ingersoll", "Tillsonburg", "Stratford", "Strathroy", "Sarnia", "Chatham-Kent", "Kitchener", "Waterloo", "Cambridge", "Guelph", "Brantford", "Hamilton", "Burlington", "Oakville", "Mississauga", "Milton", "Simcoe", "Owen Sound", "Goderich", "Windsor", "Niagara Falls", "St. Catharines", "Toronto (west)"];

const FAQS = [
  { q: "How fast do cabinets ship?", a: "In-stock cabinets leave our London, Ontario warehouse within about a week of order confirmation. Local free-delivery orders are typically on your driveway in 5–10 business days; cross-Canada freight adds transit time depending on the province. Stock levels are shown on every cabinet page and in the planner." },
  { q: `How is the ${site.freeDeliveryKm} km measured?`, a: `Driving distance from our London, Ontario location to your delivery address. Anything up to ${site.freeDeliveryKm} km is free — that covers nearly all of Southwestern Ontario, the Golden Horseshoe and the west GTA. Not sure? Give us your postal code with your quote and we'll confirm.` },
  { q: "What happens at delivery?", a: "Cabinets arrive flat-packed on a pallet (or assembled, if you added our assembly service). Curbside delivery is standard; tell us if you need help getting boxes inside and we'll arrange it. Inspect the boxes before signing — anything damaged in transit is replaced at no charge under our warranty." },
  { q: "Do you ship to the rest of Canada?", a: "Yes — every province. Beyond the free zone we quote real freight to your postal code in your written quote, with no handling markup. Combined kitchen orders ship far cheaper per cabinet than one or two boxes." },
];

export default function ShippingPage() {
  const cities = getCities();
  return (
    <div className="container py-12 max-w-3xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }} />
      <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">From London, Ontario to your door</p>
      <h1 className="text-4xl font-bold mb-4">Fast Cabinet Shipping &amp; Free Local Delivery</h1>
      <p className="text-lg text-ink-soft mb-8">
        We stock our White Shaker line in London, Ontario, so in-stock cabinets ship in about a week — and delivery is <strong>free within {site.freeDeliveryKm} km</strong>. Beyond that we ship to every province and confirm freight in your written quote.
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {[
          { t: "About 1 week", d: "In-stock cabinets leave the warehouse within about a week of confirmation." },
          { t: `Free within ${site.freeDeliveryKm} km`, d: "No delivery charge anywhere in the zone below, any order size." },
          { t: "Canada-wide", d: "Real freight rates to your postal code, no handling markup." },
        ].map((v) => (
          <div key={v.t} className="rounded-lg border border-border bg-white p-5">
            <p className="font-semibold mb-1">{v.t}</p>
            <p className="text-sm text-ink-soft">{v.d}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-3">Free delivery zone</h2>
      <p className="text-ink-soft mb-4">Every one of these communities is inside our {site.freeDeliveryKm} km free-delivery radius:</p>
      <ul className="flex flex-wrap gap-2 mb-6">
        {FREE_ZONE.map((c) => {
          const page = cities.find((x) => x.city === c || (c === "Kitchener" && x.slug === "kitchener-waterloo"));
          return (
            <li key={c}>
              {page ? (
                <Link href={`/kitchen-cabinets/${page.slug}`} className="rounded-full border border-accent bg-white px-3 py-1.5 text-sm font-medium text-accent hover:bg-accent hover:text-white">
                  {c}
                </Link>
              ) : (
                <span className="rounded-full border border-border bg-white px-3 py-1.5 text-sm">{c}</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="text-sm text-ink-soft mb-10">Not listed? If your address is within {site.freeDeliveryKm} km of London by road, it&rsquo;s free. Add your postal code to your quote request and we&rsquo;ll confirm.</p>

      <h2 className="text-2xl font-bold mb-3">Skip the assembly</h2>
      <p className="text-ink-soft mb-10">
        Add <Link href="/assembly-service" className="text-accent underline">expert assembly</Link> for ${site.assemblyPerCabinet} per cabinet and your kitchen arrives built, squared and ready to hang.
      </p>

      <FaqList faqs={FAQS} />
      <TrustStrip compact className="mt-10" />
    </div>
  );
}
