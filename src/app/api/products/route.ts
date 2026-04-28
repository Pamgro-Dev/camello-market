import { getProducts } from "@/lib/api";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts({ limit: 12, skip: 0 });
  return NextResponse.json(products);
}
