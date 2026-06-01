export const metadata = {
  title: "Shipping & Returns",
  description:
    "Ready Seal Direct shipping and returns policy. Free shipping on Ontario orders over $750. Outside Ontario? Request a shipping quote."
};

export default function ShippingReturnsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Shipping &amp; Returns</h1>

      <h2>Where we ship</h2>
      <p>
        Online orders currently ship <strong>within Ontario</strong>, dispatched from Belmont, ON.
        Enjoy <strong>free shipping on Ontario orders over $750 CAD</strong>. Most orders ship the
        same or next business day.
      </p>
      <p>
        Outside Ontario? We&rsquo;d still love to help — <a href="/contact-us?subject=Shipping%20quote%20request%20(outside%20Ontario)">request a shipping quote</a>{" "}
        and we&rsquo;ll reply with freight options for your province, usually within one business day.
      </p>

      <h2>Returns policy</h2>
      <p>
        Unopened product can be returned for a <strong>full refund within 30 days</strong>, provided
        the pails are sealed, in their original packaging, and in resalable condition. Opened or used
        stain cannot be returned.
      </p>

      <h2>Return shipping</h2>
      <p>
        Customers are responsible for return shipping costs. We recommend a trackable shipping method
        for your protection.
      </p>

      <h2>Damaged or incorrect orders</h2>
      <p>
        Please inspect your order on arrival. If anything is damaged in transit or incorrect, contact
        us promptly and we&rsquo;ll make it right.
      </p>

      <p>Questions? <a href="/contact-us">Contact us</a> or call (877) 266-6415.</p>
    </article>
  );
}
