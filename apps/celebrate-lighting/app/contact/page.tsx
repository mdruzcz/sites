import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema, localBusinessSchema, webPageSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, IconTile } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { AiPreviewButton } from "@/components/AiPreviewProvider";

export const revalidate = 3600;

const title = "Contact Us: Book a Free Demo or Get a Quote";
const description = "Book your free on-site permanent lighting demo, request a seasonal C9 quote, or ask a question. Call 519-266-6796 or send the form. We reply within 24 hours across Southwestern Ontario.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/contact`, images: [{ url: "/images/gallery/warm-white-permanent-roofline-lights-two-storey-home-covered-porch.jpg", alt: "Contact Celebrate Lighting" }] },
  twitter: { card: "summary_large_image", title, description },
};

const SERVICE_MAP: Record<string, string> = {
  commercial: "Commercial / Municipal Lighting",
  seasonal: "Seasonal C9 Christmas Lights",
  "repair-service": "Repair or Service on an Existing System",
  maintenance: "Repair or Service on an Existing System",
  "new-installation": "Permanent Lighting — Free On-Site Demo",
  consultation: "Permanent Lighting — Free On-Site Demo",
  "replace-existing-lights": "Permanent Lighting — Free On-Site Demo",
  "ai-preview": "Free AI Home Preview",
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const defaultService = service ? SERVICE_MAP[service] ?? "" : "";
  return (
    <>
      <JsonLd data={[localBusinessSchema(), webPageSchema({ name: title, description, url: `${site.url}/contact` }), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Contact", url: `${site.url}/contact` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Contact" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Get in touch</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">Contact Celebrate Lighting</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">Book a free on-site demo, request a seasonal quote, or just ask a question. We reply to everything within 24 hours.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-[1.4fr_1fr] gap-10">
          <div className="card card-static p-6 md:p-8">
            <h2 className="font-bold text-2xl text-white">Send a request</h2>
            <p className="text-sm text-[var(--muted)] mt-1 mb-6 flex flex-wrap gap-x-4 gap-y-1"><span>✓ Free estimate</span><span>✓ 24-hour response</span><span>✓ No obligation</span></p>
            <ContactForm defaultService={defaultService} />
          </div>
          <aside className="space-y-4">
            {[
              { icon: <Icon.Phone />, title: "Call us", body: site.phone, sub: site.hoursShort, href: site.phoneHref },
              { icon: <Icon.App />, title: "Text us", body: site.phone, sub: "Quick replies during business hours", href: site.smsHref },
              { icon: <Icon.Mail />, title: "Email us", body: site.email, sub: "We respond within 24 hours", href: site.emailHref },
            ].map((c) => (
              <a key={c.title} href={c.href} className="card card-lift p-5 flex items-center gap-4">
                <IconTile className="shrink-0">{c.icon}</IconTile>
                <div><p className="text-xs uppercase tracking-wide text-[var(--muted)]">{c.title}</p><p className="font-bold text-white">{c.body}</p><p className="text-xs text-[var(--muted)]">{c.sub}</p></div>
              </a>
            ))}
            <div className="card card-static p-5">
              <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">Visit or mail</p>
              <p className="font-bold text-white">{site.address.street}</p>
              <p className="text-sm text-[#d6deea]">{site.address.city}, {site.address.region} {site.address.postal}</p>
              <div className="hairline my-4" />
              <p className="text-xs uppercase tracking-wide text-[var(--muted)] mb-2">Business hours</p>
              <ul className="text-sm text-[#d6deea] space-y-1">{site.hoursDetailed.map((h) => <li key={h.day} className="flex justify-between gap-4"><span>{h.day}</span><span className="text-white font-semibold">{h.hours}</span></li>)}</ul>
            </div>
            <div className="card card-static p-5">
              <IconTile className="mb-3"><Icon.Sparkle /></IconTile>
              <p className="font-bold text-white">Not ready to talk yet?</p>
              <p className="text-sm text-[var(--muted)] mt-1 mb-3">Upload a photo and get a free AI preview of your home with permanent lighting.</p>
              <AiPreviewButton className="btn btn-outline btn-sm w-full" />
            </div>
          </aside>
        </div>
      </section>
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl text-white">Have questions first?</h2>
          <p className="mt-3 text-[var(--muted)]">Pricing, installation, warranty, the demo, the AI preview and what happens in a Southwestern Ontario winter.</p>
          <Link href="/faq" className="btn btn-outline mt-6">Read the FAQ <Icon.Arrow width={16} height={16} /></Link>
        </div>
      </section>
    </>
  );
}
