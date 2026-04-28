import AddToCartButton from "@/components/add-to-cart-button";
import { getProductById } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  let product;
  try {
    product = await getProductById(numericId);
  } catch {
    notFound();
  }

  return (
    <section className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-zinc-200/70 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2">
      <div className="relative h-72 overflow-hidden rounded-2xl sm:h-[28rem]">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
        />
      </div>
      <div className="space-y-5">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {product.category}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {product.title}
        </h1>
        <p className="text-zinc-600">{product.description}</p>
        <div className="space-y-1">
          <p className="text-3xl font-semibold text-zinc-900">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm text-zinc-600">Stock: {product.stock}</p>
        </div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <AddToCartButton product={product} />
          <Link href="/" className="text-sm font-medium text-zinc-600 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
