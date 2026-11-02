import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList } from "@/components/PageBlocks";
import { QuoteForm } from "@/components/QuoteForm";
import { photosByFile } from "@/lib/content";
import { REFERRAL_CODE, site } from "@/lib/site";

const TITLE = `A Neighbour Sent You ${site.referral.amount} Off Christmas Lights`;
const DESC = `You've been referred to ${site.name}. Get ${site.referral.amount} off professional Christmas light installation in London, Ontario and across the GTA.`;

// Personal links stay out of search; /refer is the page that ranks.
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  robots: { index: false, follow: true },
  alternates: { canonical: `${site.url}/refer` },
  openGraph: { title: TITLE, description: DESC, type: "website", images: [{ url: "/images/og-default.jpg" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

export default async function ReferredPage({ params }: { params: Promise<{ code: string }> }) {
  const { code: raw } = await params;
  const code = raw.toUpperCase();
  if (!REFERRAL_CODE.test(code)) notFound();
  const [photo] = photosByFile(["brick-home-warm-white-c9-roofline-three-car-garage-wet-driveway-01.jpg"]);

  return (
    <section className="section !pt-10">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-8">
        <div>
          <p className="eyebrow">You&rsquo;ve been referred</p>
          <h1 className="heading-display mt-3 text-4xl leading-[1.05] sm:text-5xl">A neighbour sent you {site.referral.amount} off your Christmas lights.</h1>
          <p className="mt-4 text-lg text-[color:var(--ink-soft)]">We design, supply, install, maintain and take down your lights. Send your address for a free quote, and your {site.referral.amount} comes off your install.</p>
          {photo && (
            <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 640px, 100vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" />
            </div>
          )}
          <div className="mt-6">
            <CheckList columns={2} items={["Packages from $700", "Commercial-grade LED lights", "Maintained all season", "January takedown"]} />
          </div>
          <p className="mt-6 text-[15px] text-[color:var(--ink-soft)]">Curious first? <Link href="/estimator" className="font-semibold underline">See a price range for your home</Link>.</p>
          <p className="mt-6 text-xs leading-relaxed text-[color:var(--ink-soft)]">{site.referral.terms}</p>
        </div>
        <QuoteForm
          variant="full"
          source="/refer"
          tag="REFERRED"
          hideType
          details={`Referral code: ${code}`}
          heading={`Claim your ${site.referral.amount} off`}
          subheading={`Referral code ${code} is applied. Reply within 24 hours.`}
          messageLabel="Your address, plus what you would like lit"
        />
      </div>
    </section>
  );
}
