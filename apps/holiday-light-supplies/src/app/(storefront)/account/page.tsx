export const metadata = { title: "Account", robots: { index: false } };

export default function AccountPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Account</h1>
      <p>
        Customer accounts (with sign-in, order history, addresses, and B2B status) ship in the next phase.
        For installer/municipality approval, please apply via the{" "}
        <a href="/professional-installer">Pro Installer</a> or <a href="/municipalities">Municipalities</a> page.
      </p>
    </article>
  );
}
