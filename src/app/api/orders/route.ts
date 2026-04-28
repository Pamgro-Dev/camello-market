import { CartItem } from "@/lib/types";
import { NextResponse } from "next/server";

type CreateOrderBody = {
  items?: CartItem[];
};

export async function POST(request: Request) {
  const body = (await request.json()) as CreateOrderBody;
  const items = body.items ?? [];

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const order = {
    id: `ord-${Date.now()}`,
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date().toISOString(),
  };
  return NextResponse.json({ order }, { status: 201 });
}
