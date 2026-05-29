import Link from "next/link";

export const metadata = {
  title: "Find a permanent lighting installer",
  description: "Don't want to DIY? Find a trusted permanent LED lighting installer in your area. Illumi Track Lights partners with installers across Canada."
};

export default function InstallersPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <p className="eyebrow text-[var(--color-brand)]">For homeowners</p>
      <h1 className="font-display mt-2 text-4xl tracking-tight md:text-5xl">
        Rather hire a pro? <span className="gradient-text">We get it.</span>
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-slate-600">
        Not everyone wants to spend a Saturday on a ladder. Illumi Track Lights partners with trusted
        installers across Canada who use our gear &mdash; same pro-grade kit, professional installation.
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--color-border)] bg-white p-6">
        <h2 className="font-display text-2xl">Find an installer near you</h2>
        <p className="mt-2 text-sm text-slate-600">
          Email us your postal code and we&rsquo;ll connect you with installers we work with in your area.
          Every partner uses our kits, so you get the same warranty and support.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="mailto:service@masterdecker.com?subject=Find%20a%20permanent%20lighting%20installer" className="btn-primary">
            Email us your postal code →
          </a>
        </div>
      </div>

      <div className="mt-10 rounded-2xl bg-[var(--color-brand-soft)] p-6">
        <h3 className="font-display text-xl">Are you an installer?</h3>
        <p className="mt-2 text-sm text-slate-700">
          Join the Illumi Installer Program for tier pricing, priority shipping, and referral leads from
          homeowners in your area.
        </p>
        <Link href="/professional-installer" className="mt-4 inline-block text-sm font-semibold text-[var(--color-brand)] hover:underline">
          See the installer program →
        </Link>
      </div>
    </div>
  );
}
