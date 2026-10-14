import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/quote-form";
import { Breadcrumbs, breadcrumbLd, CheckList } from "@/components/ui";
import { Photo } from "@/components/photo";
import { Icon } from "@/components/icons";
import { SITE_EMAIL } from "@/lib/site";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Request a Commercial Christmas Lighting Quote",
  description: "Get a line-item quote for commercial Christmas lights, 3D displays, pole décor, wreaths and trees. Reply within one business day. Volume pricing, net-30 for public sector, shipped across Canada.",
  alternates: { canonical: `${SITE_URL}/request-a-quote` },
  openGraph: { title: "Request a Commercial Christmas Lighting Quote | Holiday Light Supplies", url: `${SITE_URL}/request-a-quote` }
};

export default function RequestQuotePage() {
  return (
    <div className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ label: "Request a quote" }])) }} />
      <div className="shell py-8 md:py-12">
        <Breadcrumbs items={[{ label: "Request a quote" }]} />
        <div className="mt-6 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Commercial quote</p>
            <h1 className="font-display h1-fluid mt-4 !text-[2.4rem] md:!text-[3.2rem]">Tell us about the property. We quote it line by line.</h1>
            <p className="mt-5 text-lg leading-relaxed text-[var(--color-muted)]">
              Pole counts, tree lists, roofline feet, ceiling heights, product names or a site plan. Whatever you have is enough to start; we fill the gaps and reply within one business day.
            </p>
            <CheckList
              className="mt-7"
              items={[
                "Line-item pricing with freight to each site and realistic lead times",
                "Volume, installer and public-sector pricing applied automatically",
                "Net-30 PO invoicing and tax-exempt handling for municipalities and BIAs",
                "No payment and no obligation until you approve the quote"
              ]}
            />
            <Photo name="downtown-boulevard" ratio="aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 480px" rounded="rounded-3xl" className="mt-8" />
            <p className="mt-6 text-sm text-[var(--color-muted)]">
              Prefer email? Send your list to{" "}
              <a href={`mailto:${SITE_EMAIL}`} className="font-semibold text-[var(--color-brand)] hover:underline">{SITE_EMAIL}</a>. Already have products in your{" "}
              <Link href="/cart" className="font-semibold text-[var(--color-brand)] hover:underline">quote list</Link>? Submit it from there.
            </p>
            <Link href="/commercial" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-brand)] hover:underline">
              See how we work with malls, BIAs, municipalities and property managers <Icon.arrow size={14} />
            </Link>
          </div>
          <QuoteForm source="/request-a-quote" />
        </div>
      </div>
    </div>
  );
}
