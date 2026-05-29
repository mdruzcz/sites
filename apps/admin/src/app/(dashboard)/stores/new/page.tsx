import { redirect } from "next/navigation";
import { createStore, setActiveStore } from "@/lib/actions/store";
import { slugify } from "@/lib/utils";

export default function NewStorePage() {
  async function action(formData: FormData) {
    "use server";
    const name = String(formData.get("name") ?? "").trim();
    const domain = String(formData.get("domain") ?? "").trim();
    const support_email = String(formData.get("support_email") ?? "").trim();
    const ship_from_postal_code = String(formData.get("ship_from_postal_code") ?? "").trim() || null;
    const free_shipping_threshold_cad = Number(formData.get("free_shipping_threshold_cad") ?? 500);
    const slug = String(formData.get("slug") ?? "").trim() || slugify(name);

    const id = await createStore({
      slug,
      name,
      domain,
      support_email,
      free_shipping_threshold_cad,
      ship_from_postal_code
    });
    await setActiveStore(id);
    redirect(`/stores/${id}`);
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">New store</h1>
      <p className="text-sm text-slate-500">
        Register a new storefront. After creating it, you&rsquo;ll add Stripe and Canada Post credentials and
        deploy the storefront app on Vercel pointed at this store.
      </p>

      <form action={action} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <Field label="Store name">
          <input name="name" required className={input} placeholder="Holiday Lights Direct" />
        </Field>
        <Field label="Slug (used in URLs/SKU prefixes)">
          <input name="slug" className={input} placeholder="auto from name if blank" />
        </Field>
        <Field label="Production domain">
          <input
            name="domain"
            required
            className={input}
            placeholder="holidaylightsdirect.ca"
            pattern="[a-z0-9.-]+"
          />
        </Field>
        <Field label="Support email">
          <input
            name="support_email"
            required
            type="email"
            className={input}
            placeholder="service@masterdecker.com"
          />
        </Field>
        <Field label="Ship-from postal code (for Canada Post)">
          <input name="ship_from_postal_code" className={input} placeholder="L7L 0E2" />
        </Field>
        <Field label="Free shipping threshold (CAD)">
          <input
            name="free_shipping_threshold_cad"
            type="number"
            step="0.01"
            defaultValue="500"
            className={input}
          />
        </Field>
        <button type="submit" className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700">
          Create store
        </button>
      </form>
    </div>
  );
}

const input = "w-full rounded-md border border-slate-300 px-3 py-1.5 text-sm shadow-sm";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-slate-600">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
