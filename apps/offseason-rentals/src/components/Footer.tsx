import Link from "next/link";
import { site } from "@/lib/site";
import { cities, audiences } from "@/lib/content";
import { Icon } from "@/components/Icon";

const YEAR = new Date().getFullYear();

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[14px] font-bold mb-3">{title}</h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="text-[14px] text-[var(--muted)] hover:text-[var(--ink)] hover:underline">
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-[var(--surface-2)]" style={{ borderColor: "var(--line)" }}>
      <div className="container-page py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <Column title="Rentals">
            <FooterLink href="/rentals">All off-season rentals</FooterLink>
            <FooterLink href="/how-it-works">How it works</FooterLink>
            <FooterLink href="/faq">Questions and answers</FooterLink>
            <FooterLink href="/contact">Contact us</FooterLink>
          </Column>

          <Column title="Where">
            {cities.slice(0, 6).map((c) => (
              <FooterLink key={c.slug} href={`/off-season-rentals/${c.slug}`}>
                {c.isHome ? `In ${c.name}` : `Near ${c.name}`}
              </FooterLink>
            ))}
          </Column>

          <Column title="Who it suits">
            {audiences.slice(0, 6).map((a) => (
              <FooterLink key={a.slug} href={`/perfect-for/${a.slug}`}>
                {a.label}
              </FooterLink>
            ))}
          </Column>

          <div>
            <h3 className="text-[14px] font-bold mb-3">Own a property here?</h3>
            <p className="text-[14px] text-[var(--muted)] mb-4">
              {site.ownerPromise.headline}. We market the months you are not selling anyway.
            </p>
            <Link href="/list-your-property" className="btn btn-primary btn-sm">
              {site.cta.owner}
            </Link>
            <p className="mt-3 text-[14px] text-[var(--muted)]">
              Already listed?{" "}
              <Link href="/owners/login" className="font-semibold text-[var(--ink)] underline">
                Owner login
              </Link>
            </p>

            <div className="mt-6 space-y-2.5">
              <a
                href={site.phoneHref}
                className="flex items-center gap-2 text-[14px] font-semibold hover:underline"
              >
                <Icon name="phone" size={16} strokeWidth={2} />
                {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-2 text-[14px] text-[var(--muted)] hover:text-[var(--ink)] hover:underline"
              >
                <Icon name="mail" size={16} />
                {site.email}
              </a>
              <p className="flex items-center gap-2 text-[14px] text-[var(--muted)]">
                <Icon name="mapPin" size={16} />
                {site.addressLine}
              </p>
            </div>
          </div>
        </div>

        <div className="my-10 rule" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-[var(--muted)]">
            © {YEAR} {site.name}. Furnished off-season rentals in Port Stanley, Ontario.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <FooterLink href="/privacy-policy">Privacy</FooterLink>
            <FooterLink href="/terms-of-service">Terms</FooterLink>
            <FooterLink href="/sitemap.xml">Sitemap</FooterLink>
          </ul>
        </div>
      </div>
    </footer>
  );
}
