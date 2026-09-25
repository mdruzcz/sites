import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { KITCHEN_SALE } from "@/lib/sale";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About RTA Cabinets Canada",
  description:
    "RTA Cabinets Canada is a London, Ontario supplier of premium White Shaker ready-to-assemble kitchen cabinets: plywood boxes, soft-close hardware, free delivery within 300 km and shipping across Canada.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About RTA Cabinets Canada",
    description: "London, Ontario supplier of premium White Shaker RTA cabinets, delivered free within 300 km and shipped across Canada.",
    images: ["/images/gallery/white-shaker-kitchen-2.webp"],
  },
  twitter: { card: "summary_large_image", title: "About RTA Cabinets Canada", description: "London, Ontario supplier of premium White Shaker RTA cabinets." },
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${site.name}`,
    url: `${site.url}/about`,
    mainEntity: { "@type": "Store", name: site.name, url: site.url, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: "ON", addressCountry: "CA" } },
  };
  return (
    <div className="container py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-3">London, Ontario</p>
          <h1 className="text-4xl font-bold mb-6">About {site.name}</h1>
          <div className="space-y-5 text-ink-soft leading-relaxed">
            <p>
              {site.name} makes a beautiful, durable kitchen affordable for every Canadian home. We specialize in one thing and do it well: premium <strong>White Shaker</strong> ready-to-assemble (RTA) cabinets — the timeless look that suits modern, transitional and classic kitchens alike.
            </p>
            <p>
              We import container loads directly to our warehouse in London, Ontario and sell online, so there is no showroom overhead, no distributor in the middle and no US-dollar pricing to convert. That is how we can offer solid hardwood doors, ¾″ plywood boxes and soft-close hardware at prices that are usually 20–40% below the big-box and US “RTA” stores once you land them in Canada — and back it with a <Link href="/lowest-price-guarantee" className="text-accent underline">lowest price guarantee</Link>.
            </p>
            <p>
              Because we stock locally, delivery is <strong>free within {site.freeDeliveryKm} km</strong> — London, Kitchener-Waterloo, Cambridge, Guelph, Hamilton, Brantford, Woodstock, St. Thomas, Stratford, Sarnia and most of Southwestern Ontario — and in-stock cabinets ship in about a week. Beyond that we ship to every province.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border bg-sand">
          <Image src="/images/gallery/white-shaker-kitchen-2.webp" alt="White Shaker RTA kitchen supplied by RTA Cabinets Canada, London Ontario" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>
      </div>

      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold mb-3">What you get</h2>
        <div className="space-y-4 text-ink-soft leading-relaxed mb-10">
          <p>
            Every cabinet has a solid hardwood face frame and five-piece hardwood door, a grade-A ¾″ plywood box with a full plywood back, concealed soft-close European hinges, and undermount full-extension soft-close drawer glides. Doors and drawer fronts are finished in the same multi-step painted white so colour is consistent from box to box. It all carries a <Link href="/warranty" className="text-accent underline">limited lifetime warranty</Link>.
          </p>
          <p>
            Cabinets ship flat-packed with cam-lock hardware — most assemble in 10–15 minutes each. If you would rather not, tick <Link href="/assembly-service" className="text-accent underline">“Assemble my cabinets”</Link> in your quote list and we build them for ${site.assemblyPerCabinet} each before delivery.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-3">How we sell</h2>
        <div className="space-y-4 text-ink-soft leading-relaxed mb-10">
          <p>
            We don&rsquo;t take payment on the website. Browse individual cabinets, design your kitchen in the free <Link href="/planner" className="text-accent underline">3D planner</Link>, or start from a 10×10, 10×12 or 12×12 <Link href="/kitchen-packages" className="text-accent underline">package</Link>. Add what you need to your quote list and a real person reviews it — catching the missing filler or the corner that won&rsquo;t work — then emails a written quote with taxes and delivery, usually within one business day. No pressure, no obligation.
          </p>
          <p>
            Complete kitchens are {KITCHEN_SALE.pct}% off, overstocked cabinets carry 10–15% sale tags, and <Link href="/financing" className="text-accent underline">0% APR financing</Link> is available on approved credit. Stock counts on the site come straight from our warehouse and are refreshed monthly, so what you see is what we can ship.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mt-10">
          {[
            { t: "Solid Construction", d: "Hardwood doors & frames, plywood boxes, soft-close everything." },
            { t: "Local Stock, Free Delivery", d: `Stocked in London, ON. Free delivery within ${site.freeDeliveryKm} km; shipped Canada-wide.` },
            { t: "Quote-Based", d: "Transparent written pricing in Canadian dollars, reviewed by a person." },
          ].map((v) => (
            <div key={v.t} className="bg-white border border-border rounded-lg p-5">
              <h3 className="font-semibold mb-1">{v.t}</h3>
              <p className="text-sm text-ink-soft">{v.d}</p>
            </div>
          ))}
        </div>

        <TrustStrip compact className="mt-10" />

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href="/shop" className="bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center">
            Start Shopping
          </Link>
          <Link href="/contact" className="border border-accent text-accent px-8 py-3 rounded-md font-medium inline-flex min-h-[48px] items-center hover:bg-cream">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
