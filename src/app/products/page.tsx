/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { getFilteredProducts } from "@/data/products";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  MotionCard,
} from "@/components/motion";

interface PageProps {
  // In Next.js 15/16, searchParams is also a Promise
  searchParams: Promise<{
    category?: string;
    sort?: string;
    search?: string;
  }>;
}

const CATEGORIES = ["All", "Audio", "Computing", "Accessories"];

const SORT_OPTIONS = [
  { label: "Default", value: "" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Highest Rated", value: "rating" },
];

export default async function ProductsCatalogPage({ searchParams }: PageProps) {
  // 1. Unpack search parameters from the URL
  const { category = "All", sort = "", search = "" } = await searchParams;

  // 2. Fetch the filtered list of products
  const products = getFilteredProducts({ category, sort, search });

  // Helper to construct query string URLs while preserving other filters
  const buildFilterUrl = (newCategory?: string, newSort?: string) => {
    const params = new URLSearchParams();
    const activeCategory = newCategory !== undefined ? newCategory : category;
    const activeSort = newSort !== undefined ? newSort : sort;

    if (activeCategory && activeCategory !== "All") params.set("category", activeCategory);
    if (activeSort) params.set("sort", activeSort);
    if (search) params.set("search", search);

    const qs = params.toString();
    return qs ? `/products?${qs}` : "/products";
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with FadeIn */}
        <FadeIn direction="up">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                Explore Our Store
              </span>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                Product Catalog
              </h1>
              <p className="mt-2 text-sm text-zinc-400">
                Showing {products.length} {products.length === 1 ? "product" : "products"}
                {category !== "All" && <span> in <strong className="text-zinc-200">{category}</strong></span>}
                {search && <span> matching &ldquo;<strong className="text-zinc-200">{search}</strong>&rdquo;</span>}
              </p>
            </div>

            {/* Search Bar (Uses native form GET request -> naturally updates URL searchParams!) */}
            <form method="GET" action="/products" className="flex items-center gap-2">
              {category !== "All" && <input type="hidden" name="category" value={category} />}
              {sort && <input type="hidden" name="sort" value={sort} />}
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder="Search products..."
                className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64"
              />
              <button
                type="submit"
                className="rounded-xl bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 text-sm font-medium text-white transition cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </FadeIn>

        {/* Filter Bar: Category Tabs & Sort Options */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = category.toLowerCase() === cat.toLowerCase();
                return (
                  <Link
                    key={cat}
                    href={buildFilterUrl(cat, undefined)}
                    className={`rounded-xl px-4 py-2 text-xs font-medium transition ${
                      isActive
                        ? "bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 font-semibold scale-105"
                        : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800/80"
                    }`}
                  >
                    {cat}
                  </Link>
                );
              })}
            </div>

            {/* Sort Dropdown Links */}
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span>Sort by:</span>
              <div className="flex flex-wrap gap-1">
                {SORT_OPTIONS.map((opt) => {
                  const isActive = (sort || "") === opt.value;
                  return (
                    <Link
                      key={opt.label}
                      href={buildFilterUrl(undefined, opt.value)}
                      className={`rounded-lg px-2.5 py-1 text-xs transition ${
                        isActive
                          ? "bg-zinc-800 text-emerald-400 font-semibold border border-zinc-700"
                          : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {opt.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Products Grid */}
        {products.length === 0 ? (
          <FadeIn delay={0.2}>
            <div className="mt-16 text-center py-16 rounded-3xl border border-zinc-800/60 bg-zinc-900/20">
              <p className="text-zinc-400 text-sm">No products found matching your criteria.</p>
              <Link
                href="/products"
                className="mt-4 inline-block rounded-xl bg-zinc-800 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
              >
                Clear all filters
              </Link>
            </div>
          </FadeIn>
        ) : (
          <StaggerContainer
            key={`${category}-${sort}-${search}`}
            staggerDelay={0.06}
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product) => (
              <StaggerItem key={product.id}>
                <Link
                  href={`/products/${product.id}`}
                  className="block h-full"
                >
                  <MotionCard className="group flex flex-col h-full rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 hover:border-zinc-700 hover:bg-zinc-900/80 transition duration-300 backdrop-blur">
                    {/* Product Image */}
                    <div className="aspect-4/3 w-full overflow-hidden rounded-xl bg-zinc-800 relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover object-center group-hover:scale-105 transition duration-500"
                      />
                      <span className="absolute top-3 right-3 rounded-full bg-zinc-950/80 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-zinc-300 border border-zinc-800">
                        {product.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="mt-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-amber-400">
                          <span>★</span>
                          <span className="font-medium text-zinc-300">{product.rating}</span>
                          <span className="text-zinc-500">({product.reviewCount})</span>
                        </div>

                        <h2 className="mt-2 text-base font-semibold text-white group-hover:text-emerald-400 transition line-clamp-1">
                          {product.name}
                        </h2>

                        <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">
                          {product.description}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-zinc-800/60 pt-4">
                        <span className="text-lg font-bold text-white">
                          ${product.price}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition duration-200">
                          View details &rarr;
                        </span>
                      </div>
                    </div>
                  </MotionCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        )}
      </div>
    </div>
  );
}
