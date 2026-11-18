import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 backdrop-blur shadow-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 font-mono text-2xl font-bold mb-4">
          404
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-white">
          Product Not Found
        </h1>

        <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
          The product identifier in the URL does not match any item in our catalog. It may have been removed or the link might be misspelled.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-emerald-400 transition"
          >
            Explore Catalog
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-zinc-800 px-5 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-700 hover:text-white transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
