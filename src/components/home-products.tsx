"use client";

import ProductCard from "@/components/product-card";
import ProductSkeleton from "@/components/product-skeleton";
import { getCategories, getProducts } from "@/lib/api";
import { Product } from "@/lib/types";
import { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 9;

export default function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch {
        setCategories([]);
      }
    };

    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const data = await getProducts({
          limit: PAGE_SIZE,
          skip,
          search: search.trim() || undefined,
          category: selectedCategory,
        });
        setProducts(data.products);
        setTotal(data.total);
      } catch {
        setError("Unable to load products right now.");
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [page, search, selectedCategory]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / PAGE_SIZE)), [total]);

  const canPrev = page > 1;
  const canNext = page < totalPages;
  const pageNumbers = useMemo(() => {
    const maxVisible = 5;
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, start + maxVisible - 1);
    const adjustedStart = Math.max(1, end - maxVisible + 1);
    return Array.from(
      { length: end - adjustedStart + 1 },
      (_, index) => adjustedStart + index,
    );
  }, [page, totalPages]);

  return (
    <section className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={search}
          onChange={(event) => {
            setPage(1);
            setSearch(event.target.value);
          }}
          placeholder="Search products..."
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none ring-zinc-300 transition focus:ring"
        />
        <select
          value={selectedCategory}
          onChange={(event) => {
            setPage(1);
            setSelectedCategory(event.target.value);
          }}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none ring-zinc-300 transition focus:ring"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <ProductSkeleton key={`skeleton-${index}`} />
            ))
          : products.map((product) => <ProductCard key={product.id} product={product} />)}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white p-4">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => setPage((value) => value - 1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        {pageNumbers[0] > 1 ? (
          <>
            <button
              type="button"
              onClick={() => setPage(1)}
              className="h-9 min-w-9 rounded-full border border-zinc-300 px-3 text-sm text-zinc-700"
            >
              1
            </button>
            {pageNumbers[0] > 2 ? <span className="px-1 text-zinc-500">...</span> : null}
          </>
        ) : null}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => setPage(pageNumber)}
            className={`h-9 min-w-9 rounded-full border px-3 text-sm font-medium transition ${
              pageNumber === page
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 text-zinc-700 hover:border-zinc-400"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {pageNumbers[pageNumbers.length - 1] < totalPages ? (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 ? (
              <span className="px-1 text-zinc-500">...</span>
            ) : null}
            <button
              type="button"
              onClick={() => setPage(totalPages)}
              className="h-9 min-w-9 rounded-full border border-zinc-300 px-3 text-sm text-zinc-700"
            >
              {totalPages}
            </button>
          </>
        ) : null}

        <button
          type="button"
          disabled={!canNext}
          onClick={() => setPage((value) => value + 1)}
          className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
