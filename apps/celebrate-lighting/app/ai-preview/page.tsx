import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { getPhoto } from "@/lib/content";
import { JsonLd, breadcrumbSchema, faqSchema, howToSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, FaqList, FeatureGrid, SectionHeading } from "@/components/ui";
import { AiPreviewForm } from "@/components/AiPreviewForm";
import { Testimonials } from "@/components/sections";

export const revalidate = 3600;

const title = "Free AI Home Preview: See Permanent Lights on Your House";
const description = "Upload one photo of your home and get a free AI-generated preview of it with permanent roofline lighting, emailed within 1 business day. No obligation. Southwestern Ontario.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/ai-preview" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/ai-preview`, images: [{ url: "/images/gallery/rainbow-permanent-roofline-lights-brick-home-garage-gable.jpg", alt: "Permanent roofline lighting preview" }] },
  twitter: { card: "summary_large_image", title, description },
};

const faqs = [
  { question: "What kind of photo works best?", answer: "Stand across the street and get the whole front of the house in frame, roofline included, with the camera level. Daytime or dusk both work. Avoid heavy zoom, strong angles and photos taken from directly below." },
  { question: "How long does the preview take?", answer: `We email your preview ${site.aiPreview.turnaround}. If your photo is unclear we'll reply with a quick tip and ask for another.` },
  { question: "Is the AI preview accurate to what I'd get?", answer: "It's a realistic visual of where the track would run and how a colour scene reads on your home. The free on-site demo is the real thing: we mount a live sample on your house and light it at night before you commit." },
  { question: "What do you do with my photo?", answer: "We use it only to build your preview and keep it on file with your request so we can reference it at the demo. It's never published or shared." },
  { question: "Does it cost anything or commit me to anything?", answer: "No. The preview is free, the demo is free, and you decide on your own timeline." },
  { question: "Can I request a specific colour?", answer: "Yes. Pick warm white, cool white, multicolour, red and green, team colours, or let us choose. We can send a second scene if you'd like to compare." },
];

export default function AiPreviewPage() {
  const hero = getPhoto("rainbow-permanent-roofline-lights-brick-home-garage-gable");
  const same = ["warm-white-permanent-roofline-lights-brick-home-garage-gable", "cool-white-permanent-roofline-lights-brick-home-garage-gable", "purple-and-teal-permanent-roofline-lights-brick-home-garage-gable", "rainbow-permanent-roofline-lights-brick-home-garage-gable"].map(getPhoto);
  return (
    <>
      <JsonLd data={[
        webPageSchema({ name: title, description, url: `${site.url}/ai-preview` }),
        howToSchema({ name: "How to get a free AI lighting preview of your home", description, steps: [{ name: "Take a photo", text: "Photograph the front of your home from across the street with the whole roofline in frame." }, { name: "Upload it", text: "Add the photo, your contact details and the colour you'd like to see." }, { name: "Receive your preview", text: `We email an AI preview of your home with permanent lighting ${site.aiPreview.turnaround}.` }] }),
        faqSchema(faqs),
        breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Free AI Home Preview", url: `${site.url}/ai-preview` }]),
      ]} />
      <section className="relative overflow-hidden on-photo" style={{ background: "var(--deep)" }}>
        <div className="absolute inset-0"><Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" placeholder="blur" blurDataURL={hero.blurDataURL} className="object-cover" /><div className="absolute inset-0 night-veil" /></div>
        <div className="wrap relative py-14 md:py-20 lg:py-24">
          <Breadcrumbs items={[{ name: "Free AI Home Preview" }]} />
          <div className="mt-6 grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
            <div>
              <span className="pill mb-4"><Icon.Sparkle width={14} height={14} /> Free · No obligation</span>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.3rem] leading-[1.05] text-ink text-balance">See Your Home Lit Up <span className="text-[var(--accent-ink)]">Before You Decide</span></h1>
              <p className="mt-5 text-lg text-body leading-relaxed">{site.aiPreview.detail}</p>
              <ol className="mt-7 space-y-4">
                {[["Take a photo", "From across the street, whole roofline in frame, camera level."], ["Upload it here", "30 seconds. Tell us the colour you're picturing, or let us choose."], ["Get your preview by email", `Delivered ${site.aiPreview.turnaround}. Then book the free on-site demo to see it for real.`]].map(([t, b], i) => (
                  <li key={t} className="flex gap-4"><span className="timeline-dot shrink-0 !shadow-none">{i + 1}</span><div><p className="font-bold text-ink">{t}</p><p className="text-sm text-body">{b}</p></div></li>
                ))}
              </ol>
            </div>
            <div className="card-light p-5 sm:p-7">
              <h2 className="text-xl font-bold text-ink">Upload your photo</h2>
              <p className="text-sm text-[var(--muted)] mt-1 mb-5">We’ll email your preview {site.aiPreview.turnaround}.</p>
              <AiPreviewForm formId="page" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="One house, four scenes" title="What a Preview Shows You" sub="The same home in the scenes homeowners run most. Your preview comes back in the colour you ask for." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {same.map((p) => (<div key={p.src} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)]"><Image src={p.src} alt={p.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" placeholder="blur" blurDataURL={p.blurDataURL} className="object-cover" /><span className="absolute left-3 bottom-3 pill pill-white !text-[0.62rem] !py-1">{p.colour}</span></div>))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <SectionHeading eyebrow="Tips for a great photo" title="Get the Best Preview" />
          <FeatureGrid items={[
            { icon: <Icon.Camera />, title: "Shoot from the street", body: "Stand across the road so the whole front elevation and roofline fit in one frame." },
            { icon: <Icon.Home />, title: "Keep it level", body: "Hold the phone straight, not tilted up. Straight lines help us trace the roofline accurately." },
            { icon: <Icon.Eye />, title: "Day or dusk", body: "Both work. Dusk shots give the most realistic night preview; daytime shots show the house clearly." },
            { icon: <Icon.Palette />, title: "Tell us the colour", body: "Warm white, cool white, multicolour, red and green, team colours, or leave it to us." },
          ]} />
        </div>
      </section>

      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1fr_1.4fr] gap-10"><div><span className="pill mb-4">FAQ</span><h2 className="font-display text-3xl text-ink leading-tight">About the AI preview</h2><p className="mt-3 text-[var(--muted)]">Prefer to see it for real? <Link href="/contact" className="text-[var(--accent-ink)] underline underline-offset-2">Book the free on-site demo</Link>.</p></div><FaqList items={faqs} name="ai-faq" /></div>
      </section>

      <Testimonials />
    </>
  );
}
