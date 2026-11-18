import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-black group-hover:scale-105 transition">
              P2
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-emerald-400 transition">
              Tech<span className="text-emerald-400">Catalog</span>
            </span>
          </Link>

          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-zinc-400 hover:text-white transition"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-zinc-400 hover:text-white transition"
            >
              All Products
            </Link>
            <div className="h-4 w-px bg-zinc-800" />
            <Link
              href="/products?category=Audio"
              className="text-xs text-zinc-400 hover:text-emerald-400 transition"
            >
              Audio
            </Link>
            <Link
              href="/products?category=Computing"
              className="text-xs text-zinc-400 hover:text-emerald-400 transition"
            >
              Computing
            </Link>
            <Link
              href="/products?category=Accessories"
              className="text-xs text-zinc-400 hover:text-emerald-400 transition"
            >
              Accessories
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-white transition"
          >
            Browse Catalog &rarr;
          </Link>
        </div>
      </div>
    </header>
  );
}
