import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ownerFaqs, packages } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { StepGrid } from "@/components/Section";
import { PackageCards } from "@/components/PackageCards";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webPageLd, abs } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "List Your Port Stanley Property — Packages from $149 a Year";
const DESCRIPTION =
  "Advertise your Port Stanley cottage to off-season renters. Build the listing yourself, choose Bronze, Silver or Gold, and it runs for 12 months. No commission on bookings.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/list-your-property" },
  openGraph: {
    title: `${TITLE} | ${site.name}`,
    description: DESCRIPTION,
    url: `${site.url}/list-your-property`,
    images: ["/og.jpg"]
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.jpg"] }
};

const STEPS = [
  {
    icon: "key",
    title: "Create your account",
    body: "Two minutes and an email address. You get a login you can come back to whenever you want to change a rate or swap a photograph."
  },
  {
    icon: "upload",
    title: "Build the listing yourself",
    body: "Drag your photographs in, write the description, set the rate and the months you will release. It saves as you go, and nothing is public until you say so."
  },
  {
    icon: "sparkle",
    title: "Pick a package and submit",
    body: "We invoice you, review the listing, and put it live. It runs for a full twelve months from the day it publishes."
  }
];

/** Offer schema so the packages can surface in search. */
function offerCatalogLd() {
  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Off Season Rentals listing packages",
    url: abs("/list-your-property"),
    itemListElement: packages.map((p) => ({
      "@type": "Offer",
      name: `${p.name} listing package`,
      description: p.summary,
      price: p.price,
      priceCurrency: "CAD",
      url: abs("/owners/register"),
      eligibleDuration: { "@type": "QuantitativeValue", value: 12, unitCode: "MON" },
      itemOffered: {
        "@type": "Service",
        name: `${p.name} property listing`,
        serviceType: "Vacation rental advertising",
        provider: { "@id": `${site.url}/#business` }
      }
    }))
  };
}

export default function ListYourPropertyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/list-your-property"),
          breadcrumbLd([{ name: "List your property", href: "/list-your-property" }]),
          offerCatalogLd(),
          faqLd(ownerFaqs)
        ]}
      />

      <section className="container-page pt-10 pb-14">
        <nav aria-label="Breadcrumb" className="mb-4 text-[13px] text-[var(--muted)]">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--ink)]">List your property</span>
        </nav>

        <div className="max-w-3xl">
          <span className="pill pill-accent">For owners</span>
          <h1 className="mt-4 text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
            {site.ownerPromise.headline}
          </h1>
          <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">
            Between Labour Day and Victoria Day your cottage is a liability: heated, insured, checked
            on, and earning nothing. Advertise it here to the people who actually want those months —
            and keep every dollar of what you rent it for.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/owners/register" className="btn btn-primary">
              Create an owner account
            </Link>
            <Link href="/owners/login" className="btn btn-outline">
              Owner login
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14px] text-[var(--muted)]">
            {[
              "No commission on bookings",
              "You keep your summer calendar",
              "12 months from the day it publishes",
              "Edit it yourself, any time"
            ].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Icon name="check" size={16} strokeWidth={2} style={{ color: "var(--ok)" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Packages ---------------- */}
      <section id="packages" className="border-y bg-[var(--surface-2)] scroll-mt-28" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-14">
          <div className="max-w-2xl mb-9">
            <h2 className="text-[26px] sm:text-[34px] font-extrabold tracking-tight">
              One price, twelve months, no commission
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-[var(--muted)]">
              Pay once when your listing goes live and it runs for a full year. What you charge your
              tenant is yours — we do not take a cut of the rent, and there is nothing to pay per
              enquiry or per booking.
            </p>
          </div>

          <PackageCards />

          <p className="mt-8 text-[14px] text-[var(--muted)]">
            All prices in Canadian dollars. We invoice by email once you submit; your listing goes
            live when the invoice is settled and we have checked it over. Not sure which tier fits?{" "}
            <a href={site.phoneHref} className="font-semibold text-[var(--ink)] underline">
              Call {site.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* ---------------- How it works ---------------- */}
      <section className="container-page py-14">
        <h2 className="text-[26px] sm:text-[32px] font-extrabold tracking-tight mb-8">
          You build it, we check it, it goes live
        </h2>
        <StepGrid steps={STEPS} />

        <div
          className="mt-10 rounded-[var(--r-md)] p-5 flex items-start gap-4"
          style={{ background: "var(--lake-soft)", border: "1px solid rgba(14,90,99,0.18)" }}
        >
          <Icon name="link" size={22} strokeWidth={1.8} style={{ color: "var(--lake)" }} className="mt-0.5 shrink-0" />
          <div>
            <p className="text-[15px] font-bold" style={{ color: "var(--lake)" }}>
              Already on VRBO or Airbnb?
            </p>
            <p className="mt-1 text-[15px]" style={{ color: "var(--lake)" }}>
              Send us the link when you sign up and we will pull your photographs and property
              details across for you — no re-shooting, no re-typing.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Owner FAQ ---------------- */}
      <section className="container-page pb-14">
        <h2 className="text-[24px] sm:text-[30px] font-bold mb-8">Owner questions</h2>
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
          {ownerFaqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[16px] font-bold">{f.q}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[var(--muted)]">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/owners/register" className="btn btn-primary">
            Create an owner account
          </Link>
          <p className="mt-3 text-[14px] text-[var(--muted)]">
            Nothing is charged until you submit a listing and we invoice you.
          </p>
        </div>
      </section>
    </>
  );
}
