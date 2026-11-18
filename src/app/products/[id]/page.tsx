/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProductById, getAllProducts } from "@/data/products";

interface PageProps {
  params: Promise<{ id: string }>;
}

// 1. generateStaticParams: Tells Next.js at build time which [id] pages to pre-render statically (SSG)
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

// 2. generateMetadata: Dynamically creates SEO title, description, and OpenGraph tags using the route params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.name} | TechCatalog`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;

  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  // 3. Render the professional product detail view
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-400">
          <Link href="/" className="hover:text-zinc-200 transition">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-zinc-200 transition">Products</Link>
          <span>/</span>
          <span className="text-zinc-100 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800 backdrop-blur">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-zinc-800 border border-zinc-700/50">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300">
                  {product.category}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    product.inStock
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                  }`}
                >
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-2 text-sm text-zinc-400">
                <span className="text-amber-400 font-semibold">★ {product.rating}</span>
                <span>•</span>
                <span>{product.reviewCount.toLocaleString()} reviews</span>
              </div>

              <div className="mt-6 text-4xl font-black text-white">
                ${product.price}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-300">
                {product.description}
              </p>

              <div className="mt-6 border-t border-zinc-800 pt-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Technical Specifications
                </h3>
                <dl className="mt-3 divide-y divide-zinc-800/60 text-xs">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2">
                      <dt className="text-zinc-400">{label}</dt>
                      <dd className="font-medium text-zinc-200">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="mt-8">
              <button
                disabled={!product.inStock}
                className={`w-full rounded-xl py-3.5 text-sm font-semibold transition shadow-lg ${
                  product.inStock
                    ? "bg-emerald-500 text-black hover:bg-emerald-400 cursor-pointer shadow-emerald-500/20"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Currently Unavailable"}
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Try visiting <code className="text-zinc-300">/products/macbook</code> or <code className="text-zinc-300">/products/12345</code> in your browser to see this value update instantly!
        </p>
      </div>
    </div>
  );
}
