"use client";

import { useAuthStore } from "@/store/auth-store";
import { useCartStore } from "@/store/cart-store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Navbar() {
  const itemCount = useCartStore((state) => state.getItemCount());
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const hydrateUser = useAuthStore((state) => state.hydrateUser);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-900">
          Camello Market
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-zinc-600 sm:inline">
                Hi, {user.firstName}
              </span>
              <Link
                href="/account"
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  logout();
                  toast.success("Logged out");
                }}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              Login
            </Link>
          )}
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 rounded-full border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-400 hover:text-zinc-900"
          >
            <ShoppingBag className="h-4 w-4" />
            Cart
            <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-zinc-900 px-1.5 py-0.5 text-xs text-white">
              {itemCount}
            </span>
          </Link>
          <Link href="/checkout" className="hidden text-sm text-zinc-600 sm:inline-block">
            Checkout
          </Link>
        </div>
      </nav>
    </header>
  );
}
