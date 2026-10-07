import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getServiceLines } from "@/lib/content";
import { JsonLd, breadcrumbSchema, howToSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { ProcessTimeline, ClosingForm, SplitFeature } from "@/components/sections";

export const revalidate = 3600;

const title = "Our Process: From Free Demo to Lights-On";
const description = "How a Celebrate Lighting install works in Southwestern Ontario: free on-site demo with a live sample, itemized quote, one-to-two-day installation, app setup and lifetime support.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/our-process" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/our-process`, images: [{ url: "/images/gallery/daytime-colour-matched-permanent-light-track-in-white-soffit.jpg", alt: "Our installation process" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function ProcessPage() {
  const [perm, seas] = getServiceLines();
  return (
    <>
      <JsonLd data={[howToSchema({ name: "How permanent lighting is installed by Celebrate Lighting", description, steps: perm.steps.map((s) => ({ name: s.title, text: s.desc })) }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Our Process", url: `${site.url}/our-process` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Our Process" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">How it works</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">From Free Demo to Lights-On</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">No pressure, no surprises. Here’s exactly what happens from your first call to the night the whole house lights up.</p>
          </div>
        </div>
      </section>
      <ProcessTimeline steps={perm.steps} title="Permanent Lighting" sub="Usually inside two weeks from first call to lights-on." />
      <SplitFeature eyebrow="Step two, the free part" title={<>The On-Site Demo Is <span className="text-[var(--accent)]">Where You Decide</span></>} body={site.demo.detail} bullets={[{ icon: <Icon.Ruler width={18} height={18} />, label: "Rooflines measured" }, { icon: <Icon.Palette width={18} height={18} />, label: "Soffit colour-matched" }, { icon: <Icon.Lamp width={18} height={18} />, label: "Live sample mounted and lit" }, { icon: <Icon.Check width={18} height={18} />, label: "Itemized quote before we leave" }]} photoNeedle="teal-permanent-soffit-lights-close-up-grey-siding" cta={{ label: "Book my free demo", href: "/contact" }} />
      <ProcessTimeline steps={seas.steps} gold title="Seasonal C9 Lighting" sub="Book, measure, install in the fall, takedown in January." />
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap text-center max-w-2xl mx-auto"><SectionHeading eyebrow="Start even earlier" title="Not Ready for a Visit? Try the AI Preview." sub="Upload one photo and see your home lit before anyone comes out." /><Link href="/ai-preview" className="btn btn-outline">How the AI preview works <Icon.Arrow width={16} height={16} /></Link></div>
      </section>
      <ClosingForm />
    </>
  );
}
