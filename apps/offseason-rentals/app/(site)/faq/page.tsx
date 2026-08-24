import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { faqs, renterFaqs, ownerFaqs } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "Off-Season Rental Questions — Port Stanley, Ontario";
const DESCRIPTION =
  "Answers on Port Stanley off-season rentals: minimum stays, what utilities are included, pets, winter in the village, and how owners list a property.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/faq`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

function FaqList({ items, title, id }: { items: typeof faqs; title: string; id: string }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-[24px] sm:text-[30px] font-bold">{title}</h2>
      <div className="mt-6 divide-y" style={{ borderColor: "var(--line-soft)" }}>
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer items-start justify-between gap-6 list-none">
              <h3 className="text-[17px] font-semibold leading-snug">{f.q}</h3>
              <span
                className="mt-0.5 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180"
                aria-hidden="true"
              >
                <Icon name="chevronDown" size={20} strokeWidth={2} />
              </span>
            </summary>
            <p className="mt-3 max-w-3xl text-[16px] leading-relaxed text-[var(--muted)]">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/faq"),
          breadcrumbLd([{ name: "FAQ", href: "/faq" }]),
          faqLd(faqs)
        ]}
      />

      <div className="container-page pt-10 pb-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">FAQ</span>
        </nav>

        <div className="max-w-3xl">
          <h1 className="text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            Questions and answers
          </h1>
          <p className="mt-5 text-[17px] leading-relaxed text-[var(--muted)]">
            Everything people ask before they book, and everything owners ask before they list. If
            yours is not here, {" "}
            <a href={site.phoneHref} className="font-semibold text-[var(--ink)] underline">
              call {site.phone}
            </a>{" "}
            and ask it.
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href="#renters" className="pill pill-line" style={{ minHeight: 44, paddingInline: 18 }}>
              For renters
            </a>
            <a href="#owners" className="pill pill-line" style={{ minHeight: 44, paddingInline: 18 }}>
              For owners
            </a>
          </div>
        </div>

        <div className="mt-14 max-w-4xl space-y-16">
          <FaqList items={renterFaqs} title="If you want to rent" id="renters" />
          <FaqList items={ownerFaqs} title="If you own a property" id="owners" />
        </div>

        <div className="mt-16 max-w-4xl">
          <div
            className="rounded-[var(--r-lg)] px-6 py-10 sm:px-10 text-center"
            style={{ background: "var(--surface-2)", border: "1px solid var(--line)" }}
          >
            <h2 className="text-[22px] sm:text-[26px] font-bold">Still not sure?</h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] text-[var(--muted)]">
              Tell us the dates and what brings you here. Even if nothing on the site fits, we
              usually know what is opening up.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                Ask us a question
              </Link>
              <Link href="/rentals" className="btn btn-outline">
                Browse rentals
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
