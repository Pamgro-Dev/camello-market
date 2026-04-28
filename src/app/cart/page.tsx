import CartPageClient from "@/components/cart-page-client";

export default function CartPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Your Cart</h1>
        <p className="mt-1 text-zinc-600">Review items before checkout.</p>
      </div>
      <CartPageClient />
    </section>
  );
}
