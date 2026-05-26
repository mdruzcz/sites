import { getActiveStore } from "@/lib/store-context";
import { createProductFromForm } from "@/lib/actions/product";

export default async function NewProductPage() {
  const store = await getActiveStore();
  if (!store) {
    return (
      <div className="max-w-xl rounded-lg border border-amber-200 bg-amber-50 p-6">
        <h1 className="text-lg font-semibold">No active store</h1>
        <p className="mt-2 text-sm text-amber-900">
          Add a store from the <a href="/stores/new" className="text-blue-700 underline">Stores</a> page
          before creating products.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold tracking-tight">New product</h1>
      <p className="text-sm text-slate-500">
        Creating a product in <strong>{store.name}</strong>. You&rsquo;ll add variants, images, and pricing
        next.
      </p>
      <form action={createProductFromForm} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          required
          autoFocus
          placeholder="e.g. C9 Faceted Bulb (Red)"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm"
        />
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </div>
  );
}
