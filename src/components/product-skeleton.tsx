export default function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 bg-white">
      <div className="h-52 bg-zinc-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-20 rounded bg-zinc-200" />
        <div className="h-5 w-3/4 rounded bg-zinc-200" />
        <div className="h-5 w-1/3 rounded bg-zinc-200" />
        <div className="h-10 rounded-full bg-zinc-200" />
      </div>
    </div>
  );
}
