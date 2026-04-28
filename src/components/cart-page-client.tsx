"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CartPageClient() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const totalPrice = useCartStore((state) => state.getTotalPrice());

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center">
        <h2 className="text-xl font-semibold text-zinc-900">Your cart is empty</h2>
        <p className="mt-2 text-zinc-600">Add some products to get started.</p>
        <Link
          href="/products"
          className="mt-4 inline-block rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-3 border-b border-zinc-200 py-3 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
          >
            <div>
              <p className="font-medium text-zinc-900">{item.title}</p>
              <p className="text-sm text-zinc-600">
                ${item.price.toFixed(2)} each
              </p>
            </div>
            <div className="flex items-center justify-between gap-3 sm:justify-end">
              <div className="inline-flex items-center rounded-full border border-zinc-300">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 text-zinc-700"
                >
                  -
                </button>
                <span className="px-3 py-1 text-sm">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 text-zinc-700"
                >
                  +
                </button>
              </div>
              <p className="font-semibold text-zinc-800">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                type="button"
                onClick={() => {
                  removeItem(item.id);
                  toast.success("Item removed");
                }}
                className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <p className="text-xl font-semibold text-zinc-900">
          Total: ${totalPrice.toFixed(2)}
        </p>
        <Link
          href="/checkout"
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-zinc-700 sm:w-auto"
        >
          Go to checkout
        </Link>
      </div>
    </div>
  );
}
