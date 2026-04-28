import AddToCartButton from "@/components/add-to-cart-button";
import { Product } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-xl">
      <div className="relative h-52 w-full overflow-hidden bg-zinc-50 p-3">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>
        <Link
          href={`/product/${product.id}`}
          className="line-clamp-1 text-lg font-semibold text-zinc-900"
        >
          {product.title}
        </Link>
        <p className="text-xl font-semibold text-zinc-900">${product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
