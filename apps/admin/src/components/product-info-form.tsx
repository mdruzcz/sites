"use client";

import { useState, useTransition } from "react";
import { updateProduct } from "@/lib/actions/product";

export function ProductInfoForm({
  product
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    short_description: string | null;
    long_description: string | null;
    status: "draft" | "active" | "archived";
    featured: boolean;
    meta_title: string | null;
    meta_description: string | null;
    search_keywords: string | null;
  };
}) {
  const [pending, startTransition] = useTransition();
  const [saved, setSaved] = useState<"idle" | "saving" | "ok" | "err">("idle");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSaved("saving");
    startTransition(async () => {
      try {
        await updateProduct(product.id, {
          name: String(form.get("name") || ""),
          slug: String(form.get("slug") || ""),
          short_description: String(form.get("short_description") || "") || null,
          long_description: String(form.get("long_description") || "") || null,
          status: form.get("status") as "draft" | "active" | "archived",
          featured: form.get("featured") === "on",
          meta_title: String(form.get("meta_title") || "") || null,
          meta_description: String(form.get("meta_description") || "") || null,
          search_keywords: String(form.get("search_keywords") || "") || null
        });
        setSaved("ok");
      } catch {
        setSaved("err");
      }
    });
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 grid gap-3">
      <Field label="Name">
        <input name="name" defaultValue={product.name} className={input} required />
      </Field>
      <Field label="Slug">
        <input name="slug" defaultValue={product.slug} className={input} required />
      </Field>
      <Field label="Short description">
        <input name="short_description" defaultValue={product.short_description ?? ""} className={input} />
      </Field>
      <Field label="Long description (markdown allowed)">
        <textarea
          name="long_description"
          defaultValue={product.long_description ?? ""}
          rows={8}
          className={input + " font-mono text-xs"}
        />
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Status">
          <select name="status" defaultValue={product.status} className={input}>
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </Field>
        <Field label="Featured">
          <label className="mt-1 flex items-center gap-2 text-sm">
            <input type="checkbox" name="featured" defaultChecked={product.featured} />
            <span>Show in featured rails</span>
          </label>
        </Field>
      </div>
      <Field label="Meta title (SEO)">
        <input name="meta_title" defaultValue={product.meta_title ?? ""} className={input} maxLength={70} />
      </Field>
      <Field label="Meta description (SEO)">
        <input name="meta_description" defaultValue={product.meta_description ?? ""} className={input} maxLength={170} />
      </Field>
      <Field label="Search keywords (comma separated)">
        <input name="search_keywords" defaultValue={product.search_keywords ?? ""} className={input} />
      </Field>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        {saved === "ok" && <span className="text-sm text-emerald-700">Saved</span>}
        {saved === "err" && <span className="text-sm text-rose-700">Error saving</span>}
      </div>
    </form>
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
