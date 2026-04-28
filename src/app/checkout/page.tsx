import CheckoutPageClient from "@/components/checkout-page-client";

export default function CheckoutPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Checkout</h1>
        <p className="mt-1 text-zinc-600">Confirm your order and place it.</p>
      </div>
      <CheckoutPageClient />
    </section>
  );
}
