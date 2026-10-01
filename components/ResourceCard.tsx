import { CostBadge, VerifiedBadge, LevelBadge, TagBadge } from "@/components/Badge";

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="13"
      height="13"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9 9 3" />
      <path d="M4.5 3H9v4.5" />
    </svg>
  );
}

/**
 * Minimal shape ResourceCard needs. Accepts the full lib/data Resource
 * (cost as an object) and looser page-level shapes (cost as a string).
 */
export interface CardResource {
  title: string;
  summary: string;
  url: string;
  domains: string[];
  type: string;
  level: string;
  cost: string | { model: string; price?: string };
}

function normalizeCost(cost: CardResource["cost"]): {
  model: string;
  price?: string;
} {
  return typeof cost === "string" ? { model: cost } : cost;
}

export function ResourceCard({ resource }: { resource: CardResource }) {
  const cost = normalizeCost(resource.cost);
  return (
    <article className="flex h-full flex-col rounded-lg border border-white/[0.08] bg-surface p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/[0.15]">
      <div className="flex flex-wrap gap-1.5">
        {resource.domains.slice(0, 2).map((domain) => (
          <TagBadge key={domain} label={domain} />
        ))}
        <TagBadge label={resource.type} />
        <LevelBadge level={resource.level} />
      </div>

      <h3 className="mt-3 text-[17px] font-semibold leading-snug tracking-tight text-zinc-100">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors duration-200 hover:text-signal"
        >
          {resource.title}
        </a>
      </h3>

      <p className="clamp-2 mt-2 text-sm leading-relaxed text-zinc-400">
        {resource.summary}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
        <CostBadge model={cost.model} price={cost.price} />
        <VerifiedBadge />
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${resource.title} in a new tab`}
          className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-500 transition-colors duration-200 hover:bg-white/[0.06] hover:text-signal"
        >
          <ArrowIcon />
        </a>
      </div>
    </article>
  );
}

export default ResourceCard;
