import type { Metadata } from "next";
import Link from "next/link";
import { InstallerApplicationForm } from "@/components/installer-application-form";
import { PageHero } from "@/components/page-hero";
import { TrustStrip } from "@/components/sections/trust-strip";
import { breadcrumbLd, CheckList, FaqList, faqLd, IconTile, SectionHeading } from "@/components/ui";
import { Photo } from "@/components/photo";
import { Icon } from "@/components/icons";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

const TITLE = "Municipal & BIA Accounts — Net-30, Tax-Exempt, Tender-Ready";
const DESC = "Open a public-sector account with Holiday Light Supplies: net-30 PO invoicing, tax-exempt handling and tender-ready quotes for Canadian municipalities, BIAs, parks departments and school boards.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: `${SITE_URL}/municipalities` },
  openGraph: { title: `${TITLE} | Holiday Light Supplies`, description: DESC, url: `${SITE_URL}/municipalities` }
};

const FAQ = [
  { q: "What do we need to open an account?", a: "The form below: organization, contact, and your tax-exemption details if applicable. We set the account up within one business day and confirm by email." },
  { q: "Can you respond to our tender or RFP?", a: "Yes. Email the document and we return line-item pricing with specifications, warranty and delivery windows in your format." },
  { q: "Are there order minimums for net-30?", a: "No. Net-30 PO invoicing is available on any order for a verified public-sector account." },
  { q: "Do you ship to multiple sites?", a: "Yes. Parks, arenas, town halls and BIAs can each be a line on one PO with freight to each address." }
];

export default function MunicipalitiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd([{ href: "/commercial", label: "Commercial" }, { label: "Municipal & BIA accounts" }])) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd(FAQ)) }} />
      <PageHero
        photo="town-square"
        eyebrow="Public-sector accounts"
        title="Municipalities, BIAs and parks departments: order the way your finance office needs."
        intro="Net-30 purchase-order invoicing, tax-exempt handling, tender-ready quotes and displays specified for public spaces. Register once and every order after that is simple."
        crumbs={[{ href: "/commercial", label: "Commercial" }, { label: "Municipal & BIA accounts" }]}
        cta={{ href: "#register", label: "Register your organization" }}
        secondary={{ href: "/commercial/municipalities-parks", label: "See municipal products" }}
      />
      <TrustStrip compact />

      <section className="bg-white">
        <div className="shell section">
          <SectionHeading eyebrow="Account terms" title="What a public-sector account includes." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <IconTile icon="invoice" title="Net-30 PO invoicing" body="Issue a purchase order and receive an invoice with 30-day terms. No credit card required." />
            <IconTile icon="tag" title="Tax-exempt handling" body="Send your exemption details once and the account is flagged for the right tax treatment on every order." />
            <IconTile icon="clock" title="Tender-ready quotes" body="Line-item pricing with specs, LED counts, IP ratings, warranty terms and delivery windows, within one business day." />
            <IconTile icon="shield" title="Public-space specs" body="Aluminum frames, 24V IP44 wiring and replaceable parts, with spec sheets for your file." />
            <IconTile icon="truck" title="Multi-site freight" body="Each park, arena or street on one PO, with freight quoted to each address and delivery windows you set." />
            <IconTile icon="box" title="Replacement parts" body="LED netting, transformers, bulbs and connectors available in later seasons for the displays you bought." />
          </div>
        </div>
      </section>

      <section className="bg-warm">
        <div className="shell section grid gap-10 lg:grid-cols-2 lg:items-center">
          <Photo name="town-park-arch" ratio="aspect-[4/3]" sizes="(max-width: 1024px) 100vw, 560px" rounded="rounded-3xl" />
          <div>
            <SectionHeading eyebrow="What municipalities order" title="From the civic tree to every pole on Main Street." />
            <CheckList
              className="mt-7"
              items={[
                "3D LED displays for town squares, parks and arena entrances",
                "Pole-mount snowflakes, stars and candy canes for street light poles",
                "Commercial mini lights and C9 by the case for park and boulevard trees",
                "Lamp-post wreaths, garland and bows for downtown cores",
                "Overhead spans and skyline décor for main intersections"
              ]}
            />
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/commercial/municipalities-parks" className="btn-primary">
                Municipal product picks <Icon.arrow size={16} />
              </Link>
              <Link href="/commercial/bias-downtowns" className="btn-secondary">
                BIA & downtown picks
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="register" className="scroll-mt-24 bg-white">
        <div className="shell section grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent)]">Register</p>
            <h2 className="font-display h2-fluid mt-4">Open your account.</h2>
            <p className="mt-4 text-[var(--color-muted)]">Tell us about the organization. We set up net-30 and tax handling and email next steps within one business day.</p>
            <div className="mt-8">
              <FaqList items={FAQ} />
            </div>
          </div>
          <InstallerApplicationForm tierSlug="municipality" />
        </div>
      </section>
    </>
  );
}
