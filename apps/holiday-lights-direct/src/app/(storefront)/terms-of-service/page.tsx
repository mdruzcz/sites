import Link from "next/link";
import { cardCheckoutEnabled } from "@/lib/card-checkout";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Terms of Service",
  description: "The terms for using holidaylightsdirect.ca: pricing in Canadian dollars, how shipping quotes become orders, returns, warranty and installation safety.",
  alternates: { canonical: `${SITE_URL}/terms-of-service` },
  openGraph: { title: "Terms of Service", description: "The terms for using holidaylightsdirect.ca: pricing in Canadian dollars, how shipping quotes become orders, returns, warranty and installation safety.", url: `${SITE_URL}/terms-of-service` }
};

// `card` is true once card checkout is switched on for this deployment; until
// then every order is a request and no payment is taken on the site.
const sections = (card: boolean): { heading: string; body: string[] }[] => [
  {
    "heading": "Using this site",
    "body": [
      "By using holidaylightsdirect.ca you agree to these terms. If you do not agree, please do not use the site."
    ]
  },
  {
    "heading": "Products and pricing",
    "body": [
      "Prices are in Canadian dollars and do not include shipping or tax unless stated. We work to keep descriptions, photos, stock levels and prices accurate, but errors can happen and we may correct them, including after you have sent a request.",
      "The kit size drawings on this site are examples only. Measure your own roofline before choosing a kit."
    ]
  },
  {
    "heading": "Quotes and orders",
    "body": card
      ? [
          "Shipping is free on orders over $500 CAD within Canada. An order that ships free can be paid by credit or debit card at checkout. The payment is taken on Stripe's secure page, and the order is placed when the payment goes through; we then email your order confirmation and invoice. Orders are invoiced by our billing company, Master Decker Inc.",
          "Sending an order or shipping quote request does not place an order and takes no payment. For orders under $500 CAD we reply by email with your shipping cost. An order sent as a request is confirmed only once you approve our reply and payment has been arranged."
        ]
      : [
          "Sending an order or shipping quote request does not place an order and takes no payment. Shipping is free on orders over $500 CAD within Canada; for smaller orders we reply by email with your shipping cost. An order is confirmed only once you approve our reply and payment has been arranged."
        ]
  },
  {
    "heading": "Shipping, returns and warranty",
    "body": [
      "Our shipping and returns terms and our 5-year warranty are set out on their own pages, linked in the footer of every page, and form part of these terms."
    ]
  },
  {
    "heading": "Installation and safety",
    "body": [
      "Our products must be installed following the instructions supplied and all applicable electrical and building codes. Working at height is dangerous. If you are not confident doing the work safely, hire a qualified installer."
    ]
  },
  {
    "heading": "Trade accounts",
    "body": [
      "Installer and municipal pricing is available only to approved applicants and may be changed or withdrawn."
    ]
  },
  {
    "heading": "Liability",
    "body": [
      "To the extent the law allows, our liability for any product is limited to the amount you paid for it. Nothing in these terms limits rights you have under consumer protection law that cannot be waived."
    ]
  },
  {
    "heading": "Governing law",
    "body": [
      "These terms are governed by the laws of Ontario and the laws of Canada that apply there."
    ]
  }
];

export default function Page() {
  return (
    <div className="shell py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="crumbs-plain">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">Terms of service</span>
      </nav>
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow-plain">The fine print</p>
        <h1 className="font-display mt-3 text-[2.2rem] md:text-[3rem]">Terms of service</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated November 28, 2026</p>
        <div className="surface mt-8 divide-y divide-[var(--color-border)]">
          {sections(cardCheckoutEnabled()).map((s) => (
            <section key={s.heading} className="p-6 md:p-8">
              <h2 className="text-lg font-bold tracking-[-0.02em]">{s.heading}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--color-text-soft)]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-8 text-sm text-[var(--color-text-soft)]">
          Questions about this page? Email{" "}
          <a href="mailto:service@masterdecker.com" className="font-semibold text-[var(--color-gold-text)] underline underline-offset-2">
            service@masterdecker.com
          </a>{" "}
          or use the{" "}
          <Link href="/contact-us" className="font-semibold text-[var(--color-gold-text)] underline underline-offset-2">
            contact form
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
