/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getAllProducts } from "@/data/products";

export default function Home() {
  const products = getAllProducts();
  const featured = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/60 to-zinc-950 p-8 md:p-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Level 1 • Project 2
            </div>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Mastering <span className="text-emerald-400">Dynamic Routes</span> & Search Params
            </h1>

            <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
              Explore how Next.js App Router handles dynamic segments like{" "}
              <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                /products/[id]
              </code>{" "}
              and URL queries like{" "}
              <code className="text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded text-sm">
                ?category=Audio&amp;sort=price-asc
              </code>
              .
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-black hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20"
              >
                Explore Full Catalog &rarr;
              </Link>
              <Link
                href="/products?category=Computing"
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-3.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition"
              >
                View Computing Category
              </Link>
            </div>
          </div>
        </div>

        {/* Concept Learning Cards */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white mb-6">
            Core Next.js Concepts in this Project
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concept 1 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  01. Route Segments
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">Dynamic Routes [id]</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Folder named <code className="text-zinc-200 bg-zinc-800 px-1 py-0.5 rounded">[id]</code> captures any value from the URL path.
                  In Next.js 15+, <code className="text-zinc-200">params</code> is asynchronous and awaited inside server components.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">/products/[id]</span>
                <Link
                  href="/products/macbook-air-m3"
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Test route &rarr;
                </Link>
              </div>
            </div>

            {/* Concept 2 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  02. Query Strings
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">Search Params</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Components receive <code className="text-zinc-200">searchParams</code> as a Promise to access URL queries (<code className="text-zinc-200">?search=...</code>, <code className="text-zinc-200">?sort=...</code>) on the server without client-side lag.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">?sort=price-asc</span>
                <Link
                  href="/products?sort=price-asc"
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Test query &rarr;
                </Link>
              </div>
            </div>

            {/* Concept 3 */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  03. Error Boundaries
                </span>
                <h3 className="mt-2 text-lg font-semibold text-white">notFound() &amp; not-found.tsx</h3>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Calling <code className="text-zinc-200">notFound()</code> when a product ID is not in our data immediately renders the local <code className="text-zinc-200">not-found.tsx</code> component.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-[11px] text-zinc-500 font-mono">/products/invalid-id</span>
                <Link
                  href="/products/invalid-id"
                  className="text-xs font-semibold text-emerald-400 hover:underline"
                >
                  Test 404 &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Featured Products
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Handpicked items rendered directly from our mock dataset.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              See all ({products.length}) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featured.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition duration-300"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl bg-zinc-800 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-zinc-950/80 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-zinc-800">
                    {product.category}
                  </span>
                </div>

                <div className="mt-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white group-hover:text-emerald-400 transition line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-zinc-800/60 pt-3">
                    <span className="text-base font-bold text-white">
                      ${product.price}
                    </span>
                    <span className="text-xs font-medium text-emerald-400 group-hover:translate-x-1 transition duration-200">
                      Details &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
