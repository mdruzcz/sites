export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Contact us</h1>
      <p>We&rsquo;re passionate about helping you create magical holiday displays.</p>
      <p>
        <strong>Email:</strong> <a href="mailto:info@holidaylightsupplies.ca">info@holidaylightsupplies.ca</a>
        <br />
        For installer or municipality inquiries, please use the application form on the{" "}
        <a href="/professional-installer">Pro Installer</a> or{" "}
        <a href="/municipalities">Municipalities</a> page.
      </p>
    </article>
  );
}
