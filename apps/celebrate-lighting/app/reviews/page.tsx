import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { getTestimonials } from "@/lib/content";
import { JsonLd, breadcrumbSchema, reviewsSchema } from "@/lib/jsonld";
import { Icon } from "@/components/Icons";
import { Breadcrumbs } from "@/components/ui";
import { BookCta } from "@/components/sections";

export const revalidate = 3600;

const title = "Reviews: What Homeowners Say About Celebrate Lighting";
const description = "Read reviews from Celebrate Lighting customers across London, Brantford, Tillsonburg and Southwestern Ontario on permanent LED lighting installation, app control and warranty service.";

export const metadata: Metadata = {
  title: { absolute: `${title} | ${site.name}` },
  description,
  alternates: { canonical: "/reviews" },
  openGraph: { title: `${title} | ${site.name}`, description, url: `${site.url}/reviews`, images: [{ url: "/images/gallery/cool-white-permanent-roofline-lights-stone-home-wraparound-porch.jpg", alt: "Celebrate Lighting reviews" }] },
  twitter: { card: "summary_large_image", title, description },
};

export default function ReviewsPage() {
  const reviews = getTestimonials();
  return (
    <>
      <JsonLd data={[reviewsSchema(reviews), breadcrumbSchema([{ name: "Home", url: site.url }, { name: "Reviews", url: `${site.url}/reviews` }])]} />
      <section className="section !pb-10" style={{ background: "var(--surface)" }}>
        <div className="wrap">
          <Breadcrumbs items={[{ name: "Reviews" }]} />
          <div className="mt-6 max-w-3xl">
            <span className="pill mb-4">Testimonials</span>
            <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] text-white text-balance">What Our Clients Say</h1>
            <p className="mt-5 text-lg text-[#d6deea] leading-relaxed">Homeowners across Southwestern Ontario on the demo, the install and how the lights have held up.</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ background: "var(--bg)" }}>
        <div className="wrap grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((t) => (
            <figure key={t.author + t.location} className="card card-static p-6 flex flex-col">
              <div className="flex gap-0.5 text-[var(--gold)] mb-3" aria-label={`${t.rating} out of 5 stars`}>{Array.from({ length: t.rating }).map((_, i) => <Icon.Star key={i} width={16} height={16} />)}</div>
              <blockquote className="text-[#e3e9f2] leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-sm"><span className="font-bold text-white">{t.author}</span> <span className="text-[var(--muted)]">· {t.location}</span></figcaption>
            </figure>
          ))}
        </div>
        <div className="wrap mt-10 text-center text-sm text-[var(--muted)]">Had us out? We’d love to hear how it went. <a href={site.emailHref} className="text-[var(--accent)] underline underline-offset-2">Send us a note</a> or <Link href="/gallery" className="text-[var(--accent)] underline underline-offset-2">see the work</Link>.</div>
      </section>
      <BookCta />
    </>
  );
}
