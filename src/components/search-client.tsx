"use client";

import Link from "next/link";
import { useState } from "react";

type SearchItem = {
  slug: string;
  title: string;
  description: string;
  category: string;
  href: string;
  tags: string[];
};

export function SearchClient({ items }: { items: SearchItem[] }) {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const results = !normalized
    ? items
    : items.filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
        return haystack.includes(normalized);
      });

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_20px_60px_rgba(32,24,18,0.08)]">
        <label htmlFor="site-search" className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
          Search articles
        </label>
        <input
          id="site-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try espresso ratio, gin, floral, troubleshooting..."
          className="mt-3 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-4 text-base outline-none ring-0"
        />
      </div>
      <div className="mt-8 grid gap-4">
        {results.map((item) => (
          <Link key={item.slug} href={item.href} className="rounded-[1.5rem] border border-stone-200 bg-white p-5 transition hover:border-stone-300 hover:shadow-[0_10px_30px_rgba(32,24,18,0.08)]">
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{item.category}</div>
            <h2 className="mt-2 font-heading text-2xl text-ink">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-stone-700">{item.description}</p>
          </Link>
        ))}
        {!results.length ? (
          <div className="rounded-[1.5rem] border border-dashed border-stone-300 p-8 text-sm text-stone-600">
            No matches yet. Try a category, ingredient, or flavor profile instead.
          </div>
        ) : null}
      </div>
    </div>
  );
}

