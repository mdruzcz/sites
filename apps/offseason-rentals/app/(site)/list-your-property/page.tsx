import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ownerFaqs } from "@/lib/content";
import { Icon } from "@/components/Icon";
import { ListPropertyForm } from "@/components/ListPropertyForm";
import { StepGrid } from "@/components/Section";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbLd, faqLd, webPageLd } from "@/lib/seo";

export const revalidate = 3600;

const TITLE = "Want to List Your Property? Off-Season Rentals in Port Stanley";
const DESCRIPTION =
  "Own a Port Stanley cottage? Earn from the nine months it sits empty. We market your off season only, screen the tenants, and import your VRBO or Airbnb photos free.";

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
    icon: "link",
    title: "Send us the property",
    body: "Fill in the form below. If it is already on VRBO or Airbnb, paste the link — we import the photographs and details straight across."
  },
  {
    icon: "sparkle",
    title: "We build the listing",
    body: "We rewrite the copy for an off-season audience rather than a summer one, set a monthly rate that actually clears, and put it live."
  },
  {
    icon: "key",
    title: "You approve the tenant",
    body: "We screen enquiries, run the agreement and hold the deposit. Nobody gets your keys until you have said yes."
  }
];

const MATH = [
  { k: "3 months", v: "What most Port Stanley cottages actually earn", tone: "muted" },
  { k: "9 months", v: "What they cost you to hold, heated and insured", tone: "muted" },
  { k: "Sept – May", v: "The window we turn back into income", tone: "accent" }
];

export default function ListYourPropertyPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd(TITLE, DESCRIPTION, "/list-your-property"),
          breadcrumbLd([{ name: "List your property", href: "/list-your-property" }]),
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

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,560px)] lg:gap-16 items-start">
          <div>
            <span className="pill pill-accent">For owners</span>
            <h1 className="mt-4 text-[32px] sm:text-[46px] font-extrabold leading-[1.08] tracking-tight">
              {site.ownerPromise.headline}
            </h1>
            <p className="mt-5 text-[17px] sm:text-[19px] leading-relaxed text-[var(--muted)]">
              Between Labour Day and Victoria Day your cottage is a liability: heated, insured,
              checked on, and earning nothing. We rent those months to people who need somewhere real
              to live, and we do not touch your summer.
            </p>

            <ul className="mt-8 space-y-4">
              {site.ownerPromise.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[16px]">
                  <Icon
                    name="check"
                    size={20}
                    strokeWidth={2.4}
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--ok)" }}
                  />
                  {p}
                </li>
              ))}
            </ul>

            <dl
              className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-[var(--r-md)]"
              style={{ background: "var(--line)" }}
            >
              {MATH.map((m) => (
                <div key={m.k} className="bg-[var(--surface)] p-5">
                  <dt
                    className="text-[22px] font-extrabold tracking-tight"
                    style={{ color: m.tone === "accent" ? "var(--accent)" : "var(--ink)" }}
                  >
                    {m.k}
                  </dt>
                  <dd className="mt-1 text-[14px] text-[var(--muted)]">{m.v}</dd>
                </div>
              ))}
            </dl>

            <div
              className="mt-8 rounded-[var(--r-md)] p-5 flex items-start gap-4"
              style={{ background: "var(--lake-soft)", border: "1px solid rgba(14,90,99,0.18)" }}
            >
              <Icon name="link" size={22} strokeWidth={1.8} style={{ color: "var(--lake)" }} className="mt-0.5 shrink-0" />
              <div>
                <p className="text-[15px] font-bold" style={{ color: "var(--lake)" }}>
                  Already on VRBO or Airbnb?
                </p>
                <p className="mt-1 text-[15px]" style={{ color: "var(--lake)" }}>
                  Paste the link in the form. We pull your photographs and property details across
                  automatically — no re-shooting, no re-typing, no upload.
                </p>
              </div>
            </div>
          </div>

          <div className="card card-pad lg:sticky lg:top-[104px]" style={{ boxShadow: "var(--shadow-lg)" }}>
            <h2 className="text-[20px] font-bold">Tell us about the property</h2>
            <p className="mt-1.5 mb-6 text-[14px] text-[var(--muted)]">
              Takes about two minutes. We reply within {site.responseTime}.
            </p>
            <ListPropertyForm />
          </div>
        </div>
      </section>

      <section className="border-y bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
        <div className="container-page py-14">
          <h2 className="text-[24px] sm:text-[30px] font-bold mb-8">What happens next</h2>
          <StepGrid steps={STEPS} />
        </div>
      </section>

      <section className="container-page py-14">
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
          <p className="text-[16px] text-[var(--muted)]">Would rather just talk it through?</p>
          <a href={site.phoneHref} className="btn btn-outline mt-4">
            <Icon name="phone" size={18} strokeWidth={2} />
            Call {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
