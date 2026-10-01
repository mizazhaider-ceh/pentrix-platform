"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import type { GlossaryTerm } from "@/lib/content";

export function GlossaryClient({
  terms,
  categories,
}: {
  terms: GlossaryTerm[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return terms.filter((term) => {
      if (activeCategory !== "All" && term.category !== activeCategory) {
        return false;
      }
      if (!q) return true;
      return (
        term.term.toLowerCase().includes(q) ||
        term.definition.toLowerCase().includes(q)
      );
    });
  }, [terms, query, activeCategory]);

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Glossary"
        title="The words, in plain language"
        lede={`${terms.length} terms you will meet in writeups, labs, and job interviews. Each one explained like a senior would explain it to you, not like a textbook.`}
      />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="glossary-search" className="sr-only">
          Search terms
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a term, e.g. kerberoasting"
          className="w-full rounded-md border border-line bg-surface px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-signal focus:outline-none sm:max-w-sm"
        />
        <p className="font-mono text-xs text-zinc-500">
          {filtered.length} of {terms.length} terms
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            aria-pressed={activeCategory === category}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200 ${
              activeCategory === category
                ? "border-signal bg-signal/10 text-signal"
                : "border-line text-zinc-400 hover:border-line-strong hover:text-zinc-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <dl className="mt-10 divide-y divide-line border-y border-line">
        {filtered.map((term) => (
          <div key={term.term} className="grid gap-2 py-5 sm:grid-cols-12 sm:gap-6">
            <dt className="sm:col-span-4">
              <p className="font-mono text-sm font-semibold text-zinc-50">
                {term.term}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                {term.category}
              </p>
            </dt>
            <dd className="leading-relaxed text-zinc-400 sm:col-span-8">
              {term.definition}
            </dd>
          </div>
        ))}
      </dl>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-zinc-500">
          No terms match. Try a different search.
        </p>
      ) : null}
    </main>
  );
}
