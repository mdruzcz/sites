import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { FaqList } from "@/components/ArticleBody";
import { JsonLd, breadcrumbSchema, faqSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { PICKS } from "@/lib/photos";

export const revalidate = 3600;
const TITLE = "Free Retaining Wall Quote London Ontario | Contact Us";
const DESC = "Request a free retaining wall quote in London, Ontario. Kyle replies within one business day, walks the site and gives a written price. Call 519-914-1908.";
export const metadata: Metadata = { title: TITLE, description: DESC, alternates: { canonical: `${site.url}/contact-us` }, openGraph: { title: TITLE, description: DESC, url: `${site.url}/contact-us`, images: [{ url: PICKS.contact.image, alt: PICKS.contact.alt }] }, twitter: { card: "summary_large_image", title: TITLE, description: DESC } };

const faqs = [
  { q: "What happens after I send the form?", a: "Kyle reads it, usually the same day, and calls or emails to ask a couple of questions and book a site visit. Most site visits happen within a few days. You get a written quote within a day of the visit." },
  { q: "What should I include in the message?", a: "Rough length and height of the wall, what is above and below it (driveway, fence, patio, lawn), whether an existing wall is failing, and the town. Photos help a lot; you can text them after we call." },
  { q: "Is the quote really free and is there any obligation?", a: "Yes and no obligation. The quote is broken into line items so you can compare it with other bids properly." },
  { q: "Do you quote small jobs?", a: "Yes. Garden walls and short repairs are welcome. We schedule them between larger builds so they do not wait long." },
  { q: "How far do you travel?", a: "About 40 minutes from London in any direction, which covers St. Thomas, Woodstock, Strathroy, Brantford and the towns and rural properties in between. See the full list of service areas." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Contact", href: "/contact-us" }])} />
      <JsonLd data={faqSchema(faqs)} />
      <PageHero photo={PICKS.contact} kicker="Contact" title="Get a free retaining wall quote" intro="Send the form or call. Kyle replies within one business day and books a site visit, then you get a written line-item quote." crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact-us" }]} compact>
        <div className="mt-8 flex flex-wrap gap-3"><a href={site.phoneHref} className="btn btn-accent">Call {site.phone}</a><a href="#quote" className="btn btn-paper">Use the form</a></div>
      </PageHero>
      <section className="section bg-paper">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="kicker">Reach us</p>
            <h2 className="display mt-3 text-3xl">Talk to the person who builds it</h2>
            <dl className="mt-8 space-y-6 text-[16px]">
              <div><dt className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-stone">Phone</dt><dd className="mt-1"><a href={site.phoneHref} className="font-display text-2xl font-extrabold hover:text-accent-2">{site.phone}</a></dd></div>
              <div><dt className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-stone">Email</dt><dd className="mt-1"><a href={`mailto:${site.email}`} className="font-semibold hover:text-accent-2">{site.email}</a></dd></div>
              <div><dt className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-stone">Hours</dt><dd className="mt-1 text-ink-2">{site.hours}</dd></div>
              <div><dt className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-stone">Based in</dt><dd className="mt-1 text-ink-2">London, Ontario. Serving <Link href="/service-areas" className="font-semibold text-accent-2 underline underline-offset-4">12 communities</Link> across Middlesex, Elgin, Oxford and Brant counties.</dd></div>
            </dl>
            <div className="mt-10 border border-[var(--line)] bg-white p-5">
              <p className="kicker">Before you call, it helps to know</p>
              <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
                {["Approximate length and height of the wall", "What sits above it and below it", "Whether an existing wall is leaning, bulging or stepping apart", "Whether an excavator can reach the spot"].map((t) => <li key={t} className="flex gap-3"><span className="mt-2.5 h-[3px] w-4 shrink-0 bg-accent" aria-hidden />{t}</li>)}
              </ul>
            </div>
          </div>
          <div id="quote" className="scroll-mt-28 border border-[var(--line)] bg-white p-6 md:p-8">
            <p className="font-display text-2xl font-extrabold uppercase tracking-tight">Request a free quote</p>
            <p className="mt-1 text-[14px] text-stone">Written, line-item, no obligation.</p>
            <div className="mt-5"><QuoteForm source="contact-page" /></div>
          </div>
        </div>
      </section>
      <section className="border-t border-[var(--line)] bg-white"><div className="container-x max-w-4xl py-14"><FaqList faqs={faqs} title="What to expect" /></div></section>
    </>
  );
}
