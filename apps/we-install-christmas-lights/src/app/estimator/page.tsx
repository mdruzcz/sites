import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, FaqSection } from "@/components/PageBlocks";
import { PriceEstimator } from "@/components/PriceEstimator";
import { breadcrumbJsonLd, photosByFile } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = "Christmas Light Cost Estimator for Ontario Homes";
const DESC = "Estimate what Christmas light installation costs for your home in London, Ontario and across the GTA. Pick your home and roofline, see a price range in seconds.";
const URL = `${site.url}/estimator`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: [{ url: "/images/og-default.jpg" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQS = [
  { q: "How accurate is the estimate?", a: "It shows the range similar homes usually land in. Roof pitch, access and exact footage can move the final number, so we confirm a firm price from your address or a photo before anything is booked." },
  { q: "What does the price include?", a: "Custom design, commercial-grade LED lights supplied by us, installation, mid-season maintenance at no charge, and takedown in January." },
  { q: "Can I estimate a business or plaza here?", a: "This estimator is for homes. Commercial jobs depend on lift access, power and after-hours work, so we quote them from a site visit or your plans." },
  { q: "Do I have to give my contact details to see a price?", a: "No. The range updates as you choose, with no form to fill in. You only send your details if you want a firm quote." },
];

export default function EstimatorPage() {
  const [classic, festive, griswold] = photosByFile([
    "stone-bungalow-multicolour-c9-roofline-christmas-lights-01.jpg",
    "stone-home-warm-white-c9-roofline-large-wrapped-tree-01.jpg",
    "grand-estate-cool-white-christmas-tree-lights-symmetrical-01.jpg",
  ]);

  return (
    <>
      <script id="estimator-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Lighting Packages", path: "/lighting-packages" }, { name: "Cost Estimator" }])) }} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Lighting Packages", href: "/lighting-packages" }, { name: "Cost Estimator" }]} />
      <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <p className="eyebrow">Christmas light cost estimator</p>
        <h1 className="heading-display mt-3 text-4xl leading-[1.05] sm:text-5xl">What would Christmas lights cost on your home?</h1>
        <p className="mt-4 max-w-2xl text-lg text-[color:var(--ink-soft)]">Answer three quick questions for a price range, with no contact details needed. For a business or plaza, <Link href="/commercial-christmas-lighting" className="font-semibold underline">see commercial lighting</Link>.</p>
      </section>
      <PriceEstimator tierPhotos={{ Classic: classic, Festive: festive, Griswold: griswold }} />
      <FaqSection faqs={FAQS} title="About the estimate" id="estimator-faq" />
    </>
  );
}
