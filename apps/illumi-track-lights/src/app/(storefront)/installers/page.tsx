import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { Photo } from "@/components/photo";
import { ContactForm } from "@/components/contact-form";
import { kits } from "@/lib/kits";
import { SITE_URL, formatCad } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Find a Permanent Lighting Installer Near You",
  description: "Prefer not to climb the ladder? Illumi Track Lights connects homeowners across Canada with installers who fit this exact 12V track-and-puck system. Installed pricing from $1,665 for 50 ft.",
  alternates: { canonical: `${SITE_URL}/installers` }
};

export default function InstallersPage() {
  return (
    <>
      <PageHero photo="install-home-day" eyebrow="For homeowners" title="Rather hire a pro? We get it." intro="Installers across Canada use the same hardware that ships in our kits. Tell us where you are and we will connect you with one, so you get the same warranty and support either way." crumbs={[{ label: "Installers" }]} />
      <section className="bg-[var(--color-bg)]">
        <div className="shell section grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow eyebrow-rule text-[var(--color-accent-dark)]">Request an installer</p>
            <h2 className="font-display h2-fluid mt-5">Send your postal code and a photo of the house.</h2>
            <p className="mt-4 text-[var(--color-text-soft)]">In Southwestern Ontario our own crew installs; see /installation for the cities. Elsewhere in Canada we reply within one business day with a partner installer near you.</p>
            <div className="mt-8">
              <ContactForm defaultTopic="Help me size a kit" />
            </div>
          </div>
          <aside className="space-y-4">
            <div className="card p-6">
              <p className="eyebrow text-[var(--color-accent-dark)]">Installed pricing guide</p>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">Typical installed price for our own crew, kit included. Ladders, corners and second storeys move the number.</p>
              <ul className="mt-4 divide-y divide-[var(--color-border)] text-sm">
                {kits.map((k) => (
                  <li key={k.slug} className="flex justify-between py-2"><span>{k.feet} ft</span><span className="font-semibold">{formatCad(k.installedLow, 0)} – {formatCad(k.installedHigh, 0)}</span></li>
                ))}
              </ul>
            </div>
            <Photo name="track-security-white" ratio="aspect-[4/3]" rounded="rounded-2xl" sizes="400px" />
            <div className="card p-6">
              <h3 className="font-display text-xl">Are you an installer?</h3>
              <p className="mt-2 text-sm text-[var(--color-text-soft)]">Tier pricing, priority fulfilment and homeowner referrals for crews that fit our system.</p>
              <Link href="/professional-installer" className="btn-secondary mt-4 w-full">See the installer program</Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
