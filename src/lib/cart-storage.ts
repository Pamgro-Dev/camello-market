"use client";

import { CartItem, Product } from "@/lib/types";

const CART_STORAGE_KEY = "ecommerce-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const rawCart = window.localStorage.getItem(CART_STORAGE_KEY);
  if (!rawCart) {
    return [];
  }

  try {
    const parsedCart = JSON.parse(rawCart) as CartItem[];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

export function writeCart(items: CartItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function addProductToCart(items: CartItem[], product: Product): CartItem[] {
  const existing = items.find((item) => item.id === product.id);
  if (!existing) {
    return [...items, { ...product, quantity: 1 }];
  }

  return items.map((item) =>
    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
  );
}
