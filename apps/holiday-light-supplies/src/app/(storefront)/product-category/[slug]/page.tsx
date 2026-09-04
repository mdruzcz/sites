import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { getCategories, listProducts } from "@/lib/catalog";
import { SITE_URL } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) return { title: "Category not found" };
  return {
    title: `${cat.name}`,
    description: cat.description ?? `Shop ${cat.name} — professional-grade lighting parts from Holiday Light Supplies.`,
    alternates: { canonical: `${SITE_URL}/product-category/${cat.slug}` }
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();
  const products = await listProducts({ categorySlug: slug });

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <nav className="text-xs text-slate-500">
        <a href="/shop" className="hover:underline">Shop</a> / {cat.name}
      </nav>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{cat.name}</h1>
      {cat.description && <p className="mt-2 max-w-2xl text-sm text-slate-600">{cat.description}</p>}
      <p className="mt-2 text-sm text-slate-500">{products.length} products</p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
