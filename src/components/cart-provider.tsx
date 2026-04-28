"use client";

import {
  addProductToCart,
  readCart,
  writeCart,
} from "@/lib/cart-storage";
import { CartItem, Product } from "@/lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCart());

  useEffect(() => {
    writeCart(items);
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    return {
      items,
      totalItems,
      totalPrice,
      addItem: (product) => {
        setItems((current) => addProductToCart(current, product));
      },
      removeItem: (id) => {
        setItems((current) => current.filter((item) => item.id !== id));
      },
      clearCart: () => {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
