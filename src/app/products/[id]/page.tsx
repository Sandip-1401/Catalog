interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  // In modern Next.js, `params` is a Promise that we await
  const { id } = await params;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-xl backdrop-blur">
        <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
          Dynamic Route Active
        </span>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-white">
          Product Details
        </h1>

        <p className="mt-2 text-sm text-zinc-400">
          Next.js read this dynamic parameter directly from your URL path:
        </p>

        <div className="mt-6 rounded-lg bg-zinc-950 p-4 border border-zinc-800">
          <p className="text-xs text-zinc-500 font-mono">Current [id] parameter:</p>
          <p className="text-lg font-mono font-bold text-emerald-400 mt-1">
            &quot;{id}&quot;
          </p>
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Try visiting <code className="text-zinc-300">/products/macbook</code> or <code className="text-zinc-300">/products/12345</code> in your browser to see this value update instantly!
        </p>
      </div>
    </div>
  );
}
