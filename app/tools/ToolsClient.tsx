"use client";

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import type { Resource } from "@/lib/data";

function CostLabel({ resource }: { resource: Resource }) {
  const label =
    resource.cost.model === "free"
      ? "Free"
      : resource.cost.model === "freemium"
        ? "Freemium"
        : resource.cost.price ?? "Paid";
  return (
    <span className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-zinc-400">
      {label}
    </span>
  );
}

export function ToolsClient({ tools }: { tools: Resource[] }) {
  const [query, setQuery] = useState("");
  const [activeDomain, setActiveDomain] = useState<string>("All");

  const domains = useMemo(() => {
    const set = new Set<string>();
    for (const tool of tools) {
      for (const domain of tool.domains) set.add(domain);
    }
    return Array.from(set).sort();
  }, [tools]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tools.filter((tool) => {
      if (activeDomain !== "All" && !tool.domains.includes(activeDomain)) {
        return false;
      }
      if (!q) return true;
      return (
        tool.title.toLowerCase().includes(q) ||
        tool.summary.toLowerCase().includes(q)
      );
    });
  }, [tools, query, activeDomain]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-20">
      <SectionHeader
        kicker="Tools directory"
        title="The toolbox, with labels on every drawer"
        lede={`${tools.length} tools from the verified library, grouped by what they are for. Each one checked live, with the real price attached.`}
      />

      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="tools-search" className="sr-only">
          Search tools
        </label>
        <input
          id="tools-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a tool, e.g. ffuf"
          className="w-full rounded-md border border-line bg-surface px-4 py-3 font-mono text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-signal focus:outline-none sm:max-w-sm"
        />
        <p className="font-mono text-xs text-zinc-500">
          {filtered.length} of {tools.length} tools
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter by domain">
        {["All", ...domains].map((domain) => (
          <button
            key={domain}
            type="button"
            onClick={() => setActiveDomain(domain)}
            aria-pressed={activeDomain === domain}
            className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors duration-200 ${
              activeDomain === domain
                ? "border-signal bg-signal/10 text-signal"
                : "border-line text-zinc-400 hover:border-line-strong hover:text-zinc-200"
            }`}
          >
            {domain}
          </button>
        ))}
      </div>

      <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <li key={tool.id}>
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-lg border border-line bg-surface px-6 py-6 transition-colors duration-200 hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-display text-lg font-semibold tracking-tight text-zinc-50 transition-colors group-hover:text-signal">
                  {tool.title}
                </h2>
                <span aria-hidden="true" className="font-mono text-sm text-zinc-600 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-signal">
                  ↗
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                {tool.summary}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <CostLabel resource={tool} />
                <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-zinc-600">
                  {tool.level}
                </span>
                {tool.domains.slice(0, 2).map((domain) => (
                  <span
                    key={domain}
                    className="font-mono text-[11px] text-zinc-600"
                  >
                    · {domain}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-zinc-500">
          No tools match. Try a different search.
        </p>
      ) : null}
    </main>
  );
}
