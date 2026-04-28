"use client";

import { useCartStore } from "@/store/cart-store";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPageClient() {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) => state.getTotalPrice());
  const clearCart = useCartStore((state) => state.clearCart);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handlePlaceOrder = () => {
    if (!name || !address || !phone) {
      toast.error("Please fill all fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    clearCart();
    toast.success("Order placed successfully");
    setName("");
    setAddress("");
    setPhone("");
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-300 bg-white p-8 text-center text-zinc-600">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-zinc-900">Shipping Details</h2>
        <div className="mt-4 space-y-3">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Full name"
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none ring-zinc-300 focus:ring"
          />
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Address"
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none ring-zinc-300 focus:ring"
          />
          <input
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="Phone number"
            className="w-full rounded-xl border border-zinc-300 px-4 py-2.5 text-sm outline-none ring-zinc-300 focus:ring"
          />
        </div>
      </div>

      <div className="space-y-5">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 sm:p-5">
        <h2 className="text-lg font-semibold text-zinc-900">Order Summary</h2>
        <div className="mt-4 space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="text-zinc-700">
                {item.title} x {item.quantity}
              </span>
              <span className="font-medium text-zinc-900">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-zinc-200 pt-4">
          <p className="text-lg font-semibold text-zinc-900">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handlePlaceOrder}
        className="w-full rounded-lg bg-zinc-900 px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-700 sm:w-auto"
      >
        Place Order
      </button>
      </div>
    </div>
  );
}
