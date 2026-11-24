import Link from "next/link";
import { SITE_URL } from "@/lib/utils";

export const metadata = {
  title: "Privacy Policy",
  description: "What personal information Holiday Lights Direct collects through its contact, quote and trade forms, how it is used, and how to ask us to correct or delete it.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: { title: "Privacy Policy", description: "What personal information Holiday Lights Direct collects through its contact, quote and trade forms, how it is used, and how to ask us to correct or delete it.", url: `${SITE_URL}/privacy` }
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    "heading": "Who we are",
    "body": [
      "Holiday Lights Direct is an online store operated from London, Ontario. This page explains what personal information this website collects and what we do with it."
    ]
  },
  {
    "heading": "What we collect",
    "body": [
      "Contact form: your name, email address, phone number if you give it, and your message.",
      "Shipping quote requests: your name, email, phone, delivery address, the items in your cart and any notes or discount code you enter.",
      "Trade applications: your company name, contact name, email, phone and the business details you choose to share.",
      "We do not take card payments on this website, so we never see or store payment card details here."
    ]
  },
  {
    "heading": "Cookies and browser storage",
    "body": [
      "We set one cookie that holds a random cart number so your cart is still there when you come back. It expires after 30 days.",
      "Your saved items and whether you have closed the welcome offer are stored in your own browser, not on our servers.",
      "We measure visits with a self-hosted, cookie-free analytics tool that does not build advertising profiles.",
      "Our forms use Cloudflare Turnstile to block automated spam. Cloudflare may process technical information about your browser to do that."
    ]
  },
  {
    "heading": "How we use it",
    "body": [
      "To answer your questions, prepare quotes, ship orders, review trade applications and honour warranties. We do not sell or rent personal information."
    ]
  },
  {
    "heading": "Who helps us run the site",
    "body": [
      "We rely on service providers for hosting, our database, email delivery and spam protection. They process information only to provide those services to us."
    ]
  },
  {
    "heading": "Your choices",
    "body": [
      "You can ask to see, correct or delete the personal information we hold about you by emailing service@masterdecker.com. We keep order and warranty records for as long as we need them to support your purchase and meet our legal obligations."
    ]
  }
];

export default function Page() {
  return (
    <div className="shell py-10 md:py-16">
      <nav aria-label="Breadcrumb" className="crumbs-plain">
        <Link href="/">Home</Link>
        <span aria-hidden>/</span>
        <span aria-current="page">Privacy</span>
      </nav>
      <div className="mx-auto mt-8 max-w-3xl">
        <p className="eyebrow-plain">Your information</p>
        <h1 className="font-display mt-3 text-[2.2rem] md:text-[3rem]">Privacy policy</h1>
        <p className="mt-4 text-sm text-[var(--color-muted)]">Last updated November 19, 2026</p>
        <div className="surface mt-8 divide-y divide-[var(--color-border)]">
          {SECTIONS.map((s) => (
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
