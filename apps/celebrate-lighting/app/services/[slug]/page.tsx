import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { getServices, getServiceBySlug, getCities, getPhoto, getServiceLine } from "@/lib/content";
import { JsonLd, breadcrumbSchema, serviceSchema, faqSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs, CityChips, CheckList, FaqList, SectionHeading } from "@/components/ui";
import { ClosingForm, ProcessTimeline } from "@/components/sections";

export const revalidate = 3600;

export async function generateStaticParams() {
  return getServices().map((s) => ({ slug: s.slug }));
}

const META: Record<string, { title: string; description: string }> = {
  "new-installation": { title: "Permanent LED Lighting Installation", description: "Professional permanent LED track installation across Southwestern Ontario. Colour-matched to your soffit, app-controlled, lifetime warranty. Free on-site demo before you pay." },
  "repair-service": { title: "Permanent Lighting Repair, Any Brand", description: "Permanent outdoor lighting not working? We repair all major brands across Southwestern Ontario: dead sections, controllers, wiring and app connectivity. Most fixes same day." },
  consultation: { title: "Free Lighting Consultation & On-Site Demo", description: "A free, no-pressure lighting consultation at your Southwestern Ontario home: measurements, colour matching, a live sample lit on your house and an itemized quote." },
  maintenance: { title: "Permanent Lighting Maintenance Plans", description: "Annual inspection, cleaning, firmware and connection checks for permanent lighting systems across Southwestern Ontario. Keep your roofline lights performing like new." },
  "replace-existing-lights": { title: "Upgrade or Replace Permanent Lights", description: "Replace an older permanent lighting system with modern colour-matched LED track, 16M+ colours and app control. Clean removal, reuse of wiring where possible, Southwestern Ontario." },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const m = META[slug] ?? { title: service.title, description: service.shortDescription };
  return {
    title: { absolute: `${m.title} | ${site.name}` },
    description: m.description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${m.title} | ${site.name}`, description: m.description, url: `${site.url}/services/${slug}`, images: [{ url: "/images/gallery/teal-permanent-soffit-lights-close-up-grey-siding.jpg", alt: service.title }] },
    twitter: { card: "summary_large_image", title: m.title, description: m.description },
  };
}

const FAQS: Record<string, { question: string; answer: string }[]> = {
  "new-installation": [
    { question: "How long does a permanent lighting install take?", answer: "Most homes take one to two days from start to lights-on. Larger properties with several storeys or long perimeters can take a little longer. We confirm the schedule at your demo." },
    { question: "Does installation damage my roof or soffit?", answer: "No. Track clips into the soffit or fascia channel. Nothing is screwed through shingles and nothing is glued to the siding." },
    { question: "Is the on-site demo really free?", answer: "Yes. We measure, colour-match and mount a live sample section on your house, light it at night, and leave you an itemized quote. No cost, no obligation." },
  ],
  "repair-service": [
    { question: "Do you repair permanent lighting that someone else installed?", answer: "Yes. We work on all major brands of permanent track lighting: dead sections, failed controllers, wiring faults, water ingress and app connectivity. Most repairs are completed in a single visit." },
    { question: "What does a repair visit cost?", answer: "We quote a diagnostic visit up front and tell you the repair cost before any work starts. Celebrate Lighting installs are covered by our lifetime warranty at no charge." },
    { question: "A section of my lights is a different colour or flickering. Is that fixable?", answer: "Usually, yes. Colour drift and flicker are typically a failed LED module or a data connection issue in the run, both of which we can replace or reseat on site." },
  ],
  consultation: [
    { question: "What happens during the consultation?", answer: site.demo.detail },
    { question: "Do I need to be home at night?", answer: "The demo shows best after dark, so we schedule evenings when we can. If that doesn't work, we can mount the sample during the day and you can view it that evening." },
    { question: "Is there any pressure to sign?", answer: "None. You get an itemized quote before we leave and decide on your own timeline." },
  ],
  maintenance: [
    { question: "Does permanent lighting need maintenance?", answer: "Very little. The optional annual plan covers a system inspection, cleaning of the track and fixtures, connection and waterproofing checks and firmware updates, so small issues never become big ones." },
    { question: "Is maintenance required to keep the warranty?", answer: "No. The lifetime warranty on parts, hardware and workmanship applies either way. Maintenance is for owners who want the system checked every year." },
    { question: "Can I book a one-off check before the holidays?", answer: "Yes. A pre-season check in October or November is the most common booking. Contact us and we'll schedule it before the rush." },
  ],
  "replace-existing-lights": [
    { question: "Can you reuse my existing wiring?", answer: "Often, yes. If the existing cable runs and power location are sound, we reuse them, which lowers cost and shortens the install." },
    { question: "What's the benefit of upgrading?", answer: "Modern individually addressable RGBW LEDs, 16 million colours, true warm white, app control with scenes and schedules, better weather sealing and a lifetime warranty on the new system." },
    { question: "Do you remove the old system?", answer: "Yes. We take the old track and fixtures down cleanly and dispose of them, then install the new system in a matching colour." },
  ],
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();
  const cities = getCities();
  const line = getServiceLine("permanent-lighting")!;
  const faqs = FAQS[slug] ?? [];
  const photo = getPhoto(slug === "repair-service" || slug === "maintenance" ? "teal-permanent-soffit-lights-close-up-grey-siding" : "daytime-colour-matched-permanent-light-track-in-white-soffit");
  const m = META[slug];
  return (
    <>
      <JsonLd data={[serviceSchema(service), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Services", url: `${site.url}/services` }, { name: service.title, url: `${site.url}/services/${slug}` }]), faqSchema(faqs)]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Services", href: "/services" }, { name: service.title }]} />
          <div className="mt-6 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
            <div>
              <span className="pill mb-4">Permanent lighting service</span>
              <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-ink text-balance">{m?.title ?? service.title}</h1>
              <p className="mt-5 text-lg text-body leading-relaxed">{service.fullDescription}</p>
              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link href={`/contact?service=${slug}`} className="btn btn-primary btn-lg">{slug === "new-installation" || slug === "consultation" ? site.demo.ctaLong : `Book ${service.title.toLowerCase()}`} <Icon.Arrow width={18} height={18} /></Link>
                <a href={site.phoneHref} className="btn btn-outline btn-lg"><Icon.Phone width={18} height={18} /> {site.phone}</a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-[var(--border)]"><Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" placeholder="blur" blurDataURL={photo.blurDataURL} className="object-cover" /></div>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid lg:grid-cols-2 gap-10">
          <div className="card card-static p-6 md:p-8"><h2 className="font-bold text-2xl text-ink mb-4">What’s included</h2><CheckList items={service.features} /></div>
          <div><SectionHeading eyebrow="FAQ" title={`${service.title} questions`} align="left" /><FaqList items={faqs} name={`${slug}-faq`} /></div>
        </div>
      </section>
      <ProcessTimeline steps={line.steps} title="How It Works" />
      <section className="section" style={{ background: "var(--surface)" }}>
        <div className="wrap"><SectionHeading eyebrow="Available in" title={`${service.title} by City`} align="left" /><CityChips cities={cities} basePath={`/services/${slug}`} /></div>
      </section>
      <ClosingForm formProps={{ serviceValue: service.title }} />
    </>
  );
}
