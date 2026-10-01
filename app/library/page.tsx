"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { SectionHeader } from "@/components/SectionHeader";
import { getResources, getDomains, getTypes, type Resource } from "@/lib/data";

type SortKey = "title" | "level";

const LEVEL_OPTIONS = ["Beginner", "Intermediate", "Advanced"] as const;
const ALL_LEVELS = "All Levels";
const COST_OPTIONS = ["Free", "Freemium", "Paid"] as const;

function levelRank(level: string): number {
  const ranks: Record<string, number> = {
    Beginner: 0,
    Intermediate: 1,
    Advanced: 2,
  };
  return ranks[level] ?? 3;
}

function costLabel(model: string): string {
  if (model === "free") return "Free";
  if (model === "freemium") return "Freemium";
  return "Paid";
}

function FacetGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        {title}
      </legend>
      <div className="space-y-1">{children}</div>
    </fieldset>
  );
}

function FacetCheckbox({
  id,
  label,
  count,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  count: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      htmlFor={id}
      className="flex cursor-pointer items-center gap-2.5 rounded px-1.5 py-1 text-sm text-zinc-300 transition-colors duration-150 hover:bg-white/[0.04] hover:text-zinc-100"
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 rounded accent-signal"
      />
      <span className="flex-1">{label}</span>
      <span className="font-mono text-xs text-zinc-500">{count}</span>
    </label>
  );
}

