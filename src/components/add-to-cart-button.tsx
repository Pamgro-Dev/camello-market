"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart-store";
import toast from "react-hot-toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      type="button"
      onClick={() => {
        addItem(product);
        toast.success("Added to cart");
      }}
      className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-700"
    >
      Add to cart
    </button>
  );
}
