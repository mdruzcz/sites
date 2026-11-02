import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, CheckList } from "@/components/PageBlocks";
import { QuoteForm } from "@/components/QuoteForm";
import { breadcrumbJsonLd } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Rebook Last Year's Christmas Lights, Same Price";
const DESC = "Had us install your Christmas lights in London, Ontario or the GTA last year? Rebook the same design at your saved price. No new quote or site visit needed.";
const URL = `${site.url}/rebook`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: [{ url: "/images/og-default.jpg" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const STEPS = [
  ["Send your details", "Your name, phone and the address we lit. That is all we need."],
  ["We pull up your file", "We find last year's design and what you paid, then text you the saved price."],
  ["Confirm your date", "Say yes and pick an install window. Nothing is booked until you confirm."],
];

export default function RebookPage() {
  return (
    <>
      <script id="rebook-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Rebook" }])) }} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Rebook last year's design" }]} />
      <section className="section !pt-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-start lg:px-8">
          <div>
            <p className="eyebrow">For returning customers</p>
            <h1 className="heading-display mt-3 text-4xl leading-[1.05] sm:text-5xl">Same design as last year, at your saved price.</h1>
            <p className="mt-4 text-lg text-[color:var(--ink-soft)]">Loved your lights last season? Skip the new quote. We already know your roofline, so rebooking takes about a minute.</p>
            <ol className="mt-8 space-y-5">
              {STEPS.map(([t, b], i) => (
                <li key={t} className="flex gap-4">
                  <span className="heading-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:var(--brand-red)] text-white">{i + 1}</span>
                  <div>
                    <h2 className="text-[17px] font-bold text-[color:var(--ink-strong)]">{t}</h2>
                    <p className="mt-1 text-[15px] leading-relaxed text-[color:var(--ink-soft)]">{b}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <CheckList columns={1} items={["Lights supplied, installed and maintained", "January takedown", "Want to add a tree or a wreath? Tell us and we will price just the extra"]} />
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[color:var(--ink-soft)]">{site.rebook.terms}</p>
            <p className="mt-6 text-[15px] text-[color:var(--ink-soft)]">Know a neighbour who keeps asking about your lights? <Link href="/refer" className="font-semibold underline">Refer them and you both get {site.referral.amount} off</Link>.</p>
          </div>
          <QuoteForm
            variant="full"
            source="/rebook"
            tag="REBOOK"
            hideType
            fixedService="Same design as last year"
            heading="Rebook my lights"
            subheading="We reply within 24 hours with your saved price."
            messageLabel="The address we lit, plus any changes you would like"
            submitLabel="Rebook my design"
            successBody="We will pull up last year's design and text you your saved price within 24 hours."
          />
        </div>
      </section>
    </>
  );
}
