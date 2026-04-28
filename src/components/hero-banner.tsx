export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-700 px-6 py-14 text-white sm:px-10">
      <div className="relative z-10 max-w-2xl space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-300">
          Camello Market Collection
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          Premium essentials for modern living.
        </h1>
        <p className="text-sm text-zinc-200 sm:text-base">
          Discover curated products with a clean shopping experience inspired by
          the best modern design systems.
        </p>
      </div>
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-indigo-300/20 blur-2xl" />
    </section>
  );
}
