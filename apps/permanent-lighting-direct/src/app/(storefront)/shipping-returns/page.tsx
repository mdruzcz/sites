export const metadata = { title: "Shipping & Returns" };

export default function ShippingReturnsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 prose prose-slate">
      <h1>Shipping & Returns</h1>
      <h2>Free shipping</h2>
      <p>Enjoy free shipping on all orders over <strong>$500 CAD</strong> shipped anywhere in Canada.</p>
      <h2>Returns policy</h2>
      <p>Products can be returned for a <strong>full refund</strong>, provided all items are in their original packaging and no components are missing from LED housing packages.</p>
      <h2>Return shipping</h2>
      <p>Customers are responsible for return shipping costs. We recommend using a trackable shipping method for your protection.</p>
      <h2>Important notice</h2>
      <p>Please inspect your order upon arrival and contact us promptly if there are any issues.</p>
      <p>Questions? <a href="/contact-us">Contact us</a>.</p>
    </article>
  );
}
