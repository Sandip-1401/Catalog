export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-8 px-6 text-center text-xs text-zinc-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          Next.js Level 1 • <span className="text-zinc-400">Project 2: Product Catalog</span>
        </p>
        <p className="text-zinc-500">
          Mastering Dynamic Routes (<code className="text-zinc-400">[id]</code>), Route Params, and Search Params
        </p>
      </div>
    </footer>
  );
}
