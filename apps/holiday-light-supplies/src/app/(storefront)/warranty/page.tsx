export const metadata = { title: "Warranty" };

export default function WarrantyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Warranty</h1>
      <p>
        If any item fails due to a manufacturing defect within <strong>five years</strong> of purchase, we
        will repair or replace it at no cost to you.
      </p>
      <p>The warranty does not cover damage from improper installation, electrical surges, or normal wear.</p>
      <p>Contact <a href="mailto:info@holidaylightsupplies.ca">info@holidaylightsupplies.ca</a> with your order number to begin a warranty claim.</p>
    </article>
  );
}