export default function LibraryPage() {
  const all = useMemo<Resource[]>(() => getResources(), []);
  const domains = useMemo<string[]>(() => getDomains(), []);
  const types = useMemo<string[]>(() => getTypes(), []);

  const [query, setQuery] = useState("");
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedCosts, setSelectedCosts] = useState<string[]>([]);
  const [sort, setSort] = useState<SortKey>("title");

  const domainCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const domain of domains) {
      counts[domain] = all.filter((resource) => resource.domains.includes(domain)).length;
    }
    return counts;
  }, [all, domains]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const type of types) {
      counts[type] = all.filter((resource) => resource.type === type).length;
    }
    return counts;
  }, [all, types]);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const level of LEVEL_OPTIONS) {
      counts[level] = all.filter((resource) => resource.level === level).length;
    }
    counts[ALL_LEVELS] = all.length;
    return counts;
  }, [all]);

  const costCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const option of COST_OPTIONS) {
      counts[option] = all.filter((resource) => costLabel(resource.cost.model) === option).length;
    }
    return counts;
  }, [all]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return all.filter((resource) => {
      if (needle) {
        const haystack = [resource.title, resource.summary, ...resource.domains]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      if (
        selectedDomains.length > 0 &&
        !selectedDomains.some((domain) => resource.domains.includes(domain))
      ) {
        return false;
      }
      if (selectedTypes.length > 0 && !selectedTypes.includes(resource.type)) {
        return false;
      }
      if (selectedLevels.length > 0) {
        const includeAll = selectedLevels.includes(ALL_LEVELS);
        if (!includeAll && !selectedLevels.includes(resource.level)) return false;
      }
      if (selectedCosts.length > 0 && !selectedCosts.includes(costLabel(resource.cost.model))) {
        return false;
      }
      return true;
    });
  }, [all, query, selectedDomains, selectedTypes, selectedLevels, selectedCosts]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    if (sort === "title") {
      copy.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      copy.sort((a, b) => levelRank(a.level) - levelRank(b.level) || a.title.localeCompare(b.title));
    }
    return copy;
  }, [filtered, sort]);

  const hasActiveFilters =
    query.trim() !== "" ||
    selectedDomains.length > 0 ||
    selectedTypes.length > 0 ||
    selectedLevels.length > 0 ||
    selectedCosts.length > 0;

  function resetFilters() {
    setQuery("");
    setSelectedDomains([]);
    setSelectedTypes([]);
    setSelectedLevels([]);
    setSelectedCosts([]);
    setSort("title");
  }

  function toggleSelection(current: string[], set: (next: string[]) => void, value: string) {
    set(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeader
        kicker="Library"
        title="Every resource, verified."
        lede={`A catalog of ${all.length} real cybersecurity resources, each with a real URL, a real price, and a last-verified date. Every entry was checked live during research in October 2026, so what you see here is what you get when you click through.`}
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside aria-label="Library filters" className="lg:sticky lg:top-20 lg:self-start">
          <div className="space-y-7 rounded-lg border border-line bg-surface p-5">
            <FacetGroup title="Domain">
              <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
                {domains.map((domain, index) => (
                  <FacetCheckbox
                    key={domain}
                    id={`facet-domain-${index}`}
                    label={domain}
                    count={domainCounts[domain] ?? 0}
                    checked={selectedDomains.includes(domain)}
                    onChange={() => toggleSelection(selectedDomains, setSelectedDomains, domain)}
                  />
                ))}
              </div>
            </FacetGroup>

            <FacetGroup title="Type">
              <div className="max-h-56 space-y-1 overflow-y-auto pr-1">
                {types.map((type, index) => (
                  <FacetCheckbox
                    key={type}
                    id={`facet-type-${index}`}
                    label={type}
                    count={typeCounts[type] ?? 0}
                    checked={selectedTypes.includes(type)}
                    onChange={() => toggleSelection(selectedTypes, setSelectedTypes, type)}
                  />
                ))}
              </div>
            </FacetGroup>

            <FacetGroup title="Level">
              {[ALL_LEVELS, ...LEVEL_OPTIONS].map((level, index) => (
                <FacetCheckbox
                  key={level}
                  id={`facet-level-${index}`}
                  label={level}
                  count={levelCounts[level] ?? 0}
                  checked={selectedLevels.includes(level)}
                  onChange={() => toggleSelection(selectedLevels, setSelectedLevels, level)}
                />
              ))}
            </FacetGroup>

            <FacetGroup title="Cost model">
              {COST_OPTIONS.map((option, index) => (
                <FacetCheckbox
                  key={option}
                  id={`facet-cost-${index}`}
                  label={option}
                  count={costCounts[option] ?? 0}
                  checked={selectedCosts.includes(option)}
                  onChange={() => toggleSelection(selectedCosts, setSelectedCosts, option)}
                />
              ))}
            </FacetGroup>

            <p className="border-t border-line pt-4 text-xs leading-relaxed text-zinc-500">
              A price note flagged <span className="font-mono">unverified</span> means no source
              confirmed the price when the resource was last checked. Treat those numbers as rough
              guides, not quotes.
            </p>
          </div>
        </aside>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <label htmlFor="library-search" className="mb-1 block text-sm font-medium text-zinc-200">
                Search the library
              </label>
              <div className="relative">
                <input
                  id="library-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Try burp suite, cloud, or osint"
                  autoComplete="off"
                  className="w-full rounded-md border border-line bg-ink py-2 pl-3 pr-10 text-sm text-zinc-100 placeholder:text-zinc-600 transition-colors duration-200 focus:border-line-strong"
                />
                {query !== "" && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 font-mono text-sm text-zinc-500 transition-colors duration-200 hover:text-zinc-100"
                  >
                    &times;
                  </button>
                )}
              </div>
              <p className="mt-1 text-xs text-zinc-500">
                Searches titles, summaries, and domains.
              </p>
            </div>

            <div>
              <label htmlFor="library-sort" className="mb-1 block text-sm font-medium text-zinc-200">
                Sort
              </label>
              <select
                id="library-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="rounded-md border border-line bg-surface px-3 py-2 text-sm text-zinc-100"
              >
                <option value="title">Title A to Z</option>
                <option value="level">Level: Beginner first</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p aria-live="polite" className="font-mono text-sm text-zinc-500">
              {sorted.length} of {all.length} resources
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded text-sm font-medium text-signal underline underline-offset-2 transition-colors duration-200 hover:text-zinc-100"
              >
                Reset filters
              </button>
            )}
          </div>

          {sorted.length === 0 ? (
            <div className="mt-6 rounded-lg border border-dashed border-line-strong p-10 text-center">
              <p className="text-lg font-semibold text-zinc-100">
                Nothing matches those filters yet.
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-zinc-400">
                Try widening the net. Clear the search or drop a facet or two and see what shows
                up.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-md bg-signal px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-signal-hover"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {sorted.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
