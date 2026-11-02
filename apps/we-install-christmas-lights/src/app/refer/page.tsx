import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/PageBlocks";
import { ReferForm } from "@/components/ReferForm";
import { breadcrumbJsonLd } from "@/lib/content";
import { site } from "@/lib/site";

export const revalidate = 3600;

const TITLE = `Refer a Neighbour, You Both Get ${site.referral.amount} Off`;
const DESC = `Know someone in London, Ontario or the GTA who loves your Christmas lights? Share your personal link. When they book an install, you each get ${site.referral.amount} off.`;
const URL = `${site.url}/refer`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESC,
  alternates: { canonical: URL },
  openGraph: { title: TITLE, description: DESC, url: URL, type: "website", images: [{ url: "/images/og-default.jpg" }] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const STEPS = [
  ["Get your link", "Tell us who you are. You get a personal link in seconds."],
  ["Share it", "Text it to neighbours, friends or family. There is no limit."],
  [`You both save ${site.referral.amount}`, "They get it off their install. You get it off your next one."],
];

export default function ReferPage() {
  return (
    <>
      <script id="refer-breadcrumbs" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(site.url, [{ name: "Home", path: "/" }, { name: "Refer a Neighbour" }])) }} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Refer a neighbour" }]} />
      <section className="section !pt-8">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:px-8">
          <div>
            <p className="eyebrow">Refer a neighbour</p>
            <h1 className="heading-display mt-3 text-4xl leading-[1.05] sm:text-5xl">Your lights got them asking? You both get {site.referral.amount} off.</h1>
            <p className="mt-4 text-lg text-[color:var(--ink-soft)]">The best thing we hear is &ldquo;who did your lights?&rdquo; Next time, send them your link.</p>
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
            <p className="mt-8 text-xs leading-relaxed text-[color:var(--ink-soft)]">{site.referral.terms}</p>
          </div>
          <ReferForm />
        </div>
      </section>
    </>
  );
}
